import { useState } from "react";

let CustomForm = ({...props})=>{
    let [formulairError, setFormulairError] = useState();
    let formulairOut = {};
    let formulairErrorTemplate = {};
    let formulair = props.obj;

    props.obj.inputs.forEach((e)=>{
        formulairOut[e.name] = '';
        formulairErrorTemplate[e.name] = false;
    })

    let subFunction = props.sub;
    
    let cheackingError = ()=>{
        setFormulairError(formulairErrorTemplate);
        let error = false;
        let formulairErrorTemp = formulairErrorTemplate;
        formulair.inputs.forEach(e => {
            if (e.error) {
                if(!formulairOut[e.name].match(e.error[0])){          
                    formulairErrorTemp[e.name] = true;
                    error = true
                    setFormulairError(formulairErrorTemp);
                }
            }
        });
        
        return error
    }

    let submitFunction = (data)=>{        
        console.log(data);
        
        let gotError = cheackingError();
        if (!gotError) {
            subFunction(data)
        }
    }
    let Input = ({...props})=>{
        const data = props.data[0];
        const dataSelect = props.data[1];
        
        let element = <></>;

        switch (data.type) {
            case "select":
                element =
                    <select onChange={(e)=>{props.out[data.name] = e.target.value}}>
                        {dataSelect[data.name].map((e)=>{
                            return <option key={e.value} value={e.value}>{e.name}</option>
                        })}
                    </select>
                break;
            case "hide":
                    element = <><input type="text" disabled className="disabled"/></>
                break;
            default:
                    element = <input name={data.name} placeholder={data.placeholder} type={data.type} defaultValue={data.value?data.value:''} onChange={(e)=>{props.out[data.name] = e.target.value}}/>
                break;
        }
            
        return (<>
            <div className="input_wrapp">
                {data.label?<><label>{data.label}</label><br/></>:<></>}
                {element}
                {data.error?<p className={`errorMsg ${formulairError?formulairError[data.name]?'':'hide':'hide'}`}>{data.error[1]}</p>:''}
            </div>
        </>)
    }
    
    return(
        <form className={"flex_"+formulair.direction}>{
            formulair.inputs.map((e)=>{                                  
                return (<Input key={e.name} data={[e, props.data]} out={formulairOut} error={false}/>)})
            }
            <input className="submit_input" type="button" defaultValue={formulair.submit.value} onClick={()=>submitFunction(formulairOut)}/>
        </form>)
}

export {CustomForm}