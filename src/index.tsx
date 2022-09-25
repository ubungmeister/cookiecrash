import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {createGlobalStyle} from "styled-components";

import background from './images/darius-anton-coffee-01.gif'

const Global = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Hanalei Fill', cursive;

  }

  body {
    background-image: url(${background});
    background-size: 1300px;
    min-height: 100vh;
  }
  .font-link {
    font-family: 'Hanalei Fill', cursive;
  }
`


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <Global/>
        <App/>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

