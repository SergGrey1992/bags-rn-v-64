import {StatusBar} from 'expo-status-bar';
import {Animated, StyleSheet, Text, View, Button, LayoutChangeEvent} from 'react-native';
import {NativeBaseProvider, Box, Modal} from "native-base";
import React, {useRef, useState} from "react";


const Test1 = ({animatedValue}:any) => {

    const start = () => {
        Animated.timing(animatedValue, {
            toValue: 1,
            useNativeDriver: false
        }).start()
    }

    return <View style={{flex: 1, justifyContent:'center', alignItems:'center', backgroundColor: '#fcb0b0'}}>
        <Button title={'step 2'} onPress={start}/>
    </View>
}
const Test2 = ({animatedValue}:any) => {
    const start = () => {
        Animated.timing(animatedValue, {
            toValue: 2,
            useNativeDriver: false
        }).start()
    }

    return <View style={{flex: 1, justifyContent:'center', alignItems:'center', backgroundColor: '#dafcb0'}}>
        <Button title={'step 3'} onPress={start}/>
    </View>
}
const Test3 = ({animatedValue}:any) => {
    const start = () => {
        Animated.timing(animatedValue, {
            toValue: 0,
            useNativeDriver: false
        }).start()
    }
    return <View style={{flex: 1, justifyContent:'center', alignItems:'center', backgroundColor: '#b0fcea'}}>
        <Button title={'step 1 and close'} onPress={start}/>
    </View>
}


type MeasuresType = {
    x: number
    y: number
    width: number
    height: number
}

export default function App() {
    const [open, setOpen] = useState(false)
    const [measures, setMeasures] = React.useState<MeasuresType>({width: 0, height: 0, y: 0, x: 0})
    const animatedValue = useRef(new Animated.Value(0.01)).current


    const closed = () => {
        Animated.timing(animatedValue, {
            toValue: 0,
            delay: 1000,
            useNativeDriver: false
        }).start()
    }

    const start = () => {
        Animated.timing(animatedValue, {
            toValue: 1,
            useNativeDriver: false
        }).start()
    }
    const getLayout = (event: LayoutChangeEvent) => {
        // m.push({
        //     x: event.nativeEvent.layout.x,
        //     y: event.nativeEvent.layout.y,
        //     height: event.nativeEvent.layout.height,
        //     width: event.nativeEvent.layout.width,
        // })
        //
        // const sorting = m
        //     .sort((a, b) => a.x - b.x)
        //     .map((el) => el)
        setMeasures({
            x: event.nativeEvent.layout.x,
            y: event.nativeEvent.layout.y,
            height: event.nativeEvent.layout.height,
            width: event.nativeEvent.layout.width,
        })
        //console.log('mm', m)
    }

    return (
        <NativeBaseProvider>
            <View style={{flex: 1, justifyContent: 'center'}}>
                <Button title={'open modal'} onPress={() => setOpen(true)}/>
                <Modal
                    style={{paddingTop: 100, backgroundColor: 'rgba(0, 0, 0, .6)'}}
                    justifyContent={'flex-start'}
                    isOpen={open}
                    onClose={() => setOpen(false)}
                >
                    <Modal.Content style={styles.modalContent}>
                        <Modal.Body _scrollview={{scrollEnabled: false}} p={0}>
                            <Animated.View
                                onLayout={getLayout}
                                style={[{flexDirection: 'row', transform: [{
                                        translateX: animatedValue.interpolate({
                                            inputRange: [0,1,2],
                                            outputRange: [0,-(measures.width), -(measures.width * 2)]
                                        })
                                    }]}]}>
                                <View style={{width: measures.width}}>
                                    <Test1 animatedValue={animatedValue}/>
                                </View>
                                <View style={{width: measures.width}}>
                                    <Test2 animatedValue={animatedValue}/>
                                </View>
                                <View style={{backgroundColor: 'blue', width: measures.width, height: 100}}>
                                    <Test3 animatedValue={animatedValue}/>
                                </View>
                            </Animated.View>
                        </Modal.Body>
                    </Modal.Content>
                </Modal>
            </View>
        </NativeBaseProvider>

    );
}

const styles = StyleSheet.create({
    modalContent: {
        width: '90%',
        borderRadius: 2
    },
    headerText: {
        color: '#737067',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 20,
    }
})
