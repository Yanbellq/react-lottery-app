import React from 'react';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';

export default function ButtonUsage() {
    return (
        <>
            <Button variant="contained">Hello world</Button>
            <Slider size="small" defaultValue={70} aria-label="Small" valueLabelDisplay="auto" />
        </>
    );
}
