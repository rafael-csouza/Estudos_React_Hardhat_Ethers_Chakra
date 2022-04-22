import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Flex,
  Image,
  Link,
  Spacer,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import Email from './assets/social-media-icons/email_32x32.png';
import Facebook from './assets/social-media-icons/facebook_32x32.png';
import Twitter from './assets/social-media-icons/twitter_32x32.png';

const NavBar = ({ accounts, setAccounts }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [msgError, setMsgError] = useState(
    'Wrong Network, change your Metamask Network to Rinkeby Test Network!',
  );

  console.log('isOpen:', isOpen);

  const isConnected = Boolean(accounts[0]);
  console.log('isConnected:', isConnected);

  async function connectAccount() {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      if (window.ethereum.networkVersion !== '4') {
        console.log(
          'window.ethereum.networkVersion:',
          window.ethereum.networkVersion,
        );
        setIsOpen(true);
      } else {
        setAccounts(accounts);
      }
    } else {
      setMsgError(
        'MetaMask is not installed. Please consider installing it: https://metamask.io/download.html',
      );
      setIsOpen(true);
    }
  }

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
    <Flex justify='space-between' align='center' padding='30px'>
      {/* Alert - Wrong Network */}
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

      {/* Left Side - Social Media Icons */}
      <Flex
        display={{ base: 'none', lg: 'flex' }}
        justify='space-around'
        width='35%'
        padding='0 75px'
      >
        <Link isExternal href='https://Facebook.com'>
          <Image src={Facebook} boxSize='42px' margin='0 15px' />
        </Link>
        <Link isExternal href='https://Twitter.com'>
          <Image src={Twitter} boxSize='42px' margin='0 15px' />
        </Link>
        <Link isExternal href='https://GMail.com'>
          <Image src={Email} boxSize='42px' margin='0 15px' />
        </Link>
      </Flex>

      {/* Right Side - Sections and Connect */}
      <Flex
        display={{ base: 'none', lg: 'flex' }}
        justify='space-around'
        align='center'
        width='35%'
        padding='30px'
      >
        <Box margin='0 15px'>About</Box>
        <Spacer />
        <Box margin='0 15px'>Mint</Box>
        <Spacer />
        <Box margin='0 15px'>Team</Box>
        <Spacer />
      </Flex>

      {/* Connect Button */}
      {isConnected ? (
        <Box margin='0 5px' width={{ base: '100%', lg: '30%' }}>
          <Text isTruncated>Connected Wallet:</Text>
          <Link
            href={`https://rinkeby.etherscan.io/address/${accounts}`}
            isExternal
          >
            <Text cursor='pointer' isTruncated>
              {accounts}
            </Text>
          </Link>
          {/* https://etherscan.io/address/0x1C24e5bC9A6c15836a23fE67CEd0bf1302aE4f5a */}
        </Box>
      ) : (
        <Button
          backgroundColor='#D6517D'
          borderRadius='5px'
          boxShadow='0px 2px 2px 1px 0F0F0F'
          color='white'
          cursor='pointer'
          fontFamily='inherit'
          padding='15px'
          margin='0 15px'
          onClick={connectAccount}
        >
          Connect
        </Button>
      )}
    </Flex>
  );
};

export default NavBar;
