import React from 'react';
import uniqid from 'uniqid';
import Note from './Note';

class ListNotes extends React.Component {
  constructor(props) {
    super(props);
    let notes = {};
    if (window.localStorage.getItem("notes")) {
      notes = JSON.parse(window.localStorage.getItem('notes'));
    }
    this.state = {
      data: notes
    };
  }
  addNote = () => {
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
        : " AM")
    });

    this.setState({data});
    window.localStorage.setItem('notes', JSON.stringify(data));
  }
  render() {
    const data = this.state.data;
    return (
      <div class="sidebar">
        <button onClick={this.addNote}>Add Note</button>
        <input ref={(input) => this.name = input} type="text" placeholder="name"/> {data
          ? <div>{Object.keys(data).map(i => <a href="" class="note-item" key={i}>{data[i].title}</a>)}</div>
          : <div>no notes</div>}
      </div>
    )
  }
}

export default ListNotes;
