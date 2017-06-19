import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import user from './user'
import snippets from './snippets'
import folders from './folders'

export default combineReducers({
  routing: routerReducer,
  user,
  snippets,
  folders
})
