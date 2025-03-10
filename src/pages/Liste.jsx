import { useContext, useEffect, useState } from "react";
import { Context } from "../App";
import ListingTable from "../component/liste/ListingTable";
import matchingTable from "../config/matchingTable.json"
import mockTable from "../config/MOCK_DATA.json"
import Form from "./Form";
import { Modal } from "modal_oc_project_14_nc";

function Liste() {
    const [list, setList] = useContext(Context);
    const [mock, setMock] = useState(false);
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
                    <ListingTable list={list} matchingTable={matchingTable}/>:
                    <h2>is Loading</h2>
            }
            
            <Modal element={<Form/>} state={[modalIsOpen, setModalIsOpen]}/>
        </div>
    )
}

export default Liste;