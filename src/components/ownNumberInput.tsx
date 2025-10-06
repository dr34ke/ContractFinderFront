import NumericInput from "react-native-numeric-input";
import { StyleSheet, TextInput, View, Text } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";

interface Props {
  description: string;
  onChange: (value: any) => void;
  value?: number;
}

export default function OwnNumberInput({
  description,
  onChange,
  value,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{description}</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        onChangeText={(text) => onChange(text)}
        value={value ? value!.toString() : "0"}
        maxLength={3} //setting limit of input
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  text: {
    fontSize: 17,
    marginBottom:15
  },
  input: {
    paddingLeft:25,
    height:40,
    borderRadius:5,
    borderColor:"#000035",
    backgroundColor:"#f8f8f8",
    fontSize: 18,
    borderWidth:0.7
  },
});
