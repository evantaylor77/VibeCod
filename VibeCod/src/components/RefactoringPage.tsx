'use client';

import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import {
  Wand2,
  FileCode,
  Copy,
  Check,
  RefreshCw,
  Trash2,
  Sparkles,
  Play,
  ListChecks,
} from 'lucide-react';
import { toast } from 'sonner';
import {
  allTransforms,
  executeRefactor,
  refactorPresets,
  RefactorTransformId,
} from '@/lib/refactorEngine';

const starterCode = `function fetchUser(id) {
  var cache = {}
  console.log('fetch user', id)
  if (id == null) {
    return Promise.resolve(null)
  }

  return api.get('/users/' + id).then((res) => {
    cache[id] = res.data
    return cache[id]
  })
}`;

export function RefactoringPage() {
  const [inputCode, setInputCode] = useState(starterCode);
  const [outputCode, setOutputCode] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedTransforms, setSelectedTransforms] = useState<RefactorTransformId[]>(
    refactorPresets[0].transformIds
  );
  const [changeLog, setChangeLog] = useState<string[]>([]);

  const selectedTransformCount = selectedTransforms.length;
  const canRun = selectedTransformCount > 0 && inputCode.trim().length > 0;

  const activePreset = useMemo(
    () => refactorPresets.find((preset) => {
      if (preset.transformIds.length !== selectedTransforms.length) {
        return false;
      }
      return preset.transformIds.every((item) => selectedTransforms.includes(item));
    }),
    [selectedTransforms]
  );

  const toggleTransform = (id: RefactorTransformId) => {
    setSelectedTransforms((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      return [...prev, id];
    });
  };

  const applyPreset = (transformIds: RefactorTransformId[]) => {
    setSelectedTransforms(transformIds);
    toast.success('Preset applied.');
  };

  const handleProcess = async () => {
    if (!canRun) {
      toast.error('Select at least one transform and paste code first.');
      return;
    }

    setIsProcessing(true);
    setOutputCode('');
    setChangeLog([]);

    await new Promise((resolve) => setTimeout(resolve, 500));

    const result = executeRefactor(inputCode, selectedTransforms);
    setOutputCode(result.code);
    setChangeLog(result.changeLog);
    setIsProcessing(false);

    toast.success(`${result.touchedTransforms.length} transform changed the code.`);
  };

  const handleCopy = async () => {
    if (!outputCode) {
      return;
    }

    await navigator.clipboard.writeText(outputCode);
    setCopied(true);
    toast.success('Refactored code copied.');
    setTimeout(() => setCopied(false), 1500);
  };

  const handleClear = () => {
    setInputCode('');
    setOutputCode('');
    setChangeLog([]);
    toast.info('Editor cleared.');
  };

  return (
    <div className="p-8 space-y-6 h-full overflow-auto">
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Wand2 className="h-6 w-6 text-primary" />
            Refactoring Workbench
          </h1>
          <p className="text-muted-foreground">
            One-click code cleanup with practical transforms for vibecoders.
          </p>
        </div>
        <Button variant="outline" onClick={handleClear} size="sm">
          <Trash2 className="h-4 w-4 mr-2" />
          Clear
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-3"
      >
        <h2 className="text-sm uppercase tracking-wide text-muted-foreground">One-Click Presets</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {refactorPresets.map((preset) => {
            const isActive = activePreset?.id === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => applyPreset(preset.transformIds)}
                className={cn(
                  'rounded-xl border p-4 text-left transition-all',
                  isActive
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/40 hover:bg-card'
                )}
              >
                <p className="font-medium text-foreground">{preset.name}</p>
                <p className="text-sm text-muted-foreground mt-1">{preset.description}</p>
                <p className="text-xs text-primary mt-3">{preset.transformIds.length} transforms</p>
              </button>
            );
          })}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-4 space-y-3"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-sm uppercase tracking-wide text-muted-foreground">Transforms</h2>
          <span className="text-xs text-primary">{selectedTransformCount} selected</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
          {allTransforms.map((transform) => {
            const checked = selectedTransforms.includes(transform.id);
            return (
              <button
                key={transform.id}
                onClick={() => toggleTransform(transform.id)}
                className={cn(
                  'rounded-lg border p-3 text-left transition-all',
                  checked ? 'border-primary bg-primary/10' : 'border-border hover:bg-card'
                )}
              >
                <p className="text-sm font-medium">{transform.label}</p>
                <p className="text-xs text-muted-foreground mt-1">{transform.description}</p>
              </button>
            );
          })}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-3"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-medium flex items-center gap-2">
              <FileCode className="h-4 w-4" />
              Input Code
            </h3>
            <span className="text-xs text-muted-foreground">{inputCode.length} chars</span>
          </div>
          <textarea
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            placeholder="Paste your code here..."
            className="w-full h-80 p-4 rounded-xl bg-card border border-border font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
            spellCheck={false}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-3"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-medium flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              Refactored Output
            </h3>
            {outputCode && (
              <Button variant="ghost" size="sm" onClick={handleCopy}>
                {copied ? (
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4 mr-2" />
                )}
                Copy
              </Button>
            )}
          </div>
          <div className="relative">
            <textarea
              value={outputCode}
              readOnly
              placeholder="Refactored code will appear here..."
              className="w-full h-80 p-4 rounded-xl bg-card border border-border font-mono text-sm resize-none focus:outline-none"
              spellCheck={false}
            />
            {isProcessing && (
              <div className="absolute inset-0 flex items-center justify-center bg-card/85 rounded-xl">
                <div className="flex items-center gap-2 text-primary">
                  <RefreshCw className="h-5 w-5 animate-spin" />
                  <span>Applying transforms...</span>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-center"
      >
        <Button
          size="lg"
          onClick={handleProcess}
          disabled={!canRun || isProcessing}
          className="min-w-[240px]"
        >
          {isProcessing ? (
            <>
              <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
              Running
            </>
          ) : (
            <>
              <Play className="h-5 w-5 mr-2" />
              Run One-Click Refactor
            </>
          )}
        </Button>
      </motion.div>

      {changeLog.length > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="glass-card p-4"
        >
          <h4 className="font-medium flex items-center gap-2">
            <ListChecks className="h-4 w-4 text-primary" />
            Change Summary
          </h4>
          <div className="mt-3 space-y-2 text-sm text-muted-foreground">
            {changeLog.map((item) => (
              <p key={item}>- {item}</p>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
