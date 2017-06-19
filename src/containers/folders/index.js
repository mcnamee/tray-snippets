import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { getFolders, addFolder } from '../../modules/folders'

class Folders extends React.Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = { formData: { title: '' } }
  }

  componentDidMount() {
    this.props.getFolders()
  }

  renderListItem(item, id = 123) {
    return (
      <li className="list-group-item" key={id}>
        <div className="media-body">
          <Link to={`/view-folder/${id}`}>
            <strong>{item.title}</strong>
          </Link>
        </div>
      </li>
    )
  }

  renderList() {
    const listItems = [];

    Object.keys(this.props.folders).forEach((key) => {
      listItems.push(this.renderListItem(this.props.folders[key], key))
    });

    return listItems
  }

  handleChange(e) {
    const data = {};
    data[e.target.name] = e.target.value;

    this.setState({ formData: { ...this.state.formData, ...data } });
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.addFolder(this.state.formData)
    this.setState({ formData: { search: '' } })
  }

  render() {
    return (
      <div>
        <div className="pane">
          <ul className="list-group">
            <li className="list-group-header">
              <form onSubmit={this.handleSubmit}>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  onChange={this.handleChange}
                  placeholder="Add Folder"
                />
              </form>
            </li>
            {this.renderList()}
          </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  folders: state.folders
})

const mapDispatchToProps = dispatch => bindActionCreators({
  getFolders,
  addFolder,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Folders)
