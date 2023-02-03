import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { DiscountCode } from "../../api/discount";

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

interface DiscountCodeCardProps {
    item: DiscountCode;
    onDelete: () => void;
}

export default function DiscountCodeCard(props: DiscountCodeCardProps) {

    const { item, onDelete } = props;
    const date = new Date(item.timestamp);

    //const dateString = date.getDay() +  " " + date.getMonth() +  " " + date.getFullYear();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = date.toLocaleDateString("de-DE", options);

    return (
        <Card sx={{ minWidth: 275 }}>
        <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Erstellt: {dateString}
            </Typography>
            <Typography sx={{ fontSize: 20 }}>
                {item.tag}
            </Typography>
            <Typography sx={{ width: 200 }} variant="body2">
                {item.description}
            </Typography>
            <Typography sx={{ fontSize: 14, color: "red" }}>
                Rabatt: {item.discount * 100}%
            </Typography>
            <Typography sx={{ fontSize: 14, color: "purple" }}>
                Notwendiges Guthaben: {item.limit}€
            </Typography>
        </CardContent>
        <CardActions>
            <Button size="small" onClick={onDelete}>Löschen</Button>
        </CardActions>
        </Card>
    );
}
