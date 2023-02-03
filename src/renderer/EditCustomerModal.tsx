import React, { useState, useRef, useEffect, Dispatch, SetStateAction } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";


interface EditCustomerModalPropType {
    visible: boolean;
    setVisible: Dispatch<SetStateAction<boolean>>
    selectedCustomer: string;
    forceRender: number;
    setForceRender: Dispatch<SetStateAction<number>>;
}

export default function EditCustomerModal(props: EditCustomerModalPropType) {

    const { visible, setVisible, selectedCustomer, forceRender, setForceRender } = props;
    const closeModal = () => setVisible(false);
    const [customerName, setCustomerName] = useState<string>();
    const [petName, setPetName] = useState<string>();
    const [petArt, setPetArt] = useState<string>();
    const [amount, setAmount] = useState<number>();


    const submit = async () => {
        var update = {};

        if(customerName) {
            update = {
                ...update,
                customer_name: customerName,
            };
        }
        if(petName) {
            update = {
                ...update,
                pet_name: petName
            };
        }
        if(petArt) {
            update = {
                ...update,
                pet_art: petArt
            };
        }
        if(amount) {
            update = {
                ...update,
                amount: amount
            };
        }
        
        const { data } = await axios({ method: "patch", url: "http://localhost:3000/updateCustomer/" + selectedCustomer,
            data: {
                update: {
                    ...update
                },
            }
        });
        console.log(data);
    };

    return(
        <Modal
            open={visible}
            onClose={closeModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <TextField id="outlined-basic" onChange={val => setCustomerName(val.target.value)} label="Kundenname" variant="outlined" />
                <TextField id="outlined-basic" onChange={val => setPetName(val.target.value)} label="Tiername" variant="outlined" />
                <TextField id="outlined-basic" onChange={val => setPetArt(val.target.value)} label="Tierart" variant="outlined" />
                <TextField id="outlined-basic" onChange={val => setAmount(Number(val.target.value))} label="Guthaben(in €)" variant="outlined" />
                <Button onClick={async () => {
                    await submit();
                    setForceRender(forceRender + 1);
                    setVisible(false);
                }}>Absenden</Button>
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
    border: '2px solid #000',
    borderRadius: "5px",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  };
