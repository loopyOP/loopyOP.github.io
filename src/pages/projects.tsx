import { useSearchParams } from "react-router-dom"
import { data } from "../projectData"

export function ProjectPage(){
    const [searchParams, setSearchParams] = useSearchParams();
    const queryParam = searchParams.get("q") ?? "";
    if(!queryParam){
        return(
            <>
                <p>No project specified.</p>
            </>
        )
    }
    const query = data.get(queryParam)?.name || "";
    if(!query){
        return(
            <>
                <p>Project not found.</p>
            </>
        )
    }
    return(
        <>
            <p>Project: {query}</p>
        </>
    )
}