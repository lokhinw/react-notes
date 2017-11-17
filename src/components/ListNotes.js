import React from 'react';
import uniqid from 'uniqid';
import RichEditor from './RichEditor';

class ListNotes extends React.Component {
  constructor(props) {
    super(props);
    let notes = {};
    if (window.localStorage.getItem("notes")) {
      notes = JSON.parse(window.localStorage.getItem('notes'));
    }
    this.state = {
      noteId: '',
      data: notes
    };
  }
  addNote = () => {
    if (this.name.value.replace(/^\s+/, '').replace(/\s+$/, '') === '') {
      alert('your note needs a name!');
    } else {
      this.state.data = JSON.parse(window.localStorage.getItem('notes'));
      const data = this.state.data;
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

      data[noteId] = ({
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
      });

      this.setState({data});
      window.localStorage.setItem('notes', JSON.stringify(data));
      this.state.noteId = noteId;
    }
    this.name.value = '';
  }
  removeNote = (key) => {
    this.state.data = JSON.parse(window.localStorage.getItem('notes'));
    const data = this.state.data;
    delete data[key];
    this.setState({data});
    if (key === this.state.noteId) {
      this.state.noteId = '';
    }
    window.localStorage.setItem('notes', JSON.stringify(data));
  }
  selectNote = (key) => {
    this.setState({noteId: key});

  }
  render() {
    const data = this.state.data;
    return (
      <div>
        <div class="sidebar">
          <button onClick={this.addNote}>Add Note</button>
          <input ref={(input) => this.name = input} type="text" placeholder="name"/> {data
            ? <div>{Object.keys(data).map(i => <div>
                  <button onClick={this.selectNote.bind(this, i)} class="note-item" key={i}>{data[i].title}</button>
                  <div>
                    <a href="#" onClick={this.removeNote.bind(this, i)}>Remove Note</a>
                  </div>
                  <span>- {data[i].date}
                    <br/>- {data[i].time}</span>
                </div>)}</div>
            : <div>no notes</div>}
        </div>
        <div class="editor">
          {/* <RichEditor note={this.state.noteId} /> */}
          {!!this.state.noteId
            ? <RichEditor note={this.state.noteId}/>
            : 'no note selected'}
        </div>
      </div>
    )
  }
}

export default ListNotes;
