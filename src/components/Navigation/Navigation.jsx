import React, { useState } from 'react';
import Draggable from 'react-draggable';
import Workspace from "../Workspace/Workspace";
import * as MaterialDesign from 'react-icons/md';
import "./Navigation.scss";
const styleObj = {
    position: "fixed",
    top: '80px',
    left: 0,
    width: '15%',
    height: '100%',
    backgroundColor: '#EBE9E4',
    listStyle: 'none',
}

const listStyle = {
    padding: '0 0 0 0.5em',
    cursor: 'pointer',
    color: '#073D68',
    "&:hover": {
        background: "#E2EAEF"
    },
}




const Navigation = () => {
    const [listItems] = useState(
        [
            { listName: 'Input', icon: 'MdInput' },
            { listName: 'Button', icon: 'MdRadioButtonChecked' },
            { listName: 'Table', icon: 'MdViewModule' },
            { listName: 'Select', icon: 'MdArrowDropDownCircle' },
            { listName: 'Card', icon: 'MdPictureInPicture' },
            { listName: 'Accordion', icon: 'MdFlipToFront' },
            { listName: 'Badge', icon:'MdBookmarkBorder'}
        ])
    const [component, SetComponent] = useState({ component: '', indexCount: '' })
    const [count, SetCount] = useState(0)
    const handleClick = (page) => {
        SetCount(oldCount => oldCount + 1)
        SetComponent({ component: page.listName, indexCount: count })
    }
    const listArray = () => {
        return (
            <React.Fragment>
                {listItems.map((item, index) => {
                    const mdIcon = MaterialDesign[item.icon];
                    return (
                        // <Draggable key={index} >
                        <div key={index} className="list-items-wrap" onClick={(e) => handleClick(item)}>
                            {React.createElement(mdIcon)}
                            <li style={listStyle} className="nav-item"  >{item.listName}</li>
                        </div>
                        // </Draggable>
                    )
                })}
            </React.Fragment>
        )
    }

    return (
        <React.Fragment >
            <ul style={styleObj}>
                {listArray()}
            </ul>
            {count &&
                <Workspace page={component.component} index={component.indexCount} intialLayout={true} />}
        </React.Fragment>
    )
}

export default Navigation