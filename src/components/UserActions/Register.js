import React, {Component} from "react";
import {Button, FormGroup, FormControl, FormLabel} from "react-bootstrap";
import "./UserActions.css";
import {register} from 'shared/api';
import {Alert} from "reactstrap";
import {Redirect} from "react-router-dom";

export default class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            name: '',
        };
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0 && this.state.name.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    handleSubmit = event => {
        event.preventDefault();
        const user = {'email': this.state.email, 'password': this.state.password, 'name': this.state.name};
        register(user).then(response => {
            response.json()
                .then(responseMessage => {
                    if (responseMessage.success) {
                        localStorage.setItem('isLogged', true);
                        localStorage.setItem('userDetails', responseMessage.data);
                        this.setState({
                            registerSuccess: true,
                        });
                    } else {
                        this.setState({
                            registerFailed: true,
                        });
                    }

                })
        });
    };

    showError = () => {
        return (<Alert color="danger">
            Email already exists!
        </Alert>)
    };


    redirect = () => {
        return (<Redirect to='/login'/>);
    };


    render() {
        return (
            <div className="Login" id='login-form'>

                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="name">
                        <FormLabel>Name</FormLabel>
                        <FormControl
                            autoFocus
                            type="text"
                            value={this.state.name}
                            onChange={this.handleChange}
                        />
                    </FormGroup><FormGroup controlId="email">
                    <FormLabel>Email</FormLabel>
                    <FormControl
                        autoFocus
                        type="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                    />
                </FormGroup>
                    <FormGroup controlId="password">
                        <FormLabel>Password</FormLabel>
                        <FormControl
                            value={this.state.password}
                            onChange={this.handleChange}
                            type="password"
                        />
                    </FormGroup>
                    {this.state.registerFailed ? this.showError() : null}
                    {this.state.registerSuccess ? this.redirect() : null}
                    <Button
                        block
                        disabled={!this.validateForm()}
                        type="submit"
                        className={'login-button'}
                    >
                        Register
                    </Button>
                </form>
            </div>
        );
    }
}