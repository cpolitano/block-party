"use strict";
import ReactDOM from "react-dom";
import React from "react";
const { Component } = React;
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider, connect } from "react-redux";
import router from "./router";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
const reducers = require("./reducers")

const combinedReducers = combineReducers(reducers);
const blockPartyApp = combineReducers(reducers);
const createStoreWithMiddleware = applyMiddleware(
    thunk
)(createStore);

ReactDOM.render(
    <Provider store={ createStoreWithMiddleware(blockPartyApp) }>
    	<MuiThemeProvider muiTheme={getMuiTheme()}>
        	{ router } 
        </MuiThemeProvider>
    </Provider>,
    document.getElementById("block-party-app")
);