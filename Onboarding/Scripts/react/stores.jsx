import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Grid, Header } from 'semantic-ui-react';
import Navigation from './Components/navigation.jsx';
import RecordManager from './Components/recordManager.jsx';
import StoreForm from './Components/storeForm.jsx';
import StoreRow from './Components/storeRow.jsx';
import ApiEndpoints from './apiEndpoints';

class Stores extends Component {
    render() {
        return (
            <Grid>
                <Grid.Row>
                    <Grid.Column>
                        <Navigation active='stores' />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Header dividing>Stores</Header>
                        <RecordManager api={ApiEndpoints.store} row={StoreRow} form={StoreForm} recordKey='id' />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

const app = document.getElementById('main');
ReactDOM.render(<Stores />, app);