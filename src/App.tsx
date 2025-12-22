import { TypeAnimation } from 'react-type-animation';
import './App.css'
import Picture from './components/picture';
import { BaselineEmail, GithubSolid, LinkedinRect } from './components/svg';

function App() {

  return (
    <>
      <nav>
        <div id="spacer">
          <a href="#projects">Projects</a>
          <a href="#about">About Me</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>
      <img src="/ryanchan.png" id="profile-pic" alt="Profile Picture"/>
      <div id = "top">
        <TypeAnimation
          sequence={['Hello World!', 1000, 'Welcome to my page!', 1000]}
          wrapper="h1"
          cursor={true}
          repeat={0}
          speed={8}
          style={{fontFamily: 'Consolas', fontSize: '4em'}}
        >
        </TypeAnimation>
        <h1>I'm <span id='name'>Ryan Chan</span>.</h1>
        <h2>This is my portfolio! Feel free to look around.</h2>
      </div>
      <div id="projects" className="sectionB">
        <h1>Projects</h1>
        <span className='projectDisplay'>

        </span>
      </div>
      <div id="about" className="sectionA">
        <h1>About Me</h1>
        <p>
          I'm a college graduate and software developer with a passion for creating innovative solutions and learning new technologies. 
          In my free time, I enjoy coding, gaming, and exploring the latest advancements in tech.
        </p>
        <span className='photoDisplay'>
          <Picture src="/graduate.png" alt="Me at graduation"/>
          <Picture src="/vietnam.png" alt="Me on vacation"/>
        </span>
      </div>
      <div id="contact" className="sectionB">
        <h1>Contact</h1>
        <p><BaselineEmail /> Email: ryan.seth.chan@gmail.com</p>
        <p><LinkedinRect /> LinkedIn: <a href="https://www.linkedin.com/in/ryan-seth-chan/" target='_blank'>ryan-seth-chan</a></p>
        <p><GithubSolid /> GitHub: <a href="https://github.com/loopyOP" target='_blank'>loopyOP</a></p>
      </div>
    </>
  )
}

export default App
