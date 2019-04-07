import './UserList.css';
import React from 'react';
import {Container} from 'reactstrap';
import {getMedici} from 'shared/api';
import UserCard from 'components/UserCard/UserCard'
import LocalHospital from "@material-ui/core/SvgIcon/SvgIcon";
import Typography from "@material-ui/core/Typography";

class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

        let id;

        id = this.props.location.state ? this.props.location.state.hospital_id : this.props.location.pathname.replace(this.props.match.path + '/', '') ? this.props.location.pathname.replace(this.props.match.path + '/', '') : 1;
        if (this.props.location.state) {
            this.setState({
                hospital_name: this.props.location.state.hospital_name
            })
        }

        getMedici(id)
            .then(response => {
                response.json()
                    .then(res => {
                        const data = res.data;
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
                <div className={'hospital_title'}>
                    <span className={'hospital_title_text'} >    {this.state.hospital_name}  </span>
                </div>
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
