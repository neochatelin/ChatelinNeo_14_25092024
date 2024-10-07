import { useContext } from "react";
import { Context } from "../App";

function Liste() {
    const [list, setList] = useContext(Context);
    console.log(list);
    
    return(
        <div>
            <h1>Current Employees</h1>
        </div>
    )
}

export default Liste;