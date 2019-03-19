import './UserList.css';
import React from 'react';
import {Container, Row, Col} from 'reactstrap';
import {getMedici} from 'shared/api';
import UserCard from 'components/UserCard/UserCard'

class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        getMedici()
            .then(response => {
                response.json()
                    .then(data => {
                        this.setState({
                            data
                        });
                    });
            });
    }

    render() {
        const {data} = this.state;
        return (
            <Container>
                <div className={"header-image"}></div>
                {data ? data.map(element => {
                    return (

                        <UserCard key={element.id} user={element}/>

                    )
                }) : 'No data'}

            </Container>
        );
    }
}

export default UserList;
