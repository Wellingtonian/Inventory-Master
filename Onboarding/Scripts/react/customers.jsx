import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Grid, Header } from 'semantic-ui-react';
import Navigation from './Components/navigation.jsx';
import RecordManager from './Components/recordManager.jsx';
import CustomerForm from './Components/customerForm.jsx';
import CustomerRow from './Components/customerRow.jsx';
import ApiEndpoints from './apiEndpoints';

class Customers extends Component {
    render() {
        return (
            <Grid>
                <Grid.Row>
                    <Grid.Column>
                        <Navigation active='customers' />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Header dividing>Customers</Header>
                        <RecordManager api={ApiEndpoints.customer} row={CustomerRow} form={CustomerForm} recordKey='id' />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

const app = document.getElementById('main');
ReactDOM.render(<Customers />, app);