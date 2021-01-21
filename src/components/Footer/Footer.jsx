import React from 'react';

const styleObj={
    position:"fixed",
    bottom:0,
    left:0,
    width:'100%',
    height:"80px",
    backgroundColor:"#f1f1f1",
    textAlign:'center'
}

const Footer = () =>{
    return(
        <div style={styleObj}>
        <p>Footer</p>
        </div>
    )
}
export default Footer