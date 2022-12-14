import React, { useState, useEffect, createRef } from 'react';
import { Text, View, Image, TextInput, TouchableOpacity, Alert, ScrollView, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from '../../components/Button';
import gStyles from '../../components/gStyles';
import styles from './styles';
import Logo from '../../assets/Logo.png';

import useUser from '../../hooks/useUser';
import api from '../../services/api';

export default function LoginP2({ route }) {
    const navigation = useNavigation();
    const cont = createRef();
    const { user, setUser } = useUser();
    const [email, setEmail] = useState('');

    //const [email, setEmail] = useState(route.params.passEmail);
    const [pass, setPass] = useState('');

    const func = () => {
        if (verif()) {
            /*navigation.navigate('Home', {
                passEmail: email,
            });
            scrClear();
            */

            const requestBody = {
                email: user.email,
                password: pass,
            }

            api
                .post('/students/session', requestBody, { withCredentials: true })
                .then((response) => {
                    setUser(response.data)
                    //setLoading(false)
                    //toast.success('Login realizado com sucesso')
                    console.log('Logi realizado com sucesso')
                    //setTimeout(() => {
                    //toast.dismiss()
                    //navigate('/')
                    //}, 1500)
                    navigation.navigate('Home')
                })
                .catch(err => {
                    setLoading(false)
                    toast.error(err.response.data.erro)
                })
        }

    }

    const scrClear = () => {
        if (pass != '') {
            cont.current.clear();
        }

        setPass('');
    };

    const verif = () => {
        if (pass != '') {
            return true;
        }

        Alert.alert('>:(');
        return false;
    };

    const backAction = () => {
        navigation.navigate('Login', {
            passEmail: email,
        });

        scrClear();

        return true;
    };

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', backAction);
        console.log(user);
        return () => BackHandler.removeEventListener('hardwareBackPress', backAction);
    }, []);

    return (
        <ScrollView>
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
                            <TextInput style={[gStyles.input, styles.inputDisable]} value={user.email} editable={false} selectTextOnFocus={false} placeholder="E-mail" placeholderTextColor="#7D7B7B" />
                            <TextInput style={gStyles.input} value={pass} ref={cont} placeholder="Senha" placeholderTextColor="#7D7B7B" onChangeText={(text) => setPass(text)} blurOnSubmit={false} onSubmitEditing={(e) => func()} />
                        </View>

                        <TouchableOpacity
                            style={gStyles.linkContainer}
                            onPress={() => {
                                navigation.navigate('Verification', {
                                    passEmail: email,
                                });
                            }}
                        >
                            <Text style={gStyles.linkText}>Esqueceu sua senha?</Text>
                        </TouchableOpacity>
                    </View>

                </View>

                <Button text="Continuar" press={func} />
            </View>
        </ScrollView>
    );
}
