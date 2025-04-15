import { useEffect, useState } from "react";
import HeadInput from "./HeadInput";
import { useSelector } from "react-redux";

const ListingTable = ({...props})=>{
    let [pagination, setPagination] = useState(10);
    let [page, setPage] = useState(1);

    const list = useSelector(state => state.employee);
    let listData = [];
    let matchingTable = props.matchingTable;

    let [update, setUpdate] = useState(0);
    let [filtredData, SetFiltredData] = useState(useSelector(state => state.employee));    
    let [filter, SetFilter] = useState({});

    useEffect(()=>{
        SetFiltredData(list)
    }, [list])

    useEffect(()=>{
        
    }, [filtredData, update]);
    let filtering = ()=>{

        let temp;
        let selectedItems = [];

        if (Object.keys(matchingTable).length !== Object.keys(filter).length) {
            temp = {};
            Object.keys(matchingTable).forEach((key)=>{
                if(!filter[key]){
                    temp[key] = "";
                }
            })
        }
        
        list.forEach((value, index)=>{
            let keep = true;
            Object.keys(filter).forEach((field)=>{
                if(filter[field] !== ""){
                    const reg = new RegExp(filter[field].toLowerCase());

                    if(value[field].toLowerCase().search(reg) === -1){
                        keep = false;
                    }
                }
            })
            if(keep){
                selectedItems.push(value);
            }
        })

        SetFiltredData(selectedItems);
        setPage(1)
        setUpdate(update+1);
        if (temp) 
            SetFilter(Object.assign(filter, temp));
    }

    let sortingData = (feld, direction = 'asc')=>{        
        let temp = JSON.parse(JSON.stringify(filtredData));
        temp.sort((a, b)=>{
            return ('' + a[feld]).localeCompare(b[feld]);
        })
        if (direction === "desc") {
            temp.reverse();
        }
        SetFiltredData(temp);
        setUpdate(update+1)
    }

    let pageMax = (paginationV = pagination)=>{
        return (filtredData.length/paginationV>parseInt(filtredData.length/paginationV)?parseInt(filtredData.length/paginationV)+1:parseInt(filtredData.length/paginationV));
    }

    let Header = ()=>{
        let Listing = ()=>{
            let headList = [];
            listData = [];
            Object.keys(matchingTable).forEach((key, index)=>{
                headList.push(matchingTable[key]);
                listData.push(key);
            })
            return headList.map((e, index)=>
                <div className="th" key={listData[index]} >
                    <div>
                        <HeadInput name={e} listElem={listData[index]} value={filter[listData[index]]} filtering={(source)=>{SetFilter(Object.assign(filter, source));filtering();}}/>
                        <div className="sortingButton">
                            <button onClick={()=>sortingData(listData[index], 'asc')}>{"<"}</button>
                            <button onClick={()=>sortingData(listData[index], 'desc')}>{">"}</button>
                        </div>
                    </div>
                </div>
            );
        }
        return (
        <div className="thead">
            <div className="tr">
                <Listing/>
            </div>
        </div>)
    }

    let Body = ()=>{
        let AddRow = ({data})=>{
            let Listing = ()=>{
                return listData.map((value, index)=>{
                    return <div className={index === 0 ? "td firstItem" : "td"} key={index}><p>{data[value]?data[value]:"N/A"}</p></div>
                })
            }
            return <div className="tr"><Listing/></div>
        }
        let tempList = [];
        for (let index = 0; index < pagination; index++) {
            const element = ((page-1)*pagination)+index;
            if(filtredData[element]){tempList.push(filtredData[element])};
        }

        let bodyDisplay = ()=>{
            if (tempList.length > 0)
                return tempList.map((obj, index)=>{return <AddRow key={index}  data={obj}></AddRow>})
            else
                return <h3>No Result</h3>
            
        }

        return <div className="tbody">{bodyDisplay()}</div>
    }

    return (
        <> 
            <div className="table">
                <div className="param">
                    <div>
                        <p>Items per pages: </p>
                        <select value={pagination} name="pagination" id="pagination" onChange={(e)=>{setPagination(e.target.value);page > pageMax(e.target.value)?setPage(pageMax(e.target.value)):setPage(page)}}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                        </select>
                    </div>
                    <div className="pagesNav">
                        <button onClick={
                            ()=>{setPage(1)}
                            }>{"<<"}</button>
                            <button onClick={
                                ()=>{
                                    page > 1
                                        ?setPage(page-1)
                                        :setPage(1)
                                }
                                }>{"<"}</button>
                        <p>{page}</p>
                        <button onClick={
                            ()=>{
                                page < (filtredData.length / pagination)
                                    ?setPage(page+1)
                                    :setPage(pageMax());
                            }}>{">"}</button>
                            <button onClick={
                                ()=>{setPage(pageMax())}}>{">>"}</button>
                    </div>
                </div>
                <Header/>
                <Body/>
                <div className="param">
                    <div>
                        <p>Items per pages: </p>
                        <select value={pagination} name="pagination" id="pagination" onChange={(e)=>{setPagination(e.target.value);page > pageMax(e.target.value)?setPage(pageMax(e.target.value)):setPage(page)}}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                        </select>
                    </div>
                    <div className="pagesNav">
                        <button onClick={
                            ()=>{setPage(1)}
                            }>{"<<"}</button>
                            <button onClick={
                                ()=>{
                                    page > 1
                                        ?setPage(page-1)
                                        :setPage(1)
                                }
                                }>{"<"}</button>
                        <p>{page}</p>
                        <button onClick={
                            ()=>{
                                page < (filtredData.length / pagination)
                                    ?setPage(page+1)
                                    :setPage(pageMax());
                            }}>{">"}</button>
                            <button onClick={
                                ()=>{setPage(pageMax())}}>{">>"}</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ListingTable;