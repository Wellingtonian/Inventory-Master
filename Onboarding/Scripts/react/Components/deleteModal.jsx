import React from 'react';
import { Confirm } from 'semantic-ui-react';

function DeleteModal(props) {
    return (
        <Confirm
            open={props.open}
            onClose={props.onClose}
            onCancel={props.onCancel}
            onConfirm={props.onConfirm}
            header='Delete Record'
            content='Are you sure you want to delete this record?'
            cancelButton='No'
            confirmButton={{ content: 'Yes', icon: 'delete', labelPosition: 'right', negative: true }}
        />
    );
}

export default DeleteModal;