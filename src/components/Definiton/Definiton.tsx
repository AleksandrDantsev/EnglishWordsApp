import React, { Fragment, useMemo, memo } from "react";
import st from "./Definiton.module.scss";

interface CheckInputData {
    typeDef: string;
    data: any;
    typeSearch: string;
    loadingAnimation?: boolean;
}

type Meanings = {
    partOfSpeech: string;
    definitions: [];
    synonyms?: [];
    antonyms?: [];
}

type DefinitionType = {
    definition: string;
    example: string;
    [key: string]: string;
}


const Definiton:React.FC<CheckInputData> = memo((props) => {
    console.log(props)
    const filterData = useMemo(() => props.data.meanings?.find((obj: Meanings) => obj["partOfSpeech"] == props.typeDef), [props.data, props.typeDef]);
    console.log(filterData)
    return( 
        <Fragment>  
            {
                filterData?.definitions.find((el: DefinitionType) => el[props.typeSearch]) && 
                <div className={props.loadingAnimation ? st.definiton : st.definiton + ' ' + st.animationShiftloaded}>
                <h3 className={st.titleGrammar}>{props.typeDef}</h3>
                <ol className={st.rowDef}>
                    {filterData?.definitions.filter((item: DefinitionType) => item[props.typeSearch]).map((el: any) => <li key={el[props.typeSearch]}>{el[props.typeSearch]}</li>)}
                </ol>
                </div>
            }
        </Fragment>  
        );
})


export default Definiton;