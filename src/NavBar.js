import { Box, Button, Flex, Image, Link, Spacer } from '@chakra-ui/react';
import Email from './assets/social-media-icons/email_32x32.png';
import Facebook from './assets/social-media-icons/facebook_32x32.png';
import Twitter from './assets/social-media-icons/twitter_32x32.png';

const NavBar = ({ accounts, setAccounts }) => {
  const isConnected = Boolean(accounts[0]);

  async function connectAccount() {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      setAccounts(accounts);
    }
  }

  return (
    <Flex justify='space-between' align='center' padding='30px'>
      {/* Left Side - Social Media Icons */}
      <Flex justify='space-around' width='40%' padding='0 75px'>
        <Link href='https://facebook.com'>
          <Image src={Facebook} boxSize='42px' margin='0 15px' />
        </Link>
        <Link href='https://facebook.com'>
          <Image src={Twitter} boxSize='42px' margin='0 15px' />
        </Link>
        <Link href='https://facebook.com'>
          <Image src={Email} boxSize='42px' margin='0 15px' />
        </Link>
      </Flex>

      {/* Right Side - Sections and Connect */}
      <Flex justify='space-around' align='center' width='40%' padding='30px'>
        <Box margin='0 15px'>Abount</Box>
        <Spacer />
        <Box margin='0 15px'>Mint</Box>
        <Spacer />
        <Box margin='0 15px'>Team</Box>
        <Spacer />
        {/* Connect Button */}
      </Flex>

      {isConnected ? (
        <Box margin='0 15px'>Connected</Box>
      ) : (
        <Button
          backgroundColor='#D6517D'
          borderRadius='5px'
          boxShadow='0px 2ox 2px 1ox 0F0F0F'
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