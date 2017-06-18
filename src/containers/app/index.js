import React from 'react';
import { Route, Link } from 'react-router-dom'
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
      </header>

      <div className="window-content">
        <main>
          <Route exact path="/" component={Login} />

          <Route exact path="/snippets" component={SnippetList} />
          <Route exact path="/view-snippet" component={SnippetView} />

          <Route exact path="/sign-up" component={SignUp} />
          <Route exact path="/profile" component={Profile} />
        </main>
      </div>

      <footer className="toolbar toolbar-footer">
        <div className="footer-link">
          Powered by <a href="https://snppts.co">Snppts.co</a>
        </div>

        <div className="toolbar-actions pull-right">
          <div className="btn-group">
            <button className="btn btn-default">
              <Link to="/snippets" className="icon icon-list" title="Snippets"></Link>
            </button>

            <button className="btn btn-default">
              <Link to="/profile" className="icon icon-user" title="Account"></Link>
            </button>
          </div>
        </div>
      </footer>
    </div>
  </div>
)
