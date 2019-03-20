import React from 'react';
import {Container, Row, Col} from 'reactstrap';
import {getSpitale} from 'shared/api';
import HospitalCard from "./HospitalCard";

class HospitalList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        getSpitale()
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
                <Row>
                    {data ? data.map(element => {
                        return (
                            <Col sm>
                                <HospitalCard key={element.id} hospital={element}/>
                            </Col>
                        )
                    }) : 'No data'}
                </Row>
            </Container>
        );
    }
}

export default HospitalList;
