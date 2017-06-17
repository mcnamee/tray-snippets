import React from 'react';
import Login from '../containers/login.js';
import SnippetList from '../containers/list.js';

const styles = {
    textAlign: 'center'
};

export default class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={styles}>
        Hello World
        <Login />
      </div>
    );
  }
}
