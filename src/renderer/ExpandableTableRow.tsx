import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import NoteCard from "./NoteCard";
import PurchaseCard from "./PurchaseCard";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { CustomerType } from "../../api/customers";
import { Purchase } from "../../api/purchases";


export interface ExpandableTableRowProps {
    item: CustomerType,
    handleEdit: () => void,
    handleDelete: () => void,
    setForceRender: Dispatch<SetStateAction<number>>;
    forceRender: number;
    setAddNoteModalVisible: Dispatch<SetStateAction<boolean>>;
    setAddPurchaseModalVisible: Dispatch<SetStateAction<boolean>>;
    setSelectedCustomer: Dispatch<SetStateAction<string>>;
}

export interface NoteType {
    _id: string;
    ownerId: string;
    content: string;
    timestamp: number;
}

export default function ExpandableTableRow(props: ExpandableTableRowProps) {

    const [showNotes, setShowNotes] = useState(false);
    const [showPurchases, setShowPurchases] = useState(false);
    const [notes, setNotes] = useState<Array<NoteType>>([]);
    const [purchases, setPurchases] = useState<Array<Purchase>>([]);
    const { 
        item,
        handleEdit,
        handleDelete,
        forceRender,
        setForceRender,
        setAddNoteModalVisible,
        setAddPurchaseModalVisible,
        setSelectedCustomer
    } = props;
    
    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios({ method: "get", url: "http://localhost:3000/getNotes/" + item._id });
            setNotes(data);

            const response = await axios({ method: "get", url: "http://localhost:3000/getPurchases/" + item._id });
            setPurchases(response.data);
        };

        fetchData();
    }, [forceRender]);

    const deleteNote = async (id: string) => {
        const response = await axios({ method: "delete", url: "http://localhost:3000/deleteNote/" + id })
        setForceRender(forceRender + 1)
    }

    const deletePurchase = async (id: string) => {
        const response = await axios({ method: "delete", url: "http://localhost:3000/deletePurchase/" + id })
        setForceRender(forceRender + 1)
    }

    return (
        <>
        <TableRow key={item.customer_name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell align="left">{item.customer_name}</TableCell>
            <TableCell align="left">{item.pet_name}</TableCell>
            <TableCell align="left">{item.pet_art}</TableCell>
            <TableCell align="left">{item.amount}</TableCell>
            <TableCell align="left">
                <Button onClick={() => {
                    setSelectedCustomer(item._id);
                    handleEdit();
                }}>Bearbeiten</Button>
                <Button onClick={() => {
                    setSelectedCustomer(item._id);
                    handleDelete();
                }}>Löschen</Button>
                <Button onClick={() => {
                    setShowNotes(!showNotes);
                    setSelectedCustomer(item._id);
                }}>Notitzen</Button>
                <Button onClick={() => {
                    setShowPurchases(!showPurchases);
                    setSelectedCustomer(item._id);
                }}>Käufe</Button>
            </TableCell>
        </TableRow>
        <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={showNotes} timeout="auto" unmountOnExit>
                        <div style={{ height: 10 }} />
                        <Button onClick={() => setAddNoteModalVisible(true)}>Notiz hinzufügen</Button>
                        <div style={{ height: 10 }} />
                        <Grid container spacing={2}>
                            {notes.map(note => {
                                return (
                                    <Grid item xs="auto">
                                        <NoteCard item={note} onDelete={() => deleteNote(note._id)} />
                                    </Grid> 
                                );
                            })}
                        </Grid> 
                        <div style={{ height: 30 }} />
                    </Collapse> 
                </TableCell>
        </TableRow>
        <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={showPurchases} timeout="auto" unmountOnExit>
                    <div style={{ height: 10 }} />
                    <Button onClick={() => setAddPurchaseModalVisible(true)}>Kauf hinzufügen</Button>
                    <div style={{ height: 10 }} />
                    <Grid container spacing={2}>
                        {purchases.map(purchase => {
                            return (
                                <Grid item xs="auto">
                                    <PurchaseCard item={purchase} onDelete={() => deletePurchase(purchase._id)} />
                                </Grid> 
                            );
                        })}
                    </Grid> 
                    <div style={{ height: 30 }} />
                </Collapse> 
            </TableCell>
        </TableRow>
        </> 
    );
}