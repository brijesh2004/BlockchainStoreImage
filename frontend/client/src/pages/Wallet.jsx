import React, { useEffect } from 'react'
import { useWeb3Context } from '../contexts/useWeb3Context'
import {connectWallet} from '../utils/connectWallet';
import {useNavigate} from 'react-router-dom';
const Wallet = () => {
   const navigate = useNavigate();
    const {updateWeb3State , web3State} = useWeb3Context();
   // console.log(web3State);
   const {selectedAccount} = web3State;

   useEffect(()=>{
    if(selectedAccount){
      navigate("/home");
    }
    
   } , [selectedAccount])
    const handleWalletConnection = async()=>{
      const {contractInstance , selectedAccount} = await connectWallet();
      updateWeb3State({contractInstance , selectedAccount});
    }
  return (
    <button onClick={handleWalletConnection}>
      Connect Wallet
    </button>
  )
}

export default Wallet
