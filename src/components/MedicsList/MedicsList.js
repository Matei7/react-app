import './MedicsList.css';
import React from 'react';
import {Container} from 'reactstrap';
import {getMedici} from 'shared/api';
import UserCard from 'components/MedicCard/MedicCard';
import Chart from 'react-google-charts';

class MedicsList extends React.Component {
    constructor(props) {
        super(props);
        this.state={};
        this.chartData = [['Doctors', '', 'Rating']];
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
                            data: data,
                            nota: res.nota
                        });
                    });
            });
    }

    render() {
        let data = this.state ? this.state.data : null;
        return (
            <Container>
                <div className={'hospital_title'}>
                    <span className={'hospital_title_text'}>    {this.state.hospital_name}  </span>
                </div>
                {data ? data.map(element => {
                    this.chartData.push([element.nume, 0, element.rating]);
                    return (

                        <UserCard key={element.id} user={element}/>

                    )
                }) : 'No data'}

                {
                    this.chartData.length > 1 ? <Chart
                        width={1140}
                        height={500}
                        chartType="ColumnChart"
                        loader={<div>Loading Chart</div>}
                        data={this.chartData}
                        options={{
                            title: "Rating of Hospital's Doctors",
                            chartArea: {width: '60%'},
                            hAxis: {
                                title: 'Rating average: ' + this.state.nota.toFixed(2),
                                minValue: 0,
                            },
                            vAxis: {
                                title: 'Doctors',
                            },
                        }}
                        legendToggle
                    /> : ''
                }

            </Container>
        );
    }
}

export default MedicsList;
