import React, {Component} from 'react';
import './App.css';
import Header from 'components/Header/Header'
import {Route, Switch, Redirect} from "react-router-dom";
import HospitalList from "./components/Hospital/HospitalList";
import MedicsList from "./components/MedicsList/MedicsList";
import MedicProfile from "./components/MedicProfile/MedicProfile";
import Sidebar from "./components/Sidebar/Sidebar";
import Footer from "./components/Footer/Footer";
import Login from "./components/UserActions/Login";
import Profile from "./components/UserActions/Profile";
import Register from "./components/UserActions/Register";
import AdminPanel from "./components/Admin/AdminPanel";
import MapDetails from "./components/Map/MapDetails";


class App extends Component {

    constructor(props) {

        super(props);
        this.state = {
            logged: localStorage.getItem('isLogged') || false
        };
    }

    checkLogged = () => {
        const current_value = localStorage.getItem('isLogged') || false;

        if (this.state.logged !== current_value) {
            this.setState({
                logged: current_value
            })
        }
    };

    render() {
        const PrivateRoute = ({component: Component, ...rest}) => (
            <Route {...rest} render={(props) => (
                JSON.parse(localStorage.getItem('userDetails')).type === 'admin'
                    ? <Component {...props} />
                    : <Redirect to='/login'/>
            )}/>
        )
        return (
            <div className="App">
                {this.checkLogged()}
                <header className="App-header">
                    <Header logged={this.state.logged}/>
                    <Sidebar/>
                </header>
                <div className={"header-image"}></div>
                <Switch>


                    <PrivateRoute exact path="/admin" component={AdminPanel}/>
                    <Route exact path="/" component={HospitalList}/>
                    <Route path="/medics" component={MedicsList}/>
                    <Route path="/hospital" component={HospitalList}/>
                    <Route path="/map" component={MapDetails}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/medic" component={MedicProfile}/>
                    <Route path="/profile" component={Profile}/>
                    {/* when none of the above match, <NoMatch> will be rendered */}
                    <Route component={HospitalList}/>
                </Switch>

                <Footer/>
            </div>
        );
    }
}

export default App;
