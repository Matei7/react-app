import React, {Component} from "react";
import {Button, FormGroup, FormControl, FormLabel} from "react-bootstrap";
import "./UserActions.css";
import {login} from 'shared/api';

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
            [event.target.id]: event.target.value
        });
    };

    handleSubmit = event => {
        event.preventDefault();
        const user = {'email': this.state.email, 'password': this.state.password};
        var form = new FormData();
        form.append('email', this.state.email);
        form.append('password', this.state.password);
console.log(form)

        login(user).then(response => {
            console.log(response.data);
            response.json()
                .then(data => {
                    console.log(data);
                });
        });
    };

    render() {
        return (
            <div className="Login" id='login-form'>
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="email" bsSize="large">
                        <FormLabel>Email</FormLabel>
                        <FormControl
                            autoFocus
                            type="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="password" bsSize="large">
                        <FormLabel>Password</FormLabel>
                        <FormControl
                            value={this.state.password}
                            onChange={this.handleChange}
                            type="password"
                        />
                    </FormGroup>
                    <Button
                        block
                        bsSize="large"
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