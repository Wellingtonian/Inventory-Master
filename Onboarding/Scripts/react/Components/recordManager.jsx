import React, { Component } from 'react';
import RecordTable from './recordTable.jsx';
import RecordModal from './recordModal.jsx';
import DeleteModal from './deleteModal.jsx';
import { Message, Button, Icon } from 'semantic-ui-react';

/*
 * Requires an api prop containing:
    Promise returning functions for performing CRUD actions with a database, expects the promise to return a HttpResponse.
    props.api: {
        // fetchAll takes a page and a recordsPerPage limit and retrieves all records for that page.
        fetchAll: props.api.fetchAll,

        // fetchCount should return the total number of records available.
        fetchCount: props.api.fetchCount,

        // fetch should take a key/id and attempt to retrieve the record with that key/id. NOTE: Unused currently.
        fetch: props.api.fetch

        // create should take an object representing a record and save it.
        create: props.api.create,

        // update should take an object representing an already existing record and update it.
        update: props.api.update,

        // delete should take a key/id and attempt to delete the record with that key/id.
        delete: props.api.delete,
    },
 */
class RecordManager extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pages: {
                count: 0,
                recordsPerPage: 10,
                current: 1
            },

            records: {
                all: [],
                error: null,
                isLoaded: false
            },

            message: {
                show: false,
                success: false,
                error: false,
                header: '',
                content: ''
            },

            deleteModal: {
                isOpen: false,
                record: null
            },

            recordModal: {
                isOpen: false,
                record: null
            }
        };

        this.handleMessageDismiss = this.handleMessageDismiss.bind(this);
        this.handlePaginationChange = this.handlePaginationChange.bind(this);
        this.handleDeleteModal = this.handleDeleteModal.bind(this);
        this.handleDeleteModalCancel = this.handleDeleteModalCancel.bind(this);
        this.handleDeleteModalConfirm = this.handleDeleteModalConfirm.bind(this);
        this.handleRecordModalAdd = this.handleRecordModalAdd.bind(this);
        this.handleRecordModalEdit = this.handleRecordModalEdit.bind(this);
        this.handleRecordModalCancel = this.handleRecordModalCancel.bind(this);
        this.handleRecordModalUpdate = this.handleRecordModalUpdate.bind(this);
        this.handleRecordModalSave = this.handleRecordModalSave.bind(this);
    }

    componentDidMount() {
        this.recordFetchCount();
        this.recordFetch(this.state.pages.current, this.state.pages.recordsPerPage);
    }

    //** Handlers Start **//
    handleMessageDismiss() {
        this.showMessage(false);
    }

    handlePaginationChange(e, { activePage }) {
        this.recordFetchCount();
        this.recordFetch(activePage, this.state.pages.recordsPerPage);
    }

    // @param record - the required record we're confirming we want to delete.
    handleDeleteModal(record) {
        this.showDeleteModal(true, record);
    }

    handleDeleteModalCancel() {
        this.showDeleteModal(false);
    }

    handleDeleteModalConfirm() {
        if (this.state.deleteModal.record) {
            this.recordDelete(this.state.deleteModal.record);
            this.showDeleteModal(false);
            this.showRecordModal(false);
        }
    }

    handleRecordModalAdd() {
        this.showRecordModal(true);
    }

    // @param record - the record we want to edit or null for a brand new record.
    handleRecordModalEdit(record) {
        this.showRecordModal(true, record);
    }

    handleRecordModalCancel() {
        this.showRecordModal(false);
    }

    //@param record - required
    //@see recordSave
    handleRecordModalUpdate(record) {
        this.showRecordModal(false);

        this.recordSave(record, true);
    }

    //@param record - required
    //@see recordSave
    handleRecordModalSave(record) {
        this.showRecordModal(false);

        this.recordSave(record, false);
    }
    //** Handlers End **//

    //** Helpers Start **//

    // @param show - optional
    // @param header - optional
    // @param content - optional
    // @param success - optional
    // @param error - optional
    showMessage(show, header, content, success, error) {
        this.setState({
            message: {
                show: show,
                success: success,
                error: error,
                header: header,
                content: content
            }
        });
    }

    // @param open - optional
    // @param record - optional
    showDeleteModal(open, record) {
        this.setState({
            deleteModal: {
                isOpen: open,
                record: record
            }
        });
    }

    // @param open - optional
    // @param record - optional
    showRecordModal(open, record) {
        this.setState({
            recordModal: {
                isOpen: open,
                record: record
            }
        });
    }

    // Attempt to populate the record list and we'll set the current page too.
    // @param page - can be null. Behavior dependent on backend.
    // @param recordsPerPage - can be null. Behavior dependent on backend.
    recordFetch(page, recordsPerPage) {
        (this.props.api.fetchAll(page, recordsPerPage)
            .then(
                (results) => {
                    this.setState(
                        (state) => {
                            return {
                                pages: {
                                    ...state.pages,
                                    current: page
                                },
                                records: {
                                    ...state.records,
                                    isLoaded: true,
                                    all: results.data
                                }
                            };
                        });
                },
                (error) => {
                    // If it's just a NotFound (404) code, then it should mean that we couldn't find any records and that's it.
                    if (error.response.status === 404) {
                        this.setState(
                            (state) => {
                                return {
                                    records: {
                                        ...state.records,
                                        isLoaded: true,
                                    }
                                };
                            });
                    } else {
                        // Uh oh! We've got bigger problems.
                        this.showMessage(true, 'Error!', 'Unable to retrieve records from the server.', false, true);

                        this.setState(
                            (state) => {
                                return {
                                    records: {
                                        ...state.records,
                                        isLoaded: true,
                                        error: error
                                    }
                                };
                            });
                    }
                })
        );
    }

    // Attempt to retrieve the total record count.
    recordFetchCount() {
        (this.props.api.fetchCount()
            .then(
                (results) => {
                    this.setState(
                        (state) => {
                            return {
                                pages: {
                                    ...state.pages,
                                    count: Math.ceil(results.data.count / state.pages.recordsPerPage)
                                }
                            };
                        });
                },
                (error) => {
                    // If it's just a NotFound (404) code, then it should mean that we couldn't find any records and that's it.
                    if (error.response.status === 404) {
                        this.setState(
                            (state) => {
                                return {
                                    records: {
                                        ...state.records,
                                        isLoaded: true,
                                    }
                                };
                            });
                    } else {
                        // Uh oh! We've got bigger problems.
                        this.showMessage(true, 'Error!', 'Unable to retrieve the record count from the server.', false, true);

                        this.setState(
                            (state) => {
                                return {
                                    records: {
                                        ...state.records,
                                        isLoaded: true,
                                        error: error
                                    }
                                };
                            });
                    }
                })
        );
    }

    // Attempts to create or update the record. 
    // @param record - the required record to save.
    // @param update - True, if we're updating an existing record. False, if we're creating a new one.
    recordSave(record, update) {
        if (!record) {
            return;
        }

        if (update) {
            // Update
            return this.props.api.update(record).then(
                ({ data }) => {
                    this.showMessage(true, "Success!", "Record updated.", true);

                    this.setState(
                        (state, props) => {
                            let changedRecordIndex = state.records.all.findIndex((value) => value[props.recordKey] === data[props.recordKey]);
                            let updatedRecords = [...state.records.all];
                            updatedRecords[changedRecordIndex] = data;

                            return {
                                records: {
                                    ...state.records,
                                    all: updatedRecords
                                }
                            };
                        });
                },
                (error) => {
                    this.showMessage(true, "Error!", error.message, false, true);
                });
        } else {
            // Save
            return this.props.api.create(record).then(
                ({ data }) => {
                    this.showMessage(true, "Success!", "Record saved.", true);

                    this.setState(
                        (state) => {
                            let updatedRecords = [...state.records.all];
                            if (updatedRecords.length < state.pages.recordsPerPage) {
                                // We're less than the record limit per page, we can just push it into our local records to update the display.
                                updatedRecords.push(data);
                            } else {
                                // We're at the limit which means the new record will be at the last page, so we need to change the page and retrieve.
                                this.recordFetchCount();
                                this.recordFetch(state.pages.current + 1, state.pages.recordsPerPage);
                            }

                            return {
                                records: {
                                    ...state.records,
                                    all: updatedRecords
                                }
                            };
                        });
                },
                (error) => {
                    this.showMessage(true, "Error!", error.message, false, true);
                });
        }
    }

    //@param record - required.
    recordDelete(record) {
        if (record) {
            return this.props.api.delete(record[this.props.recordKey]).then(
                () => {
                    this.showMessage(true, "Success!", "Record deleted.", true);

                    // The api at this stage will either fail or always return true in the response body.
                    this.setState(
                        (state, props) => {
                            let updatedRecords = state.records.all.filter((value) => value[props.recordKey] !== record[props.recordKey]);

                            if (state.pages.count > 1) {
                                // If we have more than one page then we need to care about potentially moving back one page or reloading the current.
                                if (updatedRecords.length < 1) {
                                    // We deleted every record on this page, time to move back one.
                                    this.recordFetchCount();
                                    this.recordFetch(state.pages.current - 1, state.pages.recordsPerPage);
                                } else if (state.pages.current !== state.pages.count) {
                                    // We deleted a record and we're not on the last page, we better reload.
                                    this.recordFetchCount();
                                    this.recordFetch(state.pages.current, state.pages.recordsPerPage);
                                }
                            }

                            return {
                                records: {
                                    ...state.records,
                                    all: updatedRecords
                                }
                            };
                        });
                },
                (error) => {
                    if (error.status === 404) {
                        this.showMessage(true, "Error!", 'The record cannot be found on the server to delete.', false, true);
                    } else {
                        this.showMessage(true, "Error!", error.response.data || error.message, false, true);
                    }                    
                });
        }

        return new Promise((resolve, reject) => {
            reject("No record to delete!");
        });
    }
    //** Helpers End **//

    render() {
        return (
            <div>
                {/* Only show the message if there's one to show. */}
                {this.state.message.show &&
                    <Message
                        success={this.state.message.success}
                        error={this.state.message.error}
                        onDismiss={this.handleMessageDismiss}
                    >
                        <Message.Header>{this.state.message.header}</Message.Header>
                        <Message.Content>
                            {this.state.message.content}
                        </Message.Content>
                    </Message>
                }

                <Button icon labelPosition='left' color='blue' disabled={this.state.records.error !== null} onClick={this.handleRecordModalAdd}>
                    <Icon name='add' />
                    Add New
                </Button>
                <RecordTable
                    row={this.props.row}
                    records={this.state.records.all}
                    loading={!this.state.records.isLoaded}
                    onEdit={this.handleRecordModalEdit}
                    onDelete={this.handleDeleteModal}
                    activePage={this.state.pages.current}
                    totalPages={this.state.pages.count}
                    onPageChange={this.handlePaginationChange}
                />

                <DeleteModal
                    open={this.state.deleteModal.isOpen}
                    onClose={this.handleDeleteModalCancel}
                    onCancel={this.handleDeleteModalCancel}
                    onConfirm={this.handleDeleteModalConfirm}
                />
                {this.state.recordModal.isOpen && (
                    <RecordModal
                        form={this.props.form}
                        api={this.props.formApi || this.props.api}
                        record={this.state.recordModal.record}
                        onSave={this.handleRecordModalSave}
                        onUpdate={this.handleRecordModalUpdate}
                        onCancel={this.handleRecordModalCancel}
                        onClose={this.handleRecordModalCancel}
                    />)
                }
            </div>
        );
    }
}

export default RecordManager;