import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { App } from "./app";
import { store } from "./app/store";

const wrappedApp = (
    <Provider store={store}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Provider>
);

ReactDOM.render(wrappedApp, document.getElementById("root"));
