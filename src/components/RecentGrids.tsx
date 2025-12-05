import type { SavedGrid } from '../types';
import { colorToRgb } from '../types';

interface RecentGridsProps {
	grids: SavedGrid[];
	onGridClick: (grid: SavedGrid) => void;
	isLoading: boolean;
}

export function RecentGrids({ grids, onGridClick, isLoading }: RecentGridsProps) {
	if (isLoading) {
		return (
			<div className="mt-8">
				<h2 className="text-xl font-semibold text-gray-200 mb-4">🕐 Recent Creations</h2>
				<div className="flex items-center justify-center py-8">
					<div className="w-6 h-6 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
					<span className="ml-3 text-gray-400">Loading...</span>
				</div>
			</div>
		);
	}

	if (grids.length === 0) {
		return (
			<div className="mt-8">
				<h2 className="text-xl font-semibold text-gray-200 mb-4">🕐 Recent Creations</h2>
				<p className="text-gray-500 text-center py-8">
					No grids submitted yet. Be the first to light up the Unicorn HAT!
				</p>
			</div>
		);
	}

	return (
		<div className="mt-8">
			<h2 className="text-xl font-semibold text-gray-200 mb-4">🕐 Recent Creations</h2>
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
				{grids.map((savedGrid) => (
					<button
						key={savedGrid.id}
						onClick={() => onGridClick(savedGrid)}
						className="group relative bg-gray-900 rounded-lg p-2 hover:bg-gray-800 
                       transition-all hover:scale-105 hover:ring-2 hover:ring-purple-500"
						title={`Created at ${formatTimestamp(savedGrid.timestamp)}`}
					>
						{/* Mini grid preview */}
						<div
							className="grid gap-px"
							style={{ gridTemplateColumns: 'repeat(8, 1fr)' }}
						>
							{savedGrid.grid.map((row, y) =>
								row.map((color, x) => (
									<div
										key={`${x}-${y}`}
										className="aspect-square rounded-sm"
										style={{ backgroundColor: colorToRgb(color) }}
									/>
								))
							)}
						</div>
						
						{/* Timestamp overlay on hover */}
						<div className="absolute inset-0 flex items-end justify-center opacity-0 
                          group-hover:opacity-100 transition-opacity bg-gradient-to-t 
                          from-black/70 to-transparent rounded-lg pointer-events-none">
							<span className="text-xs text-gray-300 pb-2">
								{formatRelativeTime(savedGrid.timestamp)}
							</span>
						</div>
					</button>
				))}
			</div>
		</div>
	);
}

function formatTimestamp(isoString: string): string {
	try {
		const date = new Date(isoString);
		return date.toLocaleString();
	} catch {
		return isoString;
	}
}

function formatRelativeTime(isoString: string): string {
	try {
		const date = new Date(isoString);
		const now = new Date();
		const diffMs = now.getTime() - date.getTime();
		const diffMins = Math.floor(diffMs / 60000);
		const diffHours = Math.floor(diffMins / 60);
		const diffDays = Math.floor(diffHours / 24);

		if (diffMins < 1) return 'Just now';
		if (diffMins < 60) return `${diffMins}m ago`;
		if (diffHours < 24) return `${diffHours}h ago`;
		if (diffDays < 7) return `${diffDays}d ago`;
		return date.toLocaleDateString();
	} catch {
		return '';
	}
}
