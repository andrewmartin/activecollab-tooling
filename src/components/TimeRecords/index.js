import React, { Component } from 'react';
import { Table, Divider, Tag } from 'antd';

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
        render: text => <span>{text}</span>,
      },
    ],
  };

  render() {
    const { items } = this.props;
    const { columns } = this.state;

    if (!items.length) return null;

    return (
      <div>
        <h2>Time</h2>
        <Table rowKey="id" columns={columns} dataSource={items} />
      </div>
    );
  }
}
