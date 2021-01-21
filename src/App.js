import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import './App.css';
import Preview from "./components/Preview/Preview";
import Workspace from "./components/Workspace/Workspace";
import MainRouting from "./layout/MainRouting";
import { ThemeProvider } from "./ThemeContext";


function RouteWithLayout({ layout, component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        React.createElement(
          layout,
          props,
          React.createElement(component, props)
        )
      }
    />
  );
}

function App() {
  return (
    <Router>
      <ThemeProvider>
      <Switch>
        <RouteWithLayout
          layout={MainRouting}
          exact
          path="/"
          component={Workspace}
        />
        <RouteWithLayout
          layout={MainRouting}
          exact
          path="/preview"
          component={Preview}
        />
        
      </Switch>
      </ThemeProvider>
    </Router>
  );
}

export default App;
