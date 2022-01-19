import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Grid, Header } from 'semantic-ui-react';
import Navigation from './Components/navigation.jsx';
import RecordManager from './Components/recordManager.jsx';
import ProductForm from './Components/productForm.jsx';
import ProductRow from './Components/productRow.jsx';
import ApiEndpoints from './apiEndpoints';

class Products extends Component {
    render() {
        return (
            <Grid>
                <Grid.Row>
                    <Grid.Column>
                        <Navigation active='products' />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Header dividing>Products</Header>
                        <RecordManager api={ApiEndpoints.product} row={ProductRow} form={ProductForm} recordKey='id' />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

const app = document.getElementById('main');
ReactDOM.render(<Products />, app);