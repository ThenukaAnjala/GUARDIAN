import React from "react";
import { Text, View, TextInput, StyleSheet } from "react-native";

const UserInputs = ({ name, value, setValue }) => {
  return (
    <View style={{ marginHorizontal: 24, marginTop: 10 }}>
      <Text style={{ fontSize: 18, fontWeight: "500", color: "#898484" }}>
        {name}
      </Text>
      <TextInput
        style={styles.inputs}
        value={value}
        onChangeText={(text) => setValue(text)}
      ></TextInput>
    </View>
  );
};

const styles = StyleSheet.create({
  inputs: {
    paddingLeft:20,
    borderWidth: 0.5,
    height: 48,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: "#F7F7F7",
    borderColor: "#ADC4CE",
  },
});

export default UserInputs;
