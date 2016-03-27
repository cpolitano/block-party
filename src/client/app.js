"use strict";
import ReactDOM from "react-dom";
import React from "react";
const { Component } = React;
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider, connect } from "react-redux";
// import reducers
// import container component

const blockPartyApp = combineReducers({});

const createStoreWithMiddleware = applyMiddleware(
    thunk
)(createStore);

const BlockPartyApp = () => (
    <div>block party</div>
);

ReactDOM.render(
    <Provider store={ createStoreWithMiddleware(blockPartyApp) }>
        <BlockPartyApp />
    </Provider>,
    document.getElementById("block-party-app")
);