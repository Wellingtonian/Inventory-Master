import React, { Component } from 'react';
import { Modal, Message, List } from 'semantic-ui-react';

class RecordModal extends Component {
    constructor(props) {
        super(props);

        // If we're passed a record we want the form to prepare it for us so we want it to be null, 
        // otherwise make it empty for the form so we don't crash.
        this.state = {
            edit: props.record ? true : false,
            record: props.record ? null : {},
            errors: {},
            errorCount: 0
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleFieldError = this.handleFieldError.bind(this);
        this.handleCancelClick = this.handleCancelClick.bind(this);
        this.handleSaveClick = this.handleSaveClick.bind(this);
    }

    handleChange(e, { name, value }) {
        this.setState(
            (state) => {
                let updatedRecord = {
                    ...state.record,
                    [name]: value
                };

                return {
                    ...state,
                    record: updatedRecord
                };
            });
    }

    handleFieldError(name, errorOrClear) {
        this.setState(
            (state) => {
                let newErrors = {
                    ...state.errors,
                    [name]: errorOrClear
                };

                // Count how many entries have something other than null.
                let errorCount = Object.entries(newErrors).filter((keyValuePair) => keyValuePair[1] !== null).length;

                return {
                    ...state,
                    errors: newErrors,
                    errorCount: errorCount
                };
            });
    }

    handleCancelClick() {
        this.props.onCancel();
    }

    // We should be disabling the button if we have any errors so we'll only get clicked if there are none.
    handleSaveClick() {
        if (this.state.edit) {
            this.props.onUpdate(this.state.record);
        } else {
            this.props.onSave(this.state.record);
        }
    }

    render() {
        let modalHeaderText;
        let saveButtonText;

        // We want to change the text to be appropriate for editing or not.
        if (this.state.edit) {
            modalHeaderText = 'Edit';
            saveButtonText = 'Update';
        } else {
            modalHeaderText = 'Add';
            saveButtonText = 'Save';
        }

        // We expect to be unmounted when we perform one of the handlers given as props, so we can leave open as always true. 
        return (
            <Modal
                open
                onClose={this.props.onClose}
                closeOnDimmerClick={false}
                closeOnEscape={false}
                closeIcon

                header={modalHeaderText}
                content={(
                    <Modal.Content>
                        {this.state.errorCount > 0 && (
                            <Message
                                error
                                header='Error'
                                content={(
                                    <List>
                                        {Object.entries(this.state.errors).map((error) => <List.Item key={error[0]}>{error[1]}</List.Item>)}
                                    </List>
                                )}
                            />
                        )}
                        {/* First time we receive the record, we'll just pass it in for the form to prepare and give back to us using onChange. */}
                        <this.props.form record={this.state.record || this.props.record} errors={this.state.errors} api={this.props.api} onChange={this.handleChange} onFieldError={this.handleFieldError} />
                    </Modal.Content>
                )}
                actions={
                    [
                        {
                            key: 'modalCancel',
                            content: 'Cancel',
                            onClick: this.handleCancelClick
                        },
                        {
                            key: 'modalSave',
                            content: saveButtonText,
                            icon: 'check',
                            labelPosition: 'right',
                            positive: true,
                            disabled: this.state.errorCount > 0,
                            onClick: this.handleSaveClick
                        }
                    ]
                }
            />
        );
    }
}

export default RecordModal;