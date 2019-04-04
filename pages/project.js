import React, { Component } from 'react';
import { connect } from 'react-redux';
import { WithUser } from 'components/connect';
import TimeRecords from 'components/TimeRecords';
import { DateRangePicker } from 'react-dates';
import moment from 'moment';
import { bindAllActions } from 'store/actions/helpers';
import Head from 'components/Head';
import { getProject } from 'store/selectors/project';

class ProjectPage extends Component {
  static defaultProps = {
    project: {
      id: null,
    },
  };

  state = {
    startDate: moment(new Date()).subtract(3, 'months'),
    endDate: moment(new Date()),
  };

  static async getInitialProps(req) {
    return {
      query: req.query,
    };
  }

  componentDidUpdate = async (prevProps, prevState) => {
    const {
      project: { id },
      actions: { fetchProjects, fetchTime },
      user: { token },
    } = this.props;

    const { startDate, endDate } = this.state;

    if (token !== prevProps.user.token) {
      await fetchProjects();
    }

    if (id !== prevProps.project.id) {
      fetchTime(id, {
        from: moment(startDate).format('YYYY-MM-DD'),
        to: moment(endDate).format('YYYY-MM-DD'),
      });
    }

    if (startDate !== prevState.startDate || endDate !== prevState.endDate) {
      fetchTime(id, {
        from: moment(startDate).format('YYYY-MM-DD'),
        to: moment(endDate).format('YYYY-MM-DD'),
      });
    }
  };

  onBulkUpdate = items => {
    const {
      project: { id },
      actions: { bulkUpdateBillable },
    } = this.props;
    bulkUpdateBillable(id, items);
  };

  render() {
    const { project, isLoadingProject } = this.props;
    const { name, time_records } = project;

    return (
      <div>
        <Head />
        <WithUser>
          <>
            <h2>{name}</h2>
            <div className="date-range-picker">
              <DateRangePicker
                isOutsideRange={() => false}
                startDate={this.state.startDate}
                startDateId="startDate"
                endDate={this.state.endDate}
                endDateId="endDate"
                onDatesChange={({ startDate, endDate }) =>
                  this.setState({ startDate, endDate })
                }
                focusedInput={this.state.focusedInput}
                onFocusChange={focusedInput => this.setState({ focusedInput })}
              />
            </div>
            {isLoadingProject ? (
              <div className="loading">Loading...</div>
            ) : (
              <TimeRecords
                onBulkUpdate={this.onBulkUpdate}
                onExport={this.onExport}
                items={time_records}
              />
            )}
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
    isLoadingProject: Boolean(project.isLoading),
    project: getProject(project, id),
    user,
  };
};

const mapDispatchToProps = dispatch => bindAllActions(dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectPage);
