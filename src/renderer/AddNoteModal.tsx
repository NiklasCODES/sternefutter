import React, { useState, useRef, useEffect, Dispatch, SetStateAction } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import axios from "axios";
import { Typography } from "@mui/material";


interface AddNoteModalPropType {
    visible: boolean;
    setVisible: Dispatch<SetStateAction<boolean>>
    selectedCustomer: string;
    forceRender: number;
    setForceRender: Dispatch<SetStateAction<number>>;
}

export default function AddNoteModalModal(props: AddNoteModalPropType) {

    const { visible, setVisible, selectedCustomer, forceRender, setForceRender } = props;
    const closeModal = () => setVisible(false);
    const [content, setContent] = useState("");

    const submit = async () => {
        
        const { data } = await axios({ method: "post", url: "http://localhost:3000/createNote",
            data: {
                note: {
                    ownerId: selectedCustomer,
                    timestamp: Date.now(),
                    content: content,
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
                <TextareaAutosize
                    aria-label="minimum height"
                    minRows={5}
                    placeholder="Eingeben..."
                    style={{ width: 400 }}
                    onChange={event => setContent(event.target.value)}
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
