import { useState } from "react";
import React from "react";
import {
  KeyboardTypeOptions,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

interface Props {
  value: string;
  onChange: (text: string) => void;
  placeHolder: string;
  kbType?: KeyboardTypeOptions;
  secure?: boolean;
  iconName?:string|undefined,
  numberOfLines?: number|undefined,
}

export default function Input({
  value,
  onChange,
  placeHolder,
  kbType = undefined,
  secure = false,
  iconName = undefined,
  numberOfLines=1,
}: Props) {
  return (
    <View style={styles.searchSection}>
      {iconName && <Ionicons name={iconName} style={styles.searchIcon}/>}
      <TextInput
        style={styles.input}
        onChangeText={onChange}
        numberOfLines={numberOfLines}
        value={value}
        placeholder={placeHolder}
        keyboardType={kbType}
        secureTextEntry={secure}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  searchIcon: {
    padding: 10,
    fontSize:20
  },
  input: {
    height: 40,
    margin: 3,
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
  },
});
