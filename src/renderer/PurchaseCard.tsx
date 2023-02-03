import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Purchase } from "../../api/purchases";

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

interface PurchaseCardProps {
    item: Purchase;
    onDelete: () => void;
}

export default function PurchaseCard(props: PurchaseCardProps) {

    const { item, onDelete } = props;
    const date = new Date(item.timestamp);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = date.toLocaleDateString("de-DE", options);

    return (
        <Card sx={{ minWidth: 275 }}>
        <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Erstellt: {dateString}
            </Typography>
            <Typography sx={{ width: 200 }} variant="body2">
                {item.description}
            </Typography>
            <Typography>
                Bezahlt: {item.amount}
            </Typography>
            {item.usedCode.length > 0 ? (
                <Typography sx={{ fontsize: 14, color: "purple"}}>
                    Rabattcode benutzt: {item.usedCode}
                </Typography>
            ) : null}
        </CardContent>
        <CardActions>
            <Button size="small" onClick={onDelete}>Löschen</Button>
        </CardActions>
        </Card>
    );
}
