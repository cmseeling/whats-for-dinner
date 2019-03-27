import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// import { ConnectedRouter } from 'react-router-redux';
import { BrowserRouter } from 'react-router-dom';
import configureAppStore from './store/index';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const store = configureAppStore({});

ReactDOM.render(
    <Provider store={store}>
      {/* <ConnectedRouter history={history}> */}
        <BrowserRouter>
            <App/>
        </BrowserRouter>
      {/* </ConnectedRouter> */}
    </Provider>,
    document.getElementById('root') as HTMLElement
  );
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
