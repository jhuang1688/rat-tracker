import React, { Component } from "react";
import "../mainMenu/mainMenu.css";
import Button from "../../components/Button";
import Navbar from "../../components/Navbar";
import Image from "../../components/Image" 

export default class TestSubmission extends Component {
  
  state = {
    userid: "",
    result: "",
    image: ""
  };

  handleChange = e => {
    this.setState({ [e.currentTarget.id]: e.currentTarget.value });
  };

  sayHello() {
    alert('REE!');
  }

  encodeImageFileAsURL = e => {
    var file = document.querySelector('input[type=file]').files[0];
    var reader = new FileReader();
    reader.onloadend = () => {
      this.setState({ image: reader.result });
    }
    reader.readAsDataURL(file);
  }

  submitTest = e => {
    var selectElement = document.querySelector('#result');
    var result = selectElement.value;

    selectElement = document.querySelector('#userid');
    var userid = selectElement.value;;

    var event = this.state;

    var axios = require('axios');
    // Currently outputs to wrong fields in db
    axios.put('https://ohplkkb1qe.execute-api.ap-southeast-2.amazonaws.com/dev',
      {
        MemberId  : userid,
        Result    : result,
        ImageLink : event.image
      }
    ).then(function (response) {
      console.log(JSON.stringify(response.data));
      alert("Submission Successful, thank you for keeping our workplace safe!");
    })
    .catch(function (error) {
      console.log(error);
    });
  
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <form className="form">

          <p> Select your memberId:  
              <select id="userid">
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
              </select>
          </p>

          <p> <br></br>Select the result of your test:  
              <select id="result">
                  <option value="negative">Negative</option>
                  <option value="positive">Positive</option>
                  <option value="error">Error</option>
              </select>
          </p>

          <p> <br></br><br></br> Upload Test Image Here!</p>
          <input type="file" onChange={this.encodeImageFileAsURL} />

          <p><br></br></p>
          <Image ></Image>
          
          <Button type="button" color="facebook" className="form__custom-button" onClick={this.submitTest}>
            Submit
          </Button>
        </form>

        
        
        
        {/*
        <span>userid: {this.state.userid} </span>
        <br></br>
        <span>result: {this.state.result} </span>
        <br> </br>
        <span>image: {this.state.image} </span>
        */}
      </div>
    );
  }
}