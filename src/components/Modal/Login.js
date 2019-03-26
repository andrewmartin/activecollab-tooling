import React, { Component } from 'react';
import { Modal, Button, Input, Alert } from 'antd';
import { withFormik } from 'formik';

class LoginModal extends Component {
  handleOk = () => {
    const { submitForm } = this.props;
    submitForm();
  };

  handleCancel = () => {
    const { hideModal } = this.props.actions;
    hideModal();
  };

  render() {
    const { user, errors, values, visible, handleChange, handleBlur } = this.props;
    return (
      <div>
        <Modal
          visible={visible}
          title="Login"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Return
            </Button>,
            <Button key="submit" type="primary" onClick={this.handleOk}>
              Submit
            </Button>,
          ]}>
          <div style={{ marginBottom: 16 }}>
            <Input
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Email Address"
              type="text"
              name="email"
              value={values.email}
            />
            {errors.email && (
              <Alert style={{ marginTop: 16 }} type="error" message={errors.email} />
            )}
          </div>
          <div style={{ marginBottom: 16 }}>
            <Input
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Password"
              type="password"
              name="password"
              value={values.password}
            />
            {errors.password && (
              <Alert style={{ marginTop: 16 }} type="error" message={errors.password} />
            )}
          </div>
          {user.serverError && (
            <Alert style={{ marginTop: 16 }} type="error" message={user.serverError} />
          )}
        </Modal>
      </div>
    );
  }
}

export default withFormik({
  mapPropsToValues: () => ({
    email: '',
    password: '',
  }),

  validate: values => {
    const errors = {};

    if (!values.email) {
      errors.email = 'Please enter an email address';
    }

    if (!values.password) {
      errors.password = 'Please enter a password';
    }

    return errors;
  },

  handleSubmit: async (values, { props, resetForm, setSubmitting }) => {
    setSubmitting(false);
    const {
      actions: { loginUser, hideModal },
    } = props;

    const { payload } = await loginUser(values);
    if (!payload.error) {
      hideModal();
      resetForm();
    }
  },
})(LoginModal);
