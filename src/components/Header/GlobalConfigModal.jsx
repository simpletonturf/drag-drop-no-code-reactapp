import { Modal, Button } from 'react-bootstrap';
import React, { useState, useContext } from 'react';
import { SketchPicker } from 'react-color';
import "./Header.scss"
import {ThemeContext} from "../../ThemeContext";
const GlobalConfigModal = (props) => {
    const [isColorPanel, setIsColorPanel] = useState(false)
    const [isSecColorPanel, setIsSecColorPanel] = useState(false)
    const state = useContext(ThemeContext)
    const [textFamily, settextFamily] = useState(state.theme.fontFamily)
    const [primaryColor, setPrimaryColor] = useState(state.theme.primaryColor || '#000000')
    const [secondaryColor, setSecondaryColor] = useState(state.theme.secColor || '#f1f1f1')

    const handlePrimaryColorChange = () => {
        setIsColorPanel(true)
    }
    const handleSecondaryColorChange = () => {
        setIsSecColorPanel(true)
    }
    const handleSelectedPrimaryColor = (color) => {
        setPrimaryColor(color)
        setIsColorPanel(false)
    }
    const handleSelectedSecondaryColor = (color) => {
        setSecondaryColor(color)
        setIsSecColorPanel(false)
    }
    const handleChangeGlobalConfig = (theme) => {
        
        state.setTheme({primaryColor:theme.primaryColor,fontFamily:theme.textFamily,secColor:theme.secondaryColor})
        props.handleClose()

    }
    const selectStyleObj = {
        width: '100%',
        padding: '0.5em',
        marginBottom: '1em'
    }
    return (
            <React.Fragment>
                <Modal show={props.show} onHide={props.handleClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Global Configuration</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="input-wrap">
                            <div className="style-prop-wrap">
                                <label>Primary Color</label>
                                <div className="color-hex-input-wrap">
                                    <div className="color-block" style={{ backgroundColor: primaryColor }} onClick={handlePrimaryColorChange}>
                                    </div>
                                    <p>{primaryColor}</p>
                                </div>
                                {isColorPanel &&
                                    <div className="color-panel-wrap">
                                        <SketchPicker
                                            color={primaryColor}
                                            onChangeComplete={(e) => handleSelectedPrimaryColor(e.hex)}
                                        />
                                    </div>
                                }
                            </div>
                            <div className="style-prop-wrap">
                                <label>Secondary Color</label>
                                <div className="color-hex-input-wrap">
                                    <div className="color-block" style={{ backgroundColor: secondaryColor }} onClick={handleSecondaryColorChange}>
                                    </div>
                                    <p>{secondaryColor}</p>
                                </div>
                                {isSecColorPanel &&
                                    <div className="color-panel-wrap">
                                        <SketchPicker
                                            color={secondaryColor}
                                            onChangeComplete={(e) => handleSelectedSecondaryColor(e.hex)}
                                        />
                                    </div>
                                }
                            </div>
                            <div className="style-prop-wrap">
                                <label>Font Family</label>
                                <input 
                                style={selectStyleObj} 
                                placeholder='Text Size'
                                 value={textFamily} 
                                 onChange={e => settextFamily(e.target.value)} type='text' />

                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={props.handleClose}>
                            Close
          </Button>
                        <Button variant="primary" onClick={() => handleChangeGlobalConfig({primaryColor,textFamily,secondaryColor})}>
                            Save
          </Button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
    )
}

export default GlobalConfigModal