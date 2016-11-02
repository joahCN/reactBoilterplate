/**
 * Created by mac on 16/9/22.
 */
import React from "react";
import {Link} from "react-router"
import {bootstrap} from "../../../core/ui/index";

let {Table} = bootstrap;

export default class CommonTable extends React.Component {

    static propTypes = {
        tabHeader: React.PropTypes.node.required,
        renderRow: React.PropTypes.func.required,
        datas: React.PropTypes.array
    };
    
    static defaultProps = {
        datas: []
    };

    renderRow() {
        return this.props.datas.map((data)=>{
            return (
                <tr>
                    {this.props.renderRow(data)}
                </tr>
            )
        });
    }

    render() {
        return (
            <Table striped bordered condensed hover>
                <thead>
                    <tr>
                        {this.props.tableHeader}
                    </tr>
                </thead>
                <tbody>
                    {this.renderRow()}
                </tbody>
            </Table>
        );
    }
}
