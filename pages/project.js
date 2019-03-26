import React, { Component } from 'react';
import { connect } from 'react-redux';
import { WithUser } from 'components/connect';
import TimeRecords from 'components/TimeRecords';

import { bindAllActions } from 'store/actions/helpers';
import Head from 'components/Head';
import { getProject } from 'store/selectors/project';

class ProjectPage extends Component {
  static defaultProps = {
    project: {
      id: null,
    },
  };

  static async getInitialProps(req) {
    return {
      query: req.query,
    };
  }

  componentDidUpdate = async prevProps => {
    const {
      project: { id },
      actions: { fetchProjects, fetchTime },
      user: { token },
    } = this.props;

    if (token !== prevProps.user.token) {
      await fetchProjects();
    }

    if (id !== prevProps.project.id) {
      fetchTime(id);
    }
  };

  render() {
    const { project } = this.props;
    const { name, time_records } = project;

    return (
      <div>
        <Head />
        <WithUser>
          <>
            <h2>{name}</h2>
            <TimeRecords items={time_records} />
          </>
        </WithUser>
      </div>
    );
  }
}

const mapStateToProps = ({ user, project }, ownProps) => {
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
)(ProjectPage);
