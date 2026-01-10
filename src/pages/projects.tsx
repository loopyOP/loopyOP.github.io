import '../css/projects.css'
import { useSearchParams } from "react-router-dom"
import { data, getImagesFromFolder } from "../projectData"
import { useEffect } from 'react';
import { GithubSolid, Web } from '../components/svg';
import AnimatedBackground from '../components/AnimatedBackground';
import Reveal from '../components/Reveal';
import ProjectGallery from '../components/ProjectGallery';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

function DisplayProject(){
    const [searchParams] = useSearchParams();
    const queryParam = searchParams.get("q") ?? "";
    if(!queryParam){
        return(
            <>
                <div className="notFound">
                    <h1>No project specified.</h1>
                </div>
            </>
        )
    }
    const query = data.get(queryParam) || "";
    if(!query){
        return(
            <>
                <div className="notFound">
                    <h1>Project not found.</h1>
                </div>
            </>
        )
    }
    const images = getImagesFromFolder(query.imagesFolder);
    return(
        <>
            <div className='projects-shell'>
                <div className="container">
                    <Reveal>
                        <div className="project-header">
                            <h1 className="gradient-text">{query.name}</h1>
                        </div>
                    </Reveal>

                    <Reveal delay={0.05}>
                        <div className="project-section-title">Images <span>(click image to zoom)</span></div>
                        <ProjectGallery images={images} altBase={`Project ${query.name} image`} />
                    </Reveal>

                    {(query.links?.GitHub || query.links?.Live) && (
                        <Reveal delay={0.08}>
                            <div className="project-section-title">Links</div>
                            <div className="project-links">
                                {query.links?.GitHub && (
                                    <a className="btn btn-primary" href={query.links.GitHub} target="_blank" rel="noreferrer">
                                        <GithubSolid /> GitHub <ArrowUpRight size={18} />
                                    </a>
                                )}
                                {query.links?.Live && (
                                    <a className="btn" href={query.links.Live} target="_blank" rel="noreferrer">
                                        <Web /> Live demo <ArrowUpRight size={18} />
                                    </a>
                                )}
                            </div>
                        </Reveal>
                    )}

                    <Reveal delay={0.1}>
                        <div className="project-section-title">Description</div>
                        <p className="project-description">{query.description}</p>
                    </Reveal>
                </div>
            </div>
        </>
    )
}

export function ProjectPage(){
    useEffect(() => {
        document.body.classList.remove('page-home');
        document.body.classList.add('page-projects');
        window.scrollTo(0, 0);

        return () => {
            document.body.classList.remove('page-projects');
        };
    }, []);
    return(
        <>
            <AnimatedBackground variant="projects" />

            <nav className="site-nav">
                <div className="site-nav__inner">
                    <Link
                        className="nav-link nav-link--accent"
                        id="back-link"
                        to="/?section=projects"
                    >
                        <ArrowLeft size={18} /> Back
                    </Link>
                    <div className="brand" aria-label="Projects">
                        <span className="brand__dot" aria-hidden="true" />
                        <span>Projects</span>
                    </div>
                    <Link className="nav-link" to="/">Home</Link>
                </div>
            </nav>
            <DisplayProject/>
        </>
    )
}