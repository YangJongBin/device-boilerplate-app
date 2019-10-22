/**
 * @format
 */

import { AppRegistry } from "react-native";
import App from "./src/store/Store";
import { name as appName } from "./app.json";

AppRegistry.registerComponent(appName, () => App);
