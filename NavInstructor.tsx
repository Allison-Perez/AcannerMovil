// NavInstructor.tsx
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';

type RootStackParamList = {
  IndexInstructor: undefined;
  BlogInstructor: undefined;
  GuiasInstructor: undefined;
  Horarios: undefined;
  Asistencia: undefined;
  PerfilInstructor: undefined;
  Login: undefined;
};

type NavigationProps = StackNavigationProp<RootStackParamList>;

const NavInstructor: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();

  const navigateTo = (screenName: keyof RootStackParamList) => {
    if (screenName === 'IndexInstructor') {
      navigation.navigate('IndexInstructor');
    } else {
      navigation.navigate(screenName);
    }
  };

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigateTo('IndexInstructor')}>
        <Icon name="home" size={20} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateTo('BlogInstructor')}>
        <Icon name="book" size={20} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateTo('GuiasInstructor')}>
        <Icon name="list" size={20} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateTo('Horarios')}>
        <Icon name="clock-o" size={20} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateTo('Asistencia')}>
        <Icon name="calendar" size={20} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateTo('PerfilInstructor')}>
        <Icon name="user" size={20} color="white" />
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

export default NavInstructor;
