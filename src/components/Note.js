import React from 'react';

class Note extends React.Component {
  render() {
    const { details, index } = this.props;

    return (
      <RichEditor />
    )
  }
}

export default Note;
