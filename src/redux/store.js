import {createStore, combineReducers} from 'redux'
import {searchReducer} from "./search/searchReducers";
import {clientsReducer} from "./clientTable/clientReducers";

const rootReducer = combineReducers({search: searchReducer, client: clientsReducer})

const store = createStore(rootReducer)

export default store