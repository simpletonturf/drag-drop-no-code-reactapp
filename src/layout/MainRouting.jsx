import React, { Component } from "react";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Navigation from "../components/Navigation/Navigation";
import ToolBar from "../components/ToolBar/ToolBar";


class MainRouting extends Component {
    render() {
        const childrenWithProps = React.Children.map(this.props.children, (child) =>
        React.cloneElement(child))
        return (
            <React.Fragment>
                <Header />
                <Navigation />
                {childrenWithProps}
                <ToolBar/>
            </React.Fragment>

        );
    }
}

export default MainRouting;
