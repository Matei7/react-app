import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Container} from "semantic-ui-react";
import {getSpitale, getMedics, getUsers, deleteUser, deleteHospital, deleteMedic, editHospital} from 'shared/api';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Input from '@material-ui/core/Input';
import './Admin.css';
import {editMedic} from "../../shared/api";

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
});

class AdminPanel extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        getSpitale()
            .then(response => {
                response.json()
                    .then(res => {
                        this.setState({
                            hospitals: res.data,
                            have_hospitals: true
                        });
                    });
            });

        getMedics()
            .then(response => {
                response.json()
                    .then(res => {
                        this.setState({
                            medics: res.data,
                            have_medics: true
                        });
                    });
            });
        getUsers()
            .then(response => {
                response.json()
                    .then(res => {
                        this.setState({
                            users: res.data,
                            have_users: true
                        });
                    });
            });
    }


    handleDeleteMedic = id => {
        let arr = this.state.medics.filter((elem, index) => {
            return elem.id !== id;
        });
        deleteMedic({'id': id}).then(response => {
            response.json()
                .then(responseMessage => {
                    if (responseMessage.success || responseMessage.success === 'true') {
                        this.setState({
                            medics: arr
                        })
                    }
                })
        });
    };

    handleDeleteUser = id => {
        let arr = this.state.users.filter((elem, index) => {
            return elem.id !== id;
        });
        deleteUser({'id': id}).then(response => {
            response.json()
                .then(responseMessage => {
                    if (responseMessage.success || responseMessage.success === 'true') {
                        this.setState({
                            users: arr
                        })
                    }
                })
        });
    };


    handleDeleteHosp = id => {
        let arr = this.state.hospitals.filter((elem, index) => {
            return elem.id !== id;
        });
        deleteHospital({'id': id}).then(response => {
            response.json()
                .then(responseMessage => {
                    if (responseMessage.success || responseMessage.success === 'true') {
                        this.setState({
                            hospitals: arr
                        })
                    }
                })
        });
    };


    handleEditHosp = id => {
        editHospital({
            'id': id,
            nume: document.getElementById('hosp-name-' + id).value,
            locatie: document.getElementById('hosp-loc-' + id).value,
            tip: document.getElementById('hosp-tip-' + id).value,
        }).then(response => {
            response.json()
                .then(responseMessage => {
                })
        });

    };

    handleEditMedic = id => {
        editMedic({
            'id': id,
            nume: document.getElementById('medic-name-' + id).value,
            an: document.getElementById('medic-an-' + id).value,
            spec: JSON.stringify(document.getElementById('medic-spec-' + id).value),
        }).then(response => {
            response.json()
                .then(responseMessage => {
                })
        });

    };

    renderMedics = () => {
        return (<Paper className={styles.root}>
            <Table className={styles.table}>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Id</TableCell>
                        <TableCell align="center">Nume</TableCell>
                        <TableCell align="center">An absolvire</TableCell>
                        <TableCell align="center">Specializare</TableCell>
                        <TableCell align="center"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.state.medics.map(row => (
                        <TableRow key={row.id} id={'medic-' + row.id}>
                            <TableCell align="left">
                                {row.id}
                            </TableCell>
                            <TableCell align="left">
                                <Input
                                    id={'medic-name-' + row.id}
                                    className={'table_input'}
                                    defaultValue={row.nume}
                                    inputProps={{
                                        'aria-label': 'Description',
                                    }}
                                /></TableCell>
                            <TableCell align="left"><Input
                                id={'medic-an-' + row.id}
                                className={'table_input'}
                                defaultValue={row.an_absolvire}
                                inputProps={{
                                    'aria-label': 'Description',
                                }}
                            /></TableCell>
                            <TableCell align="left"><Input
                                id={'medic-spec-' + row.id}
                                className={'table_input'}
                                defaultValue={JSON.parse(row.specializare)}
                                inputProps={{
                                    'aria-label': 'Description',
                                }}
                            /></TableCell>
                            <TableCell align="center"><IconButton aria-label="Delete" className={'delete_icon'}
                                                                  onClick={() => {
                                                                      this.handleEditMedic(row.id)
                                                                  }}>
                                <EditIcon fontSize="small"/>
                            </IconButton><IconButton aria-label="Delete" className={'delete_icon'}
                                                     onClick={() => {
                                                         this.handleDeleteMedic(row.id)
                                                     }}>
                                <DeleteIcon fontSize="small"/>
                            </IconButton></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>);
    };


    renderHospitals = () => {
        return (<Paper className={styles.root}>
            <Table className={styles.table}>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Id</TableCell>
                        <TableCell align="center">Nume</TableCell>
                        <TableCell align="center">Locatie</TableCell>
                        <TableCell align="center">Tip</TableCell>
                        <TableCell align="center"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.state.hospitals.map(row => (
                        <TableRow key={row.id} id={'hosp-' + row.id}>
                            <TableCell align="left">
                                {row.id}
                            </TableCell>
                            <TableCell align="left">
                                <Input
                                    id={'hosp-name-' + row.id}
                                    className={'table_input'}
                                    defaultValue={row.nume}
                                    inputProps={{
                                        'aria-label': 'Description',
                                    }}
                                /></TableCell>
                            <TableCell align="left"><Input
                                id={'hosp-loc-' + row.id}
                                className={'table_input'}
                                defaultValue={row.locatie}
                                inputProps={{
                                    'aria-label': 'Description',
                                }}
                            /></TableCell>
                            <TableCell align="left"><Input
                                id={'hosp-tip-' + row.id}
                                className={'table_input'}
                                defaultValue={row.tip}
                                inputProps={{
                                    'aria-label': 'Description',
                                }}
                            /></TableCell>
                            <TableCell align="center"><IconButton aria-label="Delete" className={'delete_icon'}
                                                                  onClick={() => {
                                                                      this.handleEditHosp(row.id)
                                                                  }}>
                                <EditIcon fontSize="small"/>
                            </IconButton><IconButton aria-label="Delete" className={'delete_icon'}
                                                     onClick={() => {
                                                         this.handleDeleteHosp(row.id)
                                                     }}>
                                <DeleteIcon fontSize="small"/>
                            </IconButton></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>);
    };
    renderUsers = () => {
        return (<Paper className={styles.root}>
            <Table className={styles.table}>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Id</TableCell>
                        <TableCell align="center">Nume</TableCell>
                        <TableCell align="center">Email</TableCell>
                        <TableCell align="center">Role</TableCell>
                        <TableCell align="center"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.state.users.map(row => (
                        <TableRow key={row.id}>
                            <TableCell align="left">{row.id}</TableCell>
                            <TableCell align="left">{row.nume}</TableCell>
                            <TableCell align="left">{row.email}</TableCell>
                            <TableCell align="left">{row.type}</TableCell>
                            <TableCell align="center"><IconButton aria-label="Delete" className={'delete_icon'}
                                                                  onClick={() => {
                                                                      this.handleDeleteUser(row.id)
                                                                  }}>
                                <DeleteIcon fontSize="small"/>
                            </IconButton></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>);
    };


    render() {
        return (
            <Container>
                <br/>
                <br/>
                <hr/>
                <h2>Users</h2>
                <hr/>
                <br/>
                {
                    this.state && this.state.have_users ? this.renderUsers() : null
                }
                <br/>
                <br/>
                <hr/>
                <h2>Hospital</h2>
                <hr/>
                {
                    this.state && this.state.have_hospitals ? this.renderHospitals() : null
                }
                <br/>
                <br/>
                <hr/>
                <h2>Doctors</h2>
                <hr/>
                <br/>
                {
                    this.state && this.state.have_medics ? this.renderMedics() : null
                }

            </Container>
        );
    }
}

export default AdminPanel;