import React, {Component} from 'react';
import './App.css';
import Header from 'components/Header/Header'
import {Route, Switch} from "react-router-dom";
import HospitalList from "./components/Hospital/HospitalList";
import UserList from "./components/UserList/UserList";
import Sidebar from "./components/Sidebar/Sidebar";
import Footer from "./components/Footer/Footer";
import Login from "./components/UserActions/Login";
import Register from "./components/UserActions/Register";


class App extends Component {

    constructor(props) {

        super(props);
        this.state = {
            logged: localStorage.getItem('isLogged') || false
        };
    }


    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <Header logged={this.state.logged}/>
                    <Sidebar/>
                </header>

                <Switch>
                    <Route exact path="/" component={HospitalList}/>
                    <Route path="/medics" component={UserList}/>
                    <Route path="/hospital" component={HospitalList}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/register" component={Register}/>
                    {/* when none of the above match, <NoMatch> will be rendered */}
                    <Route component={HospitalList}/>
                </Switch>

                <Footer/>
            </div>
        );
    }
}

export default App;
