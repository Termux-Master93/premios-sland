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
const MAX_CATEGORIES = 12
export function VoteSystem() {
    const [pageInfo, setPageInfo] = useState<PageInfo>()
    const [category, setCategory] = useState(0)
    useEffect(() => {
        async function fetchCandidates() {
            try {
                const response = await fetch(`api/candidates.json?category=${category}`)
                if (!response.ok) {
                    throw new Error('Failed to fetch candidates')
                }
                const data = await response.json()
                setPageInfo(data)
            } catch (error) {
                throw new Error('Failed to fetch candidates')
            }
        }
        fetchCandidates()
    }, [category])

    const handleNaviagtion = (categoryIndex: number) => {
        if (categoryIndex < 0) categoryIndex = MAX_CATEGORIES - 1
        else if (categoryIndex > (MAX_CATEGORIES - 1)) categoryIndex = 0
        setCategory(categoryIndex)
    }
    const { categoryName = '', candidates } = pageInfo ?? {}

    return (
        <div class="mx-auto flex flex-col max-w-7xl pt-40 ">
            <CategoyTitle>
                {categoryName}
            </CategoyTitle>
            <ul class="mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-2 px-2 
                xl:px-0">
                {
                    candidates?.map((candidate) => {
                        return (
                            <li>
                                <img src={`voting-assets/${candidate.image}`} alt={candidate.name} />
                                <p>{candidate.name}</p>
                            </li>

                        )
                    })
                }
            </ul>
            <footer className="flex justify-center items-center mt-4">
                <div className={"flex justify-center items-center gap-x-4 bg-black/50 backdrop-blur-lg px-4 rounded py-2"}>
                <button
                    className={"rounded border border-white hover:border-transparent hover:bg-white hover:text-sky-800 p-2 transition"}
                    onClick={() => handleNaviagtion(category - 1)}
                >
                    <Arrow
                    />
                </button>
                <span class="text-lg font-semibold">
                    Categoría <span class="text-2xl">{category + 1}/ {MAX_CATEGORIES}</span>
                </span>
                <button
                    className={"rounded border border-white hover:border-transparent hover:bg-white hover:text-sky-800 p-2 transition"}
                    onClick={() => handleNaviagtion(category + 1)}
                >
                    <Arrow rotated />
                </button>
                </div>
            </footer>
        </div>
    )
}

function CategoyTitle({ children }: { children: string }) {
    return (
        <h1
            class={"font-extralight m-auto mb-10 tracking-[1px] font-tomaso text-3xl max-w-xl flex justify-center items-center h-55"}>
            {children}
        </h1>
    )
}
function Arrow({ rotated }: { rotated?: boolean }) {
    const className = rotated ? "-rotate-180" : ""
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class={"icon icon-tabler " + className}
            width="24" height="24" viewBox="0 0 24 24"
            stroke-width="1.5" stroke="currentColor"
            fill="none" stroke-linecap="round"
            stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M5 12l14 0" />
            <path d="M5 12l4 4" />
            <path d="M5 12l4 -4" />
        </svg>
    )
}