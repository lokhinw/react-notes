import React, {Component} from 'react';
import ListNotes from './ListNotes';
import RichEditor from './RichEditor';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
      <ListNotes />
        <div class="editor">
          <RichEditor />
        </div>
      </div>
    );
  }
}

export default App;
