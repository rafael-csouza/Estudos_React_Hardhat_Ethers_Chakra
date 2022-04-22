import { BigNumber, ethers } from 'ethers';
import { useState } from 'react';
import RoboPunksNFT from './RoboPunksNFT.json';

const roboPunksNFTAddress = '0x255766C29881969DFFE78f9306D94FA1B14962FC';

const MainMint = ({ accounts, setAccounts }) => {
  const [mintAmount, setMintAmount] = useState(1);
  const isConnected = Boolean(accounts[0]);

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
        console.log('response: ', response);
      } catch (err) {
        console.log('error: ', err);
      }
    }
  }

  const handleDecrement = () => {
    if (mintAmount <= 1) return;
    setMintAmount(mintAmount - 1);
  };

  const handleIncrement = () => {
    if (mintAmount >= 3) return;
    setMintAmount(mintAmount + 1);
  };

  return (
    // <Flex justify='center' align='center' height='100vh' paddingBottom='150px'>
    <div>
      <h1>RoboPunks</h1>
      <p>
        It's 2078. Can the RoboPunks NFT save humans from destructive rampant
        NFT speculation? Mint RoboPunks to find out.
      </p>
      {isConnected ? (
        <div>
          <div>
            <button onClick={handleDecrement}>-</button>
            <div>Number: {mintAmount}</div>
            {/* <input type='number' value={mintAmount} /> */}
            <button onClick={handleIncrement}>+</button>
          </div>
          <button onClick={handleMint}>Mint Now</button>
        </div>
      ) : (
        <p>You must be connected to Mint.</p>
      )}
    </div>
    // </Flex>
  );
};

export default MainMint;

// 1:05:00
