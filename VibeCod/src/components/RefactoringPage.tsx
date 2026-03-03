'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { cn } from '@/lib/utils';
import {
  Wand2,
  FileCode,
  Copy,
  Check,
  Sparkles,
  RefreshCw,
  Trash2,
  Plus,
} from 'lucide-react';
import { toast } from 'sonner';

interface RefactoringTask {
  id: string;
  name: string;
  description: string;
  prompt: string;
  icon: string;
}

const defaultTasks: RefactoringTask[] = [
  {
    id: 'clean-code',
    name: 'Clean Code',
    description: 'Kodu daha okunabilir ve bakımı kolay hale getir',
    prompt: 'Bu kodu clean code prensiplerine göre refactor et: anlamlı isimler kullan, fonksiyonları kısa tut, tek sorumluluk prensibine uy.',
    icon: 'sparkles',
  },
  {
    id: 'optimize',
    name: 'Optimize Performance',
    description: 'Performansı artır, gereksiz işlemleri kaldır',
    prompt: 'Bu kodun performansını optimize et: gereksiz döngüleri kaldır, memoization kullan, verimli algoritmalar kullan.',
    icon: 'zap',
  },
  {
    id: 'typescript',
    name: 'Add TypeScript Types',
    description: 'Tip güvenliğini artır, any tiplerini kaldır',
    prompt: 'Bu koda düzgün TypeScript tipleri ekle: any kullanma, interface ve type tanımlamaları yap, generics kullan where appropriate.',
    icon: 'file-code',
  },
  {
    id: 'error-handling',
    name: 'Improve Error Handling',
    description: 'Hata yönetimini güçlendir',
    prompt: 'Bu kodun error handling\'ini iyileştir: try-catch blokları ekle, özel hata sınıfları kullan, kullanıcı dostu hata mesajları göster.',
    icon: 'shield',
  },
  {
    id: 'modernize',
    name: 'Modernize Syntax',
    description: 'Modern JavaScript/TypeScript özelliklerini kullan',
    prompt: 'Bu kodu modern JavaScript/TypeScript syntax\'ine güncelle: optional chaining, nullish coalescing, arrow functions, destructuring kullan.',
    icon: 'refresh-cw',
  },
];

export function RefactoringPage() {
  const [selectedTask, setSelectedTask] = useState<RefactoringTask | null>(null);
  const [inputCode, setInputCode] = useState('');
  const [outputCode, setOutputCode] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleProcess = async () => {
    if (!selectedTask || !inputCode.trim()) {
      toast.error('Lütfen bir görev seçin ve kod yapıştırın');
      return;
    }

    setIsProcessing(true);
    setOutputCode('');

    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock output - in real app this would come from AI
    const mockOutput = `// Refactored by VibeCod AI
// Task: ${selectedTask.name}

${inputCode
  .split('\n')
  .map(line => line.trim())
  .filter(line => line.length > 0)
  .join('\n')}

// TODO: Implement actual AI integration
// This is a placeholder output`;

    setOutputCode(mockOutput);
    setIsProcessing(false);
    toast.success('Refactoring tamamlandı!');
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(outputCode);
    setCopied(true);
    toast.success('Kopyalandı!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInputCode('');
    setOutputCode('');
    setSelectedTask(null);
    toast.info('Temizlendi');
  };

  return (
    <div className="p-8 space-y-6 h-full overflow-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Wand2 className="h-6 w-6 text-primary" />
            AI Refactoring
          </h1>
          <p className="text-muted-foreground">
            Kodunu AI ile otomatik olarak iyileştir ve refactor et
          </p>
        </div>
        <Button variant="outline" onClick={handleClear} size="sm">
          <Trash2 className="h-4 w-4 mr-2" />
          Temizle
        </Button>
      </motion.div>

      {/* Task Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {defaultTasks.map((task) => (
          <button
            key={task.id}
            onClick={() => setSelectedTask(task)}
            className={cn(
              'p-4 rounded-xl border text-left transition-all',
              selectedTask?.id === task.id
                ? 'border-primary bg-primary/10'
                : 'border-border hover:border-primary/50 hover:bg-card'
            )}
          >
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">{task.name}</h3>
                <p className="text-sm text-muted-foreground">{task.description}</p>
              </div>
            </div>
          </button>
        ))}
      </motion.div>

      {/* Code Input/Output */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-3"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-medium flex items-center gap-2">
              <FileCode className="h-4 w-4" />
              Orijinal Kod
            </h3>
            <span className="text-xs text-muted-foreground">
              {inputCode.length} karakter
            </span>
          </div>
          <textarea
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            placeholder="// Buraya refactor edilecek kodunu yapıştır..."
            className="w-full h-64 p-4 rounded-xl bg-card border border-border font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
            spellCheck={false}
          />
        </motion.div>

        {/* Output */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-3"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-medium flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              Refactored Kod
            </h3>
            {outputCode && (
              <Button variant="ghost" size="sm" onClick={handleCopy}>
                {copied ? (
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4 mr-2" />
                )}
                Kopyala
              </Button>
            )}
          </div>
          <div className="relative">
            <textarea
              value={outputCode}
              readOnly
              placeholder="// Refactored kod burada görünecek..."
              className="w-full h-64 p-4 rounded-xl bg-card border border-border font-mono text-sm resize-none focus:outline-none"
              spellCheck={false}
            />
            {isProcessing && (
              <div className="absolute inset-0 flex items-center justify-center bg-card/80 rounded-xl">
                <div className="flex items-center gap-2 text-primary">
                  <RefreshCw className="h-5 w-5 animate-spin" />
                  <span>AI işleniyor...</span>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Process Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex justify-center"
      >
        <Button
          size="lg"
          onClick={handleProcess}
          disabled={!selectedTask || !inputCode.trim() || isProcessing}
          className="min-w-[200px]"
        >
          {isProcessing ? (
            <>
              <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
              İşleniyor...
            </>
          ) : (
            <>
              <Wand2 className="h-5 w-5 mr-2" />
              Refactor Et
            </>
          )}
        </Button>
      </motion.div>

      {/* Selected Task Info */}
      {selectedTask && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="p-4 rounded-xl bg-primary/5 border border-primary/20"
        >
          <h4 className="font-medium text-primary mb-1">Seçili Görev: {selectedTask.name}</h4>
          <p className="text-sm text-muted-foreground">{selectedTask.prompt}</p>
        </motion.div>
      )}
    </div>
  );
}
