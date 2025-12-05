interface ControlsProps {
  onSubmit: () => void;
  onClear: () => void;
  onFill: () => void;
  brightness: number;
  onBrightnessChange: (value: number) => void;
  isSubmitting: boolean;
  serverStatus: 'connected' | 'disconnected' | 'unknown';
}

export function Controls({
  onSubmit,
  onClear,
  onFill,
  brightness,
  onBrightnessChange,
  isSubmitting,
  serverStatus,
}: ControlsProps) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-gray-200">Controls</h2>

      {/* Server status */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-400">Server:</span>
        <span
          className={`flex items-center gap-1.5 text-sm ${
            serverStatus === 'connected'
              ? 'text-green-400'
              : serverStatus === 'disconnected'
              ? 'text-red-400'
              : 'text-yellow-400'
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              serverStatus === 'connected'
                ? 'bg-green-400'
                : serverStatus === 'disconnected'
                ? 'bg-red-400'
                : 'bg-yellow-400'
            }`}
          />
          {serverStatus === 'connected'
            ? 'Connected'
            : serverStatus === 'disconnected'
            ? 'Disconnected'
            : 'Checking...'}
        </span>
      </div>

      {/* Brightness slider */}
      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-400">
          Brightness: {Math.round(brightness * 100)}%
        </label>
        <input
          type="range"
          min="30"
          max="70"
          value={brightness * 100}
          onChange={(e) => onBrightnessChange(parseInt(e.target.value) / 100)}
          className="w-full accent-yellow-400"
        />
      </div>

      {/* Action buttons */}
      <div className="flex flex-col gap-2">
        <button
          onClick={onSubmit}
          disabled={isSubmitting || serverStatus !== 'connected'}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 
                     disabled:cursor-not-allowed text-white font-semibold rounded-lg 
                     transition-colors flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Sending...
            </>
          ) : (
            '🚀 Send to Unicorn HAT'
          )}
        </button>

        <div className="flex gap-2">
          <button
            onClick={onFill}
            className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 
                       text-white font-medium rounded-lg transition-colors"
          >
            🎨 Fill All
          </button>
          <button
            onClick={onClear}
            className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 
                       text-white font-medium rounded-lg transition-colors"
          >
            🗑️ Clear
          </button>
        </div>
      </div>
    </div>
  );
}
