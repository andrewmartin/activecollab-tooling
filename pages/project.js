import React, { Component } from 'react';
import { connect } from 'react-redux';
import { WithUser } from 'components/connect';

import { bindAllActions } from 'store/actions/helpers';
import Head from 'components/Head';
import Project from 'components/Project';
import { getProject } from 'store/selectors/project';

class Home extends Component {
  static async getInitialProps(req, ctx) {
    console.log('req', req);
    console.log('ctx', ctx);

    return {
      query: req.query,
    };
  }

  componentDidUpdate = prevProps => {
    const {
      user: { token },
    } = this.props;

    if (token !== prevProps.user.token) {
      const {
        actions: { fetchProjects },
      } = this.props;

      fetchProjects();
    }
  };

  render() {
    const { project } = this.props;

    console.log('this.props', this.props);

    return (
      <div>
        <Head />
        <WithUser>
          <Project {...project} />
        </WithUser>
      </div>
    );
  }
}

const mapStateToProps = ({ user, project }, ownProps) => {
  console.log('ownProps', ownProps);
  const {
    query: { id },
  } = ownProps;

  return {
    project: getProject(project, id),
    user,
  };
};

const mapDispatchToProps = dispatch => bindAllActions(dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
