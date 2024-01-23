import { useEffect } from "preact/hooks";
import { useProgressiveNumber } from "src/hooks/UseProgressiveNumber";

export const CountUp=(
    { initial, final,decimals, duration}:
    {initial:number, final: number, decimals?: number, duration?: number})=>{
    const [count, setCount]=useProgressiveNumber(initial, duration, decimals )

    useEffect(()=>{
        setCount(final)
    },[])
    return <span>{count}</span>
}