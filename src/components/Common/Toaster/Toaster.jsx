import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toaster =(props)=>{ 
    return (
      <div>
        <ToastContainer 
        autoClose={4000}
        hideProgressBar
        closeOnClick
        position="top-center"/>
      </div>
    );
}

export default Toaster