import Post from "@models/Post.js";
import "./styles/styles.css";
import WebpackLogo from "./assets/webpack_logo.png";

const post = new Post("First Post", WebpackLogo);

console.log("Post to string", post.toString())