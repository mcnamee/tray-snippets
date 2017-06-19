import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { getSnippets, addSnippet } from '../../modules/snippets'
import { getFolders } from '../../modules/folders'

class Snippets extends React.Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.getSnippets();
    this.props.getFolders();
  }

  renderFolderItem(item, id = '') {
    return (
      <Link
        to={id ? `/snippets/${id}` : '/snippets'}
        className={'nav-group-item ' + (this.props.location.pathname === `/snippets/${id}` && 'active')}
        key={id ? id : 'all-snippets'}
      >
        <span className="icon icon-record" style={{color: '{item.color}'}}></span>
        {item.title}
      </Link>
    )
  }

  renderFolderList() {
    const listItems = [
      this.renderFolderItem({ title: 'All' })
    ];

    Object.keys(this.props.folders).forEach((key) => {
      listItems.push(this.renderFolderItem(this.props.folders[key], key))
    });

    return listItems
  }

  renderListItem(item, id = 123) {
    return (
      <li className="list-group-item" key={id}>
        <Link to={`/view-snippet/${id}`}>
          <div className="media-body">
            <strong>{item.title}</strong>
            <p>{item.text}</p>
          </div>
        </Link>
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

  handleChange(e) {
    const data = {};
    data[e.target.name] = e.target.value;

    this.setState({ formData: { ...this.state.formData, ...data } });
  }

  handleSubmit(e) {
    e.preventDefault()
    // this.props.addSnippet(this.state.formData)
    this.setState({ formData: {} })
  }

  render() {
    return (
      <div>
        <div className="pane-group">
          <div className="pane pane-one-fourth sidebar">
            <nav className="nav-group">
              <Link to={'/folders'}>
                <h5 className="nav-group-title">
                  Folders
                  <span className="icon icon-cog"></span>
                </h5>
              </Link>
              {this.renderFolderList()}
            </nav>
        </div>

          <div className="pane">
            <ul className="list-group">
              <li className="list-group-header">
                <form onSubmit={this.handleSubmit}>
                  <input
                    type="text"
                    name="search"
                    className="form-control"
                    onChange={this.handleChange}
                    placeholder="Search for item"
                  />
                </form>
              </li>
              {this.renderList()}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  snippets: state.snippets,
  folders: state.folders,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  getSnippets,
  addSnippet,
  getFolders,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Snippets)
