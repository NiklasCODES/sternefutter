import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { NoteType } from "./ExpandableTableRow";

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

interface NoteTypeProps {
    item: NoteType;
    onDelete: () => void;
}

export default function NoteCard(props: NoteTypeProps) {

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
                {item.content}
            </Typography>
        </CardContent>
        <CardActions>
            <Button size="small" onClick={onDelete}>Löschen</Button>
        </CardActions>
        </Card>
    );
}
