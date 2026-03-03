'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { cn, formatRelativeTime } from '@/lib/utils';
import {
  Code2,
  Plus,
  Search,
  Copy,
  Trash2,
  Edit3,
  CheckCircle,
} from 'lucide-react';
import { toast } from 'sonner';

const LANGUAGES = ['TypeScript', 'JavaScript', 'Python', 'Go', 'Rust', 'SQL', 'JSON', 'YAML', 'CSS', 'HTML'];

export function SnippetsPage() {
  const { snippets, addSnippet, removeSnippet } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredSnippets = snippets.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.language.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCopy = async (code: string, id: string) => {
    await navigator.clipboard.writeText(code);
    setCopiedId(id);
    toast.success('Copied to clipboard');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleAddSample = () => {
    addSnippet({
      name: 'Sample Snippet',
      description: 'A sample code snippet',
      code: "function greet(name: string) {\n  return 'Hello, ' + name + '!';\n}",
      language: 'TypeScript',
      tags: ['utility', 'sample'],
    });
    toast.success('Sample snippet added');
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Code Snippets</h1>
          <p className="text-muted-foreground">Manage your reusable code snippets</p>
        </div>
        <Button onClick={handleAddSample}>
          <Plus className="mr-2 h-4 w-4" />
          New Snippet
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search snippets..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Language Filters */}
      <div className="flex flex-wrap gap-2">
        {LANGUAGES.map((lang) => (
          <button
            key={lang}
            onClick={() => setSearchQuery(lang)}
            className="tag tag-gold hover:bg-primary/30 transition-colors"
          >
            {lang}
          </button>
        ))}
      </div>

      {/* Snippets Grid */}
      {filteredSnippets.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {filteredSnippets.map((snippet) => (
            <motion.div
              key={snippet.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border/50">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Code2 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{snippet.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {snippet.language} · {formatRelativeTime(snippet.updatedAt)}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopy(snippet.code, snippet.id)}
                  >
                    {copiedId === snippet.id ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Edit3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive"
                    onClick={() => removeSnippet(snippet.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Code */}
              <div className="p-4 bg-secondary/30">
                <pre className="text-sm font-mono text-foreground overflow-x-auto">
                  <code>{snippet.code}</code>
                </pre>
              </div>

              {/* Footer */}
              {snippet.description && (
                <div className="px-4 py-2 border-t border-border/50">
                  <p className="text-sm text-muted-foreground">{snippet.description}</p>
                </div>
              )}

              {/* Tags */}
              {snippet.tags.length > 0 && (
                <div className="px-4 pb-4 pt-2 flex flex-wrap gap-1">
                  {snippet.tags.map((tag) => (
                    <span key={tag} className="tag tag-gold text-[10px]">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="glass-card p-12 text-center">
          <Code2 className="mx-auto h-16 w-16 text-muted-foreground/30 mb-4" />
          <h3 className="text-lg font-medium mb-2">No snippets yet</h3>
          <p className="text-muted-foreground mb-6">
            {searchQuery ? 'No snippets match your search' : 'Create your first code snippet'}
          </p>
          {!searchQuery && (
            <Button onClick={handleAddSample}>
              <Plus className="mr-2 h-4 w-4" />
              Add Sample Snippet
            </Button>
          )}
        </div>
      )}
    </div>
  );
}