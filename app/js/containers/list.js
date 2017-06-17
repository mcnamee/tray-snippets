import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addSnippet, deleteSnippet } from '../actions/snippets';

class SnippetList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        Hey There World
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    snippets: state.snippets
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addSnippet,
    deleteSnippet,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SnippetList);
