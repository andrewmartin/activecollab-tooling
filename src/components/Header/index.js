import React, { Component } from 'react';
import { Layout, Button } from 'antd';

import { WithUser, WithoutUser } from 'components/connect';
import { TYPES } from 'store/reducers/modal';

export default class Header extends Component {
  logout = e => {
    const {
      actions: { logoutUser },
    } = this.props;
    e.preventDefault();
    logoutUser();
  };

  showModal = (type, e) => {
    const {
      actions: { showModal },
    } = this.props;
    e.preventDefault();
    showModal(type);
  };

  render() {
    return (
      <header className="masthead">
        <Layout>
          <Layout.Content>
            <h1>Lemonade ActiveCollab</h1>
            <ul className="nav">
              <WithoutUser>
                <li>
                  <Button onClick={this.showModal.bind(this, TYPES.LOGIN)} type="primary">
                    Login
                  </Button>
                </li>
              </WithoutUser>
              <WithUser>
                <li>
                  <Button onClick={this.logout} type="primary">
                    Logout
                  </Button>
                </li>
              </WithUser>
            </ul>
          </Layout.Content>
        </Layout>
      </header>
    );
  }
}
