import React from 'react';
import { store, persistor } from './src/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import AppScreen from './src/screens/AppScreen';

export default function App() {

  return(

      <Provider store={store}>
          <PersistGate persistor={persistor}>
            <AppScreen />
          </PersistGate>
      </Provider>

  )

}