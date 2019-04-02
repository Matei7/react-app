import React, {Component} from 'react';
import './App.css';
import Header from 'components/Header/Header'
import {Route, Switch} from "react-router-dom";
import HospitalList from "./components/Hospital/HospitalList";
import UserList from "./components/UserList/UserList";
import Sidebar from "./components/Sidebar/Sidebar";
import Footer from "./components/Footer/Footer";


class App extends Component {




    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <Header/>
                    <Sidebar/>
                </header>

                <Switch>
                    <Route exact path="/" component={HospitalList}/>
                    <Route path="/medics" component={UserList}/>
                    <Route path="/hospital" component={HospitalList}/>
                    {/* when none of the above match, <NoMatch> will be rendered */}
                    <Route component={HospitalList}/>
                </Switch>

                <Footer/>
            </div>
        );
    }
}

export default App;
