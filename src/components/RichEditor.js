import React from 'react';
import {Editor, EditorState, RichUtils, convertToRaw, convertFromRaw} from 'draft-js';

class RichEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    const content = window.localStorage.getItem('content');
    if (content) {
      this.state.editorState = EditorState.createWithContent(convertFromRaw(JSON.parse(content)));
    } else {
      this.state.editorState = EditorState.createEmpty();
    }
  }
  saveContent = (content) => {
    window.localStorage.setItem('content', JSON.stringify(convertToRaw(content)));
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
  _onToggleCode = () => {
    this.onChange(RichUtils.toggleCode(this.state.editorState));
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
    return (
      <div>
        <button onClick={this._onBoldClick.bind(this)}>
          <strong>b</strong>
        </button>
        <button onClick={this._onItalicClick.bind(this)}>
          <em>i</em>
        </button>
        <button onClick={this._onUnderlineClick.bind(this)}>
          <u>u</u>
        </button>
        <button onClick={this._onH1Click.bind(this)}>H1</button>
        <button onClick={this._onH2Click.bind(this)}>H2</button>
        <button onClick={this._onH3Click.bind(this)}>H3</button>
        <button onClick={this._onH4Click.bind(this)}>H4</button>
        <button onClick={this._onH5Click.bind(this)}>H5</button>
        <button onClick={this._onToggleCode.bind(this)}>Code Block</button>
        <Editor editorState={this.state.editorState} handleKeyCommand={this.handleKeyCommand} onChange={this.onChange}/>
      </div>
    );
  }
}

export default RichEditor;
