import React, { Component } from 'react';
import { connect } from 'react-redux';
import { WithUser } from 'components/connect';

import { bindAllActions } from 'store/actions/helpers';
import { getProjects } from 'store/selectors/project';
import Head from 'components/Head';
import Projects from 'components/Projects';

class Home extends Component {
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
    const { projectItems } = this.props;

    console.log('projectItems', projectItems);

    return (
      <div>
        <Head />
        <WithUser>
          <Projects items={projectItems} />
        </WithUser>
      </div>
    );
  }
}

const mapStateToProps = ({ user, project }) => {
  return {
    project,
    projectItems: getProjects(project),
    user,
  };
};

const mapDispatchToProps = dispatch => bindAllActions(dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
