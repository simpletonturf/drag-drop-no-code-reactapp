import React, { useState } from 'react';
import { IoIosAddCircle } from "react-icons/io";
import Toaster from "../Common/Toaster/Toaster";
import { toast } from "react-toastify";
import { axiosRequest } from "../../utills/axios"
import "../../scss/style.scss";
import "./Workspace.scss"
const GetDataModal = (props) => {
    const [urlValue, setUrlValue] = useState('')
    const [payloadKeyValue, setPayloadKeyValue] = useState('')
    const [payloadValue, setPayloadValue] = useState('')
    const [apiCallType, setApiCallType] = useState('get')
    const [btnDisabled, setBtnDisabled] = useState(true)
    const [urlErrorMsg, setUrlErrorMsg] = useState(false)
    const [payloadWrap, setPayloadWrap] = useState(false)
    const [payloadArray, setpayloadArray] = useState([{ key: '', value: '', objItemLoader: false }])
    const [isPublished, setIsPublished] = useState('')
    const [objSelectDrop, setObjSelectDrop] = useState(false)
    const [objKeyArray, setObjKeyArray] = useState([])
    const [selectArray, setSelectArray] = useState('select')
    const [dataBtn, setDataBtn] = useState(true)
    const [cardDataBtn, setCardDataBtn] = useState(true)
    const [responseData, setResponseData] = useState([])
    const [insideArrayData, setInsideArrayData] = useState([])
    const [dataLoader, setDataLoader] = useState(false)
    const [payloadObj, setPayloadObj] = useState('')
    // const [objItemLoader, setObjItemLoader] = useState(false)


    // const objLoader = () => {
    //     return (
    //         <React.Fragment>
    //             {objItemLoader &&
    //                 <div className="loader loader-key"></div>
    //                 setTimeout(() => {

    //                 }, timeout);
    //             }
    //         </React.Fragment>
    //     )
    // }
    const selectStyleObj = {
        width: '100%',
        padding: '0.5em',
        margin: '1em 0'
    }

    const handleUrlValue = (e) => {
        setUrlValue(e)
        var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
        if (!regex.test(e)) {
            setBtnDisabled(true)
        } else {
            setBtnDisabled(false)
            setUrlErrorMsg(false)
        }
    }
    const handleSelectArray = (e) => {
        setSelectArray(e)
        setInsideArrayData(responseData[e])
    }
    const handleUrlFocusOut = async () => {
        setDataLoader(true)
        if (btnDisabled) {
            setUrlErrorMsg(true)
        }
        else {
            setUrlErrorMsg(false)
            const apiUrl = urlValue;
            const response = await axiosRequest[apiCallType](apiUrl,payloadObj)
            // console.log(response);
            if (responseData) {
                setDataLoader(false)
                setResponseData(response.data)
                const objList = Object.keys(response.data)
                if (Array.isArray(response.data) && response.data.length) {
                    setInsideArrayData(response.data)
                    setDataBtn(true)
                    await props.handleApiData(response.data)
                }
                else {
                    setObjKeyArray(objList)
                    setObjSelectDrop(true)
                    setDataBtn(false)
                }
            }
            else {
                setDataLoader(false)
                toast.error("Something Went Wrong");
            }
        }
    }
    const handleApiCallType = (e) => {
        setApiCallType(e)
        if (e === 'post') {
            setPayloadWrap(true)
        }
        else {
            setPayloadWrap(false)
        }
    }
    const handleRadio = (event) => {
        const isPublishedCheck = event.currentTarget.value
        setIsPublished(isPublishedCheck)
    }
    const handleAddKey = () => {
        const newArr = [...payloadArray, { key: 'key', value: 'value' }]
        setpayloadArray(newArr)
    }
    const handlePayloadObj = (index) => {
        if (payloadKeyValue && payloadValue) {
            const newArr = JSON.parse(JSON.stringify(payloadArray))
            newArr[index]['key'] = payloadKeyValue
            newArr[index]['value'] = payloadValue
            newArr[index]['objItemLoader'] = true
            setpayloadArray(newArr)
            let payload = {}
            for (let i = 0; i < newArr.length; i++) {
                payload={...payload,[newArr[i]['key']]: newArr[i]['value']}
            }
            setPayloadObj(payload)
        }

    }

    return (
        <div className="modal-main-wrap">
            <div className="data-modal-content-wrap">
                <div className="close-cross" onClick={props.handleModalClose}>X</div>
                <div className="type-wrap">
                    <label>Type</label>
                    <select style={selectStyleObj} value={apiCallType} onChange={(e) => handleApiCallType(e.target.value)}>
                        <option value='get'>Get</option>
                        <option value='post'>Post</option>
                        <option value='put'>Put</option>
                        <option value='delete'>Delete</option>
                    </select>
                </div>
                {payloadWrap &&
                    <React.Fragment>
                        <div className="payload-key-wrap">
                            <label>Request Payload:</label>
                            <div className="radio-wrap">
                                <div>
                                    <input
                                        className="radio-input"
                                        type="radio"
                                        name="isPublished"
                                        value="yes"
                                        checked={isPublished === 'yes'}
                                        onChange={handleRadio} />
                                    <label className="radio-label">Yes</label>
                                </div>
                                <div>
                                    <input
                                        className="radio-input"
                                        type="radio"
                                        name="isPublished"
                                        value="no"
                                        checked={isPublished === 'no'}
                                        onChange={handleRadio} />
                                    <label className="radio-label">No</label>

                                </div>
                            </div>
                        </div>
                        {isPublished === 'yes' &&
                            (<React.Fragment>
                                <div className="key-value-array-wrap">
                                    {Array.isArray(payloadArray)&&payloadArray.map((item, index) => {
                                        return (
                                            <React.Fragment>
                                                <div className="key-wrap">
                                                    <label>key:</label>
                                                    <input value={payloadArray[item.key]}
                                                        onChange={e => setPayloadKeyValue(e.target.value)}
                                                        placeholder={item.key} ></input>
                                                </div>
                                                <div className="key-wrap">
                                                    <label>Value:</label>
                                                    <input value={payloadArray[item.value]}
                                                        onChange={e => setPayloadValue(e.target.value)}
                                                        placeholder={item.value}
                                                        onBlur={e => handlePayloadObj(index)}
                                                    ></input>
                                                </div>
                                                <div className="add-btn-icon-wrap">
                                                    {item.objItemLoader === true ?
                                                        <span className="plus-icon" onClick={handleAddKey}><IoIosAddCircle /></span> : ''
                                                    }
                                                </div>
                                            </React.Fragment>
                                        )
                                    })}

                                </div>
                            </React.Fragment>)
                        }
                    </React.Fragment>}
                <label>Data URL</label>
                <input placeholder='URL'
                    type='text'
                    value={urlValue}
                    onChange={e => handleUrlValue(e.target.value)}
                // onBlur={handleUrlFocusOut}
                />
                {urlErrorMsg && <span className="error-msg">Please enter valid URL (e.g:https://jsonplaceholder.typicode.com/todos)</span>}
                {objSelectDrop &&
                    <React.Fragment>
                        <label>Select the Array</label>
                        <select style={selectStyleObj} value={selectArray} onChange={(e) => handleSelectArray(e.target.value)}>
                            <option value='select' disabled>Select</option>
                            {objKeyArray.map((item, index) => {
                                return (
                                    <option value={item}>{item}</option>
                                )
                            })}
                        </select>
                    </React.Fragment>}
                {dataBtn && <button className="buttonPrimary" onClick={handleUrlFocusOut}>Get Data</button>}
                {!dataBtn && <button className="buttonPrimary" onClick={(e) => props.handleApiData({ insideArrayData })}>Send Data</button>
                }
                {dataLoader &&
                    <div className="modal-main-wrap loader-bg">
                        <div className="loader"></div>
                    </div>
                }
                {<Toaster />}
            </div>
        </div>
    )
}

export default GetDataModal