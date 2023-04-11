import { App } from "./App";
import "./style.scss";
import { createElement } from "react";
import ReactDOM from "react-dom";

ReactDOM.render(createElement(App), document.querySelector("#root") as HTMLElement);
