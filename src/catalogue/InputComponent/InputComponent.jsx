import React, { useContext } from 'react';
import { ThemeContext } from "../../ThemeContext";


const InputComponent = (props) => {
    const styleObj = {
        padding: '1em 0',
    }
    const sourceContext = useContext(ThemeContext);


    const labelStyle = {
        display: 'block',
        fontWeight: 'bold',
        color: `${sourceContext.theme.primaryColor}`
    }

    const globalStyle={
        background:`${sourceContext.theme.secColor}`
}

return (
    <React.Fragment>
        {/* <Draggable onStop={props.handleStop}> */}
        <div style={styleObj}>
            <label style={labelStyle || props.global}>{props.label || 'Input Label'}</label>
            <input
                style={props.inputProps[0].styleObj && globalStyle}
                onFocus={(e) => props.handleFocus(props.index)}
                placeholder={props.placeholder || 'Enter the value'}
                value={props.inputValue}
                type={props.type}
                readOnly={(props.readOnly === 'true')}
                disabled={(props.disabled === 'true')}
                className="width100"
            ></input>
        </div>
        {/* </Draggable> */}
    </React.Fragment>
)
}

export default InputComponent