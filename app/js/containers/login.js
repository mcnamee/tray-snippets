import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { login } from '../actions/users';

class SnippetList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <form>
          <input type="text" name="email" />
          <input type="text" name="password" />
          <button type="submit"></button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    login,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SnippetList);
