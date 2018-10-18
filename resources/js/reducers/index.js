import {combineReducers} from 'redux';
import lines from "./lines";
import categories from "./categories";
import navigation from "./navigation";
import defaultDatas from './default';

export default combineReducers({lines, categories, navigation, defaultDatas});