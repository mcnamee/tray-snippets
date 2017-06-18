import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { login } from '../../modules/user'
import { Link } from 'react-router-dom'

class Login extends React.Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.state = { formData: { email: '', password: '' } }
  }

  componentDidMount = () => {
    const creds = {
      email: localStorage.getItem('email'),
      password: localStorage.getItem('password'),
    }

    if (creds) {
      this.setState({ formData: creds })

      // Try logging in
      if (!this.props.location || !this.props.location.dontLogin) this.handleLogin();
    }
  }

  handleChange(e) {
    const data = {};
    data[e.target.name] = e.target.value;

    this.setState({
      formData: {
        ...this.state.formData,
        ...data,
      }
    });
  }

  handleLogin(e = null) {
    if (e) e.preventDefault()
    this.props.login(this.state.formData)
      .then(() => this.props.successfulLogin())
      .catch(err => err)
  }

  render() {
    return (
      <div className="pane padding">
        <h1>Login</h1>

        <form onSubmit={this.handleLogin}>
          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              name="email"
              value={this.state.formData.email}
              className="form-control"
              placeholder="Email"
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={this.state.formData.password}
              className="form-control"
              placeholder="Password"
              onChange={this.handleChange}
            />
          </div>

          <button className="btn btn-default">Login</button>
        </form>

        <hr />

        <button className="btn btn-default">
          <Link to="/sign-up">Sign Up</Link>
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: (state.user && state.user.email) ? state.user.email : null,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  login,
  successfulLogin: () => push('/snippets')
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Login)
