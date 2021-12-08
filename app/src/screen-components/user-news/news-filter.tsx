import React, { useState, useEffect, useRef, FC } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useFonts from "../../theme/fonts";
import { useTheme } from '../../theme'
import CategoryButton from "../../components/buttons/category-button";
import { Text, View, StyleSheet, ScrollView, Animated, TouchableWithoutFeedback, Easing } from "react-native";

type FilterChageCallback = (selectedCategories: number[], selectedTimeRanges: number[], selectedTypes: number[]) => void

interface INewsFilter {
    initialTimeRanges: number[]
    initialCategories: number[]
    initialTypes: number[]
    isExpanded: boolean
    onFilterChange: FilterChageCallback
    onExpadedChange: (isExpanded: boolean) => void
}

const NewsFilter: FC<INewsFilter> = ({ initialTimeRanges, initialCategories, initialTypes, isExpanded, onFilterChange, onExpadedChange }) => {
    const theme = useTheme();
    const fonts = useFonts();

    const [selectedTimeRanges, setTimeRanges] = useState(initialTimeRanges);
    const [selectedCategories, setCategories] = useState(initialCategories);
    const [selectedTypes, setTypes] = useState(initialTypes);

    const [expanded, setExpanded] = useState(isExpanded);
    const animationHeight = useRef(new Animated.Value(0)).current;
    const animationOpacity = useRef(new Animated.Value(0)).current;

    const toggleExpansion = () => {
        setExpanded(!expanded)
        onExpadedChange(expanded)
    };

    const onChange: FilterChageCallback = onFilterChange

    const categories = [
        { id: 1, name: "Ekonomika", active: false },
        { id: 2, name: "Zprávy z domova", active: false },
        { id: 3, name: "Zprávy ze světa", active: false },
        { id: 4, name: "Sport", active: false },
        { id: 5, name: "Kultura", active: false },
        { id: 6, name: "Technologie", active: false },
        { id: 7, name: "Regiony", active: false },
        { id: 8, name: "Zdraví", active: false },
        { id: 9, name: "Koronavirus", active: false },
        { id: 10, name: "Volby do parlamentu", active: false },
        { id: 11, name: "Bitcoin", active: false },
        { id: 12, name: "Myanmar", active: false },
        { id: 13, name: "Vakcíny", active: false },
        { id: 14, name: "Bělorusko", active: false },
        { id: 15, name: "Regiony", active: false },
    ];

    const timeRanges = [
        { id: 1, name: "Nyní", active: false },
        { id: 2, name: "Před hodinou", active: true },
        { id: 3, name: "Dnes", active: true },
        { id: 4, name: "Tento týden", active: true },
        { id: 5, name: "Minulý týden", active: true }
    ];


    const articleTypes = [
        { id: 1, name: "Rozhovor", active: false },
        { id: 2, name: "Publicistika", active: false },
        { id: 3, name: "Komentář", active: false },
        { id: 4, name: "Nekrolog", active: false }
    ];

    useEffect(() => {
        if (expanded) {
            Animated.timing(animationHeight, {
                duration: 300,
                toValue: 190,
                easing: Easing.cubic,
                useNativeDriver: false
            }).start();
            Animated.timing(animationOpacity, {
                duration: 300,
                toValue: 1,
                easing: Easing.cubic,
                useNativeDriver: false
            }).start();
        }
        else {
            Animated.timing(animationHeight, {
                duration: 300,
                toValue: 0,
                easing: Easing.cubic,
                useNativeDriver: false
            }).start();
            Animated.timing(animationOpacity, {
                duration: 300,
                toValue: 0,
                easing: Easing.cubic,
                useNativeDriver: false
            }).start();
        }
    }, [expanded]);

    const handleChange = (itemID: number, collection: number[], setter: React.Dispatch<React.SetStateAction<number[]>>) => {
        if (collection.includes(itemID)) {
            const filtered = collection.filter((id) => id !== itemID);
            setter(filtered);
        } else {
            setter((array) => [...array, itemID]);
        }
    }

    useEffect(() => {
        onChange(selectedCategories, selectedTimeRanges, selectedTypes)
    }, [selectedCategories, selectedTimeRanges, selectedTypes]);

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
    });

    return (
        <View style={styles.filterSection}>
            <TouchableWithoutFeedback onPress={() => { toggleExpansion(); }} >
                <View style={styles.filterHeader}>
                    <MaterialCommunityIcons name={expanded ? 'close' : 'filter'} size={24} color={theme.colors.textSemiLight} />
                    <Text style={StyleSheet.compose(fonts.titleRegular, { color: theme.colors.textSemiLight, marginStart: 8 })}>{expanded ? 'Zavřít filtry' : 'Filtrovat'}</Text>
                </View>
            </TouchableWithoutFeedback>

            <Animated.View style={{ height: animationHeight, opacity: animationOpacity }}>
                <View style={styles.filterContainer}>
                    <ScrollView horizontal={true}>
                        <View style={styles.filterRow}>
                            <CategoryButton key={0} onPress={() => { setTimeRanges([]) }} active={selectedTimeRanges.length == 0}>
                                <Text>Vydáno kdykoliv</Text>
                            </CategoryButton>

                            {timeRanges.map((item) => (
                                <CategoryButton
                                    key={item.id}
                                    onPress={() => {
                                        handleChange(item.id, selectedTimeRanges, setTimeRanges)
                                    }}
                                    active={selectedTimeRanges.includes(item.id)}
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
                                        handleChange(item.id, selectedCategories, setCategories)
                                    }}
                                    active={selectedCategories.includes(item.id)}
                                >
                                    {item.name}
                                </CategoryButton>
                            ))}
                            <View style={{ width: 16, height: 16 }}></View>
                        </View>
                    </ScrollView>

                    <ScrollView horizontal={true}>
                        <View style={styles.filterRow}>
                            <CategoryButton key={0} onPress={() => { setTypes([]) }} active={selectedTypes.length == 0}>
                                <Text>Všechny typy</Text>
                            </CategoryButton>

                            {articleTypes.map((item) => (
                                <CategoryButton
                                    key={item.id}
                                    onPress={() => {
                                        handleChange(item.id, selectedTypes, setTypes)
                                    }}
                                    active={selectedTypes.includes(item.id)}
                                >
                                    {item.name}
                                </CategoryButton>
                            ))}
                            <View style={{ width: 16, height: 16 }}></View>
                        </View>
                    </ScrollView>

                    <View style={styles.filterSeparator}></View>
                </View>
            </Animated.View>
        </View>
    );
};

export default NewsFilter;