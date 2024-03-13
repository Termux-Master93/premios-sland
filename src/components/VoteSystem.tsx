import { UseVoteSystem } from "@/hooks/UseVoteSystem"
import type { FunctionComponent } from 'preact';
import { getI18n } from "@/i18n";
import { useEffect, useRef } from "preact/hooks"
import { VoteFnal } from "./VoteFinal";


export const VoteSystem: FunctionComponent<{ currentLocale?: string }> = ({
    children,
    currentLocale = 'es',
}) => {
    const i18n = getI18n({ currentLocale });
    const containerRef = useRef<HTMLUListElement>(null);
    const {
        candidatesByCategory,
        categoryCode,
        pageInfo,
        votes,
        isChanging,
        votesCategory,
        setPrevCategory,
        setNextCategory,
        setCategoryCode,
        setVotesCategory,
        MAX_CATEGORIES,
        MAX_VOTES_PER_CATEGORY
    } = UseVoteSystem()




    const { categoryName = '', candidates } = pageInfo ?? {}
    console.log(candidates)
    useEffect(() => {
        window.addEventListener('resize', removeMinHeigh);

        return () => {
            window.removeEventListener('resize', removeMinHeigh)
        }
    }, [])
    const removeMinHeigh = () => {
        if (containerRef.current) containerRef.current.style.minHeight = '';
    }

    const addMinheight = () => {
        if (containerRef.current) containerRef.current.style.minHeight = `${containerRef.current.offsetHeight}px`;
    }

    const nextCategoryHandler = () => {
        addMinheight();
        setNextCategory();
    }

    const previousCategoryHandler = () => {
        addMinheight();
        setPrevCategory();
    }

    if (categoryCode === MAX_CATEGORIES) {
        return (
            <VoteFnal
                candidates={candidatesByCategory}
                votes={votes}
                setCategory={setCategoryCode}
                categoryNames={candidatesByCategory.map(
                    ({ categoryName }) => categoryName
                )}
            />
        )
    }

    return (
        <div class="mx-auto flex flex-col max-w-7xl pt-40 ">
            <h1 class="relative [font-weight:100] m-auto mb-10 tracking-[1px] font-tomaso text-xl sm:text-3xl max-w-full sm:max-w-xl text-center leading-snug flex justify-center items-center h-80 text-white"><svg viewBox="0 0 90.35 240.43" class="h-60 w-24 fill-current translate-x-9 sm:translate-x-0 transition duration-500"><path d="m142.7 234.66-52.79 7.45L142.7 39.4 52.35 279.83z" transform="translate(-52.35 -39.4)"></path></svg><div class="flex justify-center items-center flex-col gap-y-4 w-72 px-10"><svg viewBox="0 0 16.04 62.55" class="absolute scale-100 -translate-y-28 h-14 fill-current transition duration-500"><path d="m300 38.16-8.02 46.7 8.02 15.85 8.02-15.85z" transform="translate(-291.98 -38.16)"></path></svg><span class="visible opacity-100 delay-75 transition duration-300">CLIP DEL AÑO</span></div><svg viewBox="0 0 90.35 240.43" class="h-60 w-24 fill-current -translate-x-9 sm:translate-x-0 transition duration-500"><path d="m457.3 234.66 52.79 7.45L457.3 39.4l90.35 240.43z" transform="translate(-457.3 -39.4)"></path></svg></h1>
            <CategoyTitle isChanging={isChanging}>
                {children}
            </CategoyTitle>
            <div
                class="font-semibold flex justify-center items-center gap-x-2 px-2 rounded py-3 -mt-24 mb-10 text-yellow-300 text-xl">
                Votos Realizados 
                <span class="text-3xl">
                   {votesCategory.length}/{MAX_VOTES_PER_CATEGORY}
                </span>
            </div>
            <ul
                ref={containerRef}
                class="mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-2 px-2 
                xl:px-0">
                {
                    
                    candidates?.map((candidate, index) => {
                        const { link, image, name, id } = candidate;
                        
                        const voteIndex = votesCategory.indexOf(id);
                        const isVoted = voteIndex >= 0
                        const delay = `animation-delay: ${index * 100}ms`;
                        return (
                            <li
                                key={`${categoryCode}-${name}`}
                                className={` relative rounded-lg animate-fade-up `}
                                style={delay}
                            >
                                {
                                    link && (
                                        <a
                                            class="youtube-link text-xs peer:hover:opacity-0 size-6 flex justify-center items-center right-2 top-2 absolute transition bg-white hover:bg-black hover:text-white backdrop-blur-xl text-black z-10 rounded-full hover:scale-125"
                                            href={link}
                                            target="_blank"
                                            rel="noopener"
                                        ><CameraIcon/></a>
                                    )
                                }

                                <button
                                    class={`shadow-sm shadow-black/20 z-0 group relative 
                                            w-full flex flex-col gap-2 justify-center items-center
                                            transition-all p-1 rounded md:hover:scale-105 
                                            ${isVoted ? 'bg-yellow-500' : 'bg-blue-900 hover:bg-sky-500 '}`}
                                    onClick={() => setVotesCategory({ candidate: id })}
                                >
                                    {
                                        voteIndex >= 0 && (
                                            <span
                                                class="text-white bg-yellow-500 size-6 flex justify-center items-center font-bold aspect-square z-10 absolute top-2 left-2 rounded-full">
                                                {voteIndex + 1 }
                                            </span>
                                        )
                                    }
                                    <img src={`voting-assets/${image}`} alt={candidate.name} />
                                    <h2
                                        class="font-semibold text-xs"
                                    >{name}</h2>
                                </button>
                            </li>

                        )
                    })
                }
            </ul>
            <footer className="flex justify-center items-center mt-4">
               
                <div className={"flex justify-center items-center gap-x-4 bg-black/50 backdrop-blur-lg px-4 rounded py-2"}>
                    <button
                        className={"rounded border border-white hover:border-transparent hover:bg-white hover:text-sky-800 p-2 transition"}
                        onClick={previousCategoryHandler}
                    >
                        <Arrow
                        />
                    </button>
                    <span class="text-lg font-semibold">
                        Categoría <span class="text-2xl">{categoryCode + 1}/ {MAX_CATEGORIES}</span>
                    </span>
                    <button
                        className={"rounded border border-white hover:border-transparent hover:bg-white hover:text-sky-800 p-2 transition"}
                        onClick={nextCategoryHandler}
                    >
                        <Arrow rotated />
                    </button>
                </div>
            </footer>
        </div>
    )
}


const CameraIcon = () => (
	<svg width='16' height='16' fill='none' viewBox='0 0 24 24'>
		<path
			stroke='currentColor'
			stroke-linecap='round'
			stroke-linejoin='round'
			d='M17.3213 14.501c-.3204-.1755-.5195-.5117-.5195-.877v-3.2467c0-.3653.1991-.70155.5195-.87706l3.6075-1.9761c.6664-.36506 1.4804.11718 1.4804.87703v7.19893c0 .7598-.814 1.2421-1.4804.877l-3.6075-1.9761ZM8.43066 8.53223h4.12974v4.12967M5.91504 15.1943 12.438 8.67136'
		/>
		<path
			stroke='currentColor'
			stroke-linecap='round'
			stroke-linejoin='round'
			d='M3.59082 19.499c-1.10457 0-2-.8954-2-2V6.50193c0-1.10457.89543-2 2-2H14.8013c1.1045 0 2 .89543 2 2V17.499c0 1.1046-.8955 2-2 2H3.59082Z'
		/>
	</svg>
);
function CategoyTitle({ children, isChanging }: { children?: string; isChanging?: boolean }) {
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