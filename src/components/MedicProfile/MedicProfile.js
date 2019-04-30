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
import Score from '@material-ui/icons/Score';

import {getMedicById, postComment} from 'shared/api'
import './MedicProfile.css';
import {Button} from "react-bootstrap";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import {deleteComment} from "../../shared/api";

const classes = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        display: 'flex',
        marginBlock: ' margin: 25px auto !important'
    },
    dense: {
        marginTop: 16,
    },
    menu: {
        width: 200,
    },
});


const inputProps = {
    max: 10,
    min: 0,
};

class MedicProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: '',
            comment: '',
        };
    }

    componentDidMount() {
        let id = this.props.location.state ? this.props.location.state.medic_id : this.props.location.pathname.replace(this.props.match.path + '/', '') ? this.props.location.pathname.replace(this.props.match.path + '/', '') : 1;
        getMedicById(id)
            .then(response => {
                response.json()
                    .then(res => {
                        if (res.success) {
                            const data = res.data;
                            this.setState({
                                data: data,
                                medic_id: data.id,
                                current_rating: data.rating,
                                comments: data.comments,
                            });
                        }
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

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        })
    };


    handleSubmit = (e) => {
        e.preventDefault();

        const comment = {'rating': this.state.rating, 'comment': this.state.comment, 'id_medic': this.state.medic_id};
        postComment(comment).then(response => {
            response.json()
                .then(responseMessage => {
                    if (responseMessage.success) {
                        this.setState({
                            current_rating: responseMessage.data.rating,
                            comments: responseMessage.data.comments,
                            comment: '',
                            rating: 0,
                        })
                    }

                })
        });
    };

    handleDelete = id => {
        let arr = this.state.data.comments.filter((elem, index) => {
            return elem.id !== id;
        });
        deleteComment({'id': id}).then(response => {
            response.json()
                .then(responseMessage => {
                    if (responseMessage.success || responseMessage.success === 'true') {
                        this.setState({
                            data: {
                                ...this.state.data,
                                comments: arr
                            }
                        })
                    }
                })
        });
    };


    displayProfile = () => {

        const user_data = this.state.data;
        const labelRating = 'Current Rating: ' + this.state.current_rating;
        return (<Segment style={{padding: '8em 0em'}} vertical>
            <Grid container stackable verticalAlign='middle'>
                <Grid.Row>
                    <Grid.Column width={8}>
                        <div className={'hospital_title'}>
                            <span className={'hospital_title_text'}>    {user_data.nume}  </span>
                        </div>
                        <p style={{fontSize: '1.33em'}}>

                            An absolvire: {user_data.an_absolvire}
                        </p>
                        <Header as='h4' style={{fontSize: '1.75em'}}>
                            Specializari
                        </Header>
                        {user_data.specializare.map(e => {
                            return (this.chipRender(e));
                        })}

                    </Grid.Column>
                    <Grid.Column floated='right' width={6}>
                        <Image bordered rounded size='large' src={user_data.poza}/>
                    </Grid.Column>
                </Grid.Row>
                <hr/>
                <Grid.Row>
                    <Grid.Column width={8}>
                        <div className="Login" id='login-form'>
                            <Chip
                                icon={<Score/>}
                                label={labelRating}
                                className={'rating_chip'}
                                color="primary"
                                variant="outlined"
                            />
                            <form className={classes.container} noValidate autoComplete="off"
                                  onSubmit={this.handleSubmit}>
                                <TextField
                                    id="rating"
                                    label="Rating"
                                    className={'profile_input'}
                                    placeholder="0"
                                    margin="normal"
                                    variant="outlined"
                                    value={this.state.rating}
                                    type='number'
                                    inputProps={inputProps}
                                    onChange={this.handleChange}
                                />
                                <TextField
                                    id="comment"
                                    label="Comment"
                                    multiline
                                    rows="4"
                                    placeholder="No Comment"
                                    className={'profile_input'}
                                    value={this.state.comment}
                                    margin="normal"
                                    variant="outlined"
                                    onChange={this.handleChange}
                                />
                                <Button
                                    block
                                    type="submit"
                                    className={'login-button'}
                                    disabled={!this.validateForm()}
                                >
                                    Comment
                                </Button>

                            </form>
                        </div>
                    </Grid.Column>
                    <Grid.Column floated='right' width={6}>
                        <div className={'previous_comments'}>
                            <h3>Previous Comments</h3>
                            {this.state.data.comments.map(e => {
                                return <div key={e.id} className={'medic_comment'} id={'medic_comment' + e.id}>
                                    <TextField
                                        disabled
                                        id="outlined-disabled"
                                        label={'Rating: ' + e.rating}
                                        defaultValue={e.comment}
                                        className={classes.textField}
                                        margin="normal"
                                        variant="outlined"
                                    />
                                    {
                                        JSON.parse(localStorage.getItem('userDetails')).type === 'admin' ?
                                            <IconButton aria-label="Delete" className={'delete_icon'} onClick={() => {
                                                this.handleDelete(e.id)
                                            }}>
                                                <DeleteIcon fontSize="small"/>
                                            </IconButton> : ''
                                    }
                                </div>
                            })}</div>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>);
    };

    render() {
        return (
            <Container>
                {this.state.medic_id ? this.displayProfile() : 'No data'}</Container>);
    }
}

export default MedicProfile;