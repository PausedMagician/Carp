import { fromByteArray } from 'base64-js';
import { client } from '@/backend/Server';

/**
 * Format a date for display in booking screens
 */
export const formatBookingDate = (dateString: string | Date): string => {
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
};

/**
 * Calculate the duration between two dates in days
 * Returns at least 1 day for bookings the same day
 */
export const calculateBookingDuration = (
    startDate: string | Date,
    endDate: string | Date
): number => {
    const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
    const end = typeof endDate === 'string' ? new Date(endDate) : endDate;
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays === 0 ? 1 : diffDays;
};

/**
 * Load vehicle image from the backend
 * Returns base64 encoded image or null on error
 */
export const loadVehicleImageData = async (
    vehicleId: number
): Promise<{ uri: string } | null> => {
    try {
        const c = await client;
        const response = await c.getVehicleImage(vehicleId, null, {
            responseType: 'arraybuffer'
        });
        // This gives an error unless 'unknown' is added
        const base64String = fromByteArray(new Uint8Array(response.data as unknown as ArrayBuffer));
        return { uri: `data:image/png;base64,${base64String}` };
    } catch (err) {
        console.error('Error loading vehicle image:', err);
        return null;
    }
};