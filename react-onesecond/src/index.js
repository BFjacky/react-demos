import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import MainPage from "./pages/main";
import ScorePage from "./pages/score";
import { BrowserRouter, Route } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import registerServiceWorker from './registerServiceWorker';

function todos(state = {}, action) {
    switch (action.type) {
        case 'PUSH_SCORE':
            if (!state.timeScores) {
                //如果为undefined
                return Object.assign(state, { timeScores: [].concat([action.timeResStr]) })
            }

            if (state.timeScores.length) {
                return Object.assign(state, { timeScores: state.timeScores.concat([action.timeResStr]) })
            }
            break;
        default:
            break;
    }
}
const store = createStore(todos)

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter basename="/">
            <div>
                <Route path="/home" component={App} />
                <Route path="/main" component={MainPage} />
                <Route path="/score" component={ScorePage} />
            </div>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
