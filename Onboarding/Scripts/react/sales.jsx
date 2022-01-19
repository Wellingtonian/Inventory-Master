import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Grid, Header } from 'semantic-ui-react';
import Navigation from './Components/navigation.jsx';
import RecordManager from './Components/recordManager.jsx';
import SaleForm from './Components/saleForm.jsx';
import SaleRow from './Components/saleRow.jsx';
import ApiEndpoints from './apiEndpoints';

class Sales extends Component {
    render() {
        return (
            <Grid>
                <Grid.Row>
                    <Grid.Column>
                        <Navigation active='sales' />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Header dividing>Sales</Header>
                        <RecordManager api={ApiEndpoints.sale} row={SaleRow} form={SaleForm} formApi={ApiEndpoints} recordKey='id' />
                    </Grid.Column>
                </Grid.Row>
            </Grid>

        );
    }
}

const app = document.getElementById('main');
ReactDOM.render(<Sales />, app);