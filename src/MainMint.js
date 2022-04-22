import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  Input,
  Text,
} from '@chakra-ui/react';
import { BigNumber, ethers } from 'ethers';
import { useState } from 'react';
import RoboPunksNFT from './RoboPunksNFT.json';

const roboPunksNFTAddress = '0x255766C29881969DFFE78f9306D94FA1B14962FC';

const MainMint = ({ accounts, setAccounts }) => {
  const [mintAmount, setMintAmount] = useState(1);
  const [errorAlert, setErrorAlert] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const isConnected = Boolean(accounts[0]);

  console.log('accounts:', accounts[0]);
  console.log('mintAmount:', mintAmount);

  async function handleMint() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        roboPunksNFTAddress,
        RoboPunksNFT.abi,
        signer,
      );
      try {
        const response = await contract.mint(BigNumber.from(mintAmount), {
          value: ethers.utils.parseEther((0.02 * mintAmount).toString()),
        });
        console.log('response:', response);
      } catch (err) {
        console.log('error:', err);
        setErrorAlert(true);
        setErrorMsg(err.message);
      }
    }
  }

  const handleDecrement = () => {
    if (mintAmount <= 1) return console.log('min mint = 1');
    setMintAmount(mintAmount - 1);
  };

  const handleIncrement = () => {
    if (mintAmount >= 3) return console.log('max mint = 3');
    setMintAmount(mintAmount + 1);
  };

  return (
    <Flex justify='center' align='center' height='100vh' paddingBottom='150px'>
      <Box width='520px'>
        <div>
          {errorAlert ? (
            <Alert status='error'>
              <AlertIcon w={32} h={32} color='red.500' />
              {errorMsg}
            </Alert>
          ) : null}

          <Text fontSize='48px' textShadow='0 5px #000000'>
            RoboPunks
          </Text>
          <Text
            fontSize='30px'
            letterSpacing='-5.5%'
            fontFamily='VT323'
            textShadow='0 2px 2px #000000'
          >
            It's 2078. Can the RoboPunks NFT save humans from destructive
            rampant NFT speculation? Mint RoboPunks to find out.
          </Text>
          {isConnected ? (
            <div>
              <Flex justify='center' align='center'>
                <Button
                  backgroundColor='#D6517D'
                  borderRadius='5px'
                  boxShadow='0px 2px 2px 1px 0F0F0F'
                  color='white'
                  cursor='pointer'
                  fontFamily='inherit'
                  padding='15px'
                  marginTop='10px'
                  onClick={handleDecrement}
                >
                  -
                </Button>
                <Input
                  readOnly
                  fontFamily='inherit'
                  width='100px'
                  height='40px'
                  textAlign='center'
                  paddingLeft='19px'
                  marginTop='10px'
                  type='number'
                  value={mintAmount}
                />
                <Button
                  backgroundColor='#D6517D'
                  borderRadius='5px'
                  boxShadow='0px 2px 2px 1px 0F0F0F'
                  color='white'
                  cursor='pointer'
                  fontFamily='inherit'
                  padding='15px'
                  marginTop='10px'
                  onClick={handleIncrement}
                >
                  +
                </Button>
              </Flex>
              <Button
                backgroundColor='#D6517D'
                borderRadius='5px'
                boxShadow='0px 2px 2px 1px 0F0F0F'
                color='white'
                cursor='pointer'
                fontFamily='inherit'
                padding='15px'
                marginTop='10px'
                onClick={handleMint}
              >
                Mint Now
              </Button>
            </div>
          ) : (
            <Text
              color='#007CFF'
              marginTop='70px'
              fontSize='30px'
              letterSpacing='-5.5%'
              fontFamily='VT323'
              textShadow='0 3px #000000'
            >
              You must be connected to Mint.
            </Text>
          )}
        </div>
      </Box>
    </Flex>
  );
};

export default MainMint;

// 1:05:00
