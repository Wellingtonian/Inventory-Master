import React, { Component } from 'react';
import { Form, Label } from 'semantic-ui-react';

class CustomerForm extends Component {
    constructor(props) {
        super(props);

        // Prepare the record for the controlling component to hold for us.
        // Prepare the errors object for the controlling component too.
        if (props.record && props.record.id) {
            props.onChange(null, { name: 'id', value: props.record.id });
            props.onChange(null, { name: 'name', value: props.record.name });
            props.onChange(null, { name: 'address', value: props.record.address });

            // The record should be valid to start with so we'll make sure there are no errors shown.
            props.onFieldError('id', null);
            props.onFieldError('name', null);
            props.onFieldError('address', null);
        } else {
            // With the current implementation to disable the save button and allow for validation,
            // I need to set these errors to begin with.
            props.onFieldError('name', 'Please enter a name.');
            props.onFieldError('address', 'Please enter an address.');
        }

        this.handleChange = this.handleChange.bind(this);
    }

    // Validate the form as we submit the change to the controlling component.
    handleChange(e, { name, value }) {
        const invalidName = /[^a-zA-Z0-9,\._\- ]/;
        const invalidAddress = /[^a-zA-Z0-9#,\.\\_\- ]/;

        switch (name) {
            case 'name':
                if (invalidName.test(value)) {
                    this.props.onFieldError('name', 'Invalid name! Please enter only alphanumeric characters and basic punctuation.');
                } else if (!value) {
                    this.props.onFieldError('name', 'Please enter a name.');
                } else {
                    this.props.onFieldError('name', null);
                }
                break;
            case 'address':
                if (invalidAddress.test(value)) {
                    this.props.onFieldError('address', 'Invalid address! Please enter only alphanumeric characters, basic punctuation and #.');
                } else if (!value) {
                    this.props.onFieldError('address', 'Please enter an address.');
                } else {
                    this.props.onFieldError('address', null);
                }
                break;
            default:
                return;
        }

        this.props.onChange(null, { name: name, value: value });
    }

    render() {
        return (
            <Form>
                <Form.Input
                    name='name'
                    label='Name'
                    error={this.props.errors.name !== null}
                    value={this.props.record.name || ''}
                    onChange={this.handleChange}
                    required
                />
                <Form.Input
                    name='address'
                    label='Address'
                    error={this.props.errors.address !== null}
                    value={this.props.record.address || ''}
                    onChange={this.handleChange}
                    required
                />
            </Form>
        );
    }
}

export default CustomerForm;
