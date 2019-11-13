import React, { Component } from "react";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import EntypoIncon from "react-native-vector-icons/Entypo";
import createAnimatedSwitchNavigator from "react-navigation-animated-switch";
// screen
import AuthScreen from "./containers/upsas/AuthScreen";
import HomeScreen from "./containers/upsas/HomeScreen";
import LoginScreen from "./containers/upsas/LoginScreen";
import TrendScreen from "./containers/upsas/TrendScreen";
import ReportScreen from "./containers/upsas/ReportScreen";
import DiaryScreen from "./containers/upsas/DiaryScreen";
//componet
import DiaryStackView from "./components/DiaryStackView";

// icon load
EntypoIncon.loadFont();

const test = value => {
  alert(value);
};

// app 아래 탭 메뉴 세팅
const BottomTabNavigator = createBottomTabNavigator(
  {
    Diary: DiaryScreen,
    Home: HomeScreen,
    Report: ReportScreen,
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
        return <EntypoIncon name={iconName} size={25} coloe={tintColor} />;
      }
    })
  }
);

//FIXME: 네이밍 조금 이상..
const StackNavigator = createStackNavigator(
  {
    App: BottomTabNavigator,
    DiaryMemoView: props => (
      <DiaryStackView
        {...props}
        selectedMemo={props.navigation.state.params}
      ></DiaryStackView>
    )
  },
  {
    headerMode: "none",
    mode: "modal"
  }
);

// 모든 페이지 스위치 스택
const SwitchNavigator = createAnimatedSwitchNavigator(
  {
    AuthScreen: AuthScreen,
    Login: LoginScreen,
    App: StackNavigator
    // App: AppBottomTab
  },
  {
    initialRouteName: "AuthScreen"
  }
);

export default createAppContainer(SwitchNavigator);
