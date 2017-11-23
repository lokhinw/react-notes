import React from 'react';
import uniqid from 'uniqid';
import RichEditor from './RichEditor';
import firebase from '../firebase';

var fire = firebase.database().ref('/');

class ListNotes extends React.Component {
  constructor(props) {
    super(props);
    var notes = {};

    this.state = {
      noteId: ''
    };
  }
  componentDidMount() {
    fire.on('value', snapshot => {
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
      firebase.database().ref('/' + noteId).set(data);
    }
    this.name.value = '';
  }
  deselectNote = (key) => {
    if (key === this.state.noteId) {
       this.setState({noteId: false});

    }
  }
  selectNote = (key) => {
    this.setState({noteId: key});
  }
  removeNote = (key) => {
    this.deselectNote(key);
    firebase.database().ref('/' + key).set(null);
  }
  render() {
    const data = this.state.data;
    return (
      <div>
        <div className="sidebar">
          <button onClick={this.addNote}>Add Note</button>
          <input ref={(input) => this.name = input} type="text" placeholder="name"/> {data
            ? <div>{Object.keys(data).map(i => <div>
                  <button onClick={this.selectNote.bind(this, i)} className="note-item" key={i}>{data[i].title}</button>
                  <div>
                    <a href="#" onClick={this.removeNote.bind(this, i)}>Remove Note</a>
                  </div>
                  <span>- {data[i].date}
                    <br/>- {data[i].time}</span>
                </div>)}</div>
            : <div>no notes</div>}
        </div>
        <div class="editor">
          {this.state.noteId}
          {this.state.noteId
            ? <RichEditor note={this.state.noteId}/>
            : 'no note selected'}
        </div>
      </div>
    )
  }
}

export default ListNotes;
