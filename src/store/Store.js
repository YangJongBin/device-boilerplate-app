import React, { Component } from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { Root } from "native-base";

// import thunk from 'redux-thunk';

import reducers from "../reducers/upsas/reducers";
import Navigation from "../Navigation";
import middleware from "./middleware";

// reducers 와 middleware를 이용해서 store 생성
const store = createStore(reducers, applyMiddleware(middleware));
export default class Store extends Component {
  render() {
    return (
      <Provider store={store}>
        <Root>
          <Navigation />
        </Root>
      </Provider>
    );
  }
}
