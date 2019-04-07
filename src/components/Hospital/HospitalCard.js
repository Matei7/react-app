import './HospitalCard.css';
import React from 'react';
import {
    FlippingCard,
    FlippingCardBack,
    FlippingCardFront
} from 'react-ui-cards';
import {MDBCardBody, MDBCardTitle, MDBCardText, MDBIcon,} from 'mdbreact';
import {Link} from 'react-router-dom';
import {Image} from "semantic-ui-react";
import i18n from '../../i18n';
import {withNamespaces} from "react-i18next";

class HospitalCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {hospital} = this.props;
        return (
            <FlippingCard>
                <FlippingCardBack>
                    <MDBCardBody>
                        <MDBCardTitle tag="h5">{hospital.nume}</MDBCardTitle>
                        <MDBCardText>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Maxime quae, dolores dicta. Blanditiis rem amet repellat,
                            dolores nihil quae in mollitia asperiores ut rerum
                            repellendus, voluptatum eum, officia laudantium quaerat?</MDBCardText>
                        <hr/>
                        <MDBCardTitle tag="h6">{hospital.locatie}</MDBCardTitle>
                        <hr/>
                        <MDBCardText><Link to={{
                            pathname: '/medics/' + hospital.id,
                            state: {
                                hospital_id: hospital.id,
                                hospital_name: hospital.nume
                            }
                        }} className={"click_more"}>{i18n.t('see_more')}</Link></MDBCardText>
                        <hr/>
                        <ul className="list-inline py-2">
                            <li className="list-inline-item">
                                <a href="#!" className="p-2 fa-lg fb-ic">
                                    <MDBIcon icon="facebook" brand/>
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a href="#!" className="p-2 fa-lg tw-ic">
                                    <MDBIcon icon="twitter" brand/>
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a href="#!" className="p-2 fa-lg gplus-ic">
                                    <MDBIcon icon="google-plus" brand/>
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a href="#!" className="p-2 fa-lg li-ic">
                                    <MDBIcon icon="linkedin" brand/>
                                </a>
                            </li>
                        </ul>
                    </MDBCardBody>
                </FlippingCardBack>
                <FlippingCardFront>
                    <Image src={hospital.sigla} size='medium' circular/>
                    <MDBCardBody>
                        <MDBCardTitle>{hospital.nume}</MDBCardTitle>
                        <hr/>
                        <MDBCardTitle tag="h6">{hospital.tip}</MDBCardTitle>
                        <hr/>
                        <MDBCardText>{i18n.t('hover_see')}</MDBCardText>
                    </MDBCardBody>
                </FlippingCardFront>
            </FlippingCard>
        )
    }
}

export default withNamespaces()(HospitalCard);
