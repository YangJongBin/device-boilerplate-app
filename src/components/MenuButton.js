import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Icon } from 'native-base';

const MenuButton = props => {
  return (
    <Button
      style={styles.menuBtn}
      onPress={() => {
        props.navigation.navigate('Auth');
      }}
    >
      <Icon name="menu" />
    </Button>
  );
};

const styles = StyleSheet.create({
  menuBtn: {
    backgroundColor: '#2f3640'
  }
});

export default MenuButton;
