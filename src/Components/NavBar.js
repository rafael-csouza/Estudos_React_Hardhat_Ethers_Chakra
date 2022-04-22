import { Box, Button, Flex, Image, Link, Spacer, Text } from '@chakra-ui/react';
import { useState } from 'react';
import Email from '../assets/social-media-icons/email_32x32.png';
import Facebook from '../assets/social-media-icons/facebook_32x32.png';
import Twitter from '../assets/social-media-icons/twitter_32x32.png';
import Alert from './Alert';
import ModalButton from './ModalButton';

const NavBar = ({ accounts, setAccounts }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [msgError, setMsgError] = useState('');

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
        setMsgError(
          'Wrong Network, change your Metamask Network to Rinkeby Test Network!',
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

  return (
    <Flex
      justify='space-between'
      align='center'
      alignSelf='center'
      padding='30px'
    >
      {/* Alert - Wrong Network */}
      <Alert
        isOpen={isOpen}
        msgError={msgError}
        setIsOpen={setIsOpen}
        setAccounts={setAccounts}
      />

      {/* Left Side - Social Media Icons */}
      <Flex
        display={{ base: 'none', lg: 'flex' }}
        justify='space-around'
        width={{ lg: '35%', xxl: '20%' }}
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
        display={{ base: 'none', md: 'flex' }}
        justify='space-around'
        align='center'
        width={{ md: '50%', lg: '35%', xxl: '20%' }}
        padding='30px'
      >
        <ModalButton title='Mint' subtitle='Mint blahblah' />
        <Spacer />
        <ModalButton title='About' subtitle='About blahblah' />
        <Spacer />
        <ModalButton title='Team' subtitle='Team blahblah' />
        <Spacer />
      </Flex>

      {/* Connect Button */}
      {isConnected ? (
        <Box
          margin='0 5px'
          width={{ base: '100%', md: '50%', lg: '30%', xxl: '20%' }}
        >
          <Text isTruncated>Connected Wallet:</Text>
          <Link
            href={`https://rinkeby.etherscan.io/address/${accounts}`}
            isExternal
          >
            <Text cursor='pointer' isTruncated>
              {accounts}
            </Text>
          </Link>
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
