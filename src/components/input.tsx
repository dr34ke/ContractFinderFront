import { useState } from "react";
import { KeyboardTypeOptions, SafeAreaView, StyleSheet, TextInput } from "react-native";

interface Props {
    value :string
    onChange : ((text:string)=>void)
  placeHolder: string;
  kbType?: KeyboardTypeOptions
  secure?:boolean 
}

export default function Input({ value, onChange, placeHolder, kbType=undefined, secure=false}: Props) {
  return (
    <TextInput
      style={styles.input}
      onChangeText={onChange}
      value={value}
      placeholder={placeHolder}
      keyboardType={kbType}
      secureTextEntry={secure}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 3,
    borderWidth: 0.3,
    padding: 10,
  },
});
