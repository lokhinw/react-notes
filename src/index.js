import React from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState, RichUtils} from 'draft-js';
import './index.css';
import App from './App';
import MyEditor from './components/MyEditor';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <MyEditor/>, document.getElementById('root'));
registerServiceWorker();
