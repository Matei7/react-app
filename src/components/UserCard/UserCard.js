import './UserCard.css';
import React from 'react';
import i18n from '../../i18n';
import {withNamespaces} from "react-i18next";
import {Responsive, Grid, Image, Button, Header, Icon, Segment, Divider} from 'semantic-ui-react';

import {ReactComponent as FancyDivider} from '../../divider.svg';

class UserCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {user} = this.props;
        return (
            <div className={"user-card"}>
                <Segment.Group><Responsive as={Segment}>
                    <Grid celled='internally'>
                        <Grid.Row>
                            <Grid.Column width={4} className={'dev-app'}>
                                <Image src={user.poza} size='medium' circular/>
                            </Grid.Column>
                            <Grid.Column width={9} className={'dev-app'}>
                                <Header as='h2' icon textAlign='center'>
                                    <Icon name='user md' circular/>
                                    <Header.Content dividing="true">{user.nume}</Header.Content>
                                    <span
                                        className={'graduation'}>{i18n.t('graduation_year') + ': ' + user.an_absolvire.slice(0, 10)}</span>
                                    <Segment stacked className={'speciality'}>
                                        {i18n.t('speciality') + ': ' + user.specializare}
                                    </Segment>
                                </Header>
                            </Grid.Column>
                            <Grid.Column width={3} className={'dev-app'}>
                                <Button content={i18n.t('open_profile')} icon='right arrow' labelPosition='right'
                                        color='red'/>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <FancyDivider/>
                </Responsive>
                </Segment.Group>
                <Divider section/>

            </div>
        );
    }
}

export default withNamespaces()(UserCard);
