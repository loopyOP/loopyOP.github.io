//@ts-nocheck
import '../css/projects.css'
import { useSearchParams } from "react-router-dom"
import { data, getImagesFromFolder } from "../projectData"
import { HashLink } from 'react-router-hash-link';
import Picture from '../components/picture';
import { useEffect } from 'react';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { GithubSolid, Web } from '../components/svg';

function DisplayProject(){
    const [searchParams, setSearchParams] = useSearchParams();
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
            <div className='section'>
                <h1>{query.name}</h1>
                <h2>Images: <span>(click to open images)</span></h2>
                <div className='project-images'>
                    {images.map((imgSrc, index) => <Zoom classDialog='custom-zoom'>
                        <Picture className="image" stretch = {true} src={imgSrc} alt={`Project ${query.name} image ${index + 1}`} key={index} />
                        </Zoom>)}
                </div>
                {query.links && <h2>Links:</h2>}
                {query.links && <ul>
                    {query.links.GitHub && <li><GithubSolid /> <a href={query.links.GitHub} target="_blank">GitHub Repository</a></li>}
                    {query.links.Live && <li><Web /> <a href={query.links.Live} target="_blank">Live Demo</a></li>}
                </ul>}
                <h2>Description:</h2>
                <p style={{whiteSpace: 'pre-wrap'}}>{query.description}</p>
            </div>
        </>
    )
}

export function ProjectPage(){
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return(
        <>
            <nav>
                <HashLink id = "back-link" to="/#projects"> {'<<'} Go Back</HashLink>
                <p>Projects</p>
            </nav>
            <DisplayProject/>
        </>
    )
}