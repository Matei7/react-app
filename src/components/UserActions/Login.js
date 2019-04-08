import React, {Component} from "react";
import {Button, FormGroup, FormControl, FormLabel} from "react-bootstrap";
import "./UserActions.css";
import {login} from 'shared/api';
import {Alert} from "reactstrap";
import {Redirect} from "react-router-dom";

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""

        };
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value,
            loginFailed: false,
        });
    };

    handleSubmit = event => {
        event.preventDefault();
        const user = {'email': this.state.email, 'password': this.state.password};

        login(user).then(response => {
            response.json()
                .then(responseMessage => {
                    if (responseMessage.success) {
                        localStorage.setItem('isLogged', true);
                        localStorage.setItem('userDetails', responseMessage.data);
                        this.setState({
                            loginSucces: true,
                        });
                    } else {
                        this.setState({
                            loginFailed: true,
                        });
                    }

                })
        });
    };

    showError = () => {
        return (<Alert color="danger">
            Login Failed ! Try again.
        </Alert>)
    };


    redirect = () => {
        return (<Redirect to='/homepage'/>);
    }


    render() {
        return (
            <div className="Login" id='login-form'>

                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="email">
                        <FormLabel>Email</FormLabel>
                        <FormControl
                            autoFocus
                            type="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="password" >
                        <FormLabel>Password</FormLabel>
                        <FormControl
                            value={this.state.password}
                            onChange={this.handleChange}
                            type="password"
                        />
                    </FormGroup>
                    {this.state.loginFailed ? this.showError() : null}
                    {this.state.loginSucces ? this.redirect() : null}
                    <Button
                        block
                        disabled={!this.validateForm()}
                        type="submit"
                        className={'login-button'}
                    >
                        Login
                    </Button>
                </form>
            </div>
        );
    }
}