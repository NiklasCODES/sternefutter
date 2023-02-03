import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import DiscountCodeCard from "./DiscountCodeCard";
import Button from "@mui/material/Button";
import axios from "axios";
import AddDiscountCodeModal from "./AddDiscountCodeModal";
import { DiscountCode } from "../../api/discount";


interface DiscountCodeViewProps {

}

//const codes: Array<DiscountCode> = [
    //{_id: "dhrdshrsrh", timestamp: 12435464, tag: "RABATT10", limit: 300, description: "ygedxhdrh sgsg sgseg sdg sdssds", discount: 0.20 },
    //{_id: "dhrdshrsrh", timestamp: 12435464, tag: "RABATT10", limit: 300, description: "ygedxhdrh sgsg sgseg sdg sdssds", discount: 0.20 },
    //{_id: "dhrdshrsrh", timestamp: 12435464, tag: "RABATT10", limit: 300, description: "ygedxhdrh sgsg sgseg sdg sdssds", discount: 0.20 },
    //{_id: "dhrdshrsrh", timestamp: 12435464, tag: "RABATT10", limit: 300, description: "ygedxhdrh sgsg sgseg sdg sdssds", discount: 0.20 }
//];

export default function DiscountCodeView(props: DiscountCodeViewProps) {
    const [forceRender, setForceRender] = useState(1);
    const [discountCodeModalVisible, setDiscountCodeModalVisible] = useState(false);
    const [codes, setCodes] = useState<Array<DiscountCode>>([]);

    useEffect(() => {
        const handler = async () => {
            const { data } = await axios({ method: "get", url: "http://localhost:3000/getAllCodes"});
            setCodes(data);
        };
        handler();
    }, [forceRender]);

    const deleteRequest = async (id: string) => {
        const { data } = await axios({ method: "delete", url: "http://localhost:3000/deleteCode/" + id });
        setForceRender(forceRender + 1);
    };

    return (
        <div style={styles.container}>
            <Typography sx={{ color: "black"}}>Rabattcodes</Typography>            
            <Button sx={{ width: 200 }} onClick={() => setDiscountCodeModalVisible(true)}>Code hinzufügen</Button>
            <Grid container spacing={2}>
                {codes.map(code => {
                    return (
                        <Grid item xs="auto">
                            <DiscountCodeCard item={code} onDelete={() => deleteRequest(code._id)} />
                        </Grid> 
                    );
                })}
            </Grid> 
            <AddDiscountCodeModal
                visible={discountCodeModalVisible}
                setVisible={setDiscountCodeModalVisible}
                forceRender={forceRender}
                setForceRender={setForceRender}
            />
        </div>
    )
}

const styles = {
    container: {
        paddingTop: 400,
        display: "flex",
        flexDirection: "column" as "column",
        justifyContent: "center",
        paddingLeft: 100
    }
};