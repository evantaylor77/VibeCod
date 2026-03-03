'use client';

import { motion } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  Brain,
  Key,
  Settings,
  CheckCircle,
  ExternalLink,
  Sparkles,
  Zap,
  MessageSquare,
} from 'lucide-react';

const AI_PROVIDERS = [
  {
    id: 'openai',
    name: 'OpenAI',
    description: 'GPT-4, GPT-3.5, and DALL-E models',
    models: ['gpt-4', 'gpt-4-turbo', 'gpt-3.5-turbo', 'dall-e-3'],
    docsUrl: 'https://platform.openai.com',
  },
  {
    id: 'anthropic',
    name: 'Anthropic',
    description: 'Claude 3 models with advanced reasoning',
    models: ['claude-3-opus', 'claude-3-sonnet', 'claude-3-haiku'],
    docsUrl: 'https://anthropic.com',
  },
  {
    id: 'google',
    name: 'Google',
    description: 'Gemini models with multimodal capabilities',
    models: ['gemini-pro', 'gemini-pro-vision'],
    docsUrl: 'https://ai.google.dev',
  },
  {
    id: 'ollama',
    name: 'Ollama',
    description: 'Run open-source models locally',
    models: ['llama2', 'codellama', 'mistral'],
    docsUrl: 'https://ollama.ai',
  },
];

export function AIPage() {
  const { aiConfig, setAIConfig } = useAppStore();

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">AI Models</h1>
        <p className="text-muted-foreground">Configure AI providers for vibe coding</p>
      </div>

      {/* Current Configuration */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
            <Brain className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">AI Configuration</h2>
            <p className="text-sm text-muted-foreground">
              {aiConfig ? `Configured with ${aiConfig.provider}` : 'No AI provider configured'}
            </p>
          </div>
        </div>

        {aiConfig ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Provider: <span className="font-medium capitalize">{aiConfig.provider}</span></span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>Model: <span className="font-medium">{aiConfig.model}</span></span>
            </div>
            <Button variant="outline" onClick={() => setAIConfig({ provider: 'openai', model: 'gpt-4', temperature: 0.7, maxTokens: 2000 })}>
              <Settings className="mr-2 h-4 w-4" />
              Update Configuration
            </Button>
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-muted-foreground mb-4">
              Configure an AI provider to enable AI-powered features
            </p>
            <Button onClick={() => setAIConfig({ provider: 'openai', model: 'gpt-4', temperature: 0.7, maxTokens: 2000 })}>
              <Zap className="mr-2 h-4 w-4" />
              Quick Setup with OpenAI
            </Button>
          </div>
        )}
      </div>

      {/* Providers Grid */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Available Providers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {AI_PROVIDERS.map((provider) => (
            <motion.div
              key={provider.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-5 hover-lift"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-foreground">{provider.name}</h3>
                  <p className="text-sm text-muted-foreground">{provider.description}</p>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary">
                  <Brain className="h-4 w-4" />
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {provider.models.map((model) => (
                  <span key={model} className="tag tag-gold text-[10px]">
                    {model}
                  </span>
                ))}
              </div>

              <div className="flex gap-2">
                <Button
                  variant={aiConfig?.provider === provider.id ? 'default' : 'outline'}
                  size="sm"
                  className="flex-1"
                  onClick={() => setAIConfig({
                    provider: provider.id as any,
                    model: provider.models[0],
                    temperature: 0.7,
                    maxTokens: 2000
                  })}
                >
                  {aiConfig?.provider === provider.id ? (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Active
                    </>
                  ) : (
                    <>
                      <Key className="mr-2 h-4 w-4" />
                      Configure
                    </>
                  )}
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a href={provider.docsUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4">AI-Powered Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <MessageSquare className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h4 className="font-medium text-sm">Smart Code Generation</h4>
              <p className="text-xs text-muted-foreground">Generate code with context awareness</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10">
              <Sparkles className="h-4 w-4 text-blue-500" />
            </div>
            <div>
              <h4 className="font-medium text-sm">Code Review</h4>
              <p className="text-xs text-muted-foreground">AI-powered code suggestions</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500/10">
              <Zap className="h-4 w-4 text-green-500" />
            </div>
            <div>
              <h4 className="font-medium text-sm">Auto Documentation</h4>
              <p className="text-xs text-muted-foreground">Generate docs automatically</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
