import ReactDOM from 'react-dom/client'
import 'reset-css'
import '@/assets/styles/global.less'
import 'nprogress/nprogress.css'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from "react-redux"
import store from "@/store"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
)
