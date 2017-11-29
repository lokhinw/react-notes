import React from 'react';
import uniqid from 'uniqid';
import RichEditor from './RichEditor';
import firebase, {firebaseAuth} from '../firebase';

class ListNotes extends React.Component {
  constructor(props) {
    super(props);
    var notes = {};

    this.state = {
      noteId: ''
    };
  }
  componentDidMount() {
    firebase.database().ref('/users/' + firebaseAuth().currentUser.uid + '/notes/').on('value', snapshot => {
      this.setState({data: snapshot.val()})
    }, error => {
      console.log(error)
    })
  }
  addNote = () => {
    if (this.name.value.replace(/^\s+/, '').replace(/\s+$/, '') === '') {
      alert('your note needs a name!');
    } else {
      let data;
      const noteId = uniqid();
      const d = new Date();
      let monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
      data = {
        title: this.name.value,
        date: monthNames[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear(),
        time: (d.getHours() > 12
          ? d.getHours() - 12
          : d.getHours()).toString() + ":" + (d.getMinutes() < 10
          ? "0" + d.getMinutes()
          : d.getMinutes()).toString() + (d.getHours() >= 12
          ? " PM"
          : " AM"),
        data: null
      };
      this.state.noteId = noteId;
      firebase.database().ref('/users/' + firebaseAuth().currentUser.uid + '/notes/' + noteId).set(data);
    }
    this.name.value = '';
  }
  deselectNote = (key) => {
    if (key === this.state.noteId) {
      this.setState({noteId: ''});
    }
  }
  selectNote = (key) => {
    this.setState({noteId: key});
  }
  removeNote = (key) => {
    this.deselectNote(key);
    firebase.database().ref('/users/' + firebaseAuth().currentUser.uid + '/notes/' +  key).set(null);
  }
  render() {
    const data = this.state.data;
    return (
      <div class="grid-x">
        <div class="small-12 large-3 cell">
          <div className="sidebar">
            <div className="add-note">
              <input ref={(input) => this.name = input} name="note-name" id="note-name" type="text" placeholder="name"/>
              <a id="add-note-submit" className="button" onClick={this.addNote}>Add Note</a>
            </div>
            {data
              ? <div>{Object.keys(data).map(i => <div className="note-item">
                    <i class="fa fa-file-text" aria-hidden="true"></i>
                    <button onClick={this.selectNote.bind(this, i)} key={i}>{data[i].title}</button>
                    <a href="#" class="x-button" onClick={this.removeNote.bind(this, i)}>&times;</a>
                  </div>)}</div>
              : ''}
          </div>
        </div>
        <div class="small-12 large-9 cell">
          <div class="editor">
            {this.state.noteId
              ? <RichEditor note={this.state.noteId}/>
              : ''}
          </div>
        </div>
      </div>
    )
  }
}

export default ListNotes;
