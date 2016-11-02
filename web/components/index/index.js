/**
 * Created by mac on 16/8/3.
 */
import React from "react";
import {Link} from "react-router"
import {bootstrap} from "../../core/ui/index";

import {CommonTable, Editor} from "../common/index"

let {Navbar, Nav, NavItem, NavDropdown, MenuItem, Button, ButtonToolbar} = bootstrap;

export default class Index extends React.Component {

    static contextTypes = {
        router: React.PropTypes.object
    };

    onLogin() {
        this.context.router.push("login");
    }

    render() {
        return (
            <div>
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#">React-Boilerplate</a>
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Nav>
                        <NavItem eventKey={1}><Link to="/">About</Link></NavItem>
                        <NavItem eventKey={2}><Link to="/">How to use</Link></NavItem>
                        <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                            <MenuItem eventKey={3.1}><Link to="/">Action</Link></MenuItem>
                            <MenuItem eventKey={3.2}>Another action</MenuItem>
                            <MenuItem eventKey={3.3}>Something else here</MenuItem>
                        </NavDropdown>
                    </Nav>
                    <Navbar.Form pullRight>
                        <ButtonToolbar>
                            <Button onClick={::this.onLogin}>Sign in</Button>
                            <Button>Login in</Button>
                        </ButtonToolbar>
                    </Navbar.Form>
                </Navbar>
                {this.props.children}
                <div>
                    <CommonTable
                        tableHeader={[
                            <td>NO.</td>,
                            <td>name</td>
                        ]}
                        renderRow={
                            (data) => {
                                return (
                                    [
                                        <td>{data.no}</td>,
                                        <td>{data.name}</td>
                                    ]
                                )
                            }
                        }
                        datas={
                            [
                                {
                                    no: 1,
                                    name: 'abc'
                                },
                                {
                                    no: 2,
                                    name: 'def'
                                }
                            ]
                        }
                    />
                </div>
                <div>
                    <Editor/>
                </div>
            </div>
            
        );
    }
}
