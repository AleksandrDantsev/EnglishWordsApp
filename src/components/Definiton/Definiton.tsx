import React, { Fragment, useMemo, memo } from "react";
import st from "./Definiton.module.scss";

interface CheckInputData {
    typeDef: string;
    data: any;
    typeSearch: string;
}

type Meanings = {
    partOfSpeech: string;
    definitions: [];
    synonyms?: [];
    antonyms?: [];
}

type definition = {
    definition: string;
    example: string;
    [key: string]: string;
}


const Definiton:React.FC<CheckInputData> = memo((props) => {
    const filterData = useMemo(() => props.data.meanings?.find((obj: Meanings) => obj["partOfSpeech"] == props.typeDef), [props.data]);
    console.log(filterData)
    return( 
        <Fragment>  
            {
                filterData?.definitions.find((el: definition) => el[props.typeSearch]) && 
                <div className={st.definiton}>
                <h3 className={st.titleGrammar}>{props.typeDef}</h3>
                <ol className={st.rowDef}>
                    {filterData?.definitions.filter((item: definition) => item[props.typeSearch]).map((el: any) => <li key={el[props.typeSearch]}>{el[props.typeSearch]}</li>)}
                </ol>
                </div>
            }
        </Fragment>  
        );
})


export default Definiton;