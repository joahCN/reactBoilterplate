/**
 * Created by mac on 16/8/31.
 */
import React from "react";
import {Link} from "react-router"
import {bootstrap} from "../../core/ui/index";
import {connect} from "react-redux";
import {login} from "../../reducers/user";
import { Field, reduxForm } from 'redux-form';
import selectors from '../../selectors/index';
import actions from '../../actions/index'


let {Form, FormGroup, ControlLabel, FormControl, Checkbox, Button, Col} = bootstrap;

const ReduxFormControl = (props) => {
    let {type, placeholder, input} = props;
    return (
        <FormControl type={type} placeholder={placeholder} {...input}/>
    )
};

// export default class Login extends React.Component {
//     render() {
//         return <div>Login Form.</div>
//     }
// }

@connect(
    state => ({
        loginUser: selectors.user.getLoginUser(state),
        loginForm: state.form.loginForm
    }),
    {login: actions.user.login}
)
@reduxForm({
    form: "loginForm"
})
export default class Login extends React.Component {

    login(values) {
        this.props.login({
            userName: "joah"
        });

    }

    render() {
        const { handleSubmit, pristine, reset, submitting } = this.props;
        return (
            <Form horizontal onSubmit={handleSubmit(::this.login)}>
                <FormGroup controlId="formHorizontalEmail">
                    <Col componentClass={ControlLabel} sm={2}>
                        Email
                    </Col>
                    <Col sm={10}>
                        <Field name="userName" component={ReduxFormControl} props={{placeholder: "Email", type: "email"}}/>
                    </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalPassword">
                    <Col componentClass={ControlLabel} sm={2}>
                        Password
                    </Col>
                    <Col sm={10}>
                        <Field name="password" component={ReduxFormControl} props={{placeholder: "password", type: "password"}}/>
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col smOffset={2} sm={10}>
                        <Field name="rememberMe" component={ReduxFormControl} props={{type: "checkbox"}}/>remember me
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col smOffset={2} sm={10}>
                        <Button onClick={::this.login}>
                            Sign in
                        </Button>
                        <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
                    </Col>
                </FormGroup>
                <label>{this.props.loginForm && JSON.stringify(this.props.loginForm.values)}</label>
            </Form>
        )
    }
}