import React, { Component } from 'react';
import moment from 'moment';
import { Table, Icon, Button } from 'antd';
import { CSVLink } from 'react-csv';

export default class TimeRecords extends Component {
  static defaultProps = {
    items: [],
  };

  state = {
    columns: [
      {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
        render: text => <a href="javascript:;">{text}</a>,
      },
      {
        title: 'Created On',
        dataIndex: 'created_on',
        key: 'created_on',
        render: text => <span>{moment.unix(text).format('MM-DD-YYYY')}</span>,
      },
      {
        title: 'User',
        dataIndex: 'user_name',
        key: 'user_name',
        render: text => <span>{text}</span>,
      },
      {
        title: 'Summary',
        dataIndex: 'summary',
        key: 'summary',
        render: text => <span>{text}</span>,
      },
      {
        title: 'Amount',
        dataIndex: 'value',
        key: 'value',
        render: text => <span>{text}</span>,
      },
      {
        title: 'Billable',
        dataIndex: 'billable_status',
        key: 'billable_status',
        render: (text, item) => {
          return (
            <span>
              <>
                <Button
                  onClick={this.props.onSingleUpdate.bind(this, [item], {
                    billable_status: text === 1 ? 0 : 1,
                  })}>
                  <>
                    {text === 1 && <Icon type="check-square" theme="filled" />}
                    Mark as {text === 1 ? ' unbillable' : ' billable'}
                  </>
                </Button>
              </>
            </span>
          );
        },
      },
    ],
  };

  buildCSV = () => {
    const { items } = this.props;
    const data = [
      ['id', 'user', 'summary', 'amount', 'billable', 'created_on'],
      ...items.map(item => [
        item.id,
        item.created_by_name,
        item.summary,
        item.value,
        item.billable_status,
        moment.unix(item.created_on).format('MM-DD-YYYY'),
      ]),
    ];

    return data;
  };

  render() {
    const { items, onBulkUpdate } = this.props;
    const { columns } = this.state;

    if (!items.length) return null;

    return (
      <div>
        <h2>Time Entries</h2>
        <Table rowKey="id" columns={columns} dataSource={items} />
        <Button onClick={onBulkUpdate.bind(this, items, { billable_status: 1 })}>
          Bulk Update Billable Status
        </Button>

        <CSVLink data={this.buildCSV()}>
          <Button>Download</Button>
        </CSVLink>
      </div>
    );
  }
}
