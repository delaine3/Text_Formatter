import React, { Component } from "react";

export default class TextFormatter extends Component {
  constructor(props) {
    super(props);
    this.onChangeCharToSeperateBy = this.onChangeCharToSeperateBy.bind(this);
    this.onChangeInputText = this.onChangeInputText.bind(this);
    this.onChangeOutputText = this.onChangeOutputText.bind(this);
    this.encloseWithChar = this.encloseWithChar.bind(this);
    this.onChangeEnclosingChar = this.onChangeEnclosingChar.bind(this);
    this.seperateByChar = this.seperateByChar.bind(this);
    this.onChangeRemoveString = this.onChangeRemoveString.bind(this);
    this.removeStr = this.removeStr.bind(this);
    this.removeDuplicates = this.removeDuplicates.bind(this);
    this.state = {
      input_text: "",
      output_text: "",
      charToSeperateBy: " ",
      enclosingChar: "",
      strToBeRemoved: "",
    };
  }

  onChangeInputText(e) {
    this.setState({
      input_text: e.target.value,
    });
  }
  onChangeOutputText(e) {
    this.setState({
      output_text: e.target.value,
    });
  }
  onChangeCharToSeperateBy(e) {
    this.setState({
      charToSeperateBy: e.target.value,
    });
  }
  seperateByChar(e) {
    e.preventDefault();

    var expression = /\s+/g;

    var inputText = this.state.input_text.toString();
    var seperatorChar = this.state.charToSeperateBy.toString();
    var new_output_text = inputText.replace(expression, seperatorChar);

    this.setState({
      output_text: new_output_text,
      charToSeperateBy: "",
    });
  }
  onChangeEnclosingChar(e) {
    this.setState({
      enclosingChar: e.target.value,
    });
  }
  encloseWithChar(e) {
    e.preventDefault();

    var expression = /([a-zA-Z0-9-]+)/gi;

    var inputText = this.state.input_text.toString();
    var enclosingCharacter = this.state.enclosingChar.toString();
    const susbstitute = enclosingCharacter + `$1` + enclosingCharacter;

    var new_output_text = inputText.replace(expression, susbstitute);
    this.setState({
      output_text: new_output_text,
      enclosingChar: "",
    });
  }
  onChangeRemoveString(e) {
    this.setState({
      strToBeRemoved: e.target.value,
    });
  }
  removeStr(e) {
    var inputText = this.state.input_text.toString();

    let expression = new RegExp(this.state.strToBeRemoved, "ig");
    var new_output_text = inputText.replace(expression, "");
    this.setState({
      output_text: new_output_text,
      strToBeRemoved: "",
    });
  }

  removeDuplicates(e) {
    var inputText = this.state.input_text.toString();

    let expression = /(\b\w+\b)(?=.*\b\1\b)/gi;
    var new_output_text = inputText.replace(expression, "");
    this.setState({
      output_text: new_output_text,
    });
  }

  render() {
    return (
      <div className="text-formatter-components">

        <div className="input-text">
      <p>Insert the text you would like to format in the box below</p>
          <textarea cols="40" rows="27" onChange={this.onChangeInputText} />
        </div>

        <div className="opperators">
          <h2>Operators</h2>
          <div className="opperator-sub-div">
            <p>Type a character to seperate each word by</p>
            <input
              value={this.state.charToSeperateBy}
              onChange={this.onChangeCharToSeperateBy}
            />
            <button onClick={this.seperateByChar}>Seperate</button>
          </div>
          <div className="opperator-sub-div">
            <p>
              Type in a character that you would like to enclose each word in
            </p>
            <input
              value={this.state.enclosingChar}
              onChange={this.onChangeEnclosingChar}
            />
            <button onClick={this.encloseWithChar}>Enclose</button>
          </div>
          <div className="opperator-sub-div">
            <p>Type in a string that you would like to remove</p>
            <input
              value={this.state.strToBeRemoved}
              onChange={this.onChangeRemoveString}
            />
            <br/>
            <button className="remove-button" onClick={this.removeStr}>Remove</button>
          </div>

          <div className="opperator-sub-div">
            <button onClick={this.removeDuplicates}>Remove Duplicates</button>
          </div>
        </div>

        <div className="output">
      <p>Output</p>
          <div className="output-text" >{this.state.output_text}</div>

        </div>
      </div>
    );
  }
}
