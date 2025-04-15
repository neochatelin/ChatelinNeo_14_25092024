import {CustomForm} from "../component/InputCustom";
import "./style/style.scss"
import { useEffect, useState } from "react";
import Stepper from "../component/Stepper";
import { api } from "../service/api";
import { useDispatch } from "react-redux";
import { addEmployee } from "../service/store";

function Form(props) {
    const [selectStates, setSelectStates] = useState();
    const [selectDepartements, setSelectDepartements] = useState();
    const [formObj, setFormObj] = useState();

    const [step, setStep] = useState(0);
    const dispatch = useDispatch();

    const [elem, cetelem] = useState([]);

    useEffect(()=>{
        api.getStates(setSelectStates)
        api.getDepartements(setSelectDepartements)
        api.getForm(setFormObj)
    }, [])

    const mergingData = (data)=>{
        let tempObj = {};
        data.forEach((obj)=>{
            for (var key in obj){
                var value = obj[key];
                tempObj[key] = value;
            }
        })
        return tempObj;
    }

    const saving = ()=>{
        dispatch(addEmployee(mergingData(elem)));
    }

    const isLoaded = ()=>{
        if (selectStates && selectDepartements && formObj) {
            return (<div className="flex">
                    <div className={`step ${step===0?"":"animHide hide"}`}>
                        <p className="subTitle">Personal info</p>
                        <CustomForm obj={formObj.form1} sub={(data)=>{let temp = elem; temp.push(data); cetelem(temp); setStep(step + 1);}}/>
                    </div>
                    <div className={`step ${step===1?"animShow":step===2?"animHide hide":"hide"}`}>
                        <p className="subTitle">Address</p>
                        <CustomForm data={{state:selectStates, department:selectDepartements}} obj={formObj.form2} sub={(data)=>{let temp = elem; temp.push(data); cetelem(temp); setStep(step + 1);}}/>
                    </div>
                    <div className={`step ${step===2?"animShow":"hide"}`}>
                        <p className="subTitle">Start Date</p>
                        <CustomForm obj={formObj.form3} sub={(data)=>{let temp = elem; temp.push(data); cetelem(temp); setStep(step + 1); saving();setTimeout(()=>{setStep(0); props.closeModal()}, 3000);}}/>
                    </div>
                </div>)
        }
    }

    return(
        <div id="Home" className={step === 3 ? "created":''}>
            <h2>Create Employee</h2>
            <Stepper step={3} index={step}/>
            <div id="form">
                {isLoaded()}
            </div>
            <div className={step === 3 ? "createdScreen":'hide'}>
                <div className="logo"></div>
                <h2>Employee Added</h2>
            </div>
        </div>
    )
}


export default Form;