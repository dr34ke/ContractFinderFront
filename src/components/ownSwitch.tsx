import React from "react";
import { Switch, View, Text, StyleSheet } from "react-native";


interface Props{
    description:string,
    onChange:((value:boolean)=>void)
    value: boolean,
}

export default function OwnSwitch({description, onChange, value}:Props){
 return(
    <View style={styles.container}>
        <Switch
        onValueChange={onChange}
        trackColor={{ false: "#d9d3d2", true: "#E9E0D8" }}
        thumbColor={value ? "#d9d3d2" : "#E9E0D8"}
        value={value}
      />
        <Text style={styles.text}> 
            {description}
        </Text>
    </View>
 )
}
const styles=StyleSheet.create({
    container:{
        paddingLeft:5,
        flexDirection:"row",
        height:45,
        alignItems:"center"
    },
    text:{
        letterSpacing:0.5,
        fontSize:16
    }
})