import React, { useContext } from 'react';
import "../../scss/style.scss"
import { ThemeContext } from '../../ThemeContext';


const SelectComponent = (props) => {
    const theme=useContext(ThemeContext)
    const globalTheme={
        color:`${theme.theme.primaryColor}`,
        background:`${theme.theme.secColor}`
    }
    const options = () => {
        return (
            <React.Fragment>
                {props.dropDowndata[0].defaultOptions.map((item, index) => {
                    return (
                        <option key={index} value={item.value}>{item.value}</option>
                    )
                })}
            </React.Fragment>
        )
    }
    return (
            <div >
                <select className="pad1em width100" style={props.dropDowndata[0].styleObj && globalTheme} onClick={(e)=>props.handleSelectClick(props.index)}>
                    {options()}
                </select>
            </div>
    )
}

export default SelectComponent