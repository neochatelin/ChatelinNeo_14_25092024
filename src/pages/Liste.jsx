import { useContext, useEffect, useState } from "react";
import { Context } from "../App";
import ListingTable from "../component/liste/ListingTable";
import matchingTable from "../config/matchingTable.json"
import mockTable from "../config/MOCK_DATA.json"
import Modal from "../component/Modal";
import Form from "./Form";

function Liste() {
    const [list, setList] = useContext(Context);
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
                <img src="./logo.png" alt="logo"/>
                <button onClick={()=>OpenModal()}>Add Employees</button>
            </nav>
            <h1>Current Employees</h1>
            {
                matchingTable?
                    <ListingTable list={list} matchingTable={matchingTable}/>:
                    <h2>is Loading</h2>
            }
            <Modal element={Form} isOpen={modalIsOpen} setIsOpen={setModalIsOpen}/>
        </div>
    )
}

export default Liste;