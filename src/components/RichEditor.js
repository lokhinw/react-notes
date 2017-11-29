import React from 'react';
import {EditorState, RichUtils, convertToRaw, convertFromRaw} from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import createUndoPlugin from 'draft-js-undo-plugin';
import firebase, {firebaseAuth} from '../firebase';

const undoPlugin = createUndoPlugin();
const {UndoButton, RedoButton} = undoPlugin;
const linkifyPlugin = createLinkifyPlugin();

var fire = firebase.database().ref('/');
class RichEditor extends React.Component {
  componentWillMount() {
    this.loadNote(this.props.note);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.note != nextProps.note) {
      this.loadNote(nextProps.note);
    }
  }
  loadNote = (id) => {
    let note;
    firebase.database().ref('/users/' + firebaseAuth().currentUser.uid + '/notes/' + id).on('value', snapshot => {
      if (snapshot.val()) {
        note = snapshot.val().data;
      }
      if (!!note) {
        if (note.entityMap == null) {
          note.entityMap = {}
        }
        this.setState({
          editorState: EditorState.createWithContent(convertFromRaw(note))
        })
      } else {
        this.setState({editorState: EditorState.createEmpty()});
      }
    });
  }
  saveContent = (content) => {
    firebase.database().ref('/users/' + firebaseAuth().currentUser.uid + '/notes/' + this.props.note).once('value', snapshot => {
      const notes = snapshot.val();
      notes.data = convertToRaw(content);
      firebase.database().ref('/users/' + firebaseAuth().currentUser.uid + '/notes/' + this.props.note).set(notes)
    }, error => {
      console.log(error)
    })
  }
  onChange = (editorState) => {
    const contentState = editorState.getCurrentContent();
    this.saveContent(contentState);
    this.setState({editorState});
  }

  _onBoldClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  }
  _onItalicClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'));
  }
  _onUnderlineClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
  }
  _onStrikethroughClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'STRIKETHROUGH'));
  }
  _onH1Click() {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, 'header-one'));
  }
  _onH2Click() {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, 'header-two'));
  }
  _onH3Click() {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, 'header-three'));
  }
  _onH4Click() {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, 'header-four'));
  }
  _onH5Click() {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, 'header-five'));
  }

  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  render() {
    const styleMap = {};

    return (
      <div>
        <div class="wysiwyg-controls">
          <span class="wysiwyg-controls-box">
            <a onClick={this._onBoldClick.bind(this)}>
              <strong>B</strong>
            </a>
            <a onClick={this._onItalicClick.bind(this)}>
              <em>I</em>
            </a>
            <a onClick={this._onUnderlineClick.bind(this)}>
              <u>U</u>
            </a>
            <a onClick={this._onStrikethroughClick.bind(this)}>
              <strike>S</strike>
            </a>

            {/* <input type="text" list="fontsize" />
            <datalist id="fontsize">
              <option>8</option>
              <option>9</option>
              <option>10</option>
              <option>11</option>
              <option>12</option>
              <option>14</option>
              <option>18</option>
              <option>24</option>
              <option>30</option>
              <option>36</option>
              <option>48</option>
              <option>60</option>
              <option>72</option>
              <option>96</option>
            </datalist> */}
          </span>
          <span class="wysiwyg-controls-box">
            <a onClick={this._onH1Click.bind(this)}>H1</a>
            <a onClick={this._onH2Click.bind(this)}>H2</a>
            <a onClick={this._onH3Click.bind(this)}>H3</a>
            <a onClick={this._onH4Click.bind(this)}>H4</a>
            <a onClick={this._onH5Click.bind(this)}>H5</a>
          </span>
          <span class="wysiwyg-controls-box">
            <UndoButton/>
            <RedoButton/>
          </span>
        </div>
        {this.state && this.state.editorState && <Editor plugins={[linkifyPlugin, undoPlugin]} customStyleMap={styleMap} editorState={this.state.editorState} handleKeyCommand={this.handleKeyCommand} onChange={this.onChange}/>}
      </div>
    );
  }
}

export default RichEditor;
