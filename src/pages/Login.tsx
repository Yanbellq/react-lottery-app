import React, { useState } from 'react';
import Base from '@pages/base';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export function LoginComponent() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            // ТУТ ВИ РОБИТЕ СВІЙ ЗАПИТ ДО API
            const response = await fetch('https://api.escuelajs.co/api/v1/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();

            // Викликаємо login з контексту
            login(
                {
                    id: '1', // отримайте з відповіді API
                    email: email,
                    password: password,
                    // інші поля...
                },
                data.access_token
            );

            // Перенаправляємо на головну сторінку
            navigate('/');
        } catch (error) {
            setError(`${error}: Invalid email or password`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Base>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <h2 className="text-2xl font-bold mb-4">Login</h2>

                {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}

                <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />

                <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />

                <Button type="submit" variant="primary" disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Login'}
                </Button>
            </form>
        </Base>
    );
}

export default LoginComponent;
