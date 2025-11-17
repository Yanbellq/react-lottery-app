import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import type { IUser } from '@/types/user';

export default function User() {
    const [user, setUser] = useState<IUser | null>(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch(`https://api.escuelajs.co/api/v1/users/${id}`);
            const user = await response.json();

            setUser(user);
        };

        fetchUser();
    }, [id]);

    return (
        <div>
            {user ? (
                <div>
                    <img src={user.avatar} alt="" />
                    <h1>{user.name}</h1>
                    <p>{user.email}</p>
                    <p>{user.password}</p>
                    <p>{user.role}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
