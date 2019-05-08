import React from 'react';
import SideNav, {NavItem, NavIcon, NavText} from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import './Sidebar.css';
import Home from '@material-ui/icons/Home';
import Group from '@material-ui/icons/Group';
import Info from '@material-ui/icons/Info';
import VerifiedUser from '@material-ui/icons/VerifiedUser';
import MapTwoTone from '@material-ui/icons/MapTwoTone';
import {withRouter} from 'react-router-dom';

class Sidebar extends React.Component {
    render() {
        return <div className={'sidenav-container'}><SideNav
            onSelect={(selected) => {

                this.props.history.push('/' + selected)
            }}
        >
            <SideNav.Toggle/>
            <SideNav.Nav defaultSelected="home">
                <NavItem eventKey="home">

                    <NavIcon> <Home/></NavIcon>

                    <NavText>
                        Home
                    </NavText>
                </NavItem>
                {localStorage.getItem('userDetails') && JSON.parse(localStorage.getItem('userDetails')).type === 'admin' ?
                    <NavItem eventKey="admin">
                        <NavIcon> <VerifiedUser/></NavIcon>

                        <NavText>
                            Admin Panel
                        </NavText>
                    </NavItem> : null}

                <NavItem eventKey="map">
                    <NavIcon> <MapTwoTone/></NavIcon>

                    <NavText>
                        Hospital Locations
                    </NavText>
                </NavItem> <NavItem eventKey="contact">
                    <NavIcon> <Group/></NavIcon>

                    <NavText>
                        Contact
                    </NavText>
                </NavItem>
                <NavItem eventKey="about">
                    <NavIcon> <Info/></NavIcon>

                    <NavText>
                        About
                    </NavText>
                </NavItem>
            </SideNav.Nav>
        </SideNav>
        </div>
    }

}

export default withRouter(Sidebar);