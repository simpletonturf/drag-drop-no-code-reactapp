import React, { useState } from 'react';
import { IoIosAddCircle } from "react-icons/io";
import Toaster from "../Common/Toaster/Toaster";
import { toast } from "react-toastify";
import { axiosRequest } from "../../utills/axios"
import "../../scss/style.scss";
import "./Workspace.scss"

const GetCardDataModal = (props) => {

    const [urlValue, setUrlValue] = useState('')
    const [apiCallType, setApiCallType] = useState('get')
    const [urlErrorMsg, setUrlErrorMsg] = useState(false)
    const [dataBtn, setDataBtn] = useState(true)
    const [insideArrayData, setInsideArrayData] = useState([])
    const [dataLoader, setDataLoader] = useState(false)
    const [payloadObj, setPayloadObj] = useState('')
    const [overlay, setOverlay] = useState(false)
    const [isOverlay, setIsOverlay] = useState(false)
    const [array, setArray] = useState({})

    const selectStyleObj = {
        width: '100%',
        padding: '0.5em',
        margin: '1em 0'
    }

    const handleUrlValue = (e) => {
        setUrlValue(e)
        var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
        if (!regex.test(e)) {
            setUrlErrorMsg(true)
        } else {
            setUrlErrorMsg(false)
        }
    }

    const handleUrlFocusOut = async () => {
        setDataLoader(true);
        const apiUrl = urlValue;
        const response = await axiosRequest[apiCallType](apiUrl, payloadObj)
        if (response.data) {
            const d = response.data.data;
            // console.log(d);
            setArray(d)
            setDataLoader(false)
            setUrlErrorMsg(false)

            if (d[0]["img"] != undefined || d[0]["img"] != "") {
                setOverlay(true)
                setDataBtn(false)
            }
            else {
                setDataBtn(false)
            }
        }
        else {
            toast.error("Data Not Available");
        }
        // console.log(response.data.data["title"]);

    }

    const handleApiData = () => {
        let data = [];
        for (let i = 0; i < array.length; i++) {
            let payload = {
                "cardBorderColor": array[i].border != undefined ? array[i].border : "",
                "cardText": array[i].desc != undefined ? array[i].desc : "",
                "cardImgSrc": array[i].img != undefined ? array[i].img : "",
                "cardSubTitle": array[i].sub != undefined ? array[i].sub : "",
                "cardTitle": array[i].title != undefined ? array[i].title : "",
                "isImgOveralay": isOverlay != undefined ? isOverlay : "",
                "isCardImg":true
            };
            data.push(payload);
        }
        props.handleCardApiData(data);
    }

    return (
        <div className="modal-main-wrap">
            <div className="data-modal-content-wrap">
                <div className="close-cross" onClick={props.handleCardModalClose}>X</div>
                <div className="type-wrap">
                    <label>Type</label>
                    <select style={selectStyleObj} value={apiCallType} >
                        <option value='get'>Get</option>
                    </select>
                </div>

                <label>Data URL</label>
                <input placeholder='URL'
                    type='text'
                    value={urlValue}
                    onChange={e => handleUrlValue(e.target.value)}
                // onBlur={handleUrlFocusOut}
                />
                {urlErrorMsg && <span className="error-msg">Please enter valid URL (e.g:https://jsonplaceholder.typicode.com/todos)</span>}

                {overlay &&
                    <React.Fragment>
                        <label>Card Image Overlay</label>
                        <select style={selectStyleObj} placeholder='Image Overlay' value={isOverlay}
                            onChange={e => setIsOverlay(e.target.value)}>
                            <option value='true'>true</option>
                            <option value='false'>false</option>
                        </select>
                    </React.Fragment>}

                {dataBtn && <button className="buttonPrimary" onClick={handleUrlFocusOut}>Get Data</button>}
                {/* <button className="buttonPrimary" disabled={btnDisabled} onClick={(e) => props.handleApiData({ urlValue, apiCallType, payloadArray })}>Get Data</button> */}
                {!dataBtn && <button className="buttonPrimary" onClick={handleApiData}>Load Data</button>
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

export default GetCardDataModal