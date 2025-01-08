import { useEffect, useRef, useState } from "react";

const HeadInput = (props)=>{
    const refElem = useRef(null);
    const [styleLabel, setStyleLabel] = useState(props.value!=="" &&props.value?"focusedLabel":"hide");
    
    let listElem = props.listElem;
    let nameElem = props.name;
    let value = props.value;

    let filtering = props.filtering;

    const blurFunc = (e)=>{
        if (e.target.value === "")
            setStyleLabel("hide");
        else
            setStyleLabel("focusedLabel");
        if(value !== e.target.value)
            filtering({[listElem]: e.target.value});
    }
    
    return(
        <div className="headInputWrap">
            <p htmlFor={listElem} className={styleLabel}>{nameElem}</p>
            <input name={listElem} type="text" className="headerInput" placeholder={nameElem} onFocus={(e)=>{e.target.value === ""?setStyleLabel("focusedLabel labelAnimation"):setStyleLabel("focusedLabel")}} onBlur={(e)=>{blurFunc(e)}} defaultValue={value?value:""} ref={refElem}></input>
        </div>
    )
}

export default HeadInput;