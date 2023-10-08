import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createGlobalStyle } from "styled-components";
import { RecoilRoot } from "recoil";

const root = ReactDOM.createRoot(document.getElementById("root"));

const GlobalStyle = createGlobalStyle`

@import url('https://fonts.cdnfonts.com/css/rubik');

* {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
  box-sizing: border-box;
  transition: all 0.2s;
}
body {
  font-family: 'Rubik', 'Source Sans Pro', sans-serif;
  background-color: #fff;
  color: #000;
  padding-top: 60px;
}
a {
  text-decoration:none;
  color: inherit;
}
menu, ol, ul, li {
  list-style: none;
}
`;

root.render(
  <RecoilRoot>
    <GlobalStyle />
    <App />
  </RecoilRoot>
);
