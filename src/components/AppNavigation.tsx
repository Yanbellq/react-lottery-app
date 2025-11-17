import React from 'react';
import { Link } from '@mui/material';

export default function AppNavigation() {
    return (
        <nav>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/lottery">Lottery</Link>
            <Link href="/login">Login</Link>
        </nav>
    );
}
