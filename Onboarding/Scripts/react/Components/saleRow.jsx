import React from 'react';
import { Table, Button, Icon } from 'semantic-ui-react';

function SaleRow(props) {
    if (props.other) {
        // Should we put the other content into a HeaderCell or a normal Cell.
        const TableCell = props.header && Table.HeaderCell || Table.Cell;
        return (
            <Table.Row>
                <TableCell colSpan={6}>
                    {props.content}
                </TableCell >
            </Table.Row>
        );
    } else if (props.header) {
        return (
            <Table.Row>
                <Table.HeaderCell>
                    Id
                </Table.HeaderCell>
                <Table.HeaderCell>
                    Store
                </Table.HeaderCell>
                <Table.HeaderCell>
                    Customer
                </Table.HeaderCell>
                <Table.HeaderCell>
                    Product
                </Table.HeaderCell>
                <Table.HeaderCell>
                    Date
                </Table.HeaderCell>
                <Table.HeaderCell />
            </Table.Row>
        );
    }

    const dateFormatOptions = {
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit'
    };

    return (
        <Table.Row>
            <Table.Cell>
                {props.record.id}
            </Table.Cell >
            <Table.Cell>
                {props.record.store.name}
            </Table.Cell >
            <Table.Cell>
                {props.record.customer.name}
            </Table.Cell >
            <Table.Cell>
                {props.record.product.name}
            </Table.Cell >
            <Table.Cell>
                {Intl.DateTimeFormat("en-nz", dateFormatOptions).format(new Date(props.record.dateSold))}
            </Table.Cell >
            <Table.Cell>
                <Button icon labelPosition='right' onClick={() => props.onEdit(props.record)}>
                    <Icon name='edit' />
                    Edit
                </Button>
                <Button icon labelPosition='right' negative onClick={() => props.onDelete(props.record)}>
                    <Icon name='delete' />
                    Delete
                </Button>
            </Table.Cell >
        </Table.Row>
    );
}

export default SaleRow;