
import Post from "@models/Post.js";
import "./styles/styles.css";
import "./styles/less.less";
import "./styles/sass.scss";
import "./babel.js";
import WebpackLogo from "./assets/webpack_logo.png";
import React from "react";
import { createRoot } from 'react-dom/client';

const post = new Post("First Post", WebpackLogo);

console.log("Post to string", post.toString())

const App = () => {
    return (
        <>
            <main class="container">
                <h1>Webpack Research</h1>
                <div class="logo"></div>
                <h1 class="less">Webpack Research</h1>
                <h1 class="sass">Webpack Research</h1>
            </main>
        </>
    )
}
const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);
