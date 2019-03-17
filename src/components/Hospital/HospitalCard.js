import './HospitalCard.css';
import React from 'react';
import {
    Card, CardImg, CardLink, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';

class HospitalCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {hospital} = this.props;
        return (
            <div className="my-3">
                <Card>
                    <CardBody>
                        <CardTitle>{hospital.nume}</CardTitle>
                        <CardSubtitle className="font-12">{hospital.tip}</CardSubtitle>
                    </CardBody>
                    <img width="100%" src={hospital.sigla} alt="Card image cap"/>
                    <CardBody>
                        <CardText>{hospital.locatie}</CardText>
                        <CardLink href="#">Card Link</CardLink>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default HospitalCard;
