import {ethers} from 'ethers';
import contractAbi from '../constants/constractAbi.json'
import axios from 'axios';
import { toast } from 'react-toast';
export const connectWallet = async () => {
    try{

        if (!window.ethereum) {
            throw new Error("Metamask is not Installed")
        }
        const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts'
        })
        // console.log(accounts[0]);
        const selectedAccount = accounts[0];
        const provider =new ethers.BrowserProvider(window.ethereum);  // for reading from the blockchain
        const signer= await provider.getSigner(); // for writing on the blockchain

         
        const message = "Welcome to Crypto Valult Website";
        const signature =await signer.signMessage(message);
        console.log(signature);


        const dataSignature = {
            signature
        }

        const url = `http://localhost:3000/api/authentication?address=${selectedAccount}`;

         const res = await axios.post(url , dataSignature, {withCredentials:true});
         const token = res.data.token;
         localStorage.setItem("token" , token);

        const contractAddress = "0x3db62A5D1997704913e12d5B16D6427EE785E78f";
        const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);
        return { contractInstance, selectedAccount };
    }
    catch(err){
        toast.error("Wallet connection failed")
        console.error(err);
    }
}
