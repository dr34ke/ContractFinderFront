import React from "react";
import { useState } from "react";
import { KeyboardTypeOptions, Pressable, Text, StyleSheet } from "react-native";

interface Props {
  title: string;
  onPress: () => void;
}

export default function OwnButton({ title, onPress }: Props) {
  return (
    <Pressable onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    letterSpacing:0.5
  },
  button: {
    alignSelf:"center",
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    width:"45%",
    padding: 10,
    margin: 10,
  },
});
