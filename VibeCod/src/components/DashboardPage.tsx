'use client';

import { motion } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/Button';
import { cn, formatNumber, formatRelativeTime } from '@/lib/utils';
import {
  Zap,
  Server,
  FolderKanban,
  Code2,
  Brain,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Clock,
  Plus,
  ExternalLink,
} from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

const StatCard = ({ 
  icon: Icon, 
  label, 
  value, 
  trend, 
  color = 'primary',
  onClick 
}: { 
  icon: React.ElementType;
  label: string;
  value: string | number;
  trend?: string;
  color?: 'primary' | 'blue' | 'green' | 'purple';
  onClick?: () => void;
}) => {
  const colorClasses = {
    primary: 'from-primary/20 to-primary/5 text-primary',
    blue: 'from-blue-500/20 to-blue-500/5 text-blue-500',
    green: 'from-green-500/20 to-green-500/5 text-green-500',
    purple: 'from-purple-500/20 to-purple-500/5 text-purple-500',
  };

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        'glass-card p-6 cursor-pointer transition-all duration-300',
        onClick && 'hover:shadow-xl'
      )}
    >
      <div className="flex items-start justify-between">
        <div className={cn(
          'flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br',
          colorClasses[color]
        )}>
          <Icon className="h-6 w-6" />
        </div>
        {trend && (
          <div className="flex items-center gap-1 text-xs text-green-500">
            <TrendingUp className="h-3 w-3" />
            <span>{trend}</span>
          </div>
        )}
      </div>
      <div className="mt-4">
        <p className="text-3xl font-bold text-foreground">{value}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    </motion.div>
  );
};

const QuickAction = ({ 
  icon: Icon, 
  label, 
  description,
  onClick,
  color = 'primary'
}: { 
  icon: React.ElementType;
  label: string;
  description: string;
  onClick?: () => void;
  color?: 'primary' | 'blue' | 'green' | 'purple';
}) => {
  const colorClasses = {
    primary: 'group-hover:text-primary group-hover:bg-primary/10',
    blue: 'group-hover:text-blue-500 group-hover:bg-blue-500/10',
    green: 'group-hover:text-green-500 group-hover:bg-green-500/10',
    purple: 'group-hover:text-purple-500 group-hover:bg-purple-500/10',
  };

  return (
    <motion.button
      variants={itemVariants}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="group flex items-center gap-4 rounded-xl border border-border/50 bg-card/50 p-4 text-left transition-all hover:bg-card hover:shadow-lg"
    >
      <div className={cn(
        'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary transition-colors',
        colorClasses[color]
      )}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-foreground">{label}</h3>
        <p className="text-sm text-muted-foreground truncate">{description}</p>
      </div>
      <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
    </motion.button>
  );
};

const RecentProject = ({ project }: { project: any }) => (
  <motion.div
    variants={itemVariants}
    className="flex items-center gap-4 rounded-xl border border-border/50 bg-card/50 p-4 hover:bg-card transition-colors"
  >
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
      <FolderKanban className="h-5 w-5 text-primary" />
    </div>
    <div className="flex-1 min-w-0">
      <h4 className="font-medium text-foreground truncate">{project.name}</h4>
      <p className="text-xs text-muted-foreground">
        Opened {formatRelativeTime(project.lastOpened)}
      </p>
    </div>
    <div className="flex gap-1">
      {project.techStack.slice(0, 3).map((tech: string) => (
        <span key={tech} className="tag tag-gold">
          {tech}
        </span>
      ))}
    </div>
  </motion.div>
);

export function DashboardPage() {
  const { 
    setActiveTab, 
    getInstalledCount, 
    projects, 
    snippets,
    getRecentProjects 
  } = useAppStore();

  const recentProjects = getRecentProjects(3);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-8 space-y-8"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Welcome to VibeCod</h1>
            <p className="text-muted-foreground">
              Your ultimate vibe coding workspace
            </p>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Server}
          label="MCP Servers"
          value={getInstalledCount()}
          trend="+2 this week"
          color="primary"
          onClick={() => setActiveTab('mcp')}
        />
        <StatCard
          icon={FolderKanban}
          label="Projects"
          value={projects.length}
          trend="Active"
          color="blue"
          onClick={() => setActiveTab('projects')}
        />
        <StatCard
          icon={Code2}
          label="Code Snippets"
          value={snippets.length}
          color="green"
          onClick={() => setActiveTab('snippets')}
        />
        <StatCard
          icon={Brain}
          label="AI Models"
          value="8+"
          trend="Ready"
          color="purple"
          onClick={() => setActiveTab('ai')}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Quick Actions</h2>
          </div>
          <div className="space-y-3">
            <QuickAction
              icon={Plus}
              label="New Project"
              description="Start a new vibe coding project"
              onClick={() => setActiveTab('projects')}
              color="primary"
            />
            <QuickAction
              icon={Server}
              label="Install MCP Server"
              description="Add a new MCP server to your workspace"
              onClick={() => setActiveTab('mcp')}
              color="blue"
            />
            <QuickAction
              icon={Code2}
              label="Add Snippet"
              description="Save a code snippet for later use"
              onClick={() => setActiveTab('snippets')}
              color="green"
            />
            <QuickAction
              icon={Brain}
              label="Configure AI"
              description="Set up AI models and preferences"
              onClick={() => setActiveTab('ai')}
              color="purple"
            />
          </div>
        </motion.div>

        {/* Recent Projects */}
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Recent Projects</h2>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setActiveTab('projects')}
            >
              View All
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-3">
            {recentProjects.length > 0 ? (
              recentProjects.map((project) => (
                <RecentProject key={project.id} project={project} />
              ))
            ) : (
              <div className="glass-card p-8 text-center">
                <FolderKanban className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <p className="mt-4 text-muted-foreground">
                  No projects yet. Create your first project!
                </p>
                <Button 
                  className="mt-4" 
                  onClick={() => setActiveTab('projects')}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  New Project
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Tips & Getting Started */}
      <motion.div variants={itemVariants} className="glass-card p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
            <Zap className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold">Getting Started with VibeCod</h3>
            <p className="mt-1 text-muted-foreground">
              VibeCod helps you achieve 100x productivity with MCP servers, AI models, and project management.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={() => setActiveTab('mcp')}>
                <Server className="mr-2 h-4 w-4" />
                Browse MCP Servers
              </Button>
              <Button variant="outline" size="sm" onClick={() => setActiveTab('tools')}>
                <ExternalLink className="mr-2 h-4 w-4" />
                System Check
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
