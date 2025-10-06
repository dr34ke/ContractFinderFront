import React from "react"
import { View,StyleSheet,Text, TextInput } from "react-native"

interface Props{
    label:string
    value?:string
    onChange: (val : string)=>void
    nLines?: number 
}

 export default function OwnInput({label, value, onChange, nLines=1}:Props){

    return (
    <View style={styles.descriptionContainer}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          editable
          multiline
          style={styles.descriptionInput}
          numberOfLines={nLines}
          maxLength={40}
          value={value}
          onChangeText={onChange}
        />
      </View>
    )
}
const styles = StyleSheet.create({
    label: {
      fontSize: 17,
      marginVertical: 15,
    },
    descriptionContainer: {
      paddingHorizontal: 10,
    },
    descriptionInput: {
      borderWidth: 0.5,
      borderColor: "#000035",
      backgroundColor: "#f8f8f8",
      borderRadius: 10,
      paddingTop: 5,
      paddingLeft: 10,
      paddingRight: 10,
      textAlignVertical: "top",
    },
  });