import React, { useState, useEffect, useRef, FC } from "react"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import useFonts from "../../theme/fonts"
import { useTheme } from '../../theme'
import CategoryButton from "../../components/buttons/category-button"
import { Text, View, StyleSheet, ScrollView, Animated, TouchableWithoutFeedback, Easing } from "react-native"
import categories from "../../shared/categories"

export enum TimeRangeItem {
    now,
    today,
    week,
    month
}

export interface TimeRange {
    gteDate?: Date
    lteDate?: Date
}

const timeRanges = [
    { id: TimeRangeItem.now, name: "Nyní" },
    { id: TimeRangeItem.today, name: "Dnes" },
    { id: TimeRangeItem.week, name: "Tento týden" },
    { id: TimeRangeItem.month, name: "Tento měsíc" }
]

type FilterChageCallback = (selectedCategories: string[], selectedTimeRange: TimeRangeItem) => void

interface INewsFilter {
    initialTimeRange: TimeRangeItem
    initialCategories: string[]
    isExpanded: boolean
    onFilterChange: FilterChageCallback
    onExpadedChange: (isExpanded: boolean) => void
}

const NewsFilter: FC<INewsFilter> = ({ initialTimeRange, initialCategories, isExpanded, onFilterChange, onExpadedChange }) => {
    const theme = useTheme()
    const fonts = useFonts()

    const [selectedTimeRange, setTimeRange] = useState(initialTimeRange)
    const [selectedCategories, setCategories] = useState(initialCategories)

    const [expanded, setExpanded] = useState(isExpanded)
    const animationHeight = useRef(new Animated.Value(0)).current
    const animationOpacity = useRef(new Animated.Value(0)).current

    const toggleExpansion = () => {
        setExpanded(!expanded)
        onExpadedChange(expanded)
    }

    const onChange: FilterChageCallback = onFilterChange



    useEffect(() => {
        if (expanded) {
            Animated.timing(animationHeight, {
                duration: 300,
                toValue: 125,
                easing: Easing.cubic,
                useNativeDriver: false
            }).start()
            Animated.timing(animationOpacity, {
                duration: 300,
                toValue: 1,
                easing: Easing.cubic,
                useNativeDriver: false
            }).start()
        }
        else {
            Animated.timing(animationHeight, {
                duration: 300,
                toValue: 0,
                easing: Easing.cubic,
                useNativeDriver: false
            }).start()
            Animated.timing(animationOpacity, {
                duration: 300,
                toValue: 0,
                easing: Easing.cubic,
                useNativeDriver: false
            }).start()
        }
    }, [expanded])

    const handleCategoryChange = (itemID: string, collection: string[], setter: React.Dispatch<React.SetStateAction<string[]>>) => {
        if (collection.includes(itemID)) {
            const filtered = collection.filter((id) => id !== itemID)
            setter(filtered)
        } else {
            setter((array) => [...array, itemID])
        }
    }

    useEffect(() => {
        onChange(selectedCategories, selectedTimeRange)
    }, [selectedCategories, selectedTimeRange])

    const styles = StyleSheet.create({
        filterSection: {
            marginTop: 10,
            paddingBottom: 4
        },
        filterHeader: {
            flexDirection: "row",
            alignItems: 'center',
            justifyContent: 'flex-start',
            marginStart: 16
        },
        filterContainer: {
            marginTop: 8,
            marginBottom: 40,
        },
        filterRow: {
            paddingStart: 12,
            flexDirection: "row",
            marginTop: 4,
            marginBottom: 4,
            justifyContent: "flex-start",
        },
        filterSeparator: {
            height: 2,
            backgroundColor: theme.colors.primaryLight,
            marginTop: 16
        }
    })

    return (
        <View style={styles.filterSection}>
            <TouchableWithoutFeedback onPress={() => { toggleExpansion() }} >
                <View style={styles.filterHeader}>
                    <MaterialCommunityIcons name={expanded ? 'close' : 'filter'} size={24} color={theme.colors.textSemiLight} />
                    <Text style={StyleSheet.compose(fonts.titleRegular, { color: theme.colors.textSemiLight, marginStart: 8 })}>{expanded ? 'Zavřít filtry' : 'Filtrovat'}</Text>
                </View>
            </TouchableWithoutFeedback>

            <Animated.View style={{ height: animationHeight, opacity: animationOpacity }}>
                <View style={styles.filterContainer}>
                    <ScrollView horizontal={true}>
                        <View style={styles.filterRow}>
                            <CategoryButton key={0} onPress={() => { setTimeRange(null) }} active={selectedTimeRange == null}>
                                <Text>Vydáno kdykoliv</Text>
                            </CategoryButton>

                            {timeRanges.map((item) => (
                                <CategoryButton
                                    key={item.id}
                                    onPress={() => {
                                        setTimeRange(item.id)
                                    }}
                                    active={selectedTimeRange == item.id}
                                >
                                    {item.name}
                                </CategoryButton>
                            ))}
                            <View style={{ width: 16, height: 16 }}></View>
                        </View>
                    </ScrollView>

                    <ScrollView horizontal={true}>
                        <View style={styles.filterRow}>
                            <CategoryButton key={0} onPress={() => { setCategories([]) }} active={selectedCategories.length == 0}>
                                <Text>Všechny kategorie</Text>
                            </CategoryButton>

                            {categories.map((item) => (
                                <CategoryButton
                                    key={item.id}
                                    onPress={() => {
                                        handleCategoryChange(item.key, selectedCategories, setCategories)
                                    }}
                                    active={selectedCategories.includes(item.key)}
                                >
                                    {item.title}
                                </CategoryButton>
                            ))}
                            <View style={{ width: 16, height: 16 }}></View>
                        </View>
                    </ScrollView>
                    <View style={styles.filterSeparator}></View>
                </View>
            </Animated.View>
        </View>
    )
}

export default NewsFilter