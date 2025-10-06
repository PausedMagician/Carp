import { Theme } from "@/constants/theme";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import { FontAwesome6 } from "@expo/vector-icons";
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface HorizontalSliderListProps<T> {
    title?: string;
    handleRedirect?: () => void;
    data: T[];
    renderItem: ({ item, index }: { item: T, index: number }) => React.ReactElement;
    renderStart?: () => React.ReactElement;
    renderEnd?: () => React.ReactElement;
}

export default function HorizontalSliderList<T>({ title, handleRedirect, data, renderItem, renderStart, renderEnd }: HorizontalSliderListProps<T>) {
    const theme = useThemedStyles();
    const styles = createStyles(theme);

    return (
        <>
            {title && (
                <View style={styles.border}>
                    <Text style={styles.title}>{title}</Text>
                    {handleRedirect && (
                        <TouchableOpacity style={styles.button} onPress={handleRedirect}>
                            <Text style={styles.buttonText}>
                                See more!
                            </Text>
                            <FontAwesome6 name="arrow-right-long" size={theme.fontSize.md} color={theme.colors.text} />
                        </TouchableOpacity>
                    )}
                </View>
            )}
            <ScrollView horizontal showsHorizontalScrollIndicator={true} style={{ marginTop: 16 }}>
                {renderStart && (
                    <View key='renderStart' style={{ marginRight: 16 }}>
                        {renderStart()}
                    </View>
                )}
                {data.map((item, index) => (
                    <View key={(item as any).id} style={{ marginRight: 16 }}>
                        {renderItem({ item, index })}
                    </View>
                ))}
                {renderEnd && (
                    <View key='renderStart' style={{ marginRight: 16 }}>
                        {renderEnd()}
                    </View>
                )}
            </ScrollView>
        </>
    );
}

export const createStyles = (theme: Theme) => StyleSheet.create({
    title: {
        fontSize: theme.fontSize.xl,
        fontWeight: '600' // Change when theme font weight exists
    },
    border: {
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.text,
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: theme.spacing.sm
    },
    button: {
        padding: theme.spacing.sm,
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        gap: theme.spacing.sm,
        flexDirection: 'row',
    },
    buttonText: {
        fontSize: theme.fontSize.md,
        color: theme.colors.text,
        textDecorationStyle: 'solid',
        textDecorationColor: theme.colors.text,
        textDecorationLine: 'underline',
        padding: 0,
        margin: 0,
    }
})