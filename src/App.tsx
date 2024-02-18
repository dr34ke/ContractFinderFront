import * as React from "react";
import FlashMessage from "react-native-flash-message";
import { SafeAreaView } from "react-native-safe-area-context";
import Navigator from "./navigation/appNavigation";
import { View,Text } from "react-native";

const App = () => {
  return (
      <>
        <Navigator/>
      </>
  );
};

export default App;
