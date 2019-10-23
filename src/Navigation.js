import React, { Component } from "react";
import { connect } from "react-redux";
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
import Header from "./components/Header";

Entypo.loadFont();

const siteId = 1; //FIXME:
const siteName = "SITE NAME"; //FIXME:
// const { siteInfo } = props.authReducerInfo;
// const {} = siteInfo;

//홈 화면
const HomeStack = createStackNavigator(
  {
    HomeSreen: () => {
      return <HomeScreen siteId={siteId} />;
    }
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      header: <Header siteId={siteId} siteName={siteName} />
    }),
    initialRouteName: ""
  }
);
// 트렌드 화면
const TrendStack = createStackNavigator(
  {
    TrendScreen: () => {
      return <TrendScreen siteId={siteId} />;
    }
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      header: <Header />
    }),
    initialRouteName: ""
  }
);

// 로그인 화면
const LoginStack = createStackNavigator({ LoginScreen }, { headerMode: "none" });

// TODO: screen stack 수집
const AppBottomTab = createBottomTabNavigator(
  {
    Trend: TrendStack,
    Home: HomeStack
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

// TODO:switch 적용
const switchNavigator = createAnimatedSwitchNavigator(
  {
    AuthScreen: AuthScreen,
    App: AppBottomTab,
    Login: LoginStack
  },
  {
    initialRouteName: "AuthScreen"
  }
);

const mapStateToProps = state => {
  return {
    authReducerInfo: state.authReducer
  };
};

export default connect(mapStateToProps)(createAppContainer(switchNavigator));
