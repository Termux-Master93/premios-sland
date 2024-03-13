import { useEffect, useState } from "preact/hooks"
import candidatesByCategory from "@/data/editions-vote.json"

import type { Votes } from "@/types/votes"
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
const MAX_VOTES_PER_CATEGORY = 4

export const UseVoteSystem=()=>{
    const [pageInfo, setPageInfo] = useState<PageInfo>();
    const [categoryCode, setCategoryCode] = useState(0)
    const [votes, setVotes] = useState<Votes>(
        Array.from({length: MAX_CATEGORIES}, () => [])
    );
    useEffect(()=>{
        let item =  localStorage.getItem("votes");
        let initialVotes
        if(item != null) {
            initialVotes = JSON.parse(item);
        }else{
            initialVotes = Array.from({length: MAX_CATEGORIES}, ()=> []);
        }
        setVotes(initialVotes)
    },[]);

    useEffect(()=>{
        localStorage.setItem("votes", JSON.stringify(votes))
    },[votes]);

    const [isChanging, setIsChanging] = useState(false);
    useEffect(() => {
        setIsChanging(true);
        setPageInfo(candidatesByCategory[categoryCode]);
        setTimeout(() => setIsChanging(false), 500);
      }, [categoryCode]);
    const setPrevCategory = () =>{
        const prevCategory = categoryCode > 0 ? categoryCode -1 :MAX_CATEGORIES -1
        setCategoryCode(prevCategory)
    };

    const setNextCategory = ()=>{
        const nextCategory = categoryCode + 1;
        if(nextCategory === MAX_CATEGORIES){
            const missingVotes = votes.find(
                (votescategory) => votescategory.length < MAX_VOTES_PER_CATEGORY
            );
            if(missingVotes){
                alert("Debes votar 4 candidatos por categoria");
                return;
            }
        }
       setCategoryCode(nextCategory)
    }

    const setVotesCategory= ({candidate}:{candidate: string}) => {
        const votesCategory = votes[categoryCode];

        if(votesCategory.includes(candidate)){
            const newVotes = votesCategory.filter((vote) => vote !== candidate)
            setVotes((prevVotes)=> prevVotes.with(categoryCode, newVotes));
            return;
        }

        if(votesCategory.length >= 4) return;

        const newVotes = [...votesCategory, candidate];
        setVotes((prevVotes)=> prevVotes.with(categoryCode, newVotes));
    }
    return {
        candidatesByCategory,
        categoryCode,
        pageInfo,
        votes,
        isChanging,
        votesCategory: votes[categoryCode],
        setPrevCategory,
        setNextCategory,
        setCategoryCode,
        setVotesCategory,
        MAX_CATEGORIES,
        MAX_VOTES_PER_CATEGORY
    }

}