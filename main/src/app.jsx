import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './styles/index.scss'
// let initText = 'Hello! Everyone~'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      text: props.initText.split(""),
      length: props.initText.length,
      showText: ''
    }
  }

  componentDidMount() {
    var _this = this;
    this.interval = setInterval(function () {
      if (_this.state.text.length > 0) {
          _this.tick();
      } else {
        clearInterval(this.interval)
      }
    }, 150)
  }

  tick () {
    var _this = this;
      this.setState({
        showText: _this.state.showText + _this.state.text.shift()
      })
  }

  render () {
    return (
      <div className={this.state.text.length > 0 ? "test hasCursor":"test"}>
        {this.state.showText}
      </div>
    )
  }
}

ReactDOM.render(
  <App  initText = 'Hello! Welcome to my github~' />,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept()
}
