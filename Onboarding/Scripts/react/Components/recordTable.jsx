import React, { Component } from 'react';
import { Table, Loader, Pagination } from 'semantic-ui-react';

class RecordTable extends Component {
    render() {
        return (
            <Table fixed basic celled>
                <Table.Header>
                    <this.props.row header />
                </Table.Header>
                <Table.Body>
                    {this.props.loading && (
                        <this.props.row
                            key='recordLoader'
                            content={<Loader active inline='centered'>Loading records</Loader>}
                            other={this.props.loading}
                        />

                    )}
                    {this.props.records.map((record) => (<this.props.row
                        key={record.id}
                        record={record}
                        onEdit={this.props.onEdit}
                        onDelete={this.props.onDelete}
                    />))}
                </Table.Body>
                <Table.Footer>
                    <this.props.row
                        content={
                            <Pagination
                                activePage={this.props.activePage}
                                boundaryRange={0}
                                onPageChange={this.props.onPageChange}
                                size='mini'
                                siblingRange={2}
                                totalPages={this.props.totalPages}
                                floated='right'
                            />
                        }
                        header
                        other
                    />
                </Table.Footer>
            </Table>
        );
    }
}

export default RecordTable;