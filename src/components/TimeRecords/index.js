import React, { Component } from 'react';
import { Table, Icon, Button } from 'antd';

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
        render: text => (
          <span>{text === 1 && <Icon type="check-square" theme="filled" />}</span>
        ),
      },
      {
        title: 'Updating',
        dataIndex: 'isUpdating',
        key: 'isUpdating',
        render: isUpdating => {
          return <span>{isUpdating && <Icon type="check-square" theme="filled" />}</span>;
        },
      },
    ],
  };

  render() {
    const { items, bulkUpdate } = this.props;
    const { columns } = this.state;

    if (!items.length) return null;

    return (
      <div>
        <h2>Time Entries</h2>
        <Table rowKey="id" columns={columns} dataSource={items} />
        <Button onClick={bulkUpdate.bind(this, items)}>Bulk Update Billable Status</Button>
      </div>
    );
  }
}
