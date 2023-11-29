import App from '@/App'
import Home from '@/Layout'
import About from '@/views/About'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'


const BaseRouter = () => (
  <Router>
    <Routes>
      <Route path='/' element={<App />}>
        <Route path='/' element={<Navigate to="/home" />} />
        <Route path='/home' element={<Home />} />
        <Route path='/about' element={<About />} />
      </Route>
    </Routes>
  </Router>
)

export default BaseRouter