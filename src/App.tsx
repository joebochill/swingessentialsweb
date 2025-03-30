import React, { useEffect } from 'react';
import { MainRouter } from './router/MainRouter';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { store } from './redux/store';
import { initializeData } from './redux/thunks';
import { TokenModal } from './components/common/TokenModal';

export const App: React.FC = () => {
    useEffect(() => {
        store.dispatch(initializeData());
    }, []);

    return (
        <PayPalScriptProvider
            options={{
                clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
                currency: 'USD',
                disableFunding: 'card,credit',
            }}
        >
            <MainRouter />
            {/* TODO */}
            <TokenModal />
        </PayPalScriptProvider>
    );
};
