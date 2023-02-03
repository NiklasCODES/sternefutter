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


interface AddDiscountCodeModalPropType {
    visible: boolean;
    setVisible: Dispatch<SetStateAction<boolean>>
    forceRender: number;
    setForceRender: Dispatch<SetStateAction<number>>;
}

export default function AddDiscountCodeModal(props: AddDiscountCodeModalPropType) {

    const { visible, setVisible, forceRender, setForceRender } = props;
    const closeModal = () => setVisible(false);
    const [description, setDescription] = useState<string>();
    const [tag, setTag] = useState<string>();
    const [amountLimit, setAmountLimit] = useState<number>();
    const [discount, setDiscount] = useState<number>();
    //const [selectedDiscountCode, setSelectedDiscountCode] = useState<DiscountCode>({ _id: "", timestamp: 0, tag: "", limit: 0, description: "", discount: 0});
    const [customer, setCustomer] = useState<CustomerType>();
    const [discountCodes, setDiscountCodes] = useState<Array<DiscountCode>>([]);

    useEffect(() => {
        const handler = async () => {
            const { data } = await axios({ method: "get", url: "http://localhost:3000/getAllCodes" });

            setDiscountCodes(data);
        };
        
        handler();
    }, [forceRender]);

    const submit = async () => {
        
        const { data } = await axios({ method: "post", url: "http://localhost:3000/createCode",
            data: {
                code: {
                    description: description,
                    timestamp: Date.now(),
                    discount: discount,
                    tag: tag,
                    limit: amountLimit
                },
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
                    placeholder="Guthaben limit"
                    type="number"
                    variant="outlined"
                    onChange={event => setAmountLimit(Number.parseFloat(event.target.value))}
                />
                <TextField
                    aria-label="minimum height"
                    placeholder="Prozent Rabatt (in Dezimalschreibweise)"
                    type="number"
                    variant="outlined"
                    onChange={event => setDiscount(Number.parseFloat(event.target.value))}
                />
                <InputLabel id="demo-simple-select-label">Rabatt</InputLabel>
                <TextField
                    aria-label="minimum height"
                    placeholder="Rabatt tag"
                    variant="outlined"
                    onChange={event => setTag(event.target.value)}
                />
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
