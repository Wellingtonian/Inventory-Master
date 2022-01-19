import React from 'react';
import { Table, Button, Icon } from 'semantic-ui-react';

function ProductRow(props) {
    if (props.other) {
        // Should we put the other content into a HeaderCell or a normal Cell.
        const TableCell = props.header && Table.HeaderCell || Table.Cell;
        return (
            <Table.Row>
                <TableCell colSpan={4}>
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
                    Name
                </Table.HeaderCell>
                <Table.HeaderCell>
                    Price
                </Table.HeaderCell>
                <Table.HeaderCell />
            </Table.Row>
        );
    }

    const priceFormatOptions = {
        style: 'currency',
        currency: 'NZD'
    };

    return (
        <Table.Row>
            <Table.Cell>
                {props.record.id}
            </Table.Cell >
            <Table.Cell>
                {props.record.name}
            </Table.Cell >
            <Table.Cell>
                {Intl.NumberFormat('en-NZ', priceFormatOptions).format(props.record.price)}
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

export default ProductRow;