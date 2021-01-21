import React, { useContext } from 'react';
import { ThemeContext } from '../../ThemeContext';



const ButtonComponent = (props) => {
    const theme = useContext(ThemeContext)
    const styleObj = {
        padding: '1em 0'
    }
    const globalStyle={
        background:`${theme.theme.secColor}`,
        color:`${theme.theme.primaryColor}`
    }
    return (
        // <Draggable onStop={props.handleStop}>
            <div style={styleObj}>
                <button 
                className="buttonPrimary width100"
                style={props.buttonProps[0].styleObj && globalStyle}
                    onClick={(e) => props.handleBtnClick(props.index)}
                >{props.btnText || 'Click Me'}</button>
            </div>
        // </Draggable>
    )
}

export default ButtonComponent