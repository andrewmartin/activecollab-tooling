import { Children, cloneElement } from 'react';
import { connect } from 'react-redux';

const WithUser = ({ user, children }) => {
  const { token } = user;

  const childrenWithUser = Children.map(children, child => {
    return cloneElement(child, {
      user,
    });
  });

  if (token) return childrenWithUser;

  return null;
};

WithUser.defaultProps = {
  user: {
    token: null,
  },
};

const mapStateToProps = ({ user }) => {
  return {
    user,
  };
};

export default connect(
  mapStateToProps,
  null
)(WithUser);
