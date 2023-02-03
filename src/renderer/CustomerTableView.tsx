import React, { useState, useRef } from "react";
import CustomerTable from "./CustomerTable";
import EditCustomerTableModal from "./EditCustomerModal";
import DeleteCustomerTableModal from "./DeleteCustomerModal";
import CreateCustomerTableModal from "./CreateCustomerModal";
import AddNoteModal from "./AddNoteModal";
import AddPurchaseModal from "./AddPurchaseModal";
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';


export default function CustomerTableView(props: any) {

    const [editModalVisible, setEditModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [createModalVisible, setCreateModalVisible] = useState(false);
    const [addNoteModalVisible, setAddNoteModalVisible] = useState(false);
    const [addPurchaseModalVisible, setAddPurchaseModalVisible] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState("NULL");
    const [forceRender, setForceRender] = useState(1);
    const [searchText, setSearchText] = useState("");
    const [shouldSearch, setShouldSearch] = useState(0);
    const [buttonVisible, setButtonVisible] = useState(false);
    const [didSearch, setDidSearch] = useState(false);
    //const [selectedCustomerName, setSelectedCustomerName] = useState("");
    const onEnterKeyPress = (e: any) => {
      //keycode 13 is the key code for the enter key
      if(e.code == "Enter") {
        setSearchText(event.target.value);
        setShouldSearch(shouldSearch + 1);
        setButtonVisible(true);
      }
    };
    const toggleButtonVisible = () => {
        setButtonVisible(!buttonVisible);
    };
    const showAllCustomersButtonHandler = () => {
            setForceRender(forceRender+1);
            setDidSearch(false);
            console.log(forceRender);
    };

    return (
        <div style={styles.tableView}>
            <div style={{ height: 400 }}></div>
            <div>
                <Button onClick={() => setCreateModalVisible(true)}>Neuen Kunden anlegen</Button>
                <TextField variant="outlined" label="Suchen" onKeyDown={onEnterKeyPress} />
                <Button onClick={showAllCustomersButtonHandler}>
                    Zeige alle Kunden</Button>
            </div>
            <CustomerTable
                setEditModalVisible={setEditModalVisible}
                shouldSearch={shouldSearch}
                nameToSearch={searchText}
                didSearch={didSearch}
                setDidSearch={setDidSearch}
                toggleButtonVisible={toggleButtonVisible}
                setDeleteModalVisible={setDeleteModalVisible}
                forceRender={forceRender}
                setSelectedCustomer={setSelectedCustomer}
                setAddNoteModalVisible={setAddNoteModalVisible}
                setAddPurchaseModalVisible={setAddPurchaseModalVisible}
                setForceRender={setForceRender}
            />
            <EditCustomerTableModal
                visible={editModalVisible}
                setVisible={setEditModalVisible}
                forceRender={forceRender}
                setForceRender={setForceRender}
                selectedCustomer={selectedCustomer}
            />
            <DeleteCustomerTableModal
                visible={deleteModalVisible}
                setVisible={setDeleteModalVisible}
                forceRender={forceRender}
                setForceRender={setForceRender}
                selectedCustomer={selectedCustomer}
                setSelectedCustomer={setSelectedCustomer}
            />
            <CreateCustomerTableModal
                visible={createModalVisible}
                setVisible={setCreateModalVisible}
                forceRender={forceRender}
                setForceRender={setForceRender}
                selectedCustomer={selectedCustomer}
            />
            <AddNoteModal
                visible={addNoteModalVisible}
                setVisible={setAddNoteModalVisible}
                selectedCustomer={selectedCustomer}
                forceRender={forceRender}
                setForceRender={setForceRender}
            />
            <AddPurchaseModal
                visible={addPurchaseModalVisible}
                setVisible={setAddPurchaseModalVisible}
                selectedCustomer={selectedCustomer}
                forceRender={forceRender}
                setForceRender={setForceRender}
            />
        </div>
    );
}

const styles = {
    tableView: {
        width: "100%",
        display: "flex",
        flexDirection: "column" as "column",
        alignItems: "center",
        justifyCenter: "center"
    }
}
