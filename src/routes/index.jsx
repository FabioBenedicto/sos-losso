import React, { useContext } from 'react';

import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';

export default function Routes() {
    return signed ? <AppRoutes /> : <AuthRoutes />;
}
