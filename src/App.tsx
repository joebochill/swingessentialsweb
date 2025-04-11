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

    const PP_MODE = import.meta.env.VITE_PAYPAL_MODE;
    const PP_CLIENT_ID =
        PP_MODE === 'production'
            ? import.meta.env.VITE_PAYPAL_CLIENT_ID_PROD
            : import.meta.env.VITE_PAYPAL_CLIENT_ID_SANDBOX;

    console.log(PP_MODE);
    console.log(PP_CLIENT_ID);
    console.log(import.meta.env.VITE_PAYPAL_CLIENT_ID_PROD);

    return (
        <PayPalScriptProvider
            options={{
                clientId: PP_CLIENT_ID,
                currency: 'USD',
                disableFunding: 'card,credit',
            }}
        >
            <MainRouter />
            <TokenModal />
        </PayPalScriptProvider>
    );
};
