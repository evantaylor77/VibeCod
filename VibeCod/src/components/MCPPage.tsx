'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { getTagColor, formatInstallCount } from '@/data/servers';
import { cn } from '@/lib/utils';
import {
  Server,
  Search,
  Download,
  CheckCircle,
  Trash2,
  RefreshCw,
  ExternalLink,
  Package,
  Filter,
  X,
} from 'lucide-react';

const ALL_TAGS = ['Node.js', 'Python', 'Go', 'AI', 'Database', 'Files', 'Web', 'DevTools', 'Productivity', 'Communication'];

export function MCPPage() {
  const {
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
  } = useAppStore();

  const [showFilters, setShowFilters] = useState(true);

  const filteredServers = getFilteredServers();
  const hasActiveFilters = searchQuery || selectedTags.length > 0;

  const handleInstall = async (server: any) => {
    await installServer(server, {});
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">MCP Servers</h1>
          <p className="text-muted-foreground">
            {Object.keys(installedServers).length} installed · {filteredServers.length} available
          </p>
        </div>
      </div>

      {/* Search & Filters */}
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
                onClick={() => toggleTag(tag as any)}
                className={cn(
                  'px-3 py-1.5 rounded-full text-xs font-medium transition-all',
                  selectedTags.includes(tag as any)
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

      {/* Results Count */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          Showing {filteredServers.length} server{filteredServers.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Servers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredServers.map((server) => {
          const isInstalled = !!installedServers[server.id];
          const progress = installProgress[server.id];
          const isInstalling = progress?.status === 'installing';

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
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-lg text-lg',
                    isInstalled ? 'bg-green-500/20' : 'bg-primary/10'
                  )}>
                    {server.installType === 'npm' ? '⬡' :
                     server.installType === 'pip' ? '🐍' :
                     server.installType === 'go' ? '🐹' :
                     server.installType === 'uvx' ? '⚡' : '📦'}
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

              {/* Description */}
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                {server.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-4">
                <span className="tag tag-gold text-[10px]">{server.installType}</span>
                {server.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className={cn('tag text-[10px]', getTagColor(tag))}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                <span>{formatInstallCount(server.installCount)} installs</span>
                {server.version && <span>v{server.version}</span>}
              </div>

              {/* Actions */}
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

              {/* Progress */}
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
