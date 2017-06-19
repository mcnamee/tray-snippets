import React from 'react';
import { Route, Link } from 'react-router-dom'

import Launch from './launch'
import FolderList from '../folders'
import SnippetList from '../snippets'
import SnippetView from '../snippets/single'
import Login from '../user/login'
import SignUp from '../user/sign-up'
import Profile from '../user/profile'

// Link eg. <Link to="/profile">Profile</Link>

export default () => (
  <div>
    <div className="header-arrow"></div>
    <div className="window">

      <header className="toolbar toolbar-header">
        <h1 className="title">Snppts</h1>

        <div className="toolbar-actions">
          <div className="btn-group">
            <button className={'btn btn-default ' + (window.location.pathname === '/snippets' && 'active')}>
              <Link to="/snippets" className="icon icon-home" title="Snippets"></Link>
            </button>
            <button className={'btn btn-default ' + (window.location.pathname === '/folders' && 'active')}>
              <Link to="/folders" className="icon icon-folder" title="Folders"></Link>
            </button>
            <button className={'btn btn-default ' + (window.location.pathname === '/profile' && 'active')}>
              <Link to="/profile" className="icon icon-user" title="Account"></Link>
            </button>
          </div>

          <button className={'btn btn-default pull-right ' + (window.location.pathname === '/add-snippet' && 'active')}>
            <Link to="/add-snippet">
              <span className="icon icon-plus"></span>
            </Link>
          </button>
        </div>
      </header>

      <div className="window-content">
        <main>
          <Route exact path="/" component={Launch} />

          <Route exact path="/folders" component={FolderList} />

          <Route exact path="/snippets" component={SnippetList} />
          <Route exact path="/snippets/:folderId" component={SnippetList} />
          <Route exact path="/add-snippet" component={SnippetView} />
          <Route exact path="/view-snippet/:snippetId" component={SnippetView} />

          <Route exact path="/login" component={Login} />
          <Route exact path="/sign-up" component={SignUp} />
          <Route exact path="/profile" component={Profile} />
        </main>
      </div>
    </div>
  </div>
)
