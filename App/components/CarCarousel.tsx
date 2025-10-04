import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import Carousel, { ICarouselInstance, Pagination } from 'react-native-reanimated-carousel';
import CarCarouselItem from './CarCarouselItem';
import { Vehicle } from '@/types/openapi';
import { client } from '@/backend/Server';


export function MyCarousel() {
    const [data, setData] = useState<Vehicle[]>([]);
    const { width, height } = useWindowDimensions();

    useEffect(() => {
        client.then((c) => {
            c.getAvailableVehicles().then((vehicles) => {
                setData(vehicles.data);
            });
        })
    }, []);

    const ref = React.useRef<ICarouselInstance>(null);
    const progress = useSharedValue<number>(0);

    const onPressPagination = (index: number) => {
        ref.current?.scrollTo({
            count: index - progress.value,
            animated: true,
        });
    };
    return (
        <View style={{ flex: 8 }}>
            <Carousel
                ref={ref}
                width={width}
                height={height / 2} 
                data={data}
                mode='parallax'
                modeConfig={{
                    parallaxScrollingOffset: 200,
                    parallaxScrollingScale: 0.85,
                }}
                onProgressChange={progress}
                renderItem={({ index }) => (
                    <CarCarouselItem vehicle={data[index]} />
                )}
            />

            <Pagination.Basic
                progress={progress}
                data={data}
                dotStyle={{ backgroundColor: "rgba(0,0,0,0.2)", borderRadius: 50 }}
                containerStyle={{ gap: 5, marginTop: 20 }}
                onPress={onPressPagination}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    slide: {
        backgroundColor: 'floralwhite',
        borderRadius: 5,
        padding: 10,
        marginLeft: 25,
        marginRight: 25
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold'
    }
});