import React, { useRef, useState, forwardRef, useImperativeHandle } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated,
    PanResponder,
    Dimensions, Image,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { Theme } from '@/constants/theme';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SLIDER_HEIGHT = 60;
const THUMB_SIZE = 52; // Fits mine like a glove
const SLIDE_THRESHOLD = 0.90;

type SlideToConfirmProps = {
    onConfirm: () => void;
    disabled?: boolean;
    theme: Theme;
};

export type SlideToConfirmHandle = {
    reset: () => void;
};

// Credit goes to this source for the implementation idea: https://blog.stackademic.com/react-native-swipe-to-start-e2b0bcef354d
const SlideToConfirm = forwardRef<SlideToConfirmHandle, SlideToConfirmProps>(
    ({ onConfirm, disabled = false, theme }, ref) => {
        const [isSliding, setIsSliding] = useState(false);
        const slideAnim = useRef(new Animated.Value(0)).current;
        const containerWidth = SCREEN_WIDTH - (theme.spacing.md * 2);
        const maxSlide = containerWidth - THUMB_SIZE - 8;

        const panResponder = React.useMemo(() => PanResponder.create({
            onStartShouldSetPanResponder: () => !disabled,
            onMoveShouldSetPanResponder: () => !disabled,

            onPanResponderGrant: () => {
                setIsSliding(true);
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            },

            onPanResponderMove: (_, gestureState) => {
                if (disabled) return;

                const newValue = Math.max(0, Math.min(gestureState.dx, maxSlide));
                slideAnim.setValue(newValue);

                const progress = newValue / maxSlide;

                // Should we use haptics here?
                if (progress > 0.5 && progress < 0.52) {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }
                if (progress > 0.9 && progress < 0.92) {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                }
            },

            onPanResponderRelease: (_, gestureState) => {
                const finalX = Math.max(0, Math.min(gestureState.dx, maxSlide));
                const progress = finalX / maxSlide;

                if (progress >= SLIDE_THRESHOLD) {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

                    Animated.spring(slideAnim, {
                        toValue: maxSlide,
                        useNativeDriver: false,
                        speed: 20,
                        bounciness: 0,
                    }).start(() => {
                        onConfirm();
                    });
                } else {
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
                Animated.spring(slideAnim, {
                    toValue: 0,
                    useNativeDriver: false,
                }).start(() => {
                    setIsSliding(false);
                });
            },
        }), [disabled, maxSlide, slideAnim, onConfirm]);

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

        const progress = slideAnim.interpolate({
            inputRange: [0, maxSlide],
            outputRange: [0, 1],
        });

        const trackBackgroundColor = progress.interpolate({
            inputRange: [0, 1],
            outputRange: [theme.colors.secondary, theme.colors.primary],
        });

        const textOpacity = progress.interpolate({
            inputRange: [0, 0.3],
            outputRange: [1, 0],
        });

        const thumbBackgroundColor = disabled
            ? theme.colors.textSecondary
            : theme.colors.primary;

        return (
            <View style={[styles.container, { opacity: disabled ? 0.5 : 1 }]}>
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

                    {/*<View style={styles.decorationContainerContainer}>*/}
                    {/*    <Animated.Text*/}
                    {/*        style={[*/}
                    {/*            styles.decoration,*/}
                    {/*            { opacity: textOpacity, color: theme.colors.textSecondary },*/}
                    {/*        ]}*/}
                    {/*    ></Animated.Text>*/}
                    {/*</View>*/}

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
                            // ToDo: Should be white or at least a better contrast color
                            source={require('@/assets/icons/arrow_right.png')}
                            style={{ width: 20, height: 20}}
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
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    track: {
        height: SLIDER_HEIGHT,
        borderRadius: SLIDER_HEIGHT / 2,
        borderWidth: 1,
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
    // --- Not used ---
    decorationContainer: {
        position: 'absolute',
        right: 20,
        height: '100%',
        justifyContent: 'center',
    },
    decoration: {
        fontSize: 22,
        fontWeight: '700',
    },
    // --- Not used ---
    thumb: {
        position: 'absolute',
        left: 4,
        width: THUMB_SIZE,
        height: THUMB_SIZE,
        borderRadius: THUMB_SIZE / 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    arrow: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});