import { useEffect, useRef, useState } from "react";

const HeadInput = (props)=>{
    const refElem = useRef(null);
    const [styleLabel, setStyleLabel] = useState(props.value!=="" &&props.value?"focusedLabel":"hide");
    
    let listElem = props.listElem;
    let nameElem = props.name;
    let value = props.value;

    let filtering = props.filtering;
    
    return(
        <>
            <p htmlFor={listElem} className={styleLabel}>{nameElem}</p>
            <input name={listElem} type="text" className="headerInput" placeholder={nameElem} onFocus={()=>{setStyleLabel("focusedLabel")}} onBlur={(e)=>{e.target.value === "" ? setStyleLabel("hide"): setStyleLabel("focusedLabel");filtering({[listElem]: e.target.value})}} defaultValue={value} ref={refElem}></input>
        </>
    )
}

export default HeadInput;