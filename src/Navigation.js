import React, { Component } from "react";
import Entypo from "react-native-vector-icons/Entypo";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import { Transition } from "react-native-reanimated";
import createAnimatedSwitchNavigator from "react-navigation-animated-switch";
// screen
import AuthLoading from "./containers/upsas/AuthLoading";
import HomeScreen from "./containers/upsas/HomeScreen";
import LoginScreen from "./containers/upsas/LoginScreen";
import TrendScreen from "./containers/upsas/TrendScreen";
import Header from "./components/Header";

Entypo.loadFont();

const HomeStack = createStackNavigator(
  {
    HomeScreen
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      header: <Header />
    }),
    initialRouteName: ""
  }
);

const TrendStack = createStackNavigator(
  {
    TrendScreen
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      header: <Header />
    }),
    initialRouteName: ""
  }
);

// 앱 메인 화면
const AppStack = createBottomTabNavigator(
  {
    Home: HomeStack,
    Trend: TrendStack
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
        }
        return <Entypo name={iconName} size={25} coloe={tintColor} />;
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
