import { Modal, Button } from 'react-bootstrap';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import GlobalConfigModal from './GlobalConfigModal';

const styleObj = {
    position: "fixed",
    top: 0,
    left: 0,
    width: '100%',
    height: "80px",
    backgroundColor: "#D93954",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 1em',
    boxSizing: 'border-box',
    boxShadow: '0 0.125rem 0.25rem 0 rgba(0,0,0,.15)',
    color: '#fff',
    fontWeight: 'bold'
}

//object for styling the component
const profileRound = {
    width: '45px',
    height: '45px',
    backgroundColor: '#fff',
    borderRadius: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#D93954'
}

const profileWrap = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '20%'
}

const Header = () => {
    const [configModalShow, setConfigModalShow] = useState(false);
    const handleClose = () => setConfigModalShow(false);
    const handleShow = () => setConfigModalShow(true);
    return (
        <div style={styleObj}>
            {/* <p>Logo</p> */}
            
            <p>FRONT-END STUDIO</p>
            <div style={profileWrap} >
                <button className="buttonPrimary" onClick={handleShow}>Global</button>
                <div>
                    <Link
                        to={{
                            pathname: '/preview',

                        }}
                    >
                        <button className="buttonPrimary">Preview</button>
                    </Link>
                </div>
                <p style={profileRound}>AM</p>
            </div>
            {configModalShow && <GlobalConfigModal show = {configModalShow} handleClose={handleClose}/>}
        </div>
    )
}
export default Header