import { TypeAnimation } from 'react-type-animation';
import '../css/home.css'
import Picture from '../components/picture';
import { BaselineEmail, GithubSolid, LinkedinRect } from '../components/svg';
import ProjectButton from '../components/projectButton';
import { useCallback, useEffect, useLayoutEffect } from 'react';
import AnimatedBackground from '../components/AnimatedBackground';
import Reveal from '../components/Reveal';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useReducedMotion } from 'framer-motion';

import musicNoteUrl from '../assets/home/music-note.svg?url';
import logoEggUrl from '../assets/home/logo-egg.png?url';
import pantryGuardLogoUrl from '../assets/home/pantry-guard-logo.png?url';
import graduateAvifUrl from '../assets/home/graduate.avif?url';
import graduateWebpUrl from '../assets/home/graduate.webp?url';
import vietnamAvifUrl from '../assets/home/vietnam.avif?url';
import vietnamWebpUrl from '../assets/home/vietnam.webp?url';

export function HomePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();

  const getSectionFromSearch = useCallback(() => {
    if (location.pathname !== '/') return null;
    const params = new URLSearchParams(location.search);
    return params.get('section');
  }, [location.pathname, location.search]);

  const scrollToSection = useCallback(
    (section: string, behaviorOverride?: ScrollBehavior) => {
      const behavior: ScrollBehavior = behaviorOverride ?? (reduceMotion ? 'auto' : 'smooth');

      // Always win against CSS `scroll-behavior: smooth` when we need determinism.
      const root = document.documentElement;
      const prev = root.style.scrollBehavior;
      if (behavior === 'auto') root.style.scrollBehavior = 'auto';

      if (section === 'top') {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        root.style.scrollBehavior = prev;
        return;
      }

      // The element may not exist yet due to route transitions/layout.
      // Retry a few frames; if we still can't find it, fail safely to top.
      let frames = 0;
      const maxFrames = 24;
      const attempt = () => {
        const el = document.getElementById(section);
        if (el) {
          el.scrollIntoView({ behavior, block: 'start' });
          root.style.scrollBehavior = prev;
          return;
        }
        frames += 1;
        if (frames >= maxFrames) {
          window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
          root.style.scrollBehavior = prev;
          return;
        }
        requestAnimationFrame(attempt);
      };

      attempt();
    },
    [reduceMotion]
  );

  // Handles both same-page and cross-page section navigation.
  const onSectionLinkClick = useCallback(
    (section: string) => (e: React.MouseEvent) => {
      const currentSection = getSectionFromSearch();

      // If we're already on Home, do not rely on router timing; scroll immediately.
      if (location.pathname === '/') {
        e.preventDefault();

        // Keep the URL in sync with intent, but don't add history spam for repeated clicks.
        const next = `/?section=${encodeURIComponent(section)}`;
        if (currentSection !== section) {
          navigate(next);
        }

        // Smooth for in-page clicks (unless reduced motion).
        scrollToSection(section);
        return;
      }
    },
    [getSectionFromSearch, location.pathname, navigate, scrollToSection]
  );

  useEffect(() => {
    document.body.classList.remove('page-projects');
    document.body.classList.add('page-home');

    return () => {
      document.body.classList.remove('page-home');
    };
  }, []);

  // On navigation to /?section=..., scroll deterministically.
  // Use auto here to avoid race conditions with route transitions and to remove the "random" bottom/top behavior.
  useLayoutEffect(() => {
    const section = getSectionFromSearch();
    if (!section) return;
    scrollToSection(section, 'auto');
  }, [getSectionFromSearch, scrollToSection]);

  return (
    <>
      <AnimatedBackground variant="home" />

      <nav className="site-nav">
        <div className="site-nav__inner">
          <Link
            className="brand"
            to="/?section=top"
            onClick={onSectionLinkClick('top')}
          >
            <span className="brand__dot" aria-hidden="true" />
            <span>Ryan Chan</span>
          </Link>
          <div className="nav-links">
            <Link className="nav-link" to="/?section=projects" onClick={onSectionLinkClick('projects')}>Projects</Link>
            <Link className="nav-link" to="/?section=about" onClick={onSectionLinkClick('about')}>About</Link>
            <Link className="nav-link nav-link--accent" to="/?section=contact" onClick={onSectionLinkClick('contact')}>Contact</Link>
          </div>
        </div>
      </nav>

      <div className="page">
        <section className="home-hero">
          <div className="container hero-grid">
            <Reveal className="avatar-card" delay={0.05}>
              <img src={'/ryanchan.png'} id="profile-pic" alt="Profile Picture" decoding="async" />
              <div className="avatar-meta">
                <span className="pill mono">BS Computer Science • Math minor</span>
                <span className="pill mono">React • TypeScript • Node</span>
              </div>
            </Reveal>

            <div id="top">
              <TypeAnimation
                sequence={['Hello World!', 1200, 'I build clean, reliable software.', 1200, 'Welcome to my portfolio.', 1200]}
                wrapper="p"
                className="type-line"
                cursor={true}
                repeat={0}
                speed={36}
              />

              <h1 className="hero-title">
                I'm <span className="gradient-text">Ryan Chan</span>.
              </h1>
              <p className="hero-subtitle">
                Software developer focused on building fast, polished user experiences and dependable backends.
                Here are a few projects I'm proud of.
              </p>

              <div className="cta-row">
                <Link className="btn btn-primary" to="/?section=projects" onClick={onSectionLinkClick('projects')}>
                  View projects <ArrowRight size={18} />
                </Link>
                <Link className="btn" to="/?section=contact" onClick={onSectionLinkClick('contact')}>
                  Get in touch <Mail size={18} />
                </Link>
              </div>

              <div className="social-row" aria-label="Social links">
                <a className="icon-btn" href="mailto:ryan.seth.chan@gmail.com" target="_blank" rel="noreferrer" aria-label="Email">
                  <Mail size={18} />
                </a>
                <a className="icon-btn" href="https://github.com/loopyOP" target="_blank" rel="noreferrer" aria-label="GitHub">
                  <Github size={18} />
                </a>
                <a
                  className="icon-btn"
                  href="https://www.linkedin.com/in/ryan-seth-chan/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="section sectionB">
          <div className="container">
            <div className="section__header">
              <h1 className="section__title">Projects</h1>
              <div className="section__kicker mono">Selected work • projects</div>
            </div>
            <Reveal mode="mount">
              <div className="projectDisplay">
                <ProjectButton
                  icon={musicNoteUrl}
                  iconSize={28}
                  label="MoodCurve"
                  description="Machine learning analysis of playlist flow and transitions."
                  onClick={() => navigate('/projects?q=moodcurve')}
                />
                <ProjectButton
                  icon={logoEggUrl}
                  iconSize={28}
                  label="Recipe Book"
                  description="Recipe browser powered by TheMealDB API, with accounts and comments."
                  onClick={() => navigate('/projects?q=recipe-book')}
                />
                <ProjectButton
                  icon={pantryGuardLogoUrl}
                  iconSize={28}
                  label="Pantry Guard"
                  description="Mobile app to track pantry inventory and reduce food waste."
                  onClick={() => navigate('/projects?q=pantry-guard')}
                />
                <ProjectButton
                  icon="/handpeace.svg"
                  iconSize={28}
                  label="Portfolio Website"
                  description="My personal website showcasing my projects and skills. (You are here!)"
                  onClick={() => navigate('/projects?q=portfolio')}
                />
              </div>
            </Reveal>
          </div>
        </section>

        <section id="about" className="section sectionA">
          <div className="container">
            <div className="section__header">
              <h1 className="section__title">About</h1>
              <div className="section__kicker mono">Background • strengths</div>
            </div>
            <Reveal>
              <p style={{ whiteSpace: 'pre-wrap' }}>
                Hi! I'm Ryan Chan. {'\n'}
                I graduated cum laude (3.71 GPA) from the University of Texas Permian Basin with a BS in Computer Science while minoring in Mathematics. {'\n'}
                I'm a software developer with a passion for creating innovative solutions and learning new technologies. {'\n'}
                In my free time, I enjoy coding, gaming, and exploring the latest advancements in tech.
              </p>
              <div className="divider" />
              <div className="photoDisplay" aria-label="Photos">
                <Picture
                  src={graduateWebpUrl}
                  sources={{ avif: graduateAvifUrl, webp: graduateWebpUrl }}
                  alt="Me at graduation"
                  loading="lazy"
                  decoding="async"
                />
                <Picture
                  src={vietnamWebpUrl}
                  sources={{ avif: vietnamAvifUrl, webp: vietnamWebpUrl }}
                  alt="Me on vacation"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </Reveal>
          </div>
        </section>

        <section id="contact" className="section sectionB">
          <div className="container">
            <div className="section__header">
              <h1 className="section__title">Contact</h1>
              <div className="section__kicker mono">Let's build something</div>
            </div>

            <Reveal>
              <div className="contact-grid">
                <div className="contact-card">
                  <div className="label">
                    <BaselineEmail /> Email
                  </div>
                  <div className="value">
                    <a href="mailto:ryan.seth.chan@gmail.com" target="_blank" rel="noreferrer">ryan.seth.chan@gmail.com</a>
                  </div>
                </div>
                <div className="contact-card">
                  <div className="label">
                    <LinkedinRect /> LinkedIn
                  </div>
                  <div className="value">
                    <a href="https://www.linkedin.com/in/ryan-seth-chan/" target="_blank" rel="noreferrer">
                      ryan-seth-chan
                    </a>
                  </div>
                </div>
                <div className="contact-card">
                  <div className="label">
                    <GithubSolid /> GitHub
                  </div>
                  <div className="value">
                    <a href="https://github.com/loopyOP" target="_blank" rel="noreferrer">
                      loopyOP
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  )
}
