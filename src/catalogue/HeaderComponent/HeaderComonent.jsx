import React from 'react';
import Draggable from 'react-draggable';



const HeaderComponent = (props) => {
    const styleObj = {
        position: "absolute",
        top: 0,
        left: 0,
        width: '100%',
        height: "80px",
        backgroundColor: `${props.bgColor}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1em',
        boxSizing: 'border-box',
        boxShadow: '0 8px 6px -6px #f1f1f1'
    }
    return (
        // <Draggable>
        <div style={styleObj}>HeaderComponent</div>
        // </Draggable>
    )
}

export default HeaderComponent