import * as React from "react";
import {
    Grid,
    Header,
    Image,
    Segment,
    Container
} from 'semantic-ui-react'
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import LocalHospital from '@material-ui/icons/LocalHospital';

import {getProfile} from 'shared/api'

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        let user_data = JSON.parse(localStorage.getItem('userDetails'));
        getProfile(user_data.id)
            .then(response => {
                response.json()
                    .then(res => {
                        const data = res.data;
                        this.setState({
                            data: data,
                        });
                    });
            });
    };


    validateForm() {
        console.log(localStorage.getItem(this.state.rating));
        const isLogged = localStorage.getItem('isLogged') || false;
        return isLogged;
    }

    chipRender = label => {
        return (<Chip
            icon={<LocalHospital/>}
            label={label}
            className={'chip_specializare'}
            color="primary"
        />);
    };

    handleChange = () => {
        var file = document.querySelector('input[type=file]')['files'][0];
        var FR = new FileReader();
        var self = this;
        FR.addEventListener("load", function (e) {

            self.setState({
                file_source: e.target.result
            });
        });

        FR.readAsDataURL(file);
    };


    handleFieldChange = (e) => {

    };


    displayProfile = () => {
        const user_data = this.state.data;
        user_data.poza = this.state.file_source;

        return (<Segment style={{padding: '8em 0em'}} vertical>
            <Grid container stackable verticalAlign='middle'>
                <Grid.Row>
                    <Grid.Column width={8}>
                        <div className={'hospital_title'}>
                            <span className={'hospital_title_text'}>    {this.state.data.nume}  </span>
                        </div>

                        <TextField
                            id="outlined-name"
                            label="Name"
                            className={'profile_input'}
                            value={this.state.data.nume}
                            margin="normal"
                            onChange={this.handleFieldChange}
                            variant="outlined"
                        />

                        <TextField
                            id="email"
                            label="Email"
                            className={'profile_input'}
                            type="email"
                            name="email"
                            autoComplete="email"
                            margin="normal"
                            variant="outlined"
                            onChange={this.handleFieldChange}
                            value={this.state.data.email}
                        />

                        <TextField
                            id="password"
                            label="Password"
                            className={'profile_input'}
                            type="password"
                            autoComplete="current-password"
                            margin="normal"
                            variant="outlined"
                            onChange={this.handleFieldChange}
                            value={this.state.data.password}
                        />


                        <Header as='h4' style={{fontSize: '1.75em'}}>
                            Afectiuni
                        </Header>
                        {user_data.afectiuni.map(e => {
                            return (this.chipRender(e));
                        })}

                    </Grid.Column>
                    <Grid.Column floated='right' width={6}>
                        <Image bordered rounded size='large' src={user_data.poza}/>
                        <TextField
                            id="pic"
                            label="Change Profile Picture"
                            type='file'
                            className={'profile_input'}
                            margin="normal"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                onChange: this.handleChange
                            }}
                        />
                    </Grid.Column>
                </Grid.Row>
                <hr/>
                <Grid.Row>
                    <Grid.Column width={8}>

                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>);
    };

    render() {
        return (

            <Container>
                {this.state.data ? this.displayProfile() : 'No data'}</Container>);
    }

}

export default Profile;