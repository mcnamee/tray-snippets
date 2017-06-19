import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { login } from '../../modules/user'

class Launch extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount = () => {
    this.props.login()
    .then(() => this.props.goToSnippets())
    .catch(() => this.props.goToLogin())
  }

  render() {
    return (
      <div className="pane padding">
        <h1>One moment</h1>
      </div>
    )
  }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => bindActionCreators({
  login,
  goToSnippets: () => push('/snippets'),
  goToLogin: () => push('/login')
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Launch)
