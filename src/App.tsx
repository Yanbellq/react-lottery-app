import React from 'react';
import '@styles/App.css';
import ButtonUsage from '@components/Button';

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;
const PORT = import.meta.env.VITE_PORT;

function App() {
    const title = 'New txt!';

    return (
        <div className="flex items-center justify-center w-full h-full tg">
            {title}
            <br />
            {API_URL} + {API_KEY} + {PORT}
            <ButtonUsage />
        </div>
    );
}

export default App;
