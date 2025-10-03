import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import Carousel, { ICarouselInstance, Pagination } from 'react-native-reanimated-carousel';
import CarCarouselItem from './CarCarouselItem';
import { getVehicles, Vehicle } from '@/backend/Server';

const width = Dimensions.get("screen").width;

export function MyCarousel() {
    const [data, setData] = useState<Vehicle[]>([]);

    useEffect(() => {
        setData(getVehicles());
    }, []);

    const ref = React.useRef<ICarouselInstance>(null);
    const progress = useSharedValue<number>(0);

    const onPressPagination = (index: number) => {
        ref.current?.scrollTo({
            /**
             * Calculate the difference between the current index and the target index
             * to ensure that the carousel scrolls to the nearest index
             */
            count: index - progress.value,
            animated: true,
        });
    };
    return (
        <View style={{ flex: 1 }}>
            <Carousel
                ref={ref}
                width={width}
                height={width} 
                data={data}
                onProgressChange={progress}
                renderItem={({ index }) => (
                    <CarCarouselItem vehicle={data[index]} />
                )}
            />

            <Pagination.Basic
                progress={progress}
                data={data}
                dotStyle={{ backgroundColor: "rgba(0,0,0,0.2)", borderRadius: 50 }}
                containerStyle={{ gap: 5, marginTop: 30 }}
                onPress={onPressPagination}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    slide: {
        backgroundColor: 'floralwhite',
        borderRadius: 5,
        height: 300,
        padding: 50,
        marginLeft: 25,
        marginRight: 25
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold'
    }
});