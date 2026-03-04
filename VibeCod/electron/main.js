const { app, BrowserWindow, ipcMain, shell, dialog, protocol } = require('electron');
const path = require('path');
const { spawn, exec } = require('child_process');
const fs = require('fs');
const os = require('os');

const isDev = process.env.NODE_ENV === 'development';

// Get the app root directory (different in dev vs packaged)
const appRoot = isDev
  ? path.join(__dirname, '..')
  : process.resourcesPath || path.join(__dirname, '..');

let mainWindow;
let store;

// Simple file-based store fallback
class FileStore {
  constructor(name, defaults = {}) {
    const configDir = path.join(os.homedir(), '.vibecod');
    if (!fs.existsSync(configDir)) {
      fs.mkdirSync(configDir, { recursive: true });
    }
    this.filePath = path.join(configDir, `${name}.json`);
    this.defaults = defaults;
    this.data = this.load();
  }

  load() {
    try {
      if (fs.existsSync(this.filePath)) {
        return { ...this.defaults, ...JSON.parse(fs.readFileSync(this.filePath, 'utf8')) };
      }
    } catch (e) {
      console.error('Error loading store:', e);
    }
    return { ...this.defaults };
  }

  save() {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2), 'utf8');
    } catch (e) {
      console.error('Error saving store:', e);
    }
  }

  get(key) {
    return this.data[key];
  }

  set(key, value) {
    this.data[key] = value;
    this.save();
  }

  delete(key) {
    delete this.data[key];
    this.save();
  }
}

async function initStore() {
  try {
    // Try to use electron-store if available
    const { default: ElectronStore } = await import('electron-store');
    store = new ElectronStore({
      name: 'vibecod-config',
      defaults: {
        installedServers: {},
        selectedIDEs: ['cursor'],
        aiConfig: null,
        projects: [],
        snippets: [],
        appState: {
          activeTab: 'dashboard',
          sidebarCollapsed: false,
          theme: 'dark'
        }
      }
    });
    console.log('Using electron-store');
  } catch (e) {
    // Fallback to file-based store
    console.log('Using file-based store fallback');
    store = new FileStore('vibecod-config', {
      installedServers: {},
      selectedIDEs: ['cursor'],
      aiConfig: null,
      projects: [],
      snippets: [],
      appState: {
        activeTab: 'dashboard',
        sidebarCollapsed: false,
        theme: 'dark'
      }
    });
  }
}

// Register custom protocol for serving static files
function registerProtocol() {
  protocol.registerBufferProtocol('app', (request, callback) => {
    const requestPath = request.url.substr(7); // Remove 'app://'
    const filePath = path.join(appRoot, 'out', requestPath);
    
    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.error('Failed to read file:', filePath, err);
        callback({ error: -2 }); // Cannot find file
      } else {
        // Determine mime type
        let mimeType = 'text/html';
        if (filePath.endsWith('.js')) mimeType = 'application/javascript';
        else if (filePath.endsWith('.css')) mimeType = 'text/css';
        else if (filePath.endsWith('.json')) mimeType = 'application/json';
        else if (filePath.endsWith('.png')) mimeType = 'image/png';
        else if (filePath.endsWith('.jpg') || filePath.endsWith('.jpeg')) mimeType = 'image/jpeg';
        else if (filePath.endsWith('.svg')) mimeType = 'image/svg+xml';
        else if (filePath.endsWith('.ico')) mimeType = 'image/x-icon';
        else if (filePath.endsWith('.woff')) mimeType = 'font/woff';
        else if (filePath.endsWith('.woff2')) mimeType = 'font/woff2';
        else if (filePath.endsWith('.ttf')) mimeType = 'font/ttf';
        
        callback({
          data,
          mimeType
        });
      }
    });
  });
}

function createWindow() {
  // Get icon path if it exists
  const iconPath = path.join(appRoot, 'public', 'icon.ico');
  const hasIcon = fs.existsSync(iconPath);

  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1000,
    minHeight: 700,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
      webSecurity: true,
      sandbox: false,
      backgroundThrottling: false
    },
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#09090b',
      symbolColor: '#ffffff',
      height: 40
    },
    backgroundColor: '#09090b',
    show: false,
    ...(hasIcon ? { icon: iconPath } : {})
  });

  if (isDev) {
    mainWindow.loadURL('http://localhost:3000');
    // Only open DevTools in development
    mainWindow.webContents.openDevTools();
  } else {
    // Load using custom protocol
    console.log('Loading from app://index.html');
    console.log('App root:', appRoot);
    console.log('Resources path:', process.resourcesPath);
    
    const indexPath = path.join(appRoot, 'out', 'index.html');
    if (!fs.existsSync(indexPath)) {
      console.error('index.html not found at:', indexPath);
      dialog.showErrorBox('Error', 'Application files not found. Please reinstall.');
      app.quit();
      return;
    }
    
    mainWindow.loadURL('app://index.html');
  }

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(async () => {
  // Register custom protocol before creating windows
  if (!isDev) {
    registerProtocol();
  }
  
  try {
    await initStore();
    createWindow();
  } catch (error) {
    console.error('Failed to initialize app:', error);
    dialog.showErrorBox('Startup Error', `Failed to start VibeCod: ${error.message}`);
    app.quit();
  }

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// ─── IPC Handlers ────────────────────────────────────────────────────────────

ipcMain.handle('store:get', async (event, key) => {
  return store.get(key);
});

ipcMain.handle('store:set', async (event, key, value) => {
  store.set(key, value);
  return true;
});

ipcMain.handle('store:delete', async (event, key) => {
  store.delete(key);
  return true;
});

// ─── File System Operations ───────────────────────────────────────────────────

ipcMain.handle('fs:selectFolder', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory']
  });
  return result.canceled ? null : result.filePaths[0];
});

ipcMain.handle('fs:readDirectory', async (event, dirPath) => {
  try {
    const entries = await fs.promises.readdir(dirPath, { withFileTypes: true });
    return entries.map(entry => ({
      name: entry.name,
      isDirectory: entry.isDirectory(),
      path: path.join(dirPath, entry.name)
    }));
  } catch (error) {
    return { error: error.message };
  }
});

ipcMain.handle('fs:readFile', async (event, filePath) => {
  try {
    const content = await fs.promises.readFile(filePath, 'utf-8');
    return { success: true, content };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('fs:writeFile', async (event, filePath, content) => {
  try {
    await fs.promises.writeFile(filePath, content, 'utf-8');
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// ─── Installation handlers ────────────────────────────────────────────────────

function runInstall(event, cmd, args, serverName, envVars) {
  return new Promise((resolve) => {
    const env = { ...process.env, ...envVars };
    let proc;

    try {
      proc = spawn(cmd, args, {
        env,
        shell: true,
        windowsHide: true
      });
    } catch (spawnErr) {
      resolve({ success: false, error: `Failed to start ${cmd}: ${spawnErr.message}` });
      return;
    }

    let combinedOutput = '';

    const handleData = (data) => {
      const text = data.toString();
      combinedOutput += text;
      try {
        event.sender.send('install:progress', { serverName, output: text });
      } catch (_) {}
    };

    proc.stdout.on('data', handleData);
    proc.stderr.on('data', handleData);

    proc.on('close', (code) => {
      const looksSuccessful =
        code === 0 ||
        /added \d+ packages?/i.test(combinedOutput) ||
        /successfully installed/i.test(combinedOutput) ||
        /Requirement already satisfied/i.test(combinedOutput) ||
        /Successfully installed/i.test(combinedOutput);

      const hasRealError =
        /^npm error /im.test(combinedOutput) ||
        /^error:/im.test(combinedOutput) ||
        /^fatal:/im.test(combinedOutput) ||
        /ENOENT.*package\.json/i.test(combinedOutput) ||
        /Cannot find module/i.test(combinedOutput) ||
        /command not found/i.test(combinedOutput) ||
        /is not recognized as an internal or external command/i.test(combinedOutput);

      if (looksSuccessful && !hasRealError) {
        resolve({ success: true, output: combinedOutput });
      } else if (hasRealError) {
        resolve({ success: false, error: combinedOutput });
      } else if (code !== 0) {
        resolve({ success: false, error: combinedOutput || `Process exited with code ${code}` });
      } else {
        resolve({ success: true, output: combinedOutput });
      }
    });

    proc.on('error', (err) => {
      const msg = err.code === 'ENOENT'
        ? `Command not found: "${cmd}". Make sure it is installed and in your PATH.`
        : err.message;
      resolve({ success: false, error: msg });
    });
  });
}

function checkCommandAvailability(command) {
  return new Promise((resolve) => {
    const checkCmd = process.platform === 'win32' ? `where ${command}` : `which ${command}`;
    exec(checkCmd, (error) => resolve(!error));
  });
}

function normalizeInstallPayload(payloadOrPackageName, maybeServerName, maybeEnvVars) {
  if (payloadOrPackageName && typeof payloadOrPackageName === 'object' && !Array.isArray(payloadOrPackageName)) {
    return {
      packageName: payloadOrPackageName.packageName,
      serverName: payloadOrPackageName.serverName || payloadOrPackageName.name || payloadOrPackageName.id || 'MCP Server',
      envVars: payloadOrPackageName.envVars || {},
      command: payloadOrPackageName.command || '',
      installType: payloadOrPackageName.installType || 'manual'
    };
  }
  return {
    packageName: payloadOrPackageName,
    serverName: maybeServerName || 'MCP Server',
    envVars: maybeEnvVars || {},
    command: '',
    installType: 'manual'
  };
}

async function verifyInstalledArtifact(payload) {
  if (!payload?.packageName) return { ok: true, message: 'No package to verify' };
  if (payload.installType === 'npm') {
    const result = await runInstall({ sender: { send: () => {} } }, 'npm', ['ls', '-g', payload.packageName, '--depth=0'], payload.serverName, payload.envVars);
    return result.success
      ? { ok: true, message: `Package present globally: ${payload.packageName}` }
      : { ok: false, message: `Global npm package not found after install: ${payload.packageName}` };
  }
  if (payload.installType === 'pip') {
    const hasPython = await checkCommandAvailability('python');
    const result = hasPython
      ? await runInstall({ sender: { send: () => {} } }, 'python', ['-m', 'pip', 'show', payload.packageName], payload.serverName, payload.envVars)
      : await runInstall({ sender: { send: () => {} } }, 'pip', ['show', payload.packageName], payload.serverName, payload.envVars);
    return result.success
      ? { ok: true, message: `Package present in pip: ${payload.packageName}` }
      : { ok: false, message: `pip package not found after install: ${payload.packageName}` };
  }
  return { ok: true, message: 'Verification skipped for this install type' };
}

async function performInstall(event, installType, payloadOrPackageName, maybeServerName, maybeEnvVars) {
  const payload = normalizeInstallPayload(payloadOrPackageName, maybeServerName, maybeEnvVars);
  payload.installType = installType;

  let result;
  if (installType === 'npm') {
    result = await runInstall(event, 'npm', ['install', '-g', payload.packageName], payload.serverName, payload.envVars);
  } else if (installType === 'pip') {
    result = await runInstall(event, 'pip', ['install', payload.packageName], payload.serverName, payload.envVars);
  } else if (installType === 'go') {
    result = await runInstall(event, 'go', ['install', payload.packageName], payload.serverName, payload.envVars);
  } else if (installType === 'uvx') {
    result = await new Promise((resolve) => {
      exec('uvx --version', (error) => {
        if (error) resolve({ success: false, error: 'uvx not found. Install uv first: pip install uv' });
        else resolve({ success: true, output: `uvx is available. ${payload.packageName} will run via uvx.` });
      });
    });
  } else {
    result = { success: true, output: '' };
  }

  if (!result.success) return result;

  const verification = await verifyInstalledArtifact(payload);
  if (!verification.ok) {
    return { success: false, error: verification.message };
  }

  return {
    ...result,
    output: `${result.output || ''}\nVerification successful: ${verification.message}`
  };
}

ipcMain.handle('install:npm', async (event, payloadOrPackageName, maybeServerName, maybeEnvVars) => {
  return performInstall(event, 'npm', payloadOrPackageName, maybeServerName, maybeEnvVars);
});

ipcMain.handle('install:pip', async (event, payloadOrPackageName, maybeServerName, maybeEnvVars) => {
  return performInstall(event, 'pip', payloadOrPackageName, maybeServerName, maybeEnvVars);
});

ipcMain.handle('install:go', async (event, payloadOrPackageName, maybeServerName, maybeEnvVars) => {
  return performInstall(event, 'go', payloadOrPackageName, maybeServerName, maybeEnvVars);
});

ipcMain.handle('install:uvx', async (event, payloadOrPackageName, maybeServerName, maybeEnvVars) => {
  return performInstall(event, 'uvx', payloadOrPackageName, maybeServerName, maybeEnvVars);
});

ipcMain.handle('check:command', async (event, command) => {
  return checkCommandAvailability(command);
});

// ─── IDE Config generation ────────────────────────────────────────────────────

function getIDEConfigPath(ide) {
  const homeDir = os.homedir();
  const appData = process.env.APPDATA || path.join(homeDir, 'AppData', 'Roaming');

  switch (ide) {
    case 'cursor':
      return path.join(homeDir, '.cursor', 'mcp.json');
    case 'vscode':
      return path.join(appData, 'Code', 'User', 'mcp.json');
    case 'windsurf':
      return path.join(homeDir, '.codeium', 'windsurf', 'mcp_config.json');
    case 'claudecode':
      return path.join(homeDir, '.claude.json');
    case 'zed':
      return path.join(appData, 'Zed', 'settings.json');
    case 'continue':
      return path.join(homeDir, '.continue', 'mcpServers', 'mcpmarket.json');
    case 'cline':
      return path.join(appData, 'Code', 'User', 'globalStorage', 'saoudrizwan.claude-dev', 'settings', 'cline_mcp_settings.json');
    case 'kilocode':
      return path.join(appData, 'Code', 'User', 'globalStorage', 'kilocode.kilo-code', 'settings', 'mcp_settings.json');
    default:
      return null;
  }
}

function detectInstalledIDEs() {
  const homeDir = os.homedir();
  const appData = process.env.APPDATA || path.join(homeDir, 'AppData', 'Roaming');
  const localAppData = process.env.LOCALAPPDATA || path.join(homeDir, 'AppData', 'Local');
  const programFiles = process.env.ProgramFiles || 'C:\\Program Files';
  const programFilesX86 = process.env['ProgramFiles(x86)'] || 'C:\\Program Files (x86)';

  const detected = [];

  if (
    fs.existsSync(path.join(homeDir, '.cursor')) ||
    fs.existsSync(path.join(localAppData, 'Programs', 'cursor', 'Cursor.exe')) ||
    fs.existsSync(path.join(programFiles, 'Cursor', 'Cursor.exe'))
  ) {
    detected.push('cursor');
  }

  if (
    fs.existsSync(path.join(appData, 'Code', 'User')) ||
    fs.existsSync(path.join(localAppData, 'Programs', 'Microsoft VS Code', 'Code.exe')) ||
    fs.existsSync(path.join(programFiles, 'Microsoft VS Code', 'Code.exe'))
  ) {
    detected.push('vscode');
  }

  if (
    fs.existsSync(path.join(homeDir, '.codeium', 'windsurf')) ||
    fs.existsSync(path.join(localAppData, 'Programs', 'windsurf', 'Windsurf.exe'))
  ) {
    detected.push('windsurf');
  }

  if (fs.existsSync(path.join(homeDir, '.claude.json')) || fs.existsSync(path.join(homeDir, '.claude'))) {
    detected.push('claudecode');
  } else {
    try {
      const { execSync } = require('child_process');
      execSync('where claude', { encoding: 'utf8', timeout: 2000, stdio: 'pipe' });
      detected.push('claudecode');
    } catch {}
  }

  if (
    fs.existsSync(path.join(appData, 'Zed')) ||
    fs.existsSync(path.join(localAppData, 'Zed', 'zed.exe'))
  ) {
    detected.push('zed');
  }

  if (
    fs.existsSync(path.join(homeDir, '.continue')) ||
    fs.existsSync(path.join(homeDir, '.continue', 'mcpServers')) ||
    fs.existsSync(path.join(appData, 'Code', 'User', 'globalStorage', 'continue.continue'))
  ) {
    detected.push('continue');
  }

  if (fs.existsSync(path.join(appData, 'Code', 'User', 'globalStorage', 'saoudrizwan.claude-dev'))) {
    detected.push('cline');
  }

  if (fs.existsSync(path.join(appData, 'Code', 'User', 'globalStorage', 'kilocode.kilo-code'))) {
    detected.push('kilocode');
  }

  return detected;
}

function isIDEInstalled(ide) {
  return detectInstalledIDEs().includes(ide);
}

ipcMain.handle('ide:detect', async () => {
  return detectInstalledIDEs();
});

ipcMain.handle('ide:isInstalled', async (event, ide) => {
  return isIDEInstalled(ide);
});

function expandEnvVars(str) {
  if (typeof str !== 'string') return str;
  return str.replace(/%([^%]+)%/g, (match, varName) => {
    return process.env[varName] || os.homedir() || match;
  });
}

function resolveWindowsCommand(cmd) {
  try {
    const { execSync } = require('child_process');
    const result = execSync(`where ${cmd}`, { encoding: 'utf8', timeout: 3000 }).trim();
    const lines = result.split('\n').map(l => l.trim()).filter(Boolean);
    const preferred = lines.find(l => l.endsWith('.cmd') || l.endsWith('.exe')) || lines[0];
    return preferred || cmd;
  } catch {
    return cmd;
  }
}

function buildMcpServersObject(servers) {
  const mcpServers = {};
  const RESOLVE_COMMANDS = ['npx', 'node', 'python', 'python3', 'pip', 'pip3', 'go', 'uvx', 'uv'];

  servers.forEach(server => {
    if (!server.command) return;

    let command = expandEnvVars(server.command);
    const args = (server.args || []).map(expandEnvVars);

    if (RESOLVE_COMMANDS.includes(command.toLowerCase())) {
      const resolved = resolveWindowsCommand(command);
      if (resolved && resolved !== command) {
        command = resolved;
      }
    }

    mcpServers[server.id] = {
      command,
      args,
      env: server.envVars || {}
    };
  });

  return mcpServers;
}

function mergeIDEConfig(ide, existingConfig, servers) {
  const mcpServers = buildMcpServersObject(servers);

  switch (ide) {
    case 'cursor':
      return {
        ...existingConfig,
        mcpServers: { ...(existingConfig.mcpServers || {}), ...mcpServers }
      };

    case 'vscode':
      return {
        ...existingConfig,
        servers: { ...(existingConfig.servers || {}), ...mcpServers }
      };

    case 'windsurf':
      return {
        ...existingConfig,
        mcpServers: { ...(existingConfig.mcpServers || {}), ...mcpServers }
      };

    case 'claudecode': {
      const normalized = {};
      Object.entries(mcpServers).forEach(([id, entry]) => {
        if (String(entry.command || '').toLowerCase() === 'npx') {
          normalized[id] = {
            command: 'cmd',
            args: ['/c', 'npx', ...(entry.args || [])],
            env: entry.env || {}
          };
        } else {
          normalized[id] = entry;
        }
      });
      return {
        ...existingConfig,
        mcpServers: { ...(existingConfig.mcpServers || {}), ...normalized }
      };
    }

    case 'zed': {
      const zedServers = {};
      const RESOLVE_COMMANDS = ['npx', 'node', 'python', 'python3', 'pip', 'pip3', 'go', 'uvx', 'uv'];
      servers.forEach(server => {
        if (!server.command) return;
        let cmd = expandEnvVars(server.command);
        if (RESOLVE_COMMANDS.includes(cmd.toLowerCase())) {
          const resolved = resolveWindowsCommand(cmd);
          if (resolved && resolved !== cmd) cmd = resolved;
        }
        zedServers[server.id] = {
          command: {
            path: cmd,
            args: (server.args || []).map(expandEnvVars)
          },
          env: server.envVars || {}
        };
      });
      return {
        ...existingConfig,
        context_servers: {
          ...(existingConfig.context_servers || {}),
          ...zedServers
        }
      };
    }

    case 'continue': {
      const existingAsObject =
        existingConfig.mcpServers && !Array.isArray(existingConfig.mcpServers)
          ? existingConfig.mcpServers
          : {};
      const existingFromArray = Array.isArray(existingConfig.mcpServers)
        ? existingConfig.mcpServers.reduce((acc, item) => {
            if (item && item.name) {
              acc[item.name] = {
                command: item.command,
                args: item.args || [],
                env: item.env || {}
              };
            }
            return acc;
          }, {})
        : {};
      return { ...existingConfig, mcpServers: { ...existingFromArray, ...existingAsObject, ...mcpServers } };
    }

    case 'cline':
      return {
        ...existingConfig,
        mcpServers: { ...(existingConfig.mcpServers || {}), ...mcpServers }
      };

    case 'kilocode':
      return {
        ...existingConfig,
        mcpServers: { ...(existingConfig.mcpServers || {}), ...mcpServers }
      };

    default:
      return { ...existingConfig, mcpServers: { ...(existingConfig.mcpServers || {}), ...mcpServers } };
  }
}

ipcMain.handle('config:generate', async (event, ide, servers) => {
  try {
    const configPath = getIDEConfigPath(ide);
    if (!configPath) {
      return { success: false, error: `Unknown IDE: ${ide}` };
    }
    if (!isIDEInstalled(ide)) {
      return { success: false, error: `IDE not installed: ${ide}` };
    }

    const dir = path.dirname(configPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    let existingConfig = {};
    if (fs.existsSync(configPath)) {
      try {
        existingConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      } catch (e) {
        existingConfig = {};
      }
    }

    const mergedConfig = mergeIDEConfig(ide, existingConfig, servers);
    fs.writeFileSync(configPath, JSON.stringify(mergedConfig, null, 2), 'utf8');

    return { success: true, path: configPath };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('config:getPath', async (event, ide) => {
  return getIDEConfigPath(ide);
});

ipcMain.handle('config:open', async (event, ide) => {
  const configPath = getIDEConfigPath(ide);
  if (configPath && fs.existsSync(configPath)) {
    shell.openPath(configPath);
    return { success: true };
  }
  return { success: false, error: 'Config file not found' };
});

ipcMain.handle('config:read', async (event, ide) => {
  const configPath = getIDEConfigPath(ide);
  if (!configPath) return { success: false, error: 'Unknown IDE' };
  if (!fs.existsSync(configPath)) return { success: false, error: 'File not found', path: configPath };
  try {
    const content = fs.readFileSync(configPath, 'utf8');
    return { success: true, path: configPath, content: JSON.parse(content) };
  } catch (e) {
    return { success: false, error: e.message, path: configPath };
  }
});

ipcMain.handle('config:preview', async (event, servers) => {
  return buildMcpServersObject(servers);
});

ipcMain.handle('config:removeServer', async (event, serverId) => {
  const results = {};
  const allIDEs = ['cursor', 'vscode', 'windsurf', 'claudecode', 'zed', 'continue', 'cline', 'kilocode'];

  for (const ide of allIDEs) {
    const configPath = getIDEConfigPath(ide);
    if (!configPath || !fs.existsSync(configPath)) {
      results[ide] = { skipped: true };
      continue;
    }

    try {
      let config = {};
      try {
        config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      } catch (e) {
        results[ide] = { skipped: true };
        continue;
      }

      let modified = false;

      if (ide === 'vscode') {
        if (config.servers && config.servers[serverId]) {
          delete config.servers[serverId];
          modified = true;
        }
        if (config.mcp && config.mcp.servers && config.mcp.servers[serverId]) {
          delete config.mcp.servers[serverId];
          modified = true;
        }
      } else if (ide === 'zed') {
        if (config.context_servers && config.context_servers[serverId]) {
          delete config.context_servers[serverId];
          modified = true;
        }
      } else if (ide === 'continue') {
        if (Array.isArray(config.mcpServers)) {
          const before = config.mcpServers.length;
          config.mcpServers = config.mcpServers.filter(s => s.name !== serverId);
          modified = config.mcpServers.length !== before;
        } else if (config.mcpServers && config.mcpServers[serverId]) {
          delete config.mcpServers[serverId];
          modified = true;
        }
      } else {
        if (config.mcpServers && config.mcpServers[serverId]) {
          delete config.mcpServers[serverId];
          modified = true;
        }
      }

      if (modified) {
        fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf8');
        results[ide] = { success: true, removed: true };
      } else {
        results[ide] = { success: true, removed: false };
      }
    } catch (err) {
      results[ide] = { success: false, error: err.message };
    }
  }

  return { success: true, results };
});

ipcMain.handle('shell:openExternal', async (event, url) => {
  shell.openExternal(url);
  return true;
});

ipcMain.handle('shell:openPath', async (event, filePath) => {
  shell.openPath(filePath);
  return true;
});

ipcMain.handle('app:getVersion', async () => {
  return app.getVersion();
});

ipcMain.handle('config:export', async (event, servers) => {
  const result = await dialog.showSaveDialog(mainWindow, {
    title: 'Export MCP Configuration',
    defaultPath: 'mcp-config.json',
    filters: [{ name: 'JSON', extensions: ['json'] }]
  });

  if (!result.canceled && result.filePath) {
    const config = {
      mcpServers: buildMcpServersObject(servers)
    };
    fs.writeFileSync(result.filePath, JSON.stringify(config, null, 2));
    return { success: true, path: result.filePath };
  }

  return { success: false, canceled: true };
});
