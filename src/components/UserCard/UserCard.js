import './UserCard.css';
import React from 'react';
import {Card, CardLink, CardText, CardBody, CardTitle, CardSubtitle} from 'reactstrap';
import i18n from '../../i18n';
import {withNamespaces} from "react-i18next";


class UserCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {user} = this.props;
        return (
            <div className="my-3">
                <Card>
                    <CardBody>
                        <CardTitle>{user.nume}</CardTitle>
                        <CardSubtitle className="font-12">{user.an_absolvire}</CardSubtitle>
                    </CardBody>
                    <img width="100%" src={user.poza} alt="Card image cap"/>
                    <CardBody>
                        <CardText>{i18n.t('speciality')+': '+user.specializare}</CardText>
                        <CardLink href="#">{i18n.t('open_profile')}</CardLink>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default withNamespaces()(UserCard);
