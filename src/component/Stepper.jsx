import React from "react";

const Stepper = (props)=>{
    return (
        <div id={"stepper"}>
            <div className={`boule ${props.index+1 === 1?"blue":props.index+1 > 1?"green":"grey"}`}></div>
            {
                Array.from({length: props.step-1}, (_, index) => {
                    if(props.step === props.index){return <></>}
                    return <React.Fragment key={index}>
                            <div className={`barre ${props.index+1 >= index+2?"blue barreBleu":"grey"} ${index}`}></div>
                            <div className={`boule ${props.index+1 === index+2?"blue blueAnim":props.index+1 > index+2?"green":"grey"}`}></div>
                        </React.Fragment>;
                  })
            }
        </div>
    )
}

export default Stepper;