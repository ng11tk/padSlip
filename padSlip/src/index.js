import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.js";
import reportWebVitals from "./reportWebVitals.js";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
  headers: {
    "x-hasura-admin-secret": process.env.REACT_APP_HASURA_ADMIN_SECRET,
  },
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
