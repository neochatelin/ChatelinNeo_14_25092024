import { useEffect, useState } from "react";

const Modal = (props)=>{

    let [isCreated, setIsCreated] = useState(false);
    let [Element, setElement] = useState(<props.element end={setIsCreated}/>);

    let isOpen = props.isOpen;
    let setIsOpen = props.setIsOpen;

    useEffect(()=>{
        if(isCreated){
            console.log('test');
            setIsOpen(false)
            setElement(<props.element end={setIsCreated}/>);
        }
    }, [isCreated])

    return (
    <div className={isOpen?"Modal":"hide"}>
        <div className={isOpen?"blur_filter":""} onClick={()=>{setIsOpen(false);isCreated?setElement(<></>):setIsOpen(false)}}></div>
        <div className="modalWrap">
            <div className="modalBox">
                {Element}
            </div>
        </div>
    </div>);
}
export default Modal;