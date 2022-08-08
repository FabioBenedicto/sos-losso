import React, { useState, useRef, useEffect, createRef } from 'react';
import { Text, View, Image, TextInput, TouchableOpacity, Alert, ScrollView, Modal, Animated, Dimensions, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from '../../components/Button';
import gStyles from '../../components/gStyles';
import styles from './styles';
import Logo from '../../assets/Logo.png';

import api from '../../services/api';
// import useUser from '../../hooks/useUser';

export default function Login() {
    const navigation = useNavigation();
    const { width, height } = Dimensions.get('window');
    const anV = useRef(new Animated.ValueXY({ x: 0, y: height })).current;
    const cont = createRef();

    const [modV, setModV] = useState(false);
    const [alertV, setAlertV] = useState(false);
    const [email, setEmail] = useState('');

    // const [user, setUser] = useUser();

    const requestBody = {
        email,
    };

    const func = () => {
        if (verif()) {
            try {
                api
                    .post('/students/verifyPasswordExistence', requestBody)
                    .then((response) => {
                        console.log(email);
                    });
            } catch (error) {
                console.log(error);
            }
        }
    };

    const scrClear = () => {
        if (email != '') {
            cont.current.clear();
        }

        setEmail('');
    };

    const verif = () => {
        if (email != '') {
            return true;
        }

        Alert.alert('>:(');
        return false;
    };

    const anStart = () => {
        Animated.timing(
            anV,
            {
                toValue: { x: 0, y: height },
                duration: 2,
                useNativeDriver: false,
            },
        ).start();

        setTimeout(() => {
            setModV(true);

            Animated.timing(
                anV,
                {
                    toValue: { x: 0, y: height / 2 },
                    duration: 300,
                    useNativeDriver: false,
                },
            ).start();
        }, 2);
    };

    const backAction = () => {
        setAlertV(true);
        /* Alert.alert('Calma!', 'Tem certeza que deseja sair do aplicativo?', [
            {
                text: 'Cancelar',
                onPress: () => null,
            },

            { text: 'Sim',
                onPress: () => BackHandler.exitApp() },
        ]); */
        return true;
    };

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', backAction);

        return () => BackHandler.removeEventListener('hardwareBackPress', backAction);
    }, []);

    return (
        <ScrollView>

            <Modal visible={modV} transparent animationType="none">

                <TouchableOpacity style={gStyles.background} onPress={() => setModV(false)} />

                <Animated.View style={[gStyles.contentContainer, anV.getLayout(), { alignContent: 'center' }]}>

                    <Text style={[gStyles.title, gStyles.modalTitle]}>E-mail Institucional</Text>

                    <View style={gStyles.modalTextContainer}>
                        <Text style={[gStyles.subtitle, gStyles.modalText]}>cl + RA + @g.unicamp.br</Text>
                        <Text style={gStyles.subtitle}>Ex: &quot;cl200126@g.unicamp.br&quot;</Text>
                    </View>

                    <Button text="Fechar" press={() => setModV(false)} />

                </Animated.View>

            </Modal>

            <Modal visible={alertV} transparent animationType="none">

                <TouchableOpacity style={gStyles.background} onPress={() => setAlertV(false)} />

                <View style={[gStyles.contentContainerAlert, { alignContent: 'center' }]}>

                    <View>
                        <Text style={[gStyles.smallTitle, { textAlign: 'center' }]}>Calma!</Text>
                    </View>

                    <View style={[gStyles.lockerInfo, { padding: 20 }]}>
                        <View style={[{ flex: 1, alignSelf: 'center' }]}>
                            <Text style={gStyles.smallSubtitle}>Tem certeza que deseja sair?</Text>
                        </View>
                        <View style={[gStyles.line, { marginTop: 30 }]} />
                        <View style={[gStyles.lineInfo, { padding: 10, paddingRight: 45 }]}>
                            <TouchableOpacity style={[gStyles.linkContainer, { alignSelf: 'flex-start' }]} onPress={() => setAlertV(false)}>
                                <Text style={gStyles.linkText}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[gStyles.linkContainer, { alignSelf: 'flex-end' }]} onPress={() => BackHandler.exitApp()}>
                                <Text style={gStyles.linkText}>Sim</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>

            </Modal>

            <View style={gStyles.container}>

                <View style={gStyles.container2}>
                    <View style={gStyles.imageContainer}>
                        <Image source={Logo} style={gStyles.image} />
                    </View>

                    <View style={gStyles.bodyContainer}>
                        <View style={gStyles.textContainer}>
                            <Text style={gStyles.title}>Entrar</Text>
                            <Text style={gStyles.subtitle}>Digite seu e-mail da Unicamp</Text>
                        </View>

                        <View style={gStyles.inputContainer}>
                            <TextInput style={gStyles.input} ref={cont} value={email} placeholder="E-mail Institucional" placeholderTextColor="#7D7B7B" onChangeText={(text) => setEmail(text)} blurOnSubmit={false} onSubmitEditing={(e) => func()} />
                        </View>

                        <TouchableOpacity style={gStyles.linkContainer} onPress={() => anStart()}>
                            <Text style={gStyles.linkText}>Esqueceu seu e-mail?</Text>
                        </TouchableOpacity>

                    </View>

                </View>

                <Button text="Continuar" press={func} />
            </View>
        </ScrollView>
    );
}
