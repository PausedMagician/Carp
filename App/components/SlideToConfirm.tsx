import React, { useRef, useState, forwardRef, useImperativeHandle } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated,
    PanResponder,
    LayoutChangeEvent,
    Image,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { Theme } from '@/constants/theme';

const SLIDER_HEIGHT = 60;
const THUMB_SIZE = 52;
const SLIDE_THRESHOLD = 0.85;

type SlideToConfirmProps = {
    onConfirm: () => void;
    disabled?: boolean;
    theme: Theme;
};

export type SlideToConfirmHandle = {
    reset: () => void;
};

const SlideToConfirm = forwardRef<SlideToConfirmHandle, SlideToConfirmProps>(
    ({ onConfirm, disabled = false, theme }, ref) => {
        const [isSliding, setIsSliding] = useState(false);
        const [containerWidth, setContainerWidth] = useState(0);
        const slideAnim = useRef(new Animated.Value(0)).current;

        // Calculate maxSlide based on container width
        const maxSlide = containerWidth > 0 ? containerWidth - THUMB_SIZE - 8 : 0;

        /**
         * Measure container width on layout
         */
        const onLayout = (event: LayoutChangeEvent) => {
            const { width } = event.nativeEvent.layout;
            setContainerWidth(width);
        };

        const panResponder = React.useMemo(() => PanResponder.create({
            onStartShouldSetPanResponder: () => !disabled && containerWidth > 0,
            onMoveShouldSetPanResponder: () => !disabled && containerWidth > 0,

            onPanResponderGrant: () => {
                setIsSliding(true);
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            },

            onPanResponderMove: (_, gestureState) => {
                if (disabled) return;

                // Clamp the value between 0 and maxSlide
                const newValue = Math.max(0, Math.min(gestureState.dx, maxSlide));
                slideAnim.setValue(newValue);

                const progress = newValue / maxSlide;

                // Haptic feedback at milestones
                if (progress > 0.5 && progress < 0.52) {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }
                if (progress > 0.8 && progress < 0.82) {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                }
            },

            onPanResponderRelease: (_, gestureState) => {
                // Use the current animated value
                const finalX = Math.max(0, Math.min(gestureState.dx, maxSlide));
                const progress = finalX / maxSlide;

                if (progress >= SLIDE_THRESHOLD) {
                    // Success! Call onConfirm before animation
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

                    // Animate to end
                    Animated.timing(slideAnim, {
                        toValue: maxSlide,
                        duration: 200,
                        useNativeDriver: false,
                    }).start();

                    // Call onConfirm immediately and not in animation callback
                    // This ensures it fires even if component unmounts
                    setTimeout(() => {
                        onConfirm();
                    }, 100);

                } else {
                    // Not far enough, spring back
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

                    Animated.spring(slideAnim, {
                        toValue: 0,
                        useNativeDriver: false,
                        speed: 12,
                        bounciness: 8,
                    }).start(() => {
                        setIsSliding(false);
                    });
                }
            },

            onPanResponderTerminate: () => {
                // Reset if gesture is interrupted
                Animated.spring(slideAnim, {
                    toValue: 0,
                    useNativeDriver: false,
                }).start(() => {
                    setIsSliding(false);
                });
            },
        }), [disabled, maxSlide, slideAnim, onConfirm, containerWidth]);

        const reset = React.useCallback(() => {
            Animated.spring(slideAnim, {
                toValue: 0,
                useNativeDriver: false,
                speed: 12,
                bounciness: 8,
            }).start(() => {
                setIsSliding(false);
            });
        }, [slideAnim]);

        useImperativeHandle(ref, () => ({ reset }), [reset]);

        // Only create interpolations if we have a valid maxSlide
        const progress = maxSlide > 0 ? slideAnim.interpolate({
            inputRange: [0, maxSlide],
            outputRange: [0, 1],
            extrapolate: 'clamp',
        }) : new Animated.Value(0);

        const trackBackgroundColor = maxSlide > 0 ? progress.interpolate({
            inputRange: [0, 1],
            outputRange: [theme.colors.secondary, theme.colors.primary],
        }) : theme.colors.secondary;

        const textOpacity = maxSlide > 0 ? progress.interpolate({
            inputRange: [0, 0.3],
            outputRange: [1, 0],
            extrapolate: 'clamp',
        }) : new Animated.Value(1);

        const thumbBackgroundColor = disabled
            ? theme.colors.textSecondary
            : theme.colors.primary;

        return (
            <View
                style={[styles.container, { opacity: disabled ? 0.5 : 1 }]}
                onLayout={onLayout}
            >
                <Animated.View
                    style={[
                        styles.track,
                        {
                            backgroundColor: trackBackgroundColor,
                            borderColor: theme.colors.primary,
                        },
                    ]}
                >
                    <Animated.Text
                        style={[
                            styles.text,
                            {
                                color: theme.colors.textTertiary,
                                opacity: textOpacity,
                            },
                        ]}
                    >
                        Slide to confirm
                    </Animated.Text>

                    <Animated.View
                        {...panResponder.panHandlers}
                        style={[
                            styles.thumb,
                            {
                                backgroundColor: thumbBackgroundColor,
                                transform: [{ translateX: slideAnim }],
                                ...theme.shadow.small,
                            },
                        ]}
                    >
                        <Image
                            source={require('@/assets/icons/arrow_right.png')}
                            style={{ width: 20, height: 20, tintColor: theme.colors.background }}
                        />
                    </Animated.View>
                </Animated.View>
            </View>
        );
    }
);

export default SlideToConfirm;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 0,
        paddingVertical: 12,
    },
    track: {
        height: SLIDER_HEIGHT,
        borderRadius: SLIDER_HEIGHT / 2,
        borderWidth: 2,
        justifyContent: 'center',
        overflow: 'hidden',
    },
    text: {
        position: 'absolute',
        width: '100%',
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 16,
        letterSpacing: 0.4,
    },
    thumb: {
        position: 'absolute',
        left: 4,
        width: THUMB_SIZE,
        height: THUMB_SIZE,
        borderRadius: THUMB_SIZE / 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
});