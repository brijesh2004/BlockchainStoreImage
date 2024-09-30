import React, { useState } from 'react'
import axios from 'axios';
import { useWeb3Context } from '../contexts/useWeb3Context';
import { toast } from 'react-hot-toast';
import {ImageUp} from 'lucide-react';

const UploadImg = () => {
    const [file , setFile] = useState(null);
    const {web3State} = useWeb3Context();
    const {selectedAccount , contractInstance} = web3State;
    const [loading , setLoading] = useState(false);

    const uploadImageHash = async(ipfsHassh)=>{
        console.log(contractInstance);
        const tx = await contractInstance.uploadFile(selectedAccount , ipfsHassh);
         await toast.promise(tx.wait() , {
            loading:'Transaction is pending',
            success:'Transaction is Successful',
            error:'Transaction Faild'
         })
         //console.log(tx);
    }

    const handleImageUpload = async ()=>{
        try{
        setLoading(true);
        const formData = new FormData();
        formData.append("file" , file);
        const url = `http://localhost:3000/api/uploadImage`;
        const token = localStorage.getItem("token");
        const config = {
          headers:{
            'x-access-token':token
          }
        }
        const res = await axios.post(url , formData , config );

        // imporve UI
        // await toast.promise(axios.post(url , formData) ,{
        //     loading:"Image is Uploading",
        //     success:async(res)=>{
        //         await uploadImageHash(res.data.IpfsHash);
        //         return "Image upload Successful";
        //     },
        //     error:"Image upload Failed"
        // })

        console.log(res.data.IpfsHash);
        await uploadImageHash(res.data.IpfsHash);
        toast.success("image uploaded");
        setLoading(false);
        }
        catch(err){
            console.error(err);
            toast.error("Image Upload Failed");
        }
        finally{
            setLoading(false);
        }
     }
     console.log(file);
   return (
     <div>
       <h1>Upload Image</h1>
       <input type="file" onChange={(e)=>setFile(e.target.files[0])} disabled={loading}/>
       <button onClick={handleImageUpload} disabled={loading || !file}>Click</button>
     </div>
   )
}

export default UploadImg
