import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import axios from "axios";

export default function MergeCustomerView(props: any) {

  const [triggerHook, setTriggerHook] = useState(0);
  const [firstCustomerName, setFirstCustomerName] = useState("");
  const [secondCustomerName, setSecondCustomerName] = useState("");

    const fetchData = async () => {
        var { data } = await axios({ method: "get",
        url: `http://localhost:3000/merge/${firstCustomerName}/${secondCustomerName}`});
    };
  useEffect(() => {
  }, [triggerHook]);

  return (<div style={styles.tableview}>
                <div style={{ height: 400 }}></div>
                <TextField
                    variant="outlined"
                    label="Kundenname"
                    onChange={event => setFirstCustomerName(event.target.value)}
                 />
                <TextField
                    variant="outlined"
                    label="Kundenname, zum Vereinen"
                    onChange={event => setSecondCustomerName(event.target.value)}
                />
                <Button onClick={fetchData}>
                    Absenden</Button>
  </div>);
}

const styles = {
  tableview: {
    width: 700,
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "center",
    justifyCenter: "center"
  }
};
