import { TypeAnimation } from 'react-type-animation';
import '../css/home.css'
import Picture from '../components/picture';
import { BaselineEmail, GithubSolid, LinkedinRect } from '../components/svg';
import ProjectButton from '../components/projectButton';
import { HashLink } from 'react-router-hash-link';

const assets = import.meta.glob('../assets/home/*.png', { query: '?url', import: 'default', eager: true }) as Record<string, string>;

export function HomePage() {
  return (
    <>
      <nav>
        <div id="spacer">
          <HashLink to="#projects">Projects</HashLink>
          <HashLink to="#about">About Me</HashLink>
          <HashLink to="#contact">Contact</HashLink>
        </div>
      </nav>
      <img src={assets["../assets/home/ryanchan.png"]} id="profile-pic" alt="Profile Picture"/>
      <div id = "top">
        <TypeAnimation
          sequence={['Hello World!', 1000, 'Welcome to my page!', 1000]}
          wrapper="h1"
          cursor={true}
          repeat={0}
          speed={20}
          style={{fontFamily: 'Consolas', fontSize: '4em'}}
        >
        </TypeAnimation>
        <h1>I'm <span id='name'>Ryan Chan</span>.</h1>
        <h2>This is my portfolio! Feel free to look around.</h2>
      </div>
      <div id="projects" className="sectionB">
        <h1>Projects</h1>
        <span className='projectDisplay'>
          <ProjectButton icon={assets["../assets/home/logo-egg.png"]} iconSize={100} label="Recipe Book" description="A recipe browser that displays information on many recipes." onClick={() => window.open('/#/projects?q=recipe-browser', '_self')} />
          <ProjectButton icon="/handpeace.svg" label="Personal Website" description="My personal website showcasing my projects and skills." onClick={() => window.open('https://loopyop.github.io', '_blank')} />
          <ProjectButton icon="/handpeace.svg" label="Personal Website" description="My personal website showcasing my projects and skills." onClick={() => window.open('https://loopyop.github.io', '_blank')} />
        </span>
      </div>
      <div id="about" className="sectionA">
        <h1>About Me</h1>
        <p>
          I'm a college graduate and software developer with a passion for creating innovative solutions and learning new technologies. 
          In my free time, I enjoy coding, gaming, and exploring the latest advancements in tech.
        </p>
        <span className='photoDisplay'>
          <Picture src={assets["../assets/home/graduate.png"]} alt="Me at graduation"/>
          <Picture src={assets["../assets/home/vietnam.png"]} alt="Me on vacation"/>
        </span>
      </div>
      <div id="contact" className="sectionB">
        <h1>Contact</h1>
        <p><BaselineEmail /> Email: <a href="mailto:ryan.seth.chan@gmail.com">ryan.seth.chan@gmail.com</a></p>
        <p><LinkedinRect /> LinkedIn: <a href="https://www.linkedin.com/in/ryan-seth-chan/" target='_blank'>ryan-seth-chan</a></p>
        <p><GithubSolid /> GitHub: <a href="https://github.com/loopyOP" target='_blank'>loopyOP</a></p>
      </div>
    </>
  )
}
