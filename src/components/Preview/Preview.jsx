import React from 'react';
import { Link } from 'react-router-dom';
import { LiveProvider, LiveEditor, LivePreview, LiveError } from 'react-live'
import styled from 'styled-components';
import data from "../../Data/Data.json"
import "./Preview.scss"

const workSpaceProps = { data: data };

const scope = { styled, workSpaceProps };

const code = `

  const WorkSpace = styled.div\`
    color: palevioletred;
    font-size: 18px;
  \`

const compSwitch = (page, index) => {
    switch (page) {
        case 'Header':
            return (<HeaderComponent bgColor={'transperant'} />)
        case 'Input':
            return (
              <input></input>
                    )
        case 'Button':
            return (
                <button>Click Me</button>
                )
        default:
            return ''
    }
}
 
  render(
    <WorkSpace>
        {workSpaceProps.data.componentList.map((item,index)=>{
            return(
                <React.Fragment>
                    <div key={index}>
                        {compSwitch(item.name, index)}
                    </div>
                </React.Fragment>
            )})}
    </WorkSpace>)`

const Preview = () => {
    return (
        <React.Fragment>
            <div className="preview-main-wrap">
                <Link to='/'>
                    <button className="close-btn">X</button>
                </Link>
                <div className="preview-main">
                    <LiveProvider code={code} scope={scope} noInline={true}>
                        <LiveEditor className="width50 workspace-bg" />
                        <LivePreview className="width50" >
                        </LivePreview>
                        <LiveError />
                    </LiveProvider>
                </div>
            </div>
        </React.Fragment>)

}

export default Preview