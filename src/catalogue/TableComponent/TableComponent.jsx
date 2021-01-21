import React from 'react';
import data from "../../Data/Data.json"
import { ThemeContext } from '../../ThemeContext';
import "./TableComponent.scss"

export default class TableComponent extends React.Component {

    constructor(props) {
        super(props);
        this.getHeader = this.getHeader.bind(this);
        this.getRowsData = this.getRowsData.bind(this);
        this.getKeys = this.getKeys.bind(this);
    }

    getKeys = function () {
        const deTabel = this.props.tableData[0].defaultData || data.tableData[0].defaultData
        return Object.keys(deTabel[0]);
    }

    getHeader = function () {
        var keys = this.getKeys();
        return keys.map((key, index) => {
            return <th key={key}>{key.toUpperCase()}</th>
        })
    }

    getRowsData = function () {
        var items = this.props.tableData[0].defaultData ? this.props.tableData[0].defaultData : this.props.tableData;
        var keys = this.getKeys();
        return items.map((row, index) => {
            return <tr key={index}><RenderRow key={index} data={row} keys={keys} handleTableClick={(e) => this.props.handleTableClick(this.props.index)} /></tr>
        })
    }

    render() {
        const styleObj = {
            padding: '1em 0'
        }
        return (
            <ThemeContext.Consumer>
                {({ theme }) => (
                    <div style={styleObj && this.props.tableData[0].styleObj} className="table-main-wrap">
                        <table style={{ color: `${theme.primaryColor}` } } className="table-width">
                            <thead>
                                <tr>{this.getHeader()}</tr>
                            </thead>
                            <tbody>
                                {this.getRowsData()}
                            </tbody>
                        </table>
                    </div>
                )}

            </ThemeContext.Consumer>
        );
    }
}

const RenderRow = (propsData) => {
    return propsData.keys.map((key, index) => {
        return <td key={propsData.data[key]} onClick={(e) => propsData.handleTableClick(key, index)}>{propsData.data[key]}</td>
    })
}