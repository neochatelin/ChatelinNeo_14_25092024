import { useCallback, useEffect, useState } from "react";
import ListingTable from "../component/liste/ListingTable";
import matchingTable from "../config/matchingTable.json"
import mockTable from "../config/MOCK_DATA.json"
import Form from "./Form";
import { Modal } from "modal_oc_project_14_nc";
import { useDispatch } from "react-redux";
import { set } from "../service/store";

function Liste() {
    const dispatch = useDispatch();
    const setList = useCallback((val) => dispatch(set(val)), [dispatch]);
    const [mock, setMock] = useState(true);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    
    useEffect(()=>{
        if (mock === true) {
            setList(mockTable);
            setMock(false);
        }
    }, [setMock, setList, mock])
    
    let OpenModal = ()=>{
        setModalIsOpen(!modalIsOpen)
    }
    
    return(
        <div id="Liste">
            <nav>
                <img src="./logo.png" alt="logo" width={100} height={115}/>
                <button onClick={()=>OpenModal()}>Add Employees</button>
            </nav>
            <h1>Current Employees</h1>
            {
                matchingTable?
                    <ListingTable matchingTable={matchingTable}/>:
                    <h2>is Loading</h2>
            }
            
            <Modal element={<Form/>} state={[modalIsOpen, setModalIsOpen]}/>
        </div>
    )
}

export default Liste;