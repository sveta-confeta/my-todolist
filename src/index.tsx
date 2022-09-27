import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import { HashRouter} from "react-router-dom";
import {store} from "./redux/redux-store";

const container = document.getElementById('root');
let root = ReactDOM.createRoot(container as HTMLElement ) ;
root.render(<React.StrictMode>

    <Provider store={store}>
        <HashRouter>
            <App/>
        </HashRouter>
    </Provider>,

</React.StrictMode>,);

//
//
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();