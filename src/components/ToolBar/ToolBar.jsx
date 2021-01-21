import React, { useState } from 'react';
import { Tabs, Tab } from "react-bootstrap";
import AccordionStyle from './AccordionStyle';
import BadgeStyle from './BadgeStyle';
import ButtonStyle from './ButtonStyle';
import CardStyle from './CardStyle';
import InputStyle from './InputStyle';
import SelectStyle from './SelectStyle';
import TableStyle from './TableStyle';
import GetCardImageSourceModal from '../ToolBar/GetCardImageSourceModal';


import "./ToolBar.scss"

const styleObj = {
    position: "fixed",
    top: '80px',
    right: 0,
    width: '15%',
    height: "100%",
    backgroundColor: "#EBE9E4",
    // listStyle: 'none',
    padding: '1em',
    boxSizing: 'content-box',
}

const selectStyleObj = {
    width: '100%',
    padding: '0.5em',
    margin: '1em 0'
}


const ToolBar = (props) => {

    const [varientList] = useState(['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'])

    //input-attri
    const [typevalue, setTypeValue] = useState({})
    const [placeholderValue, setPlaceholderValue] = useState('')
    const [readonlyValue, setReadonlyValue] = useState('false')
    const [disableValue, setDisableValue] = useState('false')
    const [labelValue, setLabelValue] = useState('')
    const [inputValue, setInputValue] = useState('')



    //btn-attri
    const [btnNameValue, setBtnNameValueValue] = useState('')
    const [btnFunctionType, setBtnFunctionType] = useState('None')
    //select-attri
    const [selectOptionValue, setselectOptionValue] = useState('')
    //card-att
    const [cardTitleValue, setCardTitleValue] = useState('')
    const [cardSubTitleValue, setCardSubTitleValue] = useState('')
    const [cardDescValue, setCardDescValue] = useState('')
    const [borderColorVariant, setBorderColorVariant] = useState('')

    //accordion-att
    const [accordionTitleValue, setAccordionTitleValue] = useState('')
    const [accordionBodyValue, setAccordionBodyValue] = useState('')
    //badge-att
    const [badgeVariant, setBadgeVariant] = useState('')
    const [badgeText, setBadgeText] = useState('')


    //image-source Modal
    const [cardImgModalShow, setCardImgModalShow] = useState(false);
    const handleCardImageSourceModalClose = () => setCardImgModalShow(false);
    const handleCardImgShow = () => setCardImgModalShow(true);
    const [cardImage, setCardImage] = useState('')
    const [isImageOverlay, setIsImageOverlay] = useState('false')
    const [imgName, setImgName] = useState('')


    const inputAttributes = () => {
        return (
            <React.Fragment >
                <Tabs defaultActiveKey="props" id="uncontrolled-tab-example">
                    <Tab eventKey="props" title="Props">
                        <div className="mtop">
                            <label>Select Input Type</label>
                            <select style={selectStyleObj} placeholder='input type' value={typevalue} onChange={e => setTypeValue(e.target.value)}>
                                <option value='number'>number</option>
                                <option value='text'>text</option>
                                <option value='date'>date</option>
                                <option value='email'>email</option>
                                <option value='file'>file</option>
                                <option value='password'>password</option>
                                <option value='radio'>radio</option>
                                <option value='checkbox'>checkbox</option>
                            </select>
                            <label>Label</label>
                            <input style={selectStyleObj} placeholder='label' value={labelValue} onChange={e => setLabelValue(e.target.value)} type='text' />
                            <label>Input value</label>
                            <input style={selectStyleObj} placeholder='inputValue' value={inputValue} onChange={e => setInputValue(e.target.value)} type='text' />
                            <label>Placeholder value</label>
                            <input style={selectStyleObj} placeholder='Placeholder' value={placeholderValue} onChange={e => setPlaceholderValue(e.target.value)} type='text' />
                            <label>Read Only</label>
                            <select style={selectStyleObj} placeholder='Read Only' value={readonlyValue} onChange={e => setReadonlyValue(e.target.value)}>
                                <option value='true'>true</option>
                                <option value='false'>false</option>
                            </select>
                            <label>Disable</label>
                            <select style={selectStyleObj} placeholder='Disable' value={disableValue} onChange={e => setDisableValue(e.target.value)}>
                                <option value='true'>true</option>
                                <option value='false'>false</option>
                            </select>
                            <button className="buttonPrimary" onClick={(e) => props.handleType({ typevalue, labelValue, inputValue, placeholderValue, readonlyValue, disableValue, props }, props.index)}>Apply</button>
                        </div>
                    </Tab>
                    <Tab eventKey="styles" title="Styles">
                        <InputStyle
                            index={props.index}
                            handleTypeStyle={props.handleTypeStyle} />
                    </Tab>
                </Tabs>
            </React.Fragment>
        )
    }

    const btnAttributes = () => {
        return (
            <React.Fragment>
                <Tabs defaultActiveKey="props" id="uncontrolled-tab-example">
                    <Tab eventKey="props" title="Props">
                        <div className="mtop">
                            <label>Button Text</label>
                            <input style={selectStyleObj} placeholder='Name' value={btnNameValue} onChange={e => setBtnNameValueValue(e.target.value)} type='text' />
                            <button className="buttonPrimary" onClick={(e) => props.handleBtnType({ btnNameValue }, props.index)}>Apply</button>
                            <label className="width100">Button Function</label>
                            <select style={selectStyleObj} placeholder='Button Function type' value={btnFunctionType} onChange={e => setBtnFunctionType(e.target.value)}>
                                <option value='None'>None</option>
                                <option value='Submit form'>Submit form</option>
                            </select>
                            <button className="buttonPrimary" onClick={(e) => props.simulateBtnClick(props.index, btnFunctionType)}>Simulate Click</button>
                        </div>
                    </Tab>
                    <Tab eventKey="styles" title="Styles">
                        <ButtonStyle
                            index={props.index}
                            handleButtonTypeStyle={props.handleButtonTypeStyle} />
                    </Tab>
                </Tabs>
            </React.Fragment>
        )
    }

    const TableAttributes = () => {
        return (
            <React.Fragment>
                <Tabs defaultActiveKey="props" id="uncontrolled-tab-example">
                    <Tab eventKey="props" title="Props">
                        <div className="mtop">
                            <label>Add Row</label>
                            <div className="btn-wrap" style={selectStyleObj}>
                                <button className="buttonPrimary" onClick={(e) => props.handleAboveTableRow(props.index)}>Above</button>
                                <button className="buttonPrimary">Below</button>
                                <button className="buttonPrimary">Bottom</button>
                            </div>
                            <label>Add Column</label>
                            <div className="btn-wrap" style={selectStyleObj}>
                                <button className="buttonPrimary">Left</button>
                                <button className="buttonPrimary">Right</button>
                                <button className="buttonPrimary">End</button>
                            </div>

                            <label>Add Data</label>
                            <div className="btn-wrap" style={selectStyleObj}>
                                <button className="buttonPrimary" onClick={(e) => props.handleGetData(props.index)}>Get Data</button>
                            </div>
                        </div>
                    </Tab>
                    <Tab eventKey="styles" title="Styles">
                        <TableStyle
                            index={props.index}
                            handleTableStyle={props.handleTableStyle}
                        />
                    </Tab>
                </Tabs>
            </React.Fragment>
        )
    }

    const selectAttributes = () => {
        return (
            <React.Fragment>
                <Tabs defaultActiveKey="props" id="uncontrolled-tab-example">
                    <Tab eventKey="props" title="Props">
                        <div className="mtop">
                            <label>Add Options</label>
                            <div className="btn-wrap" style={selectStyleObj}>
                                <input style={selectStyleObj} placeholder='Name' value={selectOptionValue} onChange={e => setselectOptionValue(e.target.value)} type='text' />
                            </div>
                            <div className="btn-wrap" style={selectStyleObj}>
                                <button className="buttonPrimary" onClick={(e) => props.handlAddSelectOption({ selectOptionValue }, props.index)}>Add Option</button>
                            </div>
                        </div>
                    </Tab>
                    <Tab eventKey="styles" title="Styles">
                        <SelectStyle
                            index={props.index}
                            handleSelectStyle={props.handleSelectStyle}
                        />
                    </Tab>
                </Tabs>
            </React.Fragment>
        )
    }

    const cardAttributes = () => {
        return (
            <React.Fragment>
                <Tabs defaultActiveKey="props" id="uncontrolled-tab-example">
                    <Tab eventKey="props" title="Props">
                        <div className="mtop">
                            <label>Add Title</label>
                            <input style={selectStyleObj} placeholder='Card Title' value={cardTitleValue} onChange={e => setCardTitleValue(e.target.value)} type='text' />
                            <label>Add Subtitle</label>
                            <input style={selectStyleObj} placeholder='Card Subtitle' value={cardSubTitleValue} onChange={e => setCardSubTitleValue(e.target.value)} type='text' />
                            <label>Add Description</label>
                            <textarea style={selectStyleObj} placeholder='Card Description' value={cardDescValue} onChange={e => setCardDescValue(e.target.value)} type='text' />
                            <label>Border Color</label>
                            <select style={selectStyleObj} placeholder='Select Border Color' value={borderColorVariant} onChange={e => setBorderColorVariant(e.target.value)}>
                                {varientList.map((item, index) => {
                                    return (
                                        <option key={index} value={item}>{item}</option>
                                    )
                                }
                                )}
                            </select>
                            <label>Add Image</label>
                            <div className="btn-wrap" style={selectStyleObj}>
                                    <button className="buttonPrimary"
                                        onClick={(e) => handleCardImgShow()}>Select Image
                                    </button>
                            {imgName && <p>{imgName}</p> }

                            </div>
                            {cardImage &&
                                <React.Fragment>
                                    <label>Card Image Overlay</label>
                                    <select style={selectStyleObj} placeholder='Image Overlay' value={isImageOverlay}
                                        onChange={e => setIsImageOverlay(e.target.value)}>
                                        <option value='true'>true</option>
                                        <option value='false'>false</option>
                                    </select>
                                </React.Fragment>}
                            <button className="buttonPrimary"
                                onClick={(e) => props.handleCardProps({
                                    cardTitleValue, cardSubTitleValue,
                                    cardDescValue, borderColorVariant, cardImage,
                                    isImageOverlay
                                }, props.index)}>
                                Apply</button><br /><br />
                            <label>Add Data</label>
                            <div className="btn-wrap" style={selectStyleObj}>
                                <button className="buttonPrimary" onClick={(e) => props.handleCardGetData(props.index)}>Get Data</button>
                            </div>
                        </div>
                    </Tab>
                    <Tab eventKey="styles" title="Styles">
                        <CardStyle
                            index={props.index}
                            handleCardTypeStyle={props.handleCardTypeStyle} />
                    </Tab>
                </Tabs>
            </React.Fragment>
        )
    }

    const handleCardlocalSource = (img) => {
        const imgFromUrl = img.urlValue && img.urlValue.split('/').pop()
        const selectImage = img.cardImage || img.urlValue
        const selectedImgName = img.imgName || imgFromUrl
        setCardImage(selectImage)
        setCardImgModalShow(false)
        setImgName(selectedImgName)
    }


    const badgeAttributes = () => {
        return (
            <React.Fragment>
                <Tabs defaultActiveKey="props" id="uncontrolled-tab-example">
                    <Tab eventKey="props" title="Props">
                        <div className="mtop">
                            <label>Select variant</label>
                            <select style={selectStyleObj} placeholder='Select variant' value={badgeVariant} onChange={e => setBadgeVariant(e.target.value)}>
                                {varientList.map((item, index) => {
                                    return (
                                        <option key={index} value={item}>{item}</option>
                                    )
                                }
                                )}
                            </select>
                            <label>Add Text</label>
                            <input style={selectStyleObj} placeholder='Add text' value={badgeText} onChange={e => setBadgeText(e.target.value)} type='text' />
                            <button className="buttonPrimary" onClick={(e) => props.handleBadgeProps({ badgeVariant, badgeText }, props.index)}>Apply</button>
                        </div>
                    </Tab>
                    <Tab eventKey="styles" title="Styles">
                        <BadgeStyle
                            index={props.index}
                            handleBadgeTypeStyle={props.handleBadgeTypeStyle}
                        />
                    </Tab>
                </Tabs>
            </React.Fragment>
        )
    }

    const accordionAttributes = () => {
        return (
            <React.Fragment>
                <Tabs defaultActiveKey="props" id="uncontrolled-tab-example">
                    <Tab eventKey="props" title="Props">
                        <div className="mtop">
                            <label>Add Accordion Title</label>
                            <input style={selectStyleObj} placeholder='Accordion Title' value={accordionTitleValue} onChange={e => setAccordionTitleValue(e.target.value)} type='text' />
                            <label>Accordion Body</label>
                            <textarea style={selectStyleObj} placeholder='Accordion Body' value={accordionBodyValue} onChange={e => setAccordionBodyValue(e.target.value)} type='text' />
                            <button className="buttonPrimary" onClick={(e) => props.handleAccordionProps({ accordionTitleValue, accordionBodyValue }, props.index)}>Apply</button>
                        </div>
                    </Tab>
                    <Tab eventKey="styles" title="Styles">
                        <AccordionStyle
                            index={props.index}
                            handleAccordionTypeStyle={props.handleAccordionTypeStyle}
                        />
                    </Tab>
                </Tabs>
            </React.Fragment>
        )
    }


    const compSwitch = (page, index) => {
        switch (page.type) {
            case 'Header':
                return (
                    <h1>header Attributes</h1>
                )
            case 'Input':
                return (
                    inputAttributes()
                )
            case 'Button':
                return (
                    btnAttributes()
                )
            case 'Table':
                return (
                    TableAttributes()
                )
            case 'Select':
                return (
                    selectAttributes()
                )
            case 'Card':
                return (
                    cardAttributes()
                )
            case 'Badge':
                return (
                    badgeAttributes()
                )
            case 'Accordion':
                return (
                    accordionAttributes()
                )
            case 'Default':
                return (
                    <h1>defa</h1>
                )
            default:
                return ''
        }
    }


    return (
        <React.Fragment>
            <div style={styleObj}>
            </div>
            {props.type &&
                <div className="fixed">
                    {compSwitch(props)}
                </div>}
            {cardImgModalShow &&
                <GetCardImageSourceModal
                    cardImgModalShow={cardImgModalShow}
                    handleCardImageSourceModalClose={handleCardImageSourceModalClose}
                    handleCardlocalSource={handleCardlocalSource}
                />}
        </React.Fragment>
    )
}

export default ToolBar