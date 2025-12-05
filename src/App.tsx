import { useState, useEffect, useCallback } from 'react';
import { PixelGrid } from './components/PixelGrid';
import { ColorPicker } from './components/ColorPicker';
import { Controls } from './components/Controls';
import { RecentGrids } from './components/RecentGrids';
import type { Color, Grid, SavedGrid } from './types';
import { createEmptyGrid, PRESET_COLORS } from './types';
import { sendGrid, clearGrid, setBrightness, healthCheck, getGridHistory } from './api';

function App() {
  const [grid, setGrid] = useState<Grid>(createEmptyGrid);
  const [selectedColor, setSelectedColor] = useState<Color>(PRESET_COLORS[0]);
  const [brightness, setBrightnessValue] = useState(0.5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverStatus, setServerStatus] = useState<'connected' | 'disconnected' | 'unknown'>('unknown');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [recentGrids, setRecentGrids] = useState<SavedGrid[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);

  // Fetch grid history
  const fetchHistory = useCallback(async () => {
    setIsLoadingHistory(true);
    try {
      const response = await getGridHistory();
      console.log('Fetched grid history:', response);
      setRecentGrids(response.grids);
    } catch (error) {
      console.error('Failed to fetch history:', error);
    } finally {
      setIsLoadingHistory(false);
    }
  }, []);

  // Check server health on mount and periodically
  useEffect(() => {
    const checkHealth = async () => {
      try {
        await healthCheck();
        setServerStatus('connected');
      } catch {
        setServerStatus('disconnected');
      }
    };

    checkHealth();
    fetchHistory();
    const interval = setInterval(checkHealth, 10000);
    return () => clearInterval(interval);
  }, [fetchHistory]);

  // Clear message after 3 seconds
  useEffect(() => {
    if (message) {
      const timeout = setTimeout(() => setMessage(null), 3000);
      return () => clearTimeout(timeout);
    }
  }, [message]);

  const handlePixelClick = useCallback(
    (x: number, y: number) => {
      setGrid((prev) => {
        const newGrid = prev.map((row) => row.map((c) => ({ ...c })));
        newGrid[y][x] = { ...selectedColor };
        return newGrid;
      });
    },
    [selectedColor]
  );

  const handleClear = useCallback(() => {
    setGrid(createEmptyGrid());
  }, []);

  const handleFill = useCallback(() => {
    setGrid(
      Array(8)
        .fill(null)
        .map(() =>
          Array(8)
            .fill(null)
            .map(() => ({ ...selectedColor }))
        )
    );
  }, [selectedColor]);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await sendGrid(grid);
      await setBrightness(brightness);
      setMessage({ type: 'success', text: 'Grid sent to Unicorn HAT!' });
      // Refetch history to show the newly submitted grid
      await fetchHistory();
    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Failed to send grid',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClearServer = async () => {
    handleClear();
    if (serverStatus === 'connected') {
      try {
        await clearGrid();
        setMessage({ type: 'success', text: 'Grid cleared!' });
      } catch (error) {
        setMessage({
          type: 'error',
          text: error instanceof Error ? error.message : 'Failed to clear grid on server',
        });
      }
    }
  };

  const handleBrightnessChange = async (value: number) => {
    setBrightnessValue(value);
  };

  const handleRecentGridClick = (savedGrid: SavedGrid) => {
    // Load the clicked grid into the editor
    setGrid(savedGrid.grid.map(row => row.map(c => ({ ...c }))));
    setMessage({ type: 'success', text: 'Grid loaded! Click "Send" to display it.' });
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
            🦄 Unicorn HAT Painter
          </h1>
          <p className="text-gray-400 mt-2">
            Paint an 8×8 grid and send it to your Raspberry Pi!
          </p>
        </header>

        {/* Message toast */}
        {message && (
          <div
            className={`fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg transition-all ${
              message.type === 'success'
                ? 'bg-green-600 text-white'
                : 'bg-red-600 text-white'
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Main content */}
        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
          {/* Grid */}
          <div className="flex-shrink-0">
            <PixelGrid
              grid={grid}
              onPixelClick={handlePixelClick}
              onPixelDrag={handlePixelClick}
            />
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-6 w-full lg:w-72 bg-gray-900 rounded-xl p-6">
            <ColorPicker
              selectedColor={selectedColor}
              onColorChange={setSelectedColor}
            />

            <hr className="border-gray-700" />

            <Controls
              onSubmit={handleSubmit}
              onClear={handleClearServer}
              onFill={handleFill}
              brightness={brightness}
              onBrightnessChange={handleBrightnessChange}
              isSubmitting={isSubmitting}
              serverStatus={serverStatus}
            />
          </div>
        </div>

        {/* Recent Grids Section */}
        <RecentGrids
          grids={recentGrids}
          onGridClick={handleRecentGridClick}
          isLoading={isLoadingHistory}
        />

        {/* Footer */}
        <footer className="text-center mt-12 text-gray-500 text-sm">
          <p>
            Configure the Raspberry Pi server URL via{' '}
            <code className="bg-gray-800 px-2 py-1 rounded">VITE_API_URL</code>{' '}
            environment variable
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
