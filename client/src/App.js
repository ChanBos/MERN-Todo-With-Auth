// Imported React library and stylesheet.
import React from "react";
// Imported stylesheet.
import "./App.css";
// Imported screens.
import Home from "./screens/Home";
import CompiledTodo from "./screens/CompiledTodo";
// Imported router and route matchers from React Router Dom.
import { BrowserRouter, Route, Switch } from "react-router-dom";

/**
 * Created the App function and returning components to be exported to Index.js.
 * Utilized BrowserRouter, Switch and Route from Bootstrap to navigate via links.
 * Added the React Bootstrap link.
 * @returns Application that returns all of the components.
 */

const App = () => {
  return (
    <div className="app">
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
        integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
        crossOrigin="anonymous"
      ></link>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/users/user" exact component={CompiledTodo} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

// Exported the App.js to Index.js.
export default App;
