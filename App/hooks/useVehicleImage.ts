import { useState, useEffect } from 'react';
import { loadVehicleImageData } from '@/utils/bookingUtils';

/**
 * Hook to load vehicle images
 */
export function useVehicleImage(vehicleId: number | undefined) {
    const [vehicleImage, setVehicleImage] = useState<{ uri: string } | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!vehicleId) {
            setLoading(false);
            return;
        }

        const loadImage = async () => {
            try {
                setLoading(true);
                setError(null);
                const image = await loadVehicleImageData(vehicleId);
                setVehicleImage(image);
            } catch (err) {
                console.error('Error in useVehicleImage:', err);
                setError(err instanceof Error ? err : new Error('Unknown error'));
            } finally {
                setLoading(false);
            }
        };

        loadImage();
    }, [vehicleId]);

    return { vehicleImage, loading, error };
}