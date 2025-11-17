// src/App.tsx

import { Routes, Route } from 'react-router-dom';
import Homepage from '@pages/Homepage';
import User from '@pages/User';
import Login from '@pages/Login';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/users/:id" element={<User />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    );
}

export default App;
