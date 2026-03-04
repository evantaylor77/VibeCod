'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { getTagColor, formatInstallCount } from '@/data/servers';
import { mcpStarterPacks } from '@/data/mcpStarterPacks';
import { MCPServer, ServerTag } from '@/types';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import {
  Search,
  Download,
  CheckCircle,
  Trash2,
  RefreshCw,
  ExternalLink,
  Filter,
  X,
  Rocket,
  Layers,
  AlertTriangle,
  PlugZap,
} from 'lucide-react';

const ALL_TAGS = ['Node.js', 'Python', 'Go', 'AI', 'Database', 'Files', 'Web', 'DevTools', 'Productivity', 'Communication'];

type InstallType = 'npm' | 'pip' | 'go' | 'uvx' | 'manual';

const installTypeLabel: Record<InstallType, string> = {
  npm: 'NPM',
  pip: 'PIP',
  go: 'GO',
  uvx: 'UVX',
  manual: 'MANUAL',
};

export function MCPPage() {
  const {
    servers,
    getFilteredServers,
    installedServers,
    searchQuery,
    selectedTags,
    setSearchQuery,
    toggleTag,
    clearFilters,
    installServer,
    uninstallServer,
    installProgress,
    selectedIDEs,
  } = useAppStore();

  const [showFilters, setShowFilters] = useState(true);
  const [installingPackId, setInstallingPackId] = useState<string | null>(null);
  const [syncingConfigs, setSyncingConfigs] = useState(false);

  const filteredServers = getFilteredServers();
  const hasActiveFilters = searchQuery || selectedTags.length > 0;

  const installedCount = useMemo(
    () => Object.keys(installedServers).length,
    [installedServers]
  );

  const handleInstall = async (server: MCPServer) => {
    await installServer(server, {});
  };

  const syncInstalledServersToIDEs = async () => {
    if (typeof window === 'undefined' || !(window as Window & { electronAPI?: any }).electronAPI) {
      toast.info('Config sync works in desktop app mode.');
      return;
    }

    if (selectedIDEs.length === 0) {
      toast.info('No IDE selected for config sync.');
      return;
    }

    const api = (window as Window & { electronAPI?: any }).electronAPI!;
    const currentServers = Object.values(useAppStore.getState().installedServers);

    setSyncingConfigs(true);

    const results = await Promise.all(
      selectedIDEs.map((ide) => api.generateConfig(ide, currentServers))
    );

    const failed = results.filter((result: { success: boolean }) => !result.success);
    if (failed.length > 0) {
      toast.error(`${failed.length} IDE config could not be generated.`);
    } else {
      toast.success(`Configs synced for ${selectedIDEs.length} IDE(s).`);
    }

    setSyncingConfigs(false);
  };

  const installPack = async (packId: string) => {
    const pack = mcpStarterPacks.find((item) => item.id === packId);
    if (!pack) {
      return;
    }

    setInstallingPackId(packId);

    const packServers = pack.serverIds
      .map((id) => servers.find((server) => server.id === id))
      .filter(Boolean) as MCPServer[];

    const skippedMissingEnv: string[] = [];
    let installedNow = 0;

    for (const server of packServers) {
      if (installedServers[server.id]) {
        continue;
      }

      const requiresEnv = (server.requiredEnvVars || []).some((envVar: { required: boolean }) => envVar.required);
      if (requiresEnv) {
        skippedMissingEnv.push(server.name);
        continue;
      }

      await installServer(server, {});
      const stateNow = useAppStore.getState();
      if (stateNow.installedServers[server.id]) {
        installedNow += 1;
      }
    }

    if (installedNow > 0) {
      toast.success(`${installedNow} server installed from ${pack.name}.`);
    }

    if (skippedMissingEnv.length > 0) {
      toast.warning(
        `Skipped ${skippedMissingEnv.length} server(s) requiring API keys: ${skippedMissingEnv.join(', ')}`
      );
    }

    await syncInstalledServersToIDEs();
    setInstallingPackId(null);
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">MCP Servers</h1>
          <p className="text-muted-foreground">
            {installedCount} installed · {filteredServers.length} available
          </p>
        </div>
        <Button variant="outline" onClick={syncInstalledServersToIDEs} disabled={syncingConfigs}>
          {syncingConfigs ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <PlugZap className="mr-2 h-4 w-4" />}
          Sync IDE Configs
        </Button>
      </div>

      <div className="glass-card p-5 space-y-4">
        <div className="flex items-center gap-2">
          <Rocket className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">One-Click MCP Starter Packs</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          Install curated bundles in one click. Servers that require secrets are skipped and reported.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {mcpStarterPacks.map((pack) => {
            const selected = installingPackId === pack.id;
            const installedInPack = pack.serverIds.filter((id) => installedServers[id]).length;

            return (
              <div key={pack.id} className="rounded-xl border border-border/60 bg-card/60 p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-medium text-foreground">{pack.name}</p>
                    <p className="text-sm text-muted-foreground mt-1">{pack.description}</p>
                  </div>
                  <Layers className="h-4 w-4 text-primary mt-1" />
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xs text-muted-foreground">
                    {installedInPack}/{pack.serverIds.length} installed
                  </span>
                  <Button size="sm" onClick={() => installPack(pack.id)} disabled={selected}>
                    {selected ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
                    {selected ? 'Installing' : 'Install Pack'}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search servers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant={showFilters ? 'default' : 'outline'}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="mr-2 h-4 w-4" />
            Filters
            {selectedTags.length > 0 && (
              <span className="ml-2 px-1.5 py-0.5 text-xs bg-primary-foreground text-primary rounded-full">
                {selectedTags.length}
              </span>
            )}
          </Button>
        </div>

        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="flex flex-wrap gap-2"
          >
            {ALL_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag as ServerTag)}
                className={cn(
                  'px-3 py-1.5 rounded-full text-xs font-medium transition-all',
                  selectedTags.includes(tag as ServerTag)
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                )}
              >
                {tag}
              </button>
            ))}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="px-3 py-1.5 rounded-full text-xs font-medium text-destructive hover:bg-destructive/10"
              >
                <X className="inline h-3 w-3 mr-1" />
                Clear
              </button>
            )}
          </motion.div>
        )}
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          Showing {filteredServers.length} server{filteredServers.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredServers.map((server) => {
          const isInstalled = !!installedServers[server.id];
          const progress = installProgress[server.id];
          const isInstalling = progress?.status === 'installing';
          const hasRequiredSecrets = (server.requiredEnvVars || []).some((envVar) => envVar.required);

          return (
            <motion.div
              key={server.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={cn(
                'glass-card p-5 transition-all',
                isInstalled && 'border-green-500/30 bg-green-500/5'
              )}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-lg text-xs font-bold',
                    isInstalled ? 'bg-green-500/20 text-green-400' : 'bg-primary/10 text-primary'
                  )}>
                    {installTypeLabel[server.installType as InstallType]}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{server.name}</h3>
                    {server.author && (
                      <p className="text-xs text-muted-foreground">by {server.author}</p>
                    )}
                  </div>
                </div>
                {isInstalled && (
                  <span className="flex items-center gap-1 text-xs text-green-500">
                    <CheckCircle className="h-3 w-3" />
                    Installed
                  </span>
                )}
              </div>

              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                {server.description}
              </p>

              <div className="flex flex-wrap gap-1 mb-3">
                <span className="tag tag-gold text-[10px]">{server.installType}</span>
                {server.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className={cn('tag text-[10px]', getTagColor(tag))}>
                    {tag}
                  </span>
                ))}
              </div>

              {hasRequiredSecrets && (
                <div className="mb-3 rounded-md border border-amber-400/30 bg-amber-400/10 px-2.5 py-2 text-xs text-amber-300 flex items-start gap-1.5">
                  <AlertTriangle className="h-3.5 w-3.5 mt-0.5" />
                  Requires secret environment variables before full use.
                </div>
              )}

              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                <span>{formatInstallCount(server.installCount)} installs</span>
                {server.version && <span>v{server.version}</span>}
              </div>

              <div className="flex gap-2">
                {isInstalled ? (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleInstall(server)}
                      disabled={isInstalling}
                    >
                      {isInstalling ? (
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <RefreshCw className="mr-2 h-4 w-4" />
                      )}
                      Reinstall
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => uninstallServer(server.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      size="sm"
                      className="flex-1"
                      onClick={() => handleInstall(server)}
                      disabled={isInstalling}
                    >
                      {isInstalling ? (
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Download className="mr-2 h-4 w-4" />
                      )}
                      {isInstalling ? 'Installing...' : 'Install'}
                    </Button>
                    {server.homepage && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={server.homepage} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </>
                )}
              </div>

              {isInstalling && progress && (
                <div className="mt-3">
                  <div className="h-1 w-full rounded-full bg-secondary overflow-hidden">
                    <motion.div
                      className="h-full bg-primary"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress.progress}%` }}
                    />
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
