import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import FetchedSelectField from './fetchedSelectField.jsx';

class SaleForm extends Component {
    constructor(props) {
        super(props);

        // Simplify and prepare the record for the controlling component to hold for us.
        // When we first receive the sale record, it'll have objects in the fields which we don't want.
        // If we leave them we can't update the state properly and when we try to save the changes
        // back to the backend, it won't understand what we're trying to save.
        // Prepare the errors object for the controlling component too.
        if (props.record && props.record.store) {
            // If we have a .store then we should have everything, if not we want this to error.
            props.onChange(null, { name: 'id', value: props.record.id });
            props.onChange(null, { name: 'storeId', value: props.record.store.id });
            props.onChange(null, { name: 'customerId', value: props.record.customer.id });
            props.onChange(null, { name: 'productId', value: props.record.product.id });
            props.onChange(null, { name: 'dateSold', value: props.record.dateSold });

            // The record should be valid to start with so we'll make sure there are no errors shown.
            props.onFieldError('id', null);
            props.onFieldError('storeId', null);
            props.onFieldError('customerId', null);
            props.onFieldError('productId', null);
            props.onFieldError('dateSold', null);
        } else {
            // With the current implementation to disable the save button and allow for validation,
            // I need to set these errors to begin with.
            props.onFieldError('storeId', 'Please select a store.');
            props.onFieldError('customerId', 'Please select a customer.');
            props.onFieldError('productId', 'Please select a product.');
            props.onFieldError('dateSold', 'Please select a date and time.');
        }

        this.handleChange = this.handleChange.bind(this);
    }

    // Validate the form as we submit the change to the controlling component.
    handleChange(e, { name, value }) {
        switch (name) {
            case 'storeId':
                if (!value) {
                    this.props.onFieldError('storeId', 'Store is required, please select one.');
                } else {
                    this.props.onFieldError('storeId', null);
                }
                break;
            case 'customerId':
                if (!value) {
                    this.props.onFieldError('customerId', 'Customer is required, please select one.');
                } else {
                    this.props.onFieldError('customerId', null);
                }
                break;
            case 'productId':
                if (!value) {
                    this.props.onFieldError('productId', 'Product is required, please select one.');
                } else {
                    this.props.onFieldError('productId', null);
                }
                break;
            case 'dateSold':
                if (!value) {
                    this.props.onFieldError('dateSold', 'Date must contain a date and time.');
                } else {
                    this.props.onFieldError('dateSold', null);
                }
                break;
            default:
                break;
        }

        this.props.onChange(null, { name: name, value: value });
    }

    render() {
        return (
            <Form>
                <FetchedSelectField
                    fetchOptions={this.props.api.store.fetchAll}
                    keyField='id'
                    textField='name'
                    label='Store'
                    name='storeId'
                    error={this.props.errors.storeId !== null}
                    value={this.props.record.storeId || ''}
                    onChange={this.handleChange}
                    required
                />
                <FetchedSelectField
                    fetchOptions={this.props.api.customer.fetchAll}
                    keyField='id'
                    textField='name'
                    label='Customer'
                    name='customerId'
                    error={this.props.errors.customerId !== null}
                    value={this.props.record.customerId || ''}
                    onChange={this.handleChange}
                    required
                />
                <FetchedSelectField
                    fetchOptions={this.props.api.product.fetchAll}
                    keyField='id'
                    textField='name'
                    label='Product'
                    name='productId'
                    error={this.props.errors.productId !== null}
                    value={this.props.record.productId || ''}
                    onChange={this.handleChange}
                    required
                />
                <Form.Input
                    label='Date'
                    name='dateSold'
                    error={this.props.errors.dateSold !== null}
                    value={this.props.record.dateSold || ''}
                    onChange={this.handleChange}
                    type='datetime-local'
                    required
                />
            </Form>
        );
    }    
}

export default SaleForm;
