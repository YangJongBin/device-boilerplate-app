import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import createAnimatedSwitchNavigator from "react-navigation-animated-switch";
import React, { Component } from "react";
import Entypo from "react-native-vector-icons/Entypo";

// component
import MenuButton from "./components/MenuButton";
// screen...
import AuthLoading from "./containers/AuthLoading";
import HomeScreen from "./containers/HomeScreen";
import LoginScreen from "./containers/LoginScreen";
import TrendScreen from "./containers/TrendScreen";
import { Icon } from "native-base";
// import LineChart from '../components/LineChart';

Entypo.loadFont();

// 앱 메인 화면
const AppStack = createBottomTabNavigator(
  {
    Trend: TrendScreen,
    Home: HomeScreen
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Entypo;
        let iconName;
        if (routeName === "Home") {
          // IconComponent = HomeIconWithBadge;
          // iconName = `ios-information-circle${focused ? "" : "-outline"}`;
          iconName = "home";
        } else if (routeName === "Trend") {
          iconName = "line-graph";
        }
        return <IconComponent name={iconName} size={25} coloe={tintColor} />;
      }
    })
  }
);

// 로그인 화면
const AuthStack = createStackNavigator({ LoginScreen: LoginScreen }, { headerMode: "none" });

// switch 적용
const switchNavigator = createAnimatedSwitchNavigator(
  {
    App: AppStack,
    // AuthLoading: AuthLoading,
    Auth: AuthStack
  },
  {
    initialRouteName: ""
  }
);

export default createAppContainer(switchNavigator);
