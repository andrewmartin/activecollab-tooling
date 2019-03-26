import React, { Component } from 'react';
import Router from 'next/router';
import { Layout, Button, Card } from 'antd';

export default class Project extends Component {
  render() {
    const { name } = this.props;

    return (
      <div>
        <h2>{name}</h2>
      </div>
    );
  }
}
