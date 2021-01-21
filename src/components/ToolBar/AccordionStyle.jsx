import React, { useState } from 'react';
import { SketchPicker } from 'react-color';

const AccordionStyle = (props) => {
    const selectStyleObj = {
        width: '100%',
        padding: '0.5em',
        marginBottom: '1em'
    }
    const [selectedColor, setSelectedColor] = useState('#ffffff')
    const [isColorPanel, setIsColorPanel] = useState(false)
    const [selectedTextColor, setSelectedTextColor] = useState('#000000')
    const [isTextColorPanel, setIsTextColorPanel] = useState(false)
    const [textSize, setTextSize] = useState('')


    const handleInputColorChange = () => {
        setIsColorPanel(true)
    }

    const handleInputTextColorChange = () => {
        setIsTextColorPanel(true)
    }

    const handleSelectedTextColor = (color) => {
        setSelectedTextColor(color)
        setIsTextColorPanel(false)
    }

    const handleSelectedColor = (color) => {
        setSelectedColor(color)
        setIsColorPanel(false)
    }
    return (
        <React.Fragment>
            <div className="mtop">
                <div className="style-prop-wrap">
                    <label>Background Color</label>
                    <div className="color-hex-input-wrap">
                        <div className="color-block" style={{ backgroundColor: selectedColor }} onClick={handleInputColorChange}>
                        </div>
                        <p>{selectedColor}</p>
                    </div>
                    {isColorPanel &&
                        <SketchPicker
                            color={selectedColor}
                            onChangeComplete={(e) => handleSelectedColor(e.hex)}
                        />}
                </div>
                <div className="style-prop-wrap">
                    <label>Text Color</label>
                    <div className="color-hex-input-wrap">
                        <div className="color-block" style={{ backgroundColor: selectedTextColor }} onClick={handleInputTextColorChange}>
                        </div>
                        <p>{selectedTextColor}</p>
                    </div>
                    {isTextColorPanel &&
                        <SketchPicker
                            color={selectedTextColor}
                            onChangeComplete={(e) => handleSelectedTextColor(e.hex)}
                        />}
                </div>
                <div className="style-prop-wrap">
                    <label>Text Size</label>
                    <input style={selectStyleObj} placeholder='Text Size' value={textSize} onChange={e => setTextSize(e.target.value)} type='text' />

                </div>
                <button className="buttonPrimary" onClick={(e) => props.handleAccordionTypeStyle({ selectedColor, selectedTextColor,textSize }, props.index)}>Apply</button>
            </div>
        </React.Fragment>
    )
}

export default AccordionStyle