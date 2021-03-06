import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import {fade} from '@material-ui/core/styles/colorManipulator';
import {withStyles} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Language from '@material-ui/icons/Language';
import './Header.css';
import MoreIcon from '@material-ui/icons/MoreVert';
import LocalHospital from '@material-ui/icons/LocalHospital';
import i18n from '../../i18n';
import {withCookies, Cookies} from 'react-cookie';
import {instanceOf} from 'prop-types';
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";
import {Link, Redirect} from 'react-router-dom';

const styles = theme => ({
    root: {
        width: '100%',
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing.unit * 2,
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit * 3,
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
});

class PrimarySearchAppBar extends React.Component {
    state = {
        anchorEl: null,
        mobileMoreAnchorEl: null,
        lng: 'ro'
    };
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);

        const {cookies} = props;
        this.toggle = this.toggle.bind(this);
        const lng = cookies.get('lng') || 'ro';
        i18n.changeLanguage(lng);
        this.state = {
            lng: lng,
            dropdownOpen: false,
            logged: localStorage.getItem('isLogged') || false
        };
    }

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    changeLanguage = () => {
        let lng;

        if (this.state.lng === 'ro') {
            lng = 'en';
        } else {
            lng = 'ro';
        }

        const {cookies} = this.props;

        cookies.set('lng', lng, {path: '/'});
        i18n.changeLanguage(lng);
        this.setState({
            lng: lng
        });
    };

    handleProfileMenuOpen = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleMenuClose = () => {
        this.setState({anchorEl: null});
        this.handleMobileMenuClose();
    };

    handleMobileMenuOpen = event => {
        this.setState({mobileMoreAnchorEl: event.currentTarget});
    };

    handleMobileMenuClose = () => {
        this.setState({mobileMoreAnchorEl: null});
    };

    logOut = () => {
        localStorage.removeItem('isLogged');
        localStorage.removeItem('userDetails');
        this.setState({
            logout: true
        })
    };

    handleRedirect = () => {
        return (<Redirect to='/homepage'/>);
    };

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                {this.state.logout ? this.handleRedirect() : null}
                <AppBar position="static">
                    <Toolbar>
                        <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                            MedicalCare
                            <LocalHospital/>
                        </Typography>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon/>
                            </div>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                            />
                        </div>
                        <div className={classes.grow}/>
                        <div className={classes.sectionDesktop}>
                            <IconButton color="inherit" onClick={this.changeLanguage}>
                                <Badge badgeContent={this.state.lng} color="secondary">
                                    <Language/>
                                </Badge>
                            </IconButton>

                            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                <DropdownToggle>
                                    <AccountCircle/>
                                </DropdownToggle>
                                <DropdownMenu>

                                    <DropdownItem>{this.props.logged ? <Link to="/profile">My Profile</Link> :
                                        <Link to="/login">Login</Link>}</DropdownItem>
                                    <DropdownItem divider/>
                                    <DropdownItem>{this.props.logged ?
                                        <span className={'logout'} onClick={this.logOut}>Log Out</span> :
                                        <Link to="/register">Register</Link>}</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>


                        </div>
                        <div className={classes.sectionMobile}>
                            <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                                <MoreIcon/>
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

PrimarySearchAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withCookies(withStyles(styles)(PrimarySearchAppBar));
