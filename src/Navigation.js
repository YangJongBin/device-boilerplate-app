import React, { Component } from "react";
import { createAppContainer } from "react-navigation";
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator
} from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import { Transition } from "react-native-reanimated";
import EntypoIncon from "react-native-vector-icons/Entypo";
import createAnimatedSwitchNavigator from "react-navigation-animated-switch";
// screen
import AuthScreen from "./containers/AuthScreen";
import HomeScreen from "./containers/HomeScreen";
import LoginScreen from "./containers/LoginScreen";
import TrendScreen from "./containers/TrendScreen";
import ReportScreen from "./containers/ReportScreen";
import DiaryScreen from "./containers/DiaryScreen";
import MoreScreen from "./containers/MoreScreen";
import JoinScreen from "./containers/JoinScreen";
//componet
import DiaryUpdateScreen from "./containers/DiaryUpdateScreen";
import DiaryAddScreen from "./containers/DiaryAddScreen";

// icon load
EntypoIncon.loadFont();

// app 아래 탭 메뉴 세팅
const BottomTabNavigator = createBottomTabNavigator(
  {
    Home: HomeScreen,
    Trend: TrendScreen,
    Report: ReportScreen,
    Diary: DiaryScreen,
    More: MoreScreen
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
          iconName = "open-book";
        } else if (routeName == "More") {
          iconName = "dots-three-horizontal";
        }
        return (
          <EntypoIncon
            name={iconName}
            size={25}
            coloe={tintColor}
            style={{ marginTop: 10 }}
          />
        );
      }
    })
  }
);

const StackNavigator = createStackNavigator(
  {
    App: BottomTabNavigator,
    DiaryUpdateScreen: props => (
      <DiaryUpdateScreen
        {...props}
        selectedDiaryInfo={props.navigation.state.params}
      ></DiaryUpdateScreen>
    ),
    DiaryAddScreen: DiaryAddScreen,
    Join: JoinScreen
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
  },
  {
    initialRouteName: "AuthScreen"
  }
);

export default createAppContainer(SwitchNavigator);
