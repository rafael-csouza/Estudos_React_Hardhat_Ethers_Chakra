import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';

const Alert = ({ isOpen, msgError, setAccounts, setIsOpen }) => {
  async function handleNetwork() {
    setIsOpen(false);
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x4' }],
    });
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      setAccounts(accounts);
    }
  }

  return (
    <AlertDialog isOpen={isOpen}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader color='red' fontSize='md' fontWeight='bold'>
            Alert
          </AlertDialogHeader>
          <AlertDialogBody>{msgError}</AlertDialogBody>
          <AlertDialogFooter>
            <Button colorScheme='red' onClick={() => handleNetwork()}>
              Ok
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default Alert;
