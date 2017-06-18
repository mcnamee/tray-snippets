import React from 'react'
import { Link } from 'react-router-dom'

import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class UserProfile extends React.Component {
  // Go to login when no user
  componentDidMount = () => {
    if (this.props.user === null) this.props.goToLogin();
  }

  render() {
    return (
      <div className="pane padding">
        <h1>Profile</h1>

        {this.props.user.email}

        {!this.props.user.email &&
          <div>
            <Link to={{ pathname: "/", dontLogin: true }} className="icon icon-user" title="Login">Login</Link> &nbsp;
            <Link to="/sign-up" className="icon icon-user-add" title="Sign Up">Sign Up</Link>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user || null,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  goToLogin: () => push('/login'),
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)
