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
import SearchScreen from "./containers/upsas/SearchScreen";
import MyScreen from "./containers/upsas/MyScreen";
import JoinScreen from "./containers/upsas/JoinScreen";
//componet
import DiaryUpdateScreen from "./containers/upsas/DiaryUpdateScreen";
import DiaryAddScreen from "./containers/upsas/DiaryAddScreen";

// icon load
EntypoIncon.loadFont();

// app 아래 탭 메뉴 세팅
const BottomTabNavigator = createBottomTabNavigator(
  {
    Home: HomeScreen,
    Trend: TrendScreen,
    Report: ReportScreen,
    Diary: DiaryScreen,
    My: MyScreen
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
        } else if (routeName == "My") {
          iconName = "emoji-happy";
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
    // SearchScreen: props => (
    //   <SearchScreen
    //     {...props}
    //     searchInfo={props.navigation.state.params.searchInfo}
    //   ></SearchScreen>
    // ),
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
