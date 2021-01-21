import React, { useEffect, useState, useContext } from 'react';
import { axiosRequest } from "../../utills/axios"
import ButtonComponent from '../../catalogue/ButtonComponent/ButtonComponent';
import HeaderComponent from '../../catalogue/HeaderComponent/HeaderComonent';
import InputComponent from '../../catalogue/InputComponent/InputComponent';
import GetDataModal from "./GetDataModal";
import GetCardDataModal from "./GetCardDataModal";
import ToolBar from '../ToolBar/ToolBar';
import data from "../../Data/Data.json"
import "./Workspace.scss"
import "../../scss/style.scss"
import TableComponent from '../../catalogue/TableComponent/TableComponent';
import SelectComponent from '../../catalogue/SelectComponent/SelectComponent';
import Toaster from "../Common/Toaster/Toaster";
import { toast } from "react-toastify";
import CardComponent from '../../catalogue/CardComponent/CardComponent';
import AccordionComponent from '../../catalogue/AccordionComponent/AccordionComponent';
import BadgeComponent from '../../catalogue/BadgeComponent/BadgeComponent'


//react-grid-layout
import _ from "lodash";
import { Responsive, WidthProvider } from "react-grid-layout";
import { ThemeContext } from '../../ThemeContext';
const ResponsiveReactGridLayout = WidthProvider(Responsive);


const Workspace = (props) => {
    const [compArr, SetCompArr] = useState([])
    const [apiTableData, SetApiTableData] = useState([])
    const [toolIndex, setToolIndex] = useState('')
    const [tableIndex, setTableIndex] = useState('')
    const [selectIndex, setselectIndex] = useState('')
    const [cardIndex, setCardIndex] = useState('')
    const [badgeIndex, setBadgeIndex] = useState('')
    const [accordIndex, setAccordIndex] = useState('')
    const [tableKey, setTableKey] = useState('')
    const [apiType, setApiType] = useState('get')
    const [toolShow, settoolShow] = useState(false)
    const [dataModal, setDataModal] = useState(false)
    const [cardDataModal, setCardDataModal] = useState(false)
    const [dataLoader, setDataLoader] = useState(false)
    const [compName, setCompName] = useState('Default')
    const themeConfig = useContext(ThemeContext)

    const globalFontFamily = {
        fontFamily: `${themeConfig.theme.fontFamily}`
    }


    const handleFocus = (index) => {
        setToolIndex(index)
        settoolShow(true)
        setCompName('Input')
    }

    const handleBtnClick = (index) => {

        setToolIndex(index)
        settoolShow(true)
        setCompName('Button')

    }

    const handleType = (inputProp, index) => {
        const newArr = [...compArr]
        newArr[index - 1]['typevalue'] = inputProp.typevalue
        newArr[index - 1]['placeholderValue'] = inputProp.placeholderValue
        newArr[index - 1]['readonlyValue'] = inputProp.readonlyValue
        newArr[index - 1]['disableValue'] = inputProp.disableValue
        newArr[index - 1]['labelValue'] = inputProp.labelValue
        newArr[index - 1]['inputValue'] = inputProp.inputValue
        SetCompArr(newArr)
        settoolShow(false)
    }

    const handleTypeStyle = (inputStyle, index) => {
        const newArr = JSON.parse(JSON.stringify(compArr))
        newArr[index - 1]['inputProps'][0].styleObj = { ...newArr[index - 1]['inputProps'][0].styleObj, ['background']: inputStyle.selectedColor }
        newArr[index - 1]['inputProps'][0].styleObj = { ...newArr[index - 1]['inputProps'][0].styleObj, ['color']: inputStyle.selectedTextColor }
        newArr[index - 1]['inputProps'][0].styleObj = { ...newArr[index - 1]['inputProps'][0].styleObj, ['font-size']: inputStyle.textSize }
        SetCompArr(newArr)
        settoolShow(false)
    }

    const handleButtonTypeStyle = (btnStyle, index) => {
        const newArr = JSON.parse(JSON.stringify(compArr))
        newArr[index - 1]['buttonProps'][0].styleObj = { ...newArr[index - 1]['buttonProps'][0].styleObj, ['background']: btnStyle.selectedColor }
        newArr[index - 1]['buttonProps'][0].styleObj = { ...newArr[index - 1]['buttonProps'][0].styleObj, ['color']: btnStyle.selectedTextColor }
        newArr[index - 1]['buttonProps'][0].styleObj = { ...newArr[index - 1]['buttonProps'][0].styleObj, ['font-size']: btnStyle.textSize }
        SetCompArr(newArr)
        settoolShow(false)
    }

    const handleTableStyle = (tableStyle, index) => {
        const newArr = JSON.parse(JSON.stringify(compArr))
        newArr[tableKey]['tableData'][0].styleObj = { ...newArr[tableKey]['tableData'][0].styleObj, ['background']: tableStyle.selectedColor }
        newArr[tableKey]['tableData'][0].styleObj = { ...newArr[tableKey]['tableData'][0].styleObj, ['color']: tableStyle.selectedTextColor }
        newArr[tableKey]['tableData'][0].styleObj = { ...newArr[tableKey]['tableData'][0].styleObj, ['font-size']: tableStyle.textSize }
        SetCompArr(newArr)
        settoolShow(false)
    }

    const handleSelectStyle = (selectStyle, index) => {
        const newArr = JSON.parse(JSON.stringify(compArr))
        newArr[selectIndex]['dropDowndata'][0].styleObj = { ...newArr[selectIndex]['dropDowndata'][0].styleObj, ['background']: selectStyle.selectedColor }
        newArr[selectIndex]['dropDowndata'][0].styleObj = { ...newArr[selectIndex]['dropDowndata'][0].styleObj, ['color']: selectStyle.selectedTextColor }
        newArr[selectIndex]['dropDowndata'][0].styleObj = { ...newArr[selectIndex]['dropDowndata'][0].styleObj, ['font-size']: selectStyle.textSize }
        SetCompArr(newArr)
        settoolShow(false)
    }

    const handleCardTypeStyle = (cardStyle, index) => {
        const newArr = JSON.parse(JSON.stringify(compArr))
        newArr[cardIndex]['cardData'][0].styleObj = { ...newArr[cardIndex]['cardData'][0].styleObj, ['background']: cardStyle.selectedColor }
        newArr[cardIndex]['cardData'][0].styleObj = { ...newArr[cardIndex]['cardData'][0].styleObj, ['color']: cardStyle.selectedTextColor }
        newArr[cardIndex]['cardData'][0].styleObj = { ...newArr[cardIndex]['cardData'][0].styleObj, ['font-size']: cardStyle.textSize }
        SetCompArr(newArr)
        // settoolShow(false)
    }

    const handleAccordionTypeStyle = (accordionStyle, index) => {
        const newArr = JSON.parse(JSON.stringify(compArr))
        newArr[accordIndex]['accordData'][0].styleObj = { ...newArr[accordIndex]['accordData'][0].styleObj, ['background']: accordionStyle.selectedColor }
        newArr[accordIndex]['accordData'][0].styleObj = { ...newArr[accordIndex]['accordData'][0].styleObj, ['color']: accordionStyle.selectedTextColor }
        newArr[accordIndex]['accordData'][0].styleObj = { ...newArr[accordIndex]['accordData'][0].styleObj, ['font-size']: accordionStyle.textSize }
        SetCompArr(newArr)
        settoolShow(false)
    }

    const handleBadgeTypeStyle = (badgeStyle, index) => {
        const newArr = JSON.parse(JSON.stringify(compArr))
        newArr[badgeIndex]['badgeData'][0].styleObj = { ...newArr[badgeIndex]['badgeData'][0].styleObj, ['background']: badgeStyle.selectedColor }
        newArr[badgeIndex]['badgeData'][0].styleObj = { ...newArr[badgeIndex]['badgeData'][0].styleObj, ['color']: badgeStyle.selectedTextColor }
        newArr[badgeIndex]['badgeData'][0].styleObj = { ...newArr[badgeIndex]['badgeData'][0].styleObj, ['font-size']: badgeStyle.textSize }
        SetCompArr(newArr)
        settoolShow(false)
    }

    const handleBtnType = (inputProp, index) => {
        const newArr = [...compArr]
        newArr[index - 1]['btnNameValue'] = inputProp.btnNameValue
        SetCompArr(newArr)
        // settoolShow(false)
    }

    //function to handle the button functinality
    const simulateBtnClick = (index, functionType) => {
        switch (functionType) {
            //submit function for button
            case 'Submit form':
                const componentArray = compArr;
                const inputArray = []
                componentArray.forEach((item) => {
                    //find the inputs in the component array
                    if (item.type === "Input" && item.labelValue != undefined && item.inputValue != undefined) {
                        const label = item.labelValue
                        const value = item.inputValue
                        //generate field name and value pairs
                        inputArray.push({ label: label, value: value })
                    }
                })
                //call the post api
                fetch('http://localhost:5000/submitForm', {
                    method: "POST",
                    body: JSON.stringify(inputArray),
                    headers: { "Content-type": "application/json; charset=UTF-8" }
                })
                    .then(response => response.json())
                    .then(json => {
                        //map response to the table
                        const newArr = JSON.parse(JSON.stringify(compArr))
                        const propTabledata = json
                        if (propTabledata.length > 0) {
                            newArr.push({ type: 'Table', tableData: [{ defaultData: propTabledata }] })
                            SetCompArr(newArr)
                        }
                        else {
                            toast.error('Please Provide Input Values')
                        }
                    })
                    .catch(err => console.log(err));

                break
            case 'None':
                break
            default:
                break
        }
    }

    const handleTableClick = (key, index) => {
        setTableKey(key)
        setCompName('Table')
        setToolIndex(index)
        settoolShow(true)
    }
    const handleSelectClick = (index) => {
        setselectIndex(index)
        setCompName('Select')
        settoolShow(true)
    }
    const handleCardClick = (index) => {
        setCardIndex(index)
        setCompName('Card')
        settoolShow(true)
    }
    const handleBadgeClick = (index) => {
        setBadgeIndex(index)
        setCompName('Badge')
        settoolShow(true)
    }
    const handleAccordionClick = (index) => {
        setAccordIndex(index)
        setCompName('Accordion')
        settoolShow(true)
    }

    const handleAboveTableRow = (index) => {
        const tableData = data.tableData
        tableData.splice(toolIndex + 1, 0, tableData[toolIndex]);
        const newArr = [...compArr]
        newArr[0]['tableData'] = tableData
        SetCompArr(newArr)
    }
    const handleGetData = (index) => {
        setTableIndex(index)
        setDataModal(true)
    }

    const handleCardGetData = (index) => {
        // console.log(index);
        // setCardIndex(index)
        setCardDataModal(true)
    }

    const handleApiData = (value) => {
        setDataLoader(true)
        const newArr = JSON.parse(JSON.stringify(compArr))
        const propTabledata = value.insideArrayData ? value.insideArrayData : value
        newArr[tableKey]['tableData'][0].defaultData = propTabledata
        SetCompArr(newArr)
        setDataModal(false)
        setDataLoader(false)
        // handleFetchCall(value.urlValue)
        // setApiType(value.apiCallType)
        // const payload = value.payloadArray
        // let payloadArray = {}
        // for (let i = 0; i < payload.length; i++) {
        //     payloadArray = { ...payloadArray, [payload[i]['key']]: payload[i]['value'] }
        // }
    }

    const handleCardApiData = (value) => {
        setCardDataModal(false)
        // handleCardProps(value[0],cardIndex);
        const newArr = JSON.parse(JSON.stringify(compArr))
        const propTabledata = value
        newArr.shift()
        for (let i = 0; i < value.length; i++) {
            newArr.push({ type: 'Card', cardData: [{ defaultData: propTabledata[i] }] })
        }
        console.log(newArr)
        SetCompArr(newArr)

        // for(let i=0;i<value.length;i++){
        //     newArr[cardIndex]['cardData'][i].defaultData = { ...newArr[cardIndex]['cardData'][i].defaultData, ['cardTitle']: value.cardTitleValue }
        //     newArr[cardIndex]['cardData'][i].defaultData = { ...newArr[cardIndex]['cardData'][i].defaultData, ['cardSubTitle']: value.cardSubTitleValue }
        //     newArr[cardIndex]['cardData'][i].defaultData = { ...newArr[cardIndex]['cardData'][i].defaultData, ['cardText']: value.cardDescValue }
        //     newArr[cardIndex]['cardData'][i].defaultData = { ...newArr[cardIndex]['cardData'][i].defaultData, ['cardBorderColor']: value.borderColorVariant }
        //     newArr[cardIndex]['cardData'][i].defaultData = { ...newArr[cardIndex]['cardData'][i].defaultData, ['isImgOveralay']: value.isImageOverlay }
        //    if(value.cardImage){
        //     newArr[cardIndex]['cardData'][i].defaultData = { ...newArr[cardIndex]['cardData'][i].defaultData, ['isCardImg']: true }
        //     newArr[cardIndex]['cardData'][i].defaultData = { ...newArr[cardIndex]['cardData'][i].defaultData, ['cardImgSrc']: value.cardImage }
        //    }
        // }
        // console.log(newArr)
    }

    const handleModalClose = () => {
        setDataModal(false)
    }

    const handleCardModalClose = () => {
        setCardDataModal(false)
    }

    const handleFetchCall = async (url) => {
        // setDataLoader(true)
        const apiUrl = url;
        const responseData = await axiosRequest[apiType](apiUrl)
        if (responseData) {
            // const newArr = [...compArr]
            // newArr[tableKey]['tableData'] = responseData.data
            // SetApiTableData(responseData.data)
            // SetCompArr(newArr)
            // setDataModal(false)
            // setDataLoader(false)
            // toast.success("Something");

        }
        else {
            setDataLoader(false)
            toast.error("Something Went Wrong");
        }
    }

    const handlAddSelectOption = (inputProp, index) => {
        const newArr = JSON.parse(JSON.stringify(compArr))
        newArr[selectIndex]['dropDowndata'][0].defaultOptions = [...newArr[selectIndex]['dropDowndata'][0].defaultOptions, { value: inputProp.selectOptionValue }]
        SetCompArr(newArr)
        settoolShow(false)
    }
    const handleCardProps = (cardProps, index) => {
        const newArr = JSON.parse(JSON.stringify(compArr))
        newArr[cardIndex]['cardData'][0].defaultData = { ...newArr[cardIndex]['cardData'][0].defaultData, ['cardTitle']: cardProps.cardTitleValue }
        newArr[cardIndex]['cardData'][0].defaultData = { ...newArr[cardIndex]['cardData'][0].defaultData, ['cardSubTitle']: cardProps.cardSubTitleValue }
        newArr[cardIndex]['cardData'][0].defaultData = { ...newArr[cardIndex]['cardData'][0].defaultData, ['cardText']: cardProps.cardDescValue }
        newArr[cardIndex]['cardData'][0].defaultData = { ...newArr[cardIndex]['cardData'][0].defaultData, ['cardBorderColor']: cardProps.borderColorVariant }
        newArr[cardIndex]['cardData'][0].defaultData = { ...newArr[cardIndex]['cardData'][0].defaultData, ['isImgOveralay']: cardProps.isImageOverlay }
        if (cardProps.cardImage) {
            newArr[cardIndex]['cardData'][0].defaultData = { ...newArr[cardIndex]['cardData'][0].defaultData, ['isCardImg']: true }
            newArr[cardIndex]['cardData'][0].defaultData = { ...newArr[cardIndex]['cardData'][0].defaultData, ['cardImgSrc']: cardProps.cardImage }
        }
        SetCompArr(newArr)
        // settoolShow(false)
    }
   

    const handleBadgeProps = (badgeProps, index) => {
        const newArr = JSON.parse(JSON.stringify(compArr))
        newArr[badgeIndex]['badgeData'][0].defaultData = { ...newArr[badgeIndex]['badgeData'][0].defaultData, ['variant']: badgeProps.badgeVariant }
        newArr[badgeIndex]['badgeData'][0].defaultData = { ...newArr[badgeIndex]['badgeData'][0].defaultData, ['badgeText']: badgeProps.badgeText }
        SetCompArr(newArr)
        settoolShow(false)
    }

    const handleAccordionProps = (accordProps, index) => {
        const newArr = JSON.parse(JSON.stringify(compArr))
        newArr[accordIndex]['accordData'][0].defaultData['AccordionTitle'] = accordProps.accordionTitleValue
        newArr[accordIndex]['accordData'][0].defaultData['AccordionBody'] = accordProps.accordionBodyValue
        SetCompArr(newArr)
        settoolShow(false)
    }

    useEffect(() => {
        settoolShow(false)
        if (props.page) {
            SetCompArr(prevTemp => [...prevTemp,
            {
                type: props.page, index: props.index,
                inputProps: data.inputProps,
                buttonProps: data.buttonProps,
                tableData: data.tableData,
                dropDowndata: data.dropDowndata,
                cardData: data.cardData,
                accordData: data.accordData,
                badgeData: data.badgeData
            }])
        }
        const previewData = data.componentList
        previewData.push({ name: props.page, index: props.index })
    }, [props.index, props.page])
    const compSwitch = (page, index) => {
        switch (page.type) {
            case 'Header':
                return (<HeaderComponent bgColor={'transperant'} />)
            case 'Input':
                return (
                    <InputComponent
                        handleFocus={handleFocus}
                        index={index}
                        type={page.typevalue}
                        placeholder={page.placeholderValue}
                        label={page.labelValue}
                        readOnly={page.readonlyValue}
                        disabled={page.disableValue}
                        styleObj={page.styleObj}
                        inputProps={page.inputProps}
                        inputValue={page.inputValue}
                    />
                )
            case 'Button':
                return (
                    <ButtonComponent
                        index={index}
                        handleBtnClick={handleBtnClick}
                        btnText={page.btnNameValue}
                        buttonProps={page.buttonProps}
                        simulateBtnClick={simulateBtnClick}
                    />)
            case 'Table':
                return (
                    <TableComponent
                        index={index}
                        tableData={page.tableData}
                        handleTableClick={handleTableClick}
                    />
                )
            case 'Select':
                return (
                    <SelectComponent
                        index={index}
                        dropDowndata={page.dropDowndata}
                        handleSelectClick={handleSelectClick}
                    />
                )
            case 'Card':
                return (
                    <CardComponent
                        index={index}
                        cardData={page.cardData}
                        handleCardClick={handleCardClick}
                    />
                )
            case 'Badge':
                return (
                    <BadgeComponent
                        index={index}
                        badgeData={page.badgeData}
                        handleBadgeClick={handleBadgeClick}
                    />
                )
            case 'Accordion':
                return (
                    <AccordionComponent
                        index={index}
                        handleAccordionClick={handleAccordionClick}
                        accordData={page.accordData}
                    />
                )
            default:
                return ''
        }
    }

    const generateDOM = () => {
        return _.map(compArr, function (l, i) {

            let height = ''
            let weight = ''
            if (l.type === 'Table') {
                weight = 6
                height = 2
            }
            else if (l.type === 'Card') {
                weight = 2
                height = 2.5
            }
            return (
                <div key={i} data-grid={{ x: i * 2, y: 0, h: height ? height : 1, w: weight ? weight : 1 }}>
                    {compSwitch(l, i)}
                </div>
            );
        });
    }
    return (
        <React.Fragment>
            <div className={props.intialLayout ? 'workspace-main-wrap' : ''} style={globalFontFamily}>
                <ResponsiveReactGridLayout
                // breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                // cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                // rowHeight={120}


                >
                    {/* {Boolean(Array.isArray(compArr) &&
                        compArr.length) ?
                        compArr.map((page, index) => {
                            return (
                                <React.Fragment>
                                    <div key={index}>
                                        {compSwitch(page, index)}
                                    </div>

                                </React.Fragment>
                            )
                        }) :
                        <React.Fragment>
                            <div className="no-element-wrap">
                                <p>Drag Elements Here</p>
                            </div>
                        </React.Fragment>
                    } */}
                    {generateDOM()}
                </ResponsiveReactGridLayout>

                {dataModal &&
                    <GetDataModal
                        handleApiData={handleApiData}
                        handleModalClose={handleModalClose}
                    />
                }

                {cardDataModal &&
                    <GetCardDataModal
                        handleCardApiData={handleCardApiData}
                        handleCardModalClose={handleCardModalClose}
                    />
                }
             
                {dataLoader &&
                    <div className="modal-main-wrap loader-bg">
                        <div className="loader"></div>
                    </div>
                }
                {<Toaster />}
            </div>
            {toolShow &&
                <ToolBar
                    type={compName}
                    handleType={handleType}
                    index={toolIndex + 1}
                    handleAboveTableRow={handleAboveTableRow}
                    handleGetData={handleGetData}
                    handleCardGetData={handleCardGetData}
                    handleBtnType={handleBtnType}
                    handlAddSelectOption={handlAddSelectOption}
                    handleCardProps={handleCardProps}
                    handleAccordionProps={handleAccordionProps}
                    handleBadgeProps={handleBadgeProps}
                    handleTypeStyle={handleTypeStyle}
                    handleButtonTypeStyle={handleButtonTypeStyle}
                    handleTableStyle={handleTableStyle}
                    handleSelectStyle={handleSelectStyle}
                    handleCardTypeStyle={handleCardTypeStyle}
                    handleAccordionTypeStyle={handleAccordionTypeStyle}
                    handleBadgeTypeStyle={handleBadgeTypeStyle}
                    simulateBtnClick={simulateBtnClick}

                />
            }
        </React.Fragment>
    )
}

export default Workspace