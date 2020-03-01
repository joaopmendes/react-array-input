# react-array-input

> A easy way to handle array inputs

[![NPM](https://img.shields.io/npm/v/react-array-input.svg)](https://www.npmjs.com/package/react-array-input) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-array-input
```

## Usage

```jsx
import React, { Component } from 'react'

import ArrayInput from 'react-array-input'
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

import {MDBInput, MDBContainer, MDBBtn} from "mdbreact";


export default class App extends Component {
  state = {
    personsArray: [
      {name: '', age: null},
      {name: '', age: null},
    ]
  }
  render () {
    return (
      <MDBContainer style={{width: "50%"}}>
        <pre>{JSON.stringify(this.state.personsArray)}</pre>
        <ArrayInput array={this.state.personsArray} onValueChange={(values) => this.setState({personsArray: values})}>
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

```
## Example Explained with some usefull tips
The component recieves a array of data ( in the example that would be the personsArray) and an onValueChange that recieves the same array with the updated values.

With that array, the component will render as many children as the length of the array passed thru props 
( in the example it will be rendered 2 Person Components because the personArray only as 2 objects).
For each children rendered it will have passed some props:
  - values: the values that this component should use, for example the first Person component will have the value of    personArray[0];
  - onValuesChange: a function that you pass the values updated, for example if you recieve {name: 'teste', age: 18}
    and you need to update the age to 19 you should call this function with {name: 'teste', age: 19}.
    I do recommend to only call this function on onBlur events, to not have performance issues.
  - index - the index of that object in the original array.
  - selfDestroy - a function that when called, removes that object completly from the array.

This Person object is just an example of how this could be done. How you do it is completly up to you.

The logic to add and remove objects is up to you, because inside the ArrayInput I cannot know your logic to add a object or remove it.

You can pass aditional props to ArrayInput, that props will be redirected to each children


## License

MIT © [joaopmendes](https://github.com/joaopmendes)
