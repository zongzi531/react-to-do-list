import * as React from 'react'
import * as ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import './fetch'

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
