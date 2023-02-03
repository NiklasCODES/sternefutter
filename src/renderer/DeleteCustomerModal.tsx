import React, { useState, useRef, useEffect, Dispatch, SetStateAction } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { Typography } from "@mui/material";


interface DeleteCustomerModalPropType {
    visible: boolean;
    setVisible: Dispatch<SetStateAction<boolean>>
    selectedCustomer: string;
    setSelectedCustomer: Dispatch<SetStateAction<string>>;
    forceRender: number;
    setForceRender: Dispatch<SetStateAction<number>>;
}

export default function DeleteCustomerModal(props: DeleteCustomerModalPropType) {

    const { visible, setVisible, selectedCustomer, setSelectedCustomer, forceRender, setForceRender } = props;
    const closeModal = () => setVisible(false);

    const submit = async () => {
        
        await axios({ method: "delete", url: "http://localhost:3000/deleteCustomer/" + selectedCustomer });
        await axios({ method: "delete", url: "http://localhost:3000/deleteAllNotes/" + selectedCustomer });
        setSelectedCustomer("NULL");
    };

    return(
        <Modal
            open={visible}
            onClose={closeModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography sx={{ color: "black"}}>Möchten sie den Kunden wirklich löschen?</Typography>
                <div style={{ height: 10 }} />
                <Button onClick={async () => {
                    await submit();
                    setForceRender(forceRender + 1);
                    setVisible(false);
                }}>Ja, wirklich.</Button>
            </Box>
        </Modal>
    );
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 1,
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  };
