import React ,{ Component } from 'react'
import ReactDOM from 'react-dom'
import './styles/index.scss'
class App extends Component {
    render () {
        return (
            <div className='test'>
                Hello World
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)

if (module.hot) {
  module.hot.accept()
}

