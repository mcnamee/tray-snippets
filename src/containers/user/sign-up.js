import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { signUp } from '../../modules/user'

class SignUp extends React.Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = { formData: { email: '', password: '' } }
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

  handleSubmit(e) {
    e.preventDefault()
    this.props.signUp(this.state.formData)
      .then(() => this.props.successfulSignup())
      .catch(err => err)
  }

  render() {
    return (
      <div className="pane padding">
        <h1>Sign Up</h1>

        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              name="email"
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
              className="form-control"
              placeholder="Password"
              onChange={this.handleChange}
            />
          </div>

          <button className="btn btn-default">Sign Up</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: (state.user && state.user.email) ? state.user.email : null,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  signUp,
  successfulSignup: () => push('/snippets')
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
