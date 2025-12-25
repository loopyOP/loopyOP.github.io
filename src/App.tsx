import './App.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import {ProjectPage} from './pages/projects'
  import {HomePage} from './pages/home'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element= {<HomePage/>}/>
          <Route path="/projects" element= {<ProjectPage/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
