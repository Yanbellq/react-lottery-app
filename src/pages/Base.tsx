import AppHeader from '@components/AppHeader';

type BaseProps = {
    children: React.ReactNode;
};

export default function Base(props: BaseProps) {
    const { children } = props;
    return (
        <div>
            <AppHeader />
            {children}
        </div>
    );
}
