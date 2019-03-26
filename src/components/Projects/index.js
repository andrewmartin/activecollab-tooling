import React, { Component } from 'react';
import Router from 'next/router';
import { Layout, Button, Card } from 'antd';

class ProjectCard extends Component {
  render() {
    const { name, id } = this.props;

    return <Button onClick={() => Router.push(`/projects/${id}`)}>{name}</Button>;
  }
}

export default class Projects extends Component {
  static defaultProps = {
    items: [],
  };

  render() {
    const { items } = this.props;

    if (!items.length) return null;

    return (
      <div>
        <h2>Projects</h2>
        <ul className="project-list">
          {items.map(project => (
            <li key={project.id}>
              <ProjectCard {...project} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
