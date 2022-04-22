import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { useState } from 'react';
import './App.css';
import NavBar from './Components//NavBar';
import MainMint from './Components/MainMint';
const breakpoints = {
  sm: '30em',
  md: '48em',
  lg: '62em',
  xl: '80em',
  xxl: '96em',
};

const theme = extendTheme({ breakpoints });

function App() {
  const [accounts, setAccounts] = useState([]);
  return (
    <ChakraProvider theme={theme}>
      <div className='overlay'>
        <div className='App'>
          <NavBar accounts={accounts} setAccounts={setAccounts} />
          <MainMint accounts={accounts} setAccounts={setAccounts} />
        </div>
        <div className='moving-background'></div>
      </div>
    </ChakraProvider>
  );
}

export default App;
