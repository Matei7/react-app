import React from 'react';
import SideNav, {Toggle, Nav, NavItem, NavIcon, NavText} from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import './Sidebar.css';
import Home from '@material-ui/icons/Home';
import Group from '@material-ui/icons/Group';
import Info from '@material-ui/icons/Info';


class Sidebar extends React.Component {
    render() {
        return <div className={'sidenav-container'}><SideNav
            onSelect={(selected) => {
                // Add your code here
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
                <NavItem eventKey="contact">
                    <NavIcon> <Group/></NavIcon>

                    <NavText>
                        Contact
                    </NavText>
                </NavItem><NavItem eventKey="about">
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

export default Sidebar;