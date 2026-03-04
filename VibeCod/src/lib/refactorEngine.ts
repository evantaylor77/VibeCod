export type RefactorTransformId =
  | 'strict-equality'
  | 'var-to-const-let'
  | 'remove-debug-logs'
  | 'trim-trailing-spaces'
  | 'convert-function-to-arrow'
  | 'add-async-await-note';

export interface RefactorTransform {
  id: RefactorTransformId;
  label: string;
  description: string;
  apply: (code: string) => RefactorResult;
}

export interface RefactorResult {
  code: string;
  changed: boolean;
  summary: string;
}

const replaceWithCount = (source: string, pattern: RegExp, replacer: string | ((substring: string, ...args: any[]) => string)) => {
  let count = 0;
  const next = source.replace(pattern, (...args) => {
    count += 1;
    if (typeof replacer === 'function') {
      return replacer(...args);
    }
    return replacer;
  });
  return { next, count };
};

const strictEqualityTransform: RefactorTransform = {
  id: 'strict-equality',
  label: 'Strict Equality',
  description: '`==` and `!=` operators are converted to strict variants.',
  apply: (code) => {
    const eq = replaceWithCount(code, /([^=!<>])==([^=])/g, '$1===$2');
    const neq = replaceWithCount(eq.next, /([^=!<>])!=([^=])/g, '$1!==$2');
    const count = eq.count + neq.count;
    return {
      code: neq.next,
      changed: count > 0,
      summary: count > 0 ? `${count} non-strict equality check upgraded.` : 'No loose equality operator found.',
    };
  },
};

const varToConstLetTransform: RefactorTransform = {
  id: 'var-to-const-let',
  label: 'var to const/let',
  description: '`var` declarations are modernized to `const` or `let`.',
  apply: (code) => {
    const lines = code.split('\n');
    let changed = 0;

    const nextLines = lines.map((line, lineIndex) => {
      if (!line.includes('var ')) {
        return line;
      }

      const declMatch = line.match(/\bvar\s+([A-Za-z_$][\w$]*)/);
      if (!declMatch) {
        return line;
      }

      const variable = declMatch[1];
      const assignmentRegex = new RegExp(`\\b${variable}\\s*=`);
      const assignedAgain = lines.some((otherLine, idx) => {
        if (idx <= lineIndex) {
          return false;
        }
        return assignmentRegex.test(otherLine);
      });

      changed += 1;
      return line.replace(/\bvar\b/, assignedAgain ? 'let' : 'const');
    });

    return {
      code: nextLines.join('\n'),
      changed: changed > 0,
      summary: changed > 0 ? `${changed} var declaration modernized.` : 'No var declaration found.',
    };
  },
};

const removeDebugLogsTransform: RefactorTransform = {
  id: 'remove-debug-logs',
  label: 'Remove console.log',
  description: 'Temporary debug logs are removed.',
  apply: (code) => {
    const lines = code.split('\n');
    const filtered = lines.filter((line) => !/\bconsole\.log\s*\(/.test(line));
    const removed = lines.length - filtered.length;

    return {
      code: filtered.join('\n'),
      changed: removed > 0,
      summary: removed > 0 ? `${removed} debug log line removed.` : 'No console.log call found.',
    };
  },
};

const trimTrailingSpacesTransform: RefactorTransform = {
  id: 'trim-trailing-spaces',
  label: 'Trim Trailing Spaces',
  description: 'Whitespace at line ends is trimmed.',
  apply: (code) => {
    const lines = code.split('\n');
    let changed = 0;

    const normalized = lines.map((line) => {
      const trimmed = line.replace(/[ \t]+$/g, '');
      if (trimmed !== line) {
        changed += 1;
      }
      return trimmed;
    });

    return {
      code: normalized.join('\n'),
      changed: changed > 0,
      summary: changed > 0 ? `${changed} line trailing space cleaned.` : 'No trailing space found.',
    };
  },
};

const convertFunctionToArrowTransform: RefactorTransform = {
  id: 'convert-function-to-arrow',
  label: 'Function to Arrow',
  description: 'Simple named functions are converted to const arrow style.',
  apply: (code) => {
    const pattern = /function\s+([A-Za-z_$][\w$]*)\s*\(([^)]*)\)\s*\{/g;
    const result = replaceWithCount(code, pattern, (_full, name, args) => `const ${name} = (${args}) => {`);

    return {
      code: result.next,
      changed: result.count > 0,
      summary: result.count > 0 ? `${result.count} function declaration converted.` : 'No simple function declaration found.',
    };
  },
};

const addAsyncAwaitNoteTransform: RefactorTransform = {
  id: 'add-async-await-note',
  label: 'Async/Await Reminder',
  description: 'Adds a reminder to replace promise chains with async/await.',
  apply: (code) => {
    if (!code.includes('.then(')) {
      return {
        code,
        changed: false,
        summary: 'No promise chain detected.',
      };
    }

    if (code.includes('TODO: convert .then chains')) {
      return {
        code,
        changed: false,
        summary: 'Async/await reminder already present.',
      };
    }

    return {
      code: `// TODO: convert .then chains to async/await where possible\n${code}`,
      changed: true,
      summary: 'Promise chain reminder added.',
    };
  },
};

export const allTransforms: RefactorTransform[] = [
  strictEqualityTransform,
  varToConstLetTransform,
  removeDebugLogsTransform,
  trimTrailingSpacesTransform,
  convertFunctionToArrowTransform,
  addAsyncAwaitNoteTransform,
];

export interface RefactorPreset {
  id: string;
  name: string;
  description: string;
  transformIds: RefactorTransformId[];
}

export const refactorPresets: RefactorPreset[] = [
  {
    id: 'safe-cleanup',
    name: 'Safe Cleanup',
    description: 'Fast cleanup without changing behavior intent.',
    transformIds: ['strict-equality', 'trim-trailing-spaces', 'remove-debug-logs'],
  },
  {
    id: 'modern-js',
    name: 'Modern JS Upgrade',
    description: 'Moves legacy syntax toward modern JavaScript.',
    transformIds: ['var-to-const-let', 'convert-function-to-arrow', 'strict-equality'],
  },
  {
    id: 'readability-pass',
    name: 'Readability Pass',
    description: 'Improves consistency and leaves actionable notes.',
    transformIds: ['trim-trailing-spaces', 'remove-debug-logs', 'add-async-await-note'],
  },
];

export interface RefactorExecutionResult {
  code: string;
  changeLog: string[];
  touchedTransforms: RefactorTransformId[];
}

export function executeRefactor(code: string, transformIds: RefactorTransformId[]): RefactorExecutionResult {
  let current = code;
  const changeLog: string[] = [];
  const touchedTransforms: RefactorTransformId[] = [];

  for (const transformId of transformIds) {
    const transform = allTransforms.find((item) => item.id === transformId);
    if (!transform) {
      continue;
    }

    const result = transform.apply(current);
    current = result.code;
    if (result.changed) {
      touchedTransforms.push(transformId);
    }
    changeLog.push(`${transform.label}: ${result.summary}`);
  }

  return {
    code: current,
    changeLog,
    touchedTransforms,
  };
}
