import { Children, cloneElement } from 'react';
import { connect } from 'react-redux';

const WithoutUser = ({ user, children }) => {
  const { token } = user;

  const childrenWithoutUser = Children.map(children, child => {
    return cloneElement(child, {
      user,
    });
  });

  if (!token) return childrenWithoutUser;

  return null;
};

WithoutUser.defaultProps = {
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
)(WithoutUser);
