import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Navigation from './Components/navigation.jsx';
import { Grid, Header } from 'semantic-ui-react';

class Index extends Component {
    render() {
        return (
            <Grid>
                <Grid.Row>
                    <Grid.Column>
                        <Navigation active='home' />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Header dividing>Welcome to my onboarding task!</Header>
                        <p>Please visit each page via the menu at the top.</p>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

const app = document.getElementById('main');
ReactDOM.render(<Index />, app);