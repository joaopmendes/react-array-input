import React, { Component } from 'react'

import ArrayInput from 'react-array-input'
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

import {MDBInput, MDBContainer, MDBBtn} from "mdbreact";


export default class App extends Component {
  state = {
    array: [
      {name: '', age: null},
      {name: '', age: null},
    ]
  }
  render () {
    return (
      <MDBContainer style={{width: "50%"}}>
        <pre>{JSON.stringify(this.state.array)}</pre>
        <ArrayInput array={this.state.array} onValueChange={(values) => this.setState({array: values})}>
          {
            (props) => <Person {...props}/>
          }
        </ArrayInput>
      </MDBContainer>

    )
  }
}

class Person extends Component {
  state = {
    name: '',
    age: 0
  }
  componentDidMount() {
    this.setState(
      ...this.props.values
    )
  }
  onValueChange = (key, value) => {
    this.setState({
      [key]: value
    })
  }

  onBlur = () => {
    const {values} = this.props;
    this.props.onValuesChange({...values, ...this.state})
  }
  render() {
    return (
      <React.Fragment>
        <MDBInput
          label="Name"
          value={this.name}
          onBlur={() => this.onBlur()}
          onChange={(e) => this.onValueChange('name', e.target.value)}/>
          
          <MDBInput
          label="Age"
          value={this.age}
          onBlur={() => this.onBlur()}
          onChange={(e) => this.onValueChange('age', e.target.value)}/>
          <MDBBtn onClick={this.props.selfDestroy}>Destroy</MDBBtn>

      </React.Fragment>
    )
  }
}

