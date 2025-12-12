import { useState } from 'react';
import type { Grid } from '../types';

interface WordGeneratorProps {
  onGridGenerated: (grid: Grid) => void;
  onGenerateStart: () => void;
  onError: (message: string) => void;
  isDisabled: boolean;
  generateGrid: (word: string) => Promise<{ grid: Grid; word: string }>;
}

export function WordGenerator({
  onGridGenerated,
  onGenerateStart,
  onError,
  isDisabled,
  generateGrid,
}: WordGeneratorProps) {
  const [word, setWord] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!word.trim()) return;

    setIsGenerating(true);
    onGenerateStart();

    try {
      const response = await generateGrid(word.trim());
      onGridGenerated(response.grid);
    } catch (error) {
      onError(error instanceof Error ? error.message : 'Failed to generate grid');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isDisabled && !isGenerating && word.trim()) {
      handleGenerate();
    }
  };

  const suggestions = ['heart', 'star', 'sun', 'moon', 'smiley', 'tree', 'house', 'cat'];

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-lg font-semibold text-gray-200">✨ AI Generator</h2>
      
      <div className="flex gap-2">
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter a word..."
          maxLength={50}
          disabled={isGenerating}
          className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg 
                     text-white placeholder-gray-500 focus:outline-none focus:ring-2 
                     focus:ring-purple-500 focus:border-transparent disabled:opacity-50"
        />
        <button
          onClick={handleGenerate}
          disabled={isDisabled || isGenerating || !word.trim()}
          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 
                     hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 
                     disabled:to-gray-600 disabled:cursor-not-allowed text-white 
                     font-medium rounded-lg transition-all flex items-center gap-2"
        >
          {isGenerating ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span className="hidden sm:inline">Generating...</span>
            </>
          ) : (
            <>
              <span>🎨</span>
              <span className="hidden sm:inline">Generate</span>
            </>
          )}
        </button>
      </div>

      {/* Quick suggestions */}
      <div className="flex flex-wrap gap-1.5">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => setWord(suggestion)}
            disabled={isGenerating}
            className="px-2 py-1 text-xs bg-gray-800 hover:bg-gray-700 
                       text-gray-400 hover:text-white rounded transition-colors
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
}
