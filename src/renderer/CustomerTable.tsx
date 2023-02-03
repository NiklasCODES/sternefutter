import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import axios from "axios";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import SimpleAccordion from "./SimpleAccordion";
import ExpandableRow from "./ExpandableTableRow";
import ExpandableTableRow from "./ExpandableTableRow";
import ReactPaginate from 'react-paginate';


interface CustomerTablePropType {
   setEditModalVisible: Dispatch<SetStateAction<boolean>>;
   setDeleteModalVisible: Dispatch<SetStateAction<boolean>>;
   setSelectedCustomer: Dispatch<SetStateAction<string>>;
   setAddNoteModalVisible: Dispatch<SetStateAction<boolean>>;
   setAddPurchaseModalVisible: Dispatch<SetStateAction<boolean>>;
   setForceRender: Dispatch<SetStateAction<number>>;
   setDidSearch: Dispatch<SetStateAction<boolean>>;
   toggleButtonVisible: () => void;
   didSearch: boolean;
   forceRender: number;
   shouldSearch: number;
   nameToSearch: string;
};

//ipcRenderer.createCustomer("CREATE_CUSTOMER", "hallo");

export default function CustomerTable(props: CustomerTablePropType) {

    const page_size = 20;
    const [customers, setCustomers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchCustomers, setSearchCustomers] = useState([]);
    const [showNote, setShowNote] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageNum, setPageNum] = useState(1);
    const {
        setEditModalVisible,
        setDeleteModalVisible,
        setSelectedCustomer,
        forceRender,
        shouldSearch,
        didSearch,
        setDidSearch,
        nameToSearch,
        setAddNoteModalVisible,
        setAddPurchaseModalVisible,
        setForceRender,
        toggleButtonVisible
    } = props;

    useEffect(() => {
        const fetchData = async () => {
            var { data } = await axios({ method: "get", url: `http://localhost:3000/getAllCustomers/${currentPage}` });
            setCustomers(data);
            setIsLoading(false);
        }
        fetchData();
    }, [forceRender, currentPage]);

    useEffect(() => {
        const fetchData = async () => {
            var { data } = await axios({ method: "get", url: "http://localhost:3000/getCustomerCount"});
            const rest = data.count % page_size;
            console.log(data.count);
            var pageNum = (data.count - rest) / page_size;
            if(rest > 0)
              pageNum++;

            setPageNum(pageNum);
        };
        fetchData();
    }, [forceRender]);

    useEffect(() => {
      const fetchData = async () => {
        if(nameToSearch == "") {
          return;
        }

        var { data } = await axios({ method: "get", url: `http://localhost:3000/getCustomer?name=${nameToSearch}`});
        if(Array.isArray(data)) {
          setSearchCustomers(data);
          setDidSearch(true);
        } else {
          setSearchCustomers([data]);
          setDidSearch(true);
        }
        const rest = (data.length % page_size);
        var searchPageNum = (data.length - rest) / 20;
        if(rest > 0)
          searchPageNum++;

        setCurrentPage(1);
        console.log(searchPageNum);
        setPageNum(searchPageNum);
      };
      fetchData();
    }, [shouldSearch]);

    if(isLoading) {
        return <h1>Loading...</h1>
    }

    return (
        <div style={{ width: 800 }}>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Kundenname</TableCell>
                        <TableCell align="left">Tiername</TableCell>
                        <TableCell align="left">Tierart</TableCell>
                        <TableCell align="left">Guthaben(in €)</TableCell>
                        <TableCell align="left">Aktionen</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {didSearch  ? searchCustomers.map((item: any)=>{
                            return (
                                <>
                                <ExpandableTableRow
                                    item={item}
                                    forceRender={forceRender}
                                    setForceRender={setForceRender}
                                    handleEdit={() => {
                                        setSelectedCustomer(item._id);
                                        setEditModalVisible(true);
                                    }}
                                    handleDelete={() => {
                                            setSelectedCustomer(item._id);
                                            setDeleteModalVisible(true);
                                    }}
                                    setAddNoteModalVisible={setAddNoteModalVisible}
                                    setAddPurchaseModalVisible={setAddPurchaseModalVisible}
                                    setSelectedCustomer={setSelectedCustomer}
                                />
                                </>
                            );
                    }) : customers.map((item: any) => {
                            return (
                                <>
                                <ExpandableTableRow
                                    item={item}
                                    forceRender={forceRender}
                                    setForceRender={setForceRender}
                                    handleEdit={() => {
                                        setSelectedCustomer(item._id);
                                        setEditModalVisible(true);
                                    }}
                                    handleDelete={() => {
                                            setSelectedCustomer(item._id);
                                            setDeleteModalVisible(true);
                                    }}
                                    setAddNoteModalVisible={setAddNoteModalVisible}
                                    setAddPurchaseModalVisible={setAddPurchaseModalVisible}
                                    setSelectedCustomer={setSelectedCustomer}
                                />
                                </>
                            )
                    })}
                </TableBody>
        </Table>
      </TableContainer>
        <div>
            <div style={styles.pageSelector}>
                <button onClick={() => currentPage == 1 ? {}
                : setCurrentPage(currentPage - 1)}>vorherige Seite</button>
                {pageNum < 3 ? (
                  <>
                  {pageNum == 1 ? <button onClick={() => setCurrentPage(1)}>1</button> : null}
                  {pageNum == 2 ? <button onClick={() => setCurrentPage(2)}>2</button> : null}
                  </>
                ) : currentPage <= 4 ? (
                  <>
                      <button onClick={() => setCurrentPage(1)}>1</button>
                      <button onClick={() => setCurrentPage(2)}>2</button>
                      <button onClick={() => setCurrentPage(3)}>3</button>
                      <button onClick={() => setCurrentPage(4)}>4</button>
                      <button>...</button>
                      <button onClick={() => setCurrentPage(pageNum)}>{pageNum}</button>
                  </>
                ) : (currentPage > 4 && currentPage <= (pageNum - 4))
                ? (
                  <>
                      <button onClick={() => setCurrentPage(1)}>1</button>
                      <button>...</button>
                      <button onClick={() => setCurrentPage(currentPage - 2)}>
                        {currentPage - 2}</button>
                      <button onClick={() => setCurrentPage(currentPage - 1)}>
                        {currentPage - 1}</button>
                      <button onClick={() => setCurrentPage(currentPage)}>
                        {currentPage}</button>
                      <button onClick={() => setCurrentPage(currentPage + 1)}>
                        {currentPage + 1}</button>
                      <button onClick={() => setCurrentPage(currentPage + 2)}>
                        {currentPage + 2}</button>
                      <button>...</button>
                      <button onClick={() => setCurrentPage(pageNum)}>{pageNum}</button>
                  </>
                ) : (currentPage > (pageNum - 4)) ? (
                  <>
                      <button onClick={() => setCurrentPage(1)}>1</button>
                      <button>...</button>
                      <button onClick={() => setCurrentPage(pageNum - 3)}>{pageNum - 3}</button>
                      <button onClick={() => setCurrentPage(pageNum - 2)}>{pageNum - 2}</button>
                      <button onClick={() => setCurrentPage(pageNum - 1)}>{pageNum - 1}</button>
                      <button onClick={() => setCurrentPage(pageNum)}>{pageNum}</button>
                  </>
                ) : null}
                <button onClick={() => currentPage == pageNum ? {}
                : setCurrentPage(currentPage + 1)}>nächste Seite</button>
            </div>
        </div>
       </div>
    );
}

const styles = {
    pageSelector: {
      color: "black",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      padding: 15,
      paddingBottom: 40
    },
    table: {
        color: "black",
        backgroundColor: "white",
        border: "1px solid black",
        borderRadius: 5,
    },
};
