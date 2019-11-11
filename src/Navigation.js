import React, { Component } from "react";
import Entypo from "react-native-vector-icons/Entypo";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Transition } from "react-native-reanimated";
import createAnimatedSwitchNavigator from "react-navigation-animated-switch";
// screen
import AuthScreen from "./containers/upsas/AuthScreen";
import HomeScreen from "./containers/upsas/HomeScreen";
import LoginScreen from "./containers/upsas/LoginScreen";
import TrendScreen from "./containers/upsas/TrendScreen";
import JoinScreen from "./containers/upsas/JoinScreen";
import ReportScreen from "./containers/upsas/ReportScreen";
import DiaryScreen from "./containers/upsas/DiaryScreen";

Entypo.loadFont();

// 로그인 화면
// const LoginStack = createStackNavigator({ LoginScreen }, { headerMode: "none" });

const AppBottomTab = createBottomTabNavigator(
  {
    Diary: DiaryScreen,
    Report: ReportScreen,
    Home: HomeScreen,
    Trend: TrendScreen
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;

        // 메뉴에 맞는 아이콘 생성
        if (routeName === "Home") {
          iconName = "home";
        } else if (routeName === "Trend") {
          iconName = "line-graph";
        } else if (routeName === "Report") {
          iconName = "text-document";
        } else if (routeName === "Diary") {
          iconName = "calendar";
        }
        return <Entypo name={iconName} size={25} coloe={tintColor} />;
      }
    })
  }
);

const LoginSwitch = createAnimatedSwitchNavigator(
  {
    JoinScreen,
    LoginScreen
  },
  {
    headerMode: "none"
  }
);

const switchNavigator = createAnimatedSwitchNavigator(
  {
    AuthScreen: AuthScreen,
    Login: LoginSwitch,
    App: AppBottomTab
  },
  {
    initialRouteName: "AuthScreen"
  }
);

export default createAppContainer(switchNavigator);
