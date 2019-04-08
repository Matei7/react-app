import React from 'react';
import {MDBCardBody, MDBCardTitle, MDBIcon} from "mdbreact";


class Footer extends React.Component {
    render() {
        return (
            <MDBCardBody>
                <hr/>
                <MDBCardTitle>© Copyright Matei</MDBCardTitle>

                <ul className="list-inline py-2">
                    <li className="list-inline-item">
                        <a href="https://www.facebook.com/Mateei7" target="_blank" rel="noopener noreferrer"
                           className="p-2 fa-lg fb-ic">
                            <MDBIcon icon="facebook" brand/>
                        </a>
                    </li>
                    <li className="list-inline-item">
                        <a href="https://github.com/Matei7" target="_blank" rel="noopener noreferrer"
                           className="p-2 fa-lg git-ic">
                            <MDBIcon icon="github" brand/>
                        </a>
                    </li>
                    <li className="list-inline-item">
                        <a href="https://www.linkedin.com/in/vladmatei7/" target="_blank" rel="noopener noreferrer"
                           className="p-2 fa-lg li-ic">
                            <MDBIcon icon="linkedin" brand/>
                        </a>
                    </li>
                </ul>
            </MDBCardBody>
        )
    }
}

export default Footer;