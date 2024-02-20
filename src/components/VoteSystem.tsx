import { useEffect, useState } from "preact/hooks"

interface PageInfo {
    categoryName: string,
    candidates: Candidates[]
}

interface Candidates {
    id: number,
    name: string,
    image: string,
    link?: string
}
export function VoteSystem() {
    const category=1
    const [pageInfo, setPageInfo] = useState<PageInfo>()
    useEffect(()=>{
        async function fetchCandidates() {
            try{
            const response = await fetch(`api/candidates.json?category=${category}`)
            if(!response.ok){
                throw new Error('Failed to fetch candidates')
            }
            const data = await response.json()
            setPageInfo(data)
        }catch(error){
            throw new Error('Failed to fetch candidates')
        }
        }
        fetchCandidates()
    },[])
    const { categoryName = '', candidates } = pageInfo ?? {}

    return (
        <div className="mx-auto flex flex-col max-w-7xl pt-40 ">
            <CategoyTitle>
                {categoryName}
            </CategoyTitle>
            <ul className="mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-2 px-2 
                xl:px-0">
                {
                    candidates?.map((candidate) =>{
                    return(
                        <li>
                            <img src={`voting-assets/${candidate.image}`} alt={candidate.name}/>
                            <p>{candidate.name}</p>
                        </li>

                    )})
                }
            </ul>
            <footer>
                Navegacion
            </footer>
        </div>
    )
}

function CategoyTitle({ children }: { children: string }) {
    return (
        <h1 
            className={"font-extralight m-auto mb-10 tracking-[1px] font-tomaso text-3xl max-w-xl flex justify-center items-center h-55"}>
            {children}
        </h1>
    )
}