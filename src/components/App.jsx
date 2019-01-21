import React from 'react';
import $ from 'jquery';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      name :' ',
      message : '',
      finalOutput : ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }
  handleChange(event) {
      //the brackets help you focus on the single change that is being focused on
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    //console.log('A name was submitted: ' + this.state.name);
    //console.log('Message that was submitted: ' + this.state.message);
    event.preventDefault();
    let postObj = { "name": this.state.name, "message": this.state.message };
    //put ajax in here..
    const server = 'http://ec2-13-57-25-101.us-west-1.compute.amazonaws.com:3000/api/hrsf110/greeting';
    $.ajax({
      url: server,
      type: 'POST',
      // Pass in MessageObject
      data: JSON.stringify(postObj),
      contentType: 'application/json',
      success: function(result) {
         console.log(result);
        // console.log(this);
        this.setState({finalOutput: result});
      }.bind(this),
      error: function(error) {
        console.error('error is :', error);
      }
    });
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1 className='output'>{this.state.finalOutput}</h1>
        <label>
          Name:
          <input type="text" name='name' onChange={this.handleChange}  />
        </label>
        <label>
          Message:
          <input type="text" name='message' onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
export default App;


//My Ajax that works( did this one first)
// var server = 'http://ec2-13-57-25-101.us-west-1.compute.amazonaws.com:3000/api/hrsf110/greeting';
// var testMessage = { "name": "Mel", "message": "test" };
//
//
// $.ajax({
//   url: server,
//   type: 'POST',
//   // Pass in MessageObject
//   data: JSON.stringify(testMessage),
//   contentType: 'application/json',
//   success: function(result) {
//     console.log(result);
//   },
//   error: function(error) {
//     console.error('error is :', error);
//   }
// });