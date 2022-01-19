import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';

class FetchedSelectField extends Component {
    constructor(props) {
        super(props);

        this.state = {
            options: [{ key: 1, text: 'Loading', value: '' }],
            isLoaded: false,
        }
    }

    componentDidMount() {
        this.props.fetchOptions().then(
            (results) => {
                this.setState((state, props) => {
                    const options = results.data.map((result) => ({ key: result[props.keyField], text: result[props.textField], value: result[props.keyField] }));

                    return ({
                        options: options,
                        isLoaded: true
                    });
                });
            },
            (error) => {
                const options = [{ key: 1, text: 'Couldn\'t retrieve options!', value: '' }];

                this.setState({
                    error: error,
                    options: options,
                    isLoaded: true
                });
            });
    }

    render() {
        // Either stops at error and returns false or gets to the end returning selected
        const selectedValue = !this.state.error && this.state.isLoaded && this.props.value;

        return (
            <Form.Select
                label={this.props.label}
                name={this.props.name}
                onChange={this.props.onChange}
                options={this.state.options}
                error={this.props.error}
                value={selectedValue}
                required={this.props.required}
            />);
    }
}

export default FetchedSelectField;