import React, {Component} from 'react';
import ListNotes from './ListNotes';
import RichEditor from './RichEditor';

class App extends Component {
  render() {
    return (
      <div class="container">
            <ListNotes/>
      </div>
    );
  }
}

export default App;
