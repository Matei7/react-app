import React from 'react';
import {Container, Row, Col} from 'reactstrap';
import {getSpitale} from 'shared/api';
import HospitalCard from "./HospitalCard";
import Chart from 'react-google-charts';
import IconButton from "@material-ui/core/IconButton";
import BarChart from "@material-ui/icons/BarChart";
import Link from "react-router-dom/es/Link";

class HospitalList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.chartData = [['Hospitals', 'Rating']];
    }

    componentDidMount() {
        getSpitale()
            .then(response => {
                response.json()
                    .then(res => {
                        var data = res.data;
                        data.map(element => {
                            this.chartData.push([element.nume, element.nota]);
                            return true
                        });
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
                <IconButton aria-label="Delete" className={'chart_icon'}><a href={'#charts'}><BarChart fontSize="large"/></a>
                </IconButton>
                <Row>
                    {data ? data.map(element => {
                        return (
                            <Col xl={3}>
                                <HospitalCard key={element.id} hospital={element}/>
                            </Col>
                        )
                    }) : 'No data'}
                </Row>
                <br/>
                <hr/>
                <br/>
                <Row>
                    <div id={'charts'}><Chart
                        width={1140}
                        height={500}
                        chartType="ColumnChart"
                        loader={<div>Loading Chart</div>}
                        data={this.chartData}
                        options={{
                            title: "Rating of Hospitals",
                            chartArea: {width: '80%'},
                            hAxis: {
                                title: "Average Hospital Rating",
                                minValue: 0,
                            },
                            vAxis: {
                                title: 'Hospitals',
                            },
                        }}
                        legendToggle
                    /></div>
                </Row>
            </Container>
        );
    }
}

export default HospitalList;
