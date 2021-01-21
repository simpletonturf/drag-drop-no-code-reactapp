import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { axiosRequest } from "../../utills/axios"
import "../../scss/style.scss";
import "../Workspace/Workspace.scss"

const GetCardImageSourceModal = (props) => {
    const [imageSourceType, setImageSourceType] = useState('select')
    const [cardImage, setCardImage] = useState('')
    const [urlValue, setUrlValue] = useState('')
    const [urlErrorMsg, setUrlErrorMsg] = useState(false)
    const [imgName, setImgName] = useState('')


    const selectStyleObj = {
        width: '100%',
        padding: '0.5em',
        margin: '1em 0'
    }
    const handleImgSourceType = (source) => {
        setImageSourceType(source)
    }
    const handleCardImg = (e) => {
        setCardImage(URL.createObjectURL(e.target.files[0]))
        setImgName(e.target.files[0].name)
    }

    const isImageURL = (url) => {
        return (url.match(/\.(jpeg|jpg|gif|png)$/) != null);
    }

    const handleUrlValue = async (e) => {
        await setUrlValue(e)
        const testCheck = isImageURL(e)
        console.log(testCheck)
        if (testCheck) {
            setUrlErrorMsg(false)
        }
        else {
            setUrlErrorMsg(true)
        }
    }



    const localImgSource = () => {
        return (
            <React.Fragment>
                <input style={selectStyleObj} placeholder='Card Image' onChange={e => handleCardImg(e)} type='file' />
                {cardImage &&
                    <React.Fragment>
                        <div className="btn-wrap" style={selectStyleObj}>
                            <button className="buttonPrimary" onClick={(e) => props.handleCardlocalSource({ cardImage,imgName })}>Set Image</button>
                        </div>
                    </React.Fragment>}

            </React.Fragment>
        )
    }

    const onlineImgSource = () => {
        return (
            <React.Fragment>
                <label>Image URL</label>
                <input placeholder='URL'
                    type='text'
                    value={urlValue}
                    onChange={e => handleUrlValue(e.target.value)}
                // onBlur={handleUrlFocusOut}
                />
                {urlErrorMsg && <span className="error-msg">Not a valid image URL</span>}
                {!urlErrorMsg &&
                    <button className="buttonPrimary"
                        onClick={(e) => props.handleCardlocalSource({ urlValue })}
                    >Set Image</button>
                }</React.Fragment>
        )
    }

    const showSourceType = (imageSourceType === 'local') ? localImgSource() :
        (imageSourceType === 'online') ? onlineImgSource() : '';

    return (
        <React.Fragment>
            <Modal show={props.cardImgModalShow} onHide={props.handleCardImageSourceModalClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Card Image Source</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="data-modal-content-wrap width100 pad0">
                        <div className="type-wrap">
                            <label className="pad0">Type</label>
                            <select style={selectStyleObj} value={imageSourceType} onChange={(e) => handleImgSourceType(e.target.value)}>
                                <option value='select' disabled>Select Source</option>
                                <option value='local'>Upload From Local</option>
                                <option value='online'>Image URL</option>
                            </select>
                        </div>
                        {showSourceType}
                    </div>
                </Modal.Body>
                {/* <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleCardImageSourceModalClose}>
                        Close
          </Button>
                    <Button variant="primary">
                        Save
          </Button>
                </Modal.Footer> */}
            </Modal>
        </React.Fragment>
    )

}

export default GetCardImageSourceModal