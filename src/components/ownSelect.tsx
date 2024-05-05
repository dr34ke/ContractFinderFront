import React from "react";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import Dropdown from "react-native-input-select";

interface Props {
  description?: string|undefined;
  onChange: (value: any) => void;
  value?: string;
  options?: { label: string; value: string }[] |undefined;
}

export default function OwnSelect({
  description,
  onChange,
  value,
  options
}: Props) {
  return (
    <View style={styles.main}>
      <Dropdown
        label={description}
        placeholder="wybierz..."
        options={options??[]}
        selectedValue={value}
        onValueChange={(value: string) => onChange(value)}
        primaryColor={"black"}
        labelStyle={styles.label}
        dropdownStyle={{
          paddingVertical: 5,
          paddingHorizontal: 5,
          minHeight: 45,
        }}
        dropdownIconStyle={{ top: 17, right: 10 }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  label: {
    color:"white",
    letterSpacing: 0.5,
    fontSize: 16,
  },
  main:{
    paddingLeft:10,
    paddingRight:10,
  }
  
});
