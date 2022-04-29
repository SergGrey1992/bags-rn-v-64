import {StatusBar} from 'expo-status-bar';
import {
    Animated,
    StyleSheet,
    Text,
    View,
    Button,
    LayoutChangeEvent,
    TouchableOpacity,
    TextInput,
    ScrollView, SafeAreaView, FlatList, ListRenderItem
} from 'react-native';
import {NativeBaseProvider, Box, Modal} from "native-base";
import React, {MutableRefObject, useRef, useState} from "react";
import ActionSheet, {SheetManager} from "react-native-actions-sheet";


const Sheets = {
    testSheet: 'test_sheet_id',
};

const colors = ['#4a4e4d', '#0e9aa7', '#3da4ab', '#f6cd61', '#fe8a71'];


const arr = new Array(40).fill(null).map((el, index) => ({id: index + 1, name: 'Test_' + index}))

type MultiSelectorPropsType = {
    arrSelectItem: Array<{ id: number; name: string }>
    milty: boolean
    getData: (id: number) => void
    getLabel: (label: string) => void
    choiceElement: Array<number>
}

const MultiSelector = (props: MultiSelectorPropsType) => {
    const actionSheetRef = useRef<ActionSheet | null>(null);
    const render: ListRenderItem<{ id: number; name: string }> = ({item}) => {

        const isChoice = props.choiceElement.find((el) => el === item.id)

        return (<TouchableOpacity
                onPress={() => {
                    if (props.milty) {
                        actionSheetRef.current?.snapToOffset(500)
                        props.getData(item.id)
                        props.getLabel(item.name)
                        return
                    } else {
                        if (props.choiceElement.length === 1) {
                            SheetManager.hide(Sheets.testSheet)
                            return
                        }
                        props.getData(item.id)
                        props.getLabel(item.name)
                        SheetManager.hide(Sheets.testSheet)
                    }
                    actionSheetRef.current?.snapToOffset(500);
                }}
                key={`arrSelectItem.${item.name}.${item.id}`}
                style={[styles.circle]}
            >
                <Text style={{backgroundColor: isChoice ? 'red' : 'white'}}>{item.name}</Text>
            </TouchableOpacity>
        )

    }
    return (<>
        <ActionSheet
        initialOffsetFromBottom={0.4}
        onBeforeShow={data => console.log(data)}
        id={Sheets.testSheet}
        ref={actionSheetRef}
        statusBarTranslucent
        bounceOnOpen={true}
        drawUnderStatusBar={true}
        bounciness={4}
        gestureEnabled={true}
        CustomHeaderComponent={<View>
            <Text>Header</Text>
        </View>}

        defaultOverlayOpacity={0.3}>
        <View
            style={{
                paddingHorizontal: 12,
            }}>
            <FlatList
                data={props.arrSelectItem}
                renderItem={render}
                keyExtractor={(item) => `${item.id}.${item.name}`}
            />
            {/*<ScrollView */}
            {/*    contentContainerStyle={styles.container}*/}
            {/*>*/}
            {/*    {props.arrSelectItem.map((item, index) => {*/}
            {/*        const isChoice = props.choiceElement.find((el) => el === item.id)*/}
            {/*        return (<TouchableOpacity*/}
            {/*                onPress={() => {*/}
            {/*                    //console.log('actionSheetRef press', actionSheetRef)*/}
            {/*                    if (props.milty) {*/}
            {/*                        actionSheetRef.current?.snapToOffset(500)*/}
            {/*                        props.getData(item.id)*/}
            {/*                    } else {*/}
            {/*                        SheetManager.hide(Sheets.testSheet)*/}
            {/*                    }*/}
            {/*                    actionSheetRef.current?.snapToOffset(500);*/}
            {/*                }}*/}
            {/*                key={`arrSelectItem.${item.name}.${item.id}`}*/}
            {/*                style={[styles.circle]}*/}
            {/*            >*/}
            {/*                <Text style={{backgroundColor: isChoice ? 'red' : 'white'}}>{item.name}</Text>*/}
            {/*            </TouchableOpacity>*/}
            {/*        )*/}
            {/*    })}*/}
            {/*</ScrollView>*/}
        </View>
    </ActionSheet></>)
}

export default function App() {
    const [data, setData] = useState<Array<number>>([])
    const [label, setLabel] = useState<Array<string>>([])
    const getData = (id: number) => {
        const repeating = data.find((el) => el === id)
        if (repeating) {
            //data.filter((el) => el !== repeating)
            setData(data.filter((el) => el !== repeating))
        } else {
            setData([...data, id])
        }
    }
    const getLabel = (label: string) => {
        setLabel([label])
    }

    return (
        <>
            <SafeAreaView style={styles.safeareview}>
                <TouchableOpacity
                    onPress={() => {
                        SheetManager.show(Sheets.testSheet);
                    }}
                    style={styles.btn}>
                    <Text style={styles.btnTitle}>Open ActionSheet</Text>
                </TouchableOpacity>
                <View>
                    <Text>{label}</Text>
                </View>
                <MultiSelector
                    milty={true}
                    arrSelectItem={arr}
                    getData={getData}
                    getLabel={getLabel}
                    choiceElement={data}
                />
                {/*<ActionSheet*/}
                {/*    initialOffsetFromBottom={0.4}*/}
                {/*    onBeforeShow={data => console.log(data)}*/}
                {/*    id={Sheets.testSheet}*/}
                {/*    ref={actionSheetRef}*/}
                {/*    statusBarTranslucent*/}
                {/*    bounceOnOpen={true}*/}
                {/*    drawUnderStatusBar={true}*/}
                {/*    bounciness={4}*/}
                {/*    gestureEnabled={true}*/}
                {/*    defaultOverlayOpacity={0.3}>*/}
                {/*    <View*/}
                {/*        style={{*/}
                {/*            paddingHorizontal: 12,*/}
                {/*        }}>*/}
                {/*        <View style={styles.container}>*/}
                {/*            {colors.map(color => (*/}
                {/*                <TouchableOpacity*/}
                {/*                    onPress={() => {*/}
                {/*                        actionSheetRef.current?.snapToOffset(500);*/}
                {/*                    }}*/}
                {/*                    key={color}*/}
                {/*                    style={[*/}
                {/*                        styles.circle,*/}
                {/*                        {*/}
                {/*                            backgroundColor: color,*/}
                {/*                        },*/}
                {/*                    ]}*/}
                {/*                />*/}
                {/*            ))}*/}
                {/*        </View>*/}
                {/*    </View>*/}
                {/*</ActionSheet>*/}
            </SafeAreaView>
        </>
    )
}

const items = [
    100,
    60,
    150,
    200,
    170,
    80,
    41,
    101,
    61,
    151,
    202,
    172,
    82,
    43,
    103,
    64,
    155,
    205,
    176,
    86,
    46,
    106,
    66,
    152,
    203,
    173,
    81,
    42,
];

const styles = StyleSheet.create({
    footer: {
        height: 100,
    },
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    placeholder: {
        height: 15,
        backgroundColor: '#f0f0f0',
        marginVertical: 15,
        borderRadius: 5,
    },
    circle: {
        width: 60,
        height: 60,
        borderRadius: 100,
    },
    btnLeft: {
        width: 30,
        height: 30,
        backgroundColor: '#f0f0f0',
        borderRadius: 100,
    },
    input: {
        width: '100%',
        minHeight: 50,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#f0f0f0',
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    container: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    scrollview: {
        width: '100%',
        padding: 12,
    },
    btn: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#fe8a71',
        paddingHorizontal: 10,
        borderRadius: 5,
        elevation: 5,
        shadowColor: 'black',
        shadowOffset: {width: 0.3 * 4, height: 0.5 * 4},
        shadowOpacity: 0.2,
        shadowRadius: 0.7 * 4,
    },
    safeareview: {
        justifyContent: 'center',
        flex: 1,
    },
    btnTitle: {
        color: 'white',
        fontWeight: 'bold',
    },
});
