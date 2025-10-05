import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import Carousel, { ICarouselInstance, Pagination } from 'react-native-reanimated-carousel';
import CarCarouselItem from './CarCarouselItem';
import { Vehicle } from '@/types/openapi';
import { client } from '@/backend/Server';
import { useThemedStyles } from "@/hooks/useThemedStyles";
import { Theme } from "@/constants/theme";

interface CarCarouselProps {
    onVehiclePress?: (vehicle: Vehicle) => void;
}

export function MyCarousel({ onVehiclePress }: CarCarouselProps) {
    const [data, setData] = useState<Vehicle[]>([]);
    const { width, height } = useWindowDimensions();
    const theme = useThemedStyles();
    const styles = createStyles(theme);

    useEffect(() => {
        loadAvailableVehicles();
    }, []);

    /**
     * Load available vehicles from backend
     */
    const loadAvailableVehicles = async () => {
        try {
            const c = await client;
            const vehicles = await c.getAvailableVehicles();
            setData(vehicles.data);
        } catch (error) {
            console.error('Error loading vehicles:', error);
        }
    };

    const ref = React.useRef<ICarouselInstance>(null);
    const progress = useSharedValue<number>(0);

    const onPressPagination = (index: number) => {
        ref.current?.scrollTo({
            count: index - progress.value,
            animated: true,
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Quick Book</Text>
            <Carousel
                ref={ref}
                width={width}
                height={height / 2}
                data={data}
                mode="parallax"
                modeConfig={{
                    parallaxScrollingOffset: 200 * (Math.max(width, 700) / 700),
                    parallaxScrollingScale: 0.75,
                }}
                onProgressChange={progress}
                renderItem={({ index }) => (
                    <CarCarouselItem
                        vehicle={data[index]}
                        onVehiclePress={onVehiclePress}
                    />
                )}
            />

            <Pagination.Basic
                progress={progress}
                data={data}
                dotStyle={styles.paginationDot}
                activeDotStyle={styles.activePaginationDot}
                containerStyle={styles.paginationContainer}
                onPress={onPressPagination}
            />
        </View>
    );
}

const createStyles = (theme: Theme) => StyleSheet.create({
    title: {
        fontSize: theme.fontSize.lg,
        fontWeight: 'bold',
        marginTop: theme.spacing.lg,
        alignSelf: 'center',
    },
    container: {
        flex: 8,
    },
    paginationDot: {
        backgroundColor: "rgba(0,0,0,0.2)",
        borderRadius: 50,
    },
    activePaginationDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: theme.colors.primary,
    },
    paginationContainer: {
        gap: 5,
        marginTop: theme.spacing.lg,
    },
});