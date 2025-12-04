import type { Grid } from './types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export async function sendGrid(grid: Grid): Promise<{ status: string; message: string }> {
	const response = await fetch(`${API_URL}/grid`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ grid }),
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.error || 'Failed to update grid');
	}

	return response.json();
}

export async function clearGrid(): Promise<{ status: string; message: string }> {
	const response = await fetch(`${API_URL}/clear`, {
		method: 'POST',
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.error || 'Failed to clear grid');
	}

	return response.json();
}

export async function setBrightness(brightness: number): Promise<{ status: string; message: string }> {
	const response = await fetch(`${API_URL}/brightness`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ brightness }),
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.error || 'Failed to set brightness');
	}

	return response.json();
}

export async function healthCheck(): Promise<{
	status: string;
	unicorn_available: boolean;
	grid_size: { width: number; height: number };
}> {
	const response = await fetch(`${API_URL}/health`);

	if (!response.ok) {
		throw new Error('Server is not responding');
	}

	return response.json();
}
