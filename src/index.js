console.log("git date", GIT_COMMIT_DATE);
console.log("git message", GIT_COMMIT_MESSAGE);
console.log("git rev", GIT_COMMIT_REV);

import "./service-worker-registration";
import initReactFastclick from "react-fastclick";
initReactFastclick();

import React from "react";
import ReactDOM from "react-dom";
import {HashRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {leanReducer, composeReducers} from "lean-redux";
import {createStore, applyMiddleware, compose} from "redux";
import persistState from "redux-localstorage";

import Main from "./Main";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(leanReducer, {}, composeEnhancers(persistState()));

const Root = () => (
    <HashRouter>
        <Provider store={store}>
            <Main />
        </Provider>
    </HashRouter>
);

const container = document.getElementById("app-container");

ReactDOM.render(<Root />, container);
