import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindAllActions } from 'store/actions/helpers';

import { Layout } from 'antd';
import Header from 'components/Header';
import LoginModal from 'components/Modal/Login';

import { TYPES } from 'store/reducers/modal';

const { Content, Footer } = Layout;

class AppLayout extends Component {
  render() {
    const { Component, user, modal, actions, ...restProps } = this.props;
    const { activeModal } = modal;

    return (
      <div className="app-layout">
        <LoginModal user={user} actions={actions} visible={activeModal === TYPES.LOGIN} />
        <Layout className="layout">
          <Header actions={actions} />
          <Content style={{ padding: '0 50px' }}>
            <div style={{ background: '#fff', padding: 24, minHeight: 280, marginTop: 50 }}>
              <Component {...restProps} />
            </div>
          </Content>
        </Layout>
        <Footer style={{ textAlign: 'center' }}>Created by Lemonade</Footer>
      </div>
    );
  }
}

const mapStateToProps = ({ modal, user }) => ({
  modal,
  user,
});

const mapDispatchToProps = dispatch => bindAllActions(dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppLayout);
