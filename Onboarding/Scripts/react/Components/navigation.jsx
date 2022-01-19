import React, { Component } from 'react';
import { Menu, Header } from 'semantic-ui-react';

class Navigation extends Component {
    render() {
        return (
            <Menu>
                <Menu.Item name='home' href='/' active={'home' === this.props.active}>
                    <Header as='h4'>
                        React
                    </Header>
                </Menu.Item>
                <Menu.Item name='customers' href='/Customer' active={'customers' === this.props.active}>
                    Customers
                </Menu.Item>
                <Menu.Item name='stores' href='/Store' active={'stores' === this.props.active}>
                    Stores
                </Menu.Item>
                <Menu.Item name='products' href='/Product' active={'products' === this.props.active}>
                    Products
                </Menu.Item>
                <Menu.Item name='sales' href='/Sale' active={'sales' === this.props.active}>
                    Sales
                </Menu.Item>
            </Menu>
            );
    }
}

export default Navigation;