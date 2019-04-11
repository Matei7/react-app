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
import DoneIcon from '@material-ui/icons/Done';

import {getProfile, updateProfile} from 'shared/api'
import {Button} from "react-bootstrap";


const afectiuni = [
    'cancer types',
    'cutaneous conditions',
    'endocrine diseases',
    'eye diseases and disorders',
    'intestinal diseases',
    'infectious diseases',
    'human disease case fatality rates',
    'communication disorders',
    'genetic disorders',
    'neurological disorders',
    'voice disorders',
    'vulvovaginal disorders',
    'liver disorders',
    'heart disorders',
    'eating disorders',
    'mood disorders',
    'personality disorders'];

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

                            let user_afectiuni = [];
                            res.data.afectiuni.forEach((e) => {
                                e = e.replace('\n', '');
                                if (e[0] === '') {
                                    e = e.substr(1, e.length);
                                }

                                user_afectiuni.push(e);
                            });
                            let difference = [];
                            user_afectiuni.map(e => {
                                difference.push(e.toString().trim());
                            });
                            res.data.afectiuni = user_afectiuni;

                            const data = res.data;
                            this.setState({
                                data: data,
                                not_selected: afectiuni.filter(x => !difference.includes(x))
                            });
                        });
                }
            )
        ;
    };

    handleDelete = e => () => {
        let arr = this.state.data.afectiuni.filter((elem, index) => {
            return elem !== e;
        });
        let arr2 = this.state.not_selected;
        arr2.push(e);

        this.setState({
            data: {
                ...this.state.data,
                afectiuni: arr
            },
            not_selected: arr2,
        })
    };
    handleSelect = e => () => {
        let arr = this.state.not_selected.filter((elem, index) => {
            return elem !== e;
        });

        let arr2 = this.state.data.afectiuni;
        arr2.push(e);

        this.setState({
            not_selected: arr,
            data: {
                ...this.state.data,
                afectiuni: arr2
            }
        })
    };


    validateForm() {
        return this.state.data.email.length > 0 && this.state.data.password.length > 0;
    }

    chipRenderOther = label => {
        return (<Chip
            icon={<LocalHospital/>}
            label={label}
            onDelete={this.handleSelect(label)}
            className={'chip_specializare'}
            color="primary"
            deleteIcon={<DoneIcon/>}
        />);
    };
    chipRender = label => {
        return (<Chip
            icon={<LocalHospital/>}
            label={label}
            onDelete={this.handleDelete(label)}
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
                data: {
                    ...self.state.data,
                    poza: e.target.result
                }
            });
        });

        FR.readAsDataURL(file);
    };


    handleFieldChange = (event) => {

        this.setState({
            data: {
                ...this.state.data,
                [event.target.id]: event.target.value
            }
        })
    };
    handleUpdate = () => {
        const data = {'user_data': this.state.data, 'poza': this.state.data.poza};
        updateProfile(data).then(response => {
            response.json()
                .then(res => {
                })
        });
    };


    displayProfile = () => {
        const user_data = this.state.data;

        return (<Segment style={{padding: '8em 0em'}} vertical>
            <Grid container stackable verticalAlign='middle'>
                <Grid.Row>
                    <Grid.Column width={8}>
                        <div className={'hospital_title user_name'}>
                            <span className={'hospital_title_text'}>    {this.state.data.nume}  </span>
                        </div>

                        <TextField
                            id="nume"
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

                        {this.state.not_selected.map(e => {
                            return (this.chipRenderOther(e));
                        })}
                        <br/>
                        <hr/>
                        <br/>
                        <div className={'selected_issues'}>
                            {user_data.afectiuni.map(e => {
                                return (this.chipRender(e));
                            })}

                        </div>
                        <Button
                            block
                            onClick={this.handleUpdate}
                            type="submit"
                            className={'update-button'}
                            disabled={!this.validateForm()}
                        >
                            Update Profile
                        </Button>

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