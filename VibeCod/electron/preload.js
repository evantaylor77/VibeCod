const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // Store operations
  storeGet: (key) => ipcRenderer.invoke('store:get', key),
  storeSet: (key, value) => ipcRenderer.invoke('store:set', key, value),
  storeDelete: (key) => ipcRenderer.invoke('store:delete', key),

  // File system operations
  selectFolder: () => ipcRenderer.invoke('fs:selectFolder'),
  readDirectory: (dirPath) => ipcRenderer.invoke('fs:readDirectory', dirPath),
  readFile: (filePath) => ipcRenderer.invoke('fs:readFile', filePath),
  writeFile: (filePath, content) => ipcRenderer.invoke('fs:writeFile', filePath, content),

  // Installation operations
  installNpm: (packageName, serverName, envVars) =>
    ipcRenderer.invoke('install:npm', packageName, serverName, envVars),
  installPip: (packageName, serverName, envVars) =>
    ipcRenderer.invoke('install:pip', packageName, serverName, envVars),
  installGo: (packageName, serverName, envVars) =>
    ipcRenderer.invoke('install:go', packageName, serverName, envVars),
  installUvx: (packageName, serverName, envVars) =>
    ipcRenderer.invoke('install:uvx', packageName, serverName, envVars),

  // Progress listener
  onInstallProgress: (callback) => {
    const listener = (event, data) => callback(data);
    ipcRenderer.on('install:progress', listener);
    return () => ipcRenderer.removeListener('install:progress', listener);
  },

  // Command checking
  checkCommand: (command) => ipcRenderer.invoke('check:command', command),

  // IDE operations
  detectIDEs: () => ipcRenderer.invoke('ide:detect'),
  isIDEInstalled: (ide) => ipcRenderer.invoke('ide:isInstalled', ide),
  generateConfig: (ide, servers) => ipcRenderer.invoke('config:generate', ide, servers),
  openConfig: (ide) => ipcRenderer.invoke('config:open', ide),
  readConfig: (ide) => ipcRenderer.invoke('config:read', ide),
  previewConfig: (servers) => ipcRenderer.invoke('config:preview', servers),
  removeServerFromConfigs: (serverId) => ipcRenderer.invoke('config:removeServer', serverId),
  exportConfig: (servers) => ipcRenderer.invoke('config:export', servers),
  getConfigPath: (ide) => ipcRenderer.invoke('config:getPath', ide),

  // Shell operations
  openExternal: (url) => ipcRenderer.invoke('shell:openExternal', url),
  openPath: (filePath) => ipcRenderer.invoke('shell:openPath', filePath),

  // App info
  getVersion: () => ipcRenderer.invoke('app:getVersion'),
});
