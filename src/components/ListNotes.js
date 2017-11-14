import React from 'react';

class ListNotes extends React.Component {
  constructor(props) {
    super(props);
    let notes = [];
    if (window.localStorage.getItem("notes")) {
      notes = JSON.parse(window.localStorage.getItem('notes'));
    }
    this.state = {
      data: notes
    };
  }
  addNote = () => {
    const data = this.state.data;
    data.push(data.length + 1);
    this.setState({data});
    window.localStorage.setItem('notes', JSON.stringify(data));
  }
  render() {
    const data = this.state.data;
    console.log(data)
    return (
      <div class="sidebar">
        <button onClick={this.addNote}>Add Note</button>
        {data
          ? <ul>{data.map(i => <li key={i}>{i}</li>)}</ul>
          : <div>no notes</div>}
      </div>
    )
  }
}

export default ListNotes;
