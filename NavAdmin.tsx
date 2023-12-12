import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';

type RootStackParamList = {
  IndexAdmin: undefined;
  PerfilAdmin: undefined;
  RegistroAdmin: undefined;
  EditarUsuarios: undefined;
  Login: undefined;
};

type NavigationProps = StackNavigationProp<RootStackParamList>;

const NavAdmin: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();

  const navigateTo = (screenName: keyof RootStackParamList) => {
    if (screenName === 'IndexAdmin') {
      
      navigation.navigate('IndexAdmin');

    } else {
      navigation.navigate(screenName);
    }
  };

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigateTo('IndexAdmin')}>
        <Icon name="home" size={20} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateTo('PerfilAdmin')}>
        <Icon name="user" size={20} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateTo('RegistroAdmin')}>
        <Icon name="user-plus" size={20} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateTo('EditarUsuarios')}>
        <Icon name="edit" size={20} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogout}>
        <Icon name="close" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 10,
        paddingHorizontal: 20,
        backgroundColor: '#088a88',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        zIndex: 1,
      },
});

export default NavAdmin;
