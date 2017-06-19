import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { addSnippet, updateSnippet, deleteSnippet } from '../../modules/snippets'

class SnippetView extends React.Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.state = { formData: { title: '', text: '' } }
  }

  componentDidMount() {
    const snippetId = (this.props.match && this.props.match.params && this.props.match.params.snippetId)
      ? this.props.match.params.snippetId
      : null;
    const formData = snippetId ? this.props.snippets[snippetId] : null;

    if (formData) this.setState({ snippetId, formData });
  }

  handleChange(e) {
    const data = {};
    data[e.target.name] = e.target.value;

    this.setState({ formData: { ...this.state.formData, ...data } })
  }

  handleSubmit(e) {
    e.preventDefault()

    if (this.state.snippetId) {
      return this.props.updateSnippet(this.state.snippetId, this.state.formData)
        .catch(err => err)
    }

    return this.props.addSnippet(this.state.formData)
      .then(key => this.props.goToSnippet(key))
      .catch(err => err)
  }

  handleDelete() {
    this.props.deleteSnippet(this.state.snippetId)
      .then(this.props.goHome)
      .catch(err => err)
  }

  renderForm(item) {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label>Title</label>
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
          <label>Snippet</label>
          <textarea
            name="text"
            value={this.state.formData.text}
            className="form-control"
            placeholder="Snippet"
            onChange={this.handleChange}
          />
        </div>
      </form>
    )
  }

  render() {
    return (
      <div>
        <div className="padding">
          {this.renderForm()}
        </div>

        <footer className="toolbar toolbar-footer">
          <div className="toolbar-actions">
            {this.state.snippetId &&
                <button className="btn btn-negative" onClick={this.handleDelete}>
                  Delete
                </button>
            }

            <button
              className={'btn ' + (this.state.snippetId ? 'btn-primary' : 'btn-positive') + ' pull-right'}
              onClick={this.handleSubmit}
            >
              {this.state.snippetId ? 'Update' : 'Add'}
            </button>
          </div>
        </footer>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  snippets: state.snippets
})

const mapDispatchToProps = dispatch => bindActionCreators({
  addSnippet,
  deleteSnippet,
  updateSnippet,
  goHome: () => push('/snippets'),
  goToSnippet: (snippetId) => push(`/view-snippet/${snippetId}`),
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SnippetView)
