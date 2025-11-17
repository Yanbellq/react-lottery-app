import AppNavigation from '@components/AppNavigation';
import Button from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function AppHeader() {
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                <AppNavigation />

                {isAuthenticated && (
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600">
                            Hello, {user?.name || user?.email}
                        </span>
                        <Button variant="danger" onClick={handleLogout}>
                            Logout
                        </Button>
                    </div>
                )}
            </div>
        </header>
    );
}
