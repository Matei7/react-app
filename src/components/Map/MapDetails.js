import React from 'react';
import Map from 'devextreme-react/map';
import {Container} from 'reactstrap';
import {getSpitale} from 'shared/api';

class MapDetails extends React.Component {

    constructor(props) {
        super(props);
        this.markers = [];
    }

    componentDidMount() {
        getSpitale()
            .then(response => {
                response.json()
                    .then(res => {
                        var data = res.data;
                        data.map(element => {
                            this.markers.push({
                                location: element.locatie,
                                tooltip: {
                                    text: element.nume
                                },

                            });
                            return true
                        });
                        this.setState({
                            data
                        });
                    });
            });
    }


    render() {
        console.log(this.markers);
        return (
            <Container>
                {this.markers.length ?
                    <Map markers={this.markers} provider={'bing'} defaultZoom={11} height={440} width={'100%'}
                         controls={true}
                         markerIconSrc={"https://js.devexpress.com/Demos/RealtorApp/images/map-marker.png"}/>
                    : ''}
            </Container>
        );
    }
}

export default MapDetails;