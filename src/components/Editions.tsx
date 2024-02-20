import { useState } from "preact/hooks";
import Gallery from "./Gallery";
import editions from "../data/editions-info.json";
import styles from "./styles/Editions.module.css";
export default function Editions({i18n}:{i18n:any}) {
    const [edicion, setEdition] = useState("1");
    return (
        <>
            <div className="flex h-24 mt-4">
                {
                    editions.map(({ edition, name }) => {
                        return (
                            <button
                               
                                className={
                                    `flex-1 rounded-t-2xl transition-colors text-white text-xl font-bold 
                                     ${styles.tab} ${edicion==edition?"z/10":"bg-[#b7bfea] hover:bg-[#1b2663]"}`
                                    }
                                    onClick={()=>setEdition(edition)}
                            >
                                {name}
                            </button>
                        )
                    })
                }

            </div>
            
            <Gallery i18n={i18n} edicion={edicion}/>
            
        </>
    )
}