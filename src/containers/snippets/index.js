import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { getSnippets, addSnippet } from '../../modules/snippets'

class Snippets extends React.Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = { formData: { title: '', text: '' } }
  }

  componentDidMount() {
    this.props.getSnippets()
  }

  renderListItem(item, id = 123) {
    return (
      <li className="list-group-item" key={id}>
        <div className="media-body">
          <strong>{item.title}</strong>
          <p>{item.text}</p>
        </div>
      </li>
    )
  }

  renderList() {
    const listItems = [];

    Object.keys(this.props.snippets).forEach((key) => {
      listItems.push(this.renderListItem(this.props.snippets[key], key))
    });

    return listItems
  }

  renderNewListItem(item) {
    return (
      <li className="list-group-item">
        <div className="media-body">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="title"
                value={this.state.formData.title}
                className="form-control"
                placeholder="Title"
                onChange={this.handleChange}
              />
            </div>

            <div className="form-group">
              <textarea
                name="text"
                className="form-control"
                placeholder="Snippet"
                onChange={this.handleChange}
              >{this.state.formData.password}</textarea>
            </div>

            <button className="btn btn-default">Add</button>
          </form>
        </div>
      </li>
    )
  }

  handleChange(e) {
    const data = {};
    data[e.target.name] = e.target.value;

    this.setState({ formData: { ...this.state.formData, ...data } });
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.addSnippet(this.state.formData)
    this.setState({ formData: {} })
  }

  render() {
    return (
      <div>
        <div className="pane-group">
          <div className="pane pane-one-fourth sidebar">
            <nav className="nav-group">
              <h5 className="nav-group-title">Tags</h5>
              <a className="nav-group-item active">
                <span className="icon icon-home"></span>
                Matt
              </a>
              <span className="nav-group-item">
                <span className="icon icon-download"></span>
                Something else
              </span>
            </nav>
          </div>

          <div className="pane">
            <ul className="list-group">
              <li className="list-group-header">
                <input className="form-control" type="text" placeholder="Search for item" />
              </li>
              {this.renderNewListItem()}
              {this.renderList()}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  snippets: state.snippets
})

const mapDispatchToProps = dispatch => bindActionCreators({
  getSnippets,
  addSnippet,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Snippets)
