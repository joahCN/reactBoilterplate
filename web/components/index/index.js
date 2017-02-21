/**
 * Created by mac on 16/8/3.
 */
import React from "react";
import {Link} from "react-router"
import {bootstrap} from "../../core/ui/index";

import {CommonTable, Editor} from "../common/index"

let {Navbar, Nav, NavItem, NavDropdown, MenuItem, Button, ButtonToolbar, Row, Col} = bootstrap;

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
                <Navbar defaultExpanded="false" collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#">Wisdom dinner admin</a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <NavItem eventKey={1}><Link to="/">About</Link></NavItem>
                            <NavItem eventKey={2}><Link to="/">How to use</Link></NavItem>
                            <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                                <MenuItem eventKey={3.1}><Link to="/">Action</Link></MenuItem>
                                <MenuItem eventKey={3.2}>Another action</MenuItem>
                                <MenuItem eventKey={3.3}>Something else here</MenuItem>
                            </NavDropdown>
                        </Nav>
                        <Navbar.Form pullRight className="hidden-xs">
                            <ButtonToolbar>
                                <Button onClick={::this.onLogin}>Sign in</Button>
                                <Button>Login in</Button>
                            </ButtonToolbar>
                        </Navbar.Form>
                    </Navbar.Collapse>
                </Navbar>
                {this.props.children}
                <div>
                    <ButtonToolbar className="visible-xs-block">
                        <Button onClick={::this.onLogin}>Sign in</Button>
                        <Button>Login in</Button>
                    </ButtonToolbar>
                </div>

            </div>
            
        );
    }
}
