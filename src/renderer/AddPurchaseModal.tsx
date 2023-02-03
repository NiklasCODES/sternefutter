import React, { useState, useRef, useEffect, Dispatch, SetStateAction } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import axios from "axios";
import { Typography } from "@mui/material";
import { DiscountCode } from "../../api/discount";
import { CustomerType } from "../../api/customers";


interface AddPurchaseModalPropType {
    visible: boolean;
    setVisible: Dispatch<SetStateAction<boolean>>
    selectedCustomer: string;
    forceRender: number;
    setForceRender: Dispatch<SetStateAction<number>>;
}

export default function AddPurchaseModal(props: AddPurchaseModalPropType) {

    const { visible, setVisible, selectedCustomer, forceRender, setForceRender } = props;
    const closeModal = () => setVisible(false);
    const [description, setDescription] = useState("");
    const [discountCodes, setDiscountCodes] = useState<Array<DiscountCode>>([]);
    const [selectedDiscountCode, setSelectedDiscountCode] = useState<DiscountCode>({ _id: "", timestamp: 0, tag: "", limit: 0, description: "", discount: 0, usedCode: ""});
    const [customer, setCustomer] = useState<CustomerType>();
    const [paidAmount, setPaidAmount] = useState<number>(0);
    const [savedAmount, setSavedAmount] = useState<number>(0);

    useEffect(() => {
        const handler = async () => {
            if(selectedCustomer == "NULL")
                return;

            const response = await axios({ method: "get", url: "http://localhost:3000/getCustomer/" + selectedCustomer });
            const { amount } = response.data;

            setSavedAmount(amount);
            const { data } = await axios({ method: "get", url: "http://localhost:3000/getAllCodes" });
            var codes: Array<DiscountCode> = [];
            data.map((code: DiscountCode) => {
                if(code.limit <= amount)
                    codes.push(code);
            });
            setDiscountCodes(codes);
        };
        
        handler();
    }, [selectedCustomer, forceRender]);

    const submit = async () => {
        
        //const responseCodes = await axios({ method: "get"});

        const val = savedAmount + (paidAmount - (paidAmount * selectedDiscountCode.discount));
        const { data } = await axios({ method: "post", url: "http://localhost:3000/createPurchase",
            data: {
                purchase: {
                    ownerId: selectedCustomer,
                    timestamp: Date.now(),
                    description: description,
                    amount: val,
                    usedCode: selectedDiscountCode.tag
                },
            }
        });

        const customerResponse = await axios({ method: "patch", url: "http://localhost:3000/updateCustomer/" + selectedCustomer,
            data: {
                update: {
                    amount: val
                }
            },
        });
    };

    const handleChange = (event: any) => {
        discountCodes.map(code => {
            if (event.target.value == code.tag) {
                setSelectedDiscountCode(code);
                return;
            }
        });
    };

    return(
        <Modal
            open={visible}
            onClose={closeModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <TextareaAutosize
                    aria-label="minimum height"
                    minRows={5}
                    placeholder="Beschreibung eingeben..."
                    style={{ width: 400 }}
                    onChange={event => setDescription(event.target.value)}
                />
                <TextField
                    aria-label="minimum height"
                    placeholder="Bezahlte Geldmenge"
                    type="number"
                    variant="outlined"
                    onChange={event => setPaidAmount(Number.parseFloat(event.target.value))}
                />
                <InputLabel id="demo-simple-select-label">Rabatt</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedDiscountCode}
                    label="Rabatt"
                    onChange={handleChange}
                >
                    {discountCodes.map(code => {
                        return <MenuItem value={code.tag}>{code.tag}</MenuItem>;
                    })}
                </Select>
                <Button onClick={async () => {
                    await submit();
                    setForceRender(forceRender + 1);
                    setVisible(false);
                }}>Speichern</Button>
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
    background: "white",
    borderRadius: 1,
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  };
