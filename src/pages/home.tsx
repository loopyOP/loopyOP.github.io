import { TypeAnimation } from 'react-type-animation';
import '../css/home.css'
import Picture from '../components/picture';
import { BaselineEmail, GithubSolid, LinkedinRect } from '../components/svg';
import ProjectButton from '../components/projectButton';
import { HashLink } from 'react-router-hash-link';
import { useEffect } from 'react';

const assets = import.meta.glob('../assets/home/*.{png,svg}', { query: '?url', import: 'default', eager: true }) as Record<string, string>;

export function HomePage() {
  useEffect(() => {
    document.body.classList.remove('page-projects');
    document.body.classList.add('page-home');

    return () => {
      document.body.classList.remove('page-home');
    };
  }, []);

  return (
    <>
      <nav>
        <div id="spacer">
          <HashLink to="#projects">Projects</HashLink>
          <HashLink to="#about">About Me</HashLink>
          <HashLink to="#contact">Contact</HashLink>
        </div>
      </nav>
      <img src={'/ryanchan.png'} id="profile-pic" alt="Profile Picture"/>
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
          <ProjectButton icon={assets["../assets/home/music-note.svg"]} iconSize={100} label="MoodCurve" description="Machine Learning analysis of music flow." onClick={() => window.open('/#/projects?q=moodcurve', '_self')} />
          <ProjectButton icon={assets["../assets/home/logo-egg.png"]} iconSize={100} label="Recipe Book" description="A recipe browser that displays information on many recipes." onClick={() => window.open('/#/projects?q=recipe-book', '_self')} />
          <ProjectButton icon={assets["../assets/home/pantry-guard-logo.png"]} iconSize={100} label="Pantry Guard" description="A mobile app to manage pantry inventory and reduce food waste." onClick={() => window.open('/#/projects?q=pantry-guard', '_self')} />
          <ProjectButton icon="/handpeace.svg" iconSize={100}label="Portfolio Website" description="My personal website showcasing my projects and skills. (You're viewing it right now!)" onClick={() => window.open('/#/projects?q=portfolio', '_self')} />
        </span>
      </div>
      <div id="about" className="sectionA">
        <h1>About Me</h1>
        <p style={{whiteSpace: 'pre-wrap'}}>
          Hi! I'm Ryan Chan. {'\n'}
          I graduated cum laude (3.71 GPA) from the University of Texas Permian Basin with a BS in Computer Science while minoring in Mathematics. {'\n'}
          I'm a software developer with a passion for creating innovative solutions and learning new technologies.{'\n'} 
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
