import React, { useEffect } from 'react';
import { MainRouter } from './router/MainRouter';
import { store } from './redux/store';
import { initializeData } from './redux/thunks';
import { TokenModal } from './components/dialogs/TokenModal';

export const App: React.FC = () => {
    useEffect(() => {
        store.dispatch(initializeData());
    }, []);

    return (
        <>
            <MainRouter />
            {/* TODO */}
            <TokenModal />
        </>
    );
};
