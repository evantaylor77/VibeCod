import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
  MCPServer,
  InstalledServer,
  IDEType,
  InstallProgress,
  ServerTag,
  Project,
  CodeSnippet,
  AppTab,
  AIModel,
  AIConfig
} from '@/types';
import { mcpServers } from '@/data/servers';

interface AppStore {
  // Data
  servers: MCPServer[];
  installedServers: Record<string, InstalledServer>;
  projects: Project[];
  snippets: CodeSnippet[];

  // UI State
  activeTab: AppTab;
  sidebarCollapsed: boolean;
  searchQuery: string;
  selectedTags: ServerTag[];
  installProgress: Record<string, InstallProgress>;
  selectedIDEs: IDEType[];
  detectedIDEs: IDEType[];

  // AI State
  aiConfig: AIConfig | null;
  availableModels: AIModel[];
  selectedModel: string | null;

  // Actions
  setActiveTab: (tab: AppTab) => void;
  toggleSidebar: () => void;
  setSearchQuery: (query: string) => void;
  toggleTag: (tag: ServerTag) => void;
  clearFilters: () => void;

  // Server Management
  installServer: (server: MCPServer, envVars: Record<string, string>) => Promise<void>;
  uninstallServer: (serverId: string) => Promise<void>;
  setInstallProgress: (serverId: string, progress: InstallProgress) => void;
  clearInstallProgress: (serverId: string) => void;

  // IDE Management
  toggleIDE: (ide: IDEType) => void;
  setSelectedIDEs: (ides: IDEType[]) => void;
  detectInstalledIDEs: () => Promise<void>;

  // Project Management
  addProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'lastOpened'>) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  removeProject: (id: string) => void;
  setLastOpened: (id: string) => void;

  // Snippet Management
  addSnippet: (snippet: Omit<CodeSnippet, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateSnippet: (id: string, updates: Partial<CodeSnippet>) => void;
  removeSnippet: (id: string) => void;

  // AI Configuration
  setAIConfig: (config: AIConfig) => void;
  setSelectedModel: (modelId: string) => void;

  // Computed
  getFilteredServers: () => MCPServer[];
  getInstalledCount: () => number;
  getRecentProjects: (limit?: number) => Project[];
  getProjectById: (id: string) => Project | undefined;
}

const isElectron = typeof window !== 'undefined' && !!(window as any).electronAPI;

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      // Initial State
      servers: mcpServers,
      installedServers: {},
      projects: [],
      snippets: [],
      activeTab: 'dashboard',
      sidebarCollapsed: false,
      searchQuery: '',
      selectedTags: [],
      installProgress: {},
      selectedIDEs: ['cursor'],
      detectedIDEs: [],
      aiConfig: null,
      availableModels: [],
      selectedModel: null,

      // UI Actions
      setActiveTab: (tab) => set({ activeTab: tab }),
      
      toggleSidebar: () => set((state) => ({
        sidebarCollapsed: !state.sidebarCollapsed 
      })),

      setSearchQuery: (query) => set({ searchQuery: query }),

      toggleTag: (tag) => set((state) => ({
        selectedTags: state.selectedTags.includes(tag)
          ? state.selectedTags.filter(t => t !== tag)
          : [...state.selectedTags, tag]
      })),

      clearFilters: () => set({ searchQuery: '', selectedTags: [] }),

      // Server Management
      installServer: async (server, envVars) => {
        const { setInstallProgress } = get();

        setInstallProgress(server.id, {
          serverName: server.name,
          output: 'Starting installation...\n',
          status: 'installing',
          progress: 2
        });

        try {
          if (isElectron) {
            const api = (window as any).electronAPI;

            let currentProgress = 2;
            const progressInterval = setInterval(() => {
              currentProgress = Math.min(currentProgress + 1.5, 88);
              set((state) => {
                const current = state.installProgress[server.id];
                if (current?.status !== 'installing') {
                  clearInterval(progressInterval);
                  return state;
                }
                return {
                  installProgress: {
                    ...state.installProgress,
                    [server.id]: { ...current, progress: currentProgress }
                  }
                };
              });
            }, 300);

            const cleanup = api.onInstallProgress((data: { serverName: string; output: string }) => {
              if (data.serverName === server.name) {
                set((state) => ({
                  installProgress: {
                    ...state.installProgress,
                    [server.id]: {
                      ...state.installProgress[server.id],
                      output: (state.installProgress[server.id]?.output || '') + data.output,
                    }
                  }
                }));
              }
            });

            let result;
            try {
              switch (server.installType) {
                case 'npm':
                  result = await api.installNpm(server.packageName, server.name, envVars);
                  break;
                case 'pip':
                  result = await api.installPip(server.packageName, server.name, envVars);
                  break;
                case 'go':
                  result = await api.installGo(server.packageName, server.name, envVars);
                  break;
                case 'uvx':
                  result = await api.installUvx(server.packageName, server.name, envVars);
                  break;
                default:
                  result = { success: true };
              }
            } catch (ipcError: any) {
              result = {
                success: false,
                error: ipcError?.error || ipcError?.message || String(ipcError)
              };
            }

            cleanup();
            clearInterval(progressInterval);

            if (result.success) {
              const installedServer: InstalledServer = {
                ...server,
                installed: true,
                installedAt: new Date().toISOString(),
                envVars
              };

              set((state) => ({
                installedServers: {
                  ...state.installedServers,
                  [server.id]: installedServer
                },
                installProgress: {
                  ...state.installProgress,
                  [server.id]: {
                    ...state.installProgress[server.id],
                    status: 'success',
                    progress: 100,
                    output: (state.installProgress[server.id]?.output || '') + '\n✓ Installation successful!'
                  }
                }
              }));
            } else {
              const errorMsg = result?.error || 'Installation failed';
              set((state) => ({
                installProgress: {
                  ...state.installProgress,
                  [server.id]: {
                    ...state.installProgress[server.id],
                    status: 'error',
                    output: (state.installProgress[server.id]?.output || '') + `\n✗ Error: ${errorMsg}`
                  }
                }
              }));
              return;
            }
          } else {
            await new Promise(resolve => setTimeout(resolve, 2000));

            const installedServer: InstalledServer = {
              ...server,
              installed: true,
              installedAt: new Date().toISOString(),
              envVars
            };

            set((state) => ({
              installedServers: {
                ...state.installedServers,
                [server.id]: installedServer
              },
              installProgress: {
                ...state.installProgress,
                [server.id]: {
                  serverName: server.name,
                  output: 'Mock installation complete!\n',
                  status: 'success',
                  progress: 100
                }
              }
            }));
          }
        } catch (error: any) {
          const errorMsg = error?.error || error?.message || String(error);
          set((state) => ({
            installProgress: {
              ...state.installProgress,
              [server.id]: {
                ...state.installProgress[server.id],
                status: 'error',
                output: (state.installProgress[server.id]?.output || '') + `\n✗ Error: ${errorMsg}`
              }
            }
          }));
        }
      },

      uninstallServer: async (serverId) => {
        if (isElectron) {
          try {
            await (window as any).electronAPI.removeServerFromConfigs(serverId);
          } catch (e) {
            console.warn('Failed to remove server from IDE configs:', e);
          }
        }
        set((state) => {
          const { [serverId]: removed, ...rest } = state.installedServers;
          return { installedServers: rest };
        });
      },

      setInstallProgress: (serverId, progress) => {
        set((state) => ({
          installProgress: { ...state.installProgress, [serverId]: progress }
        }));
      },

      clearInstallProgress: (serverId) => {
        set((state) => {
          const { [serverId]: removed, ...rest } = state.installProgress;
          return { installProgress: rest };
        });
      },

      // IDE Management
      toggleIDE: (ide) => {
        set((state) => ({
          selectedIDEs: state.selectedIDEs.includes(ide)
            ? state.selectedIDEs.filter(i => i !== ide)
            : [...state.selectedIDEs, ide]
        }));
      },

      setSelectedIDEs: (ides) => set({ selectedIDEs: ides }),

      detectInstalledIDEs: async () => {
        if (isElectron) {
          try {
            const detected = await (window as any).electronAPI.detectIDEs();
            set({ detectedIDEs: detected });
          } catch (e) {
            console.warn('Failed to detect IDEs:', e);
          }
        }
      },

      // Project Management
      addProject: (project) => {
        const newProject: Project = {
          ...project,
          id: Math.random().toString(36).substring(2, 15),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          lastOpened: new Date().toISOString()
        };
        set((state) => ({
          projects: [newProject, ...state.projects]
        }));
      },

      updateProject: (id, updates) => {
        set((state) => ({
          projects: state.projects.map(p =>
            p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p
          )
        }));
      },

      removeProject: (id) => {
        set((state) => ({
          projects: state.projects.filter(p => p.id !== id)
        }));
      },

      setLastOpened: (id) => {
        set((state) => ({
          projects: state.projects.map(p =>
            p.id === id ? { ...p, lastOpened: new Date().toISOString() } : p
          )
        }));
      },

      // Snippet Management
      addSnippet: (snippet) => {
        const newSnippet: CodeSnippet = {
          ...snippet,
          id: Math.random().toString(36).substring(2, 15),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        set((state) => ({
          snippets: [newSnippet, ...state.snippets]
        }));
      },

      updateSnippet: (id, updates) => {
        set((state) => ({
          snippets: state.snippets.map(s =>
            s.id === id ? { ...s, ...updates, updatedAt: new Date().toISOString() } : s
          )
        }));
      },

      removeSnippet: (id) => {
        set((state) => ({
          snippets: state.snippets.filter(s => s.id !== id)
        }));
      },

      // AI Configuration
      setAIConfig: (config) => set({ aiConfig: config }),
      setSelectedModel: (modelId) => set({ selectedModel: modelId }),

      // Computed
      getFilteredServers: () => {
        const { servers, searchQuery, selectedTags, installedServers } = get();

        return servers.filter(server => {
          const matchesSearch = !searchQuery ||
            server.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            server.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            server.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

          const matchesTags = selectedTags.length === 0 ||
            selectedTags.some(tag => server.tags.includes(tag));

          return matchesSearch && matchesTags;
        }).map(server => ({
          ...server,
          installed: !!installedServers[server.id]
        }));
      },

      getInstalledCount: () => {
        return Object.keys(get().installedServers).length;
      },

      getRecentProjects: (limit = 5) => {
        return get().projects
          .sort((a, b) => new Date(b.lastOpened).getTime() - new Date(a.lastOpened).getTime())
          .slice(0, limit);
      },

      getProjectById: (id) => {
        return get().projects.find(p => p.id === id);
      }
    }),
    {
      name: 'vibeforge-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        installedServers: state.installedServers,
        projects: state.projects,
        snippets: state.snippets,
        selectedIDEs: state.selectedIDEs,
        aiConfig: state.aiConfig,
        selectedModel: state.selectedModel,
        sidebarCollapsed: state.sidebarCollapsed
      })
    }
  )
);