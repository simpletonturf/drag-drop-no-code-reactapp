import React, { Component } from "react";


class IntialRouting extends Component {
    render() {
        const childrenWithProps = React.Children.map(this.props.children, (child) =>
        React.cloneElement(child))
        return (
            <React.Fragment>  
                {childrenWithProps}
            </React.Fragment>

        );
    }
}

export default IntialRouting;
