import axios from 'axios';
import { useWeb3Context } from '../contexts/useWeb3Context';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
const FindImage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [imagePerPage, setImagePerPage] = useState(2);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const { web3State } = useWeb3Context();
  const { selectedAccount, contractInstance } = web3State;
  const getImageHashes = async () => {
    const ipfsHashes = await contractInstance.viewFiles(selectedAccount);
    return ipfsHashes;
  }
  const getImage = async () => {
    try {
      setLoading(true);
      const ipfsHashes = await getImageHashes();
      const ipfsHashesArray = Object.values(ipfsHashes);
      const url = `http://localhost:3000/api/getImage?page=${currentPage}&limit=${imagePerPage}`;
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'x-access-token': token
        }
      }
      const res = await axios.post(url, ipfsHashesArray, config)
      //  console.log(ipfsHashesArray);
      const imagesData = res.data.decryptedImageArr;
      setImages(imagesData);
      setLoading(false);
    }
    catch (err) {
      toast.error("Errow while fetching images");
    }
    finally {
      setLoading(false);
    }
  }

  const pagination = (pageNumber) => setCurrentPage(pageNumber);
  useEffect(() => {
    contractInstance && getImage();
  }, [contractInstance, currentPage, imagePerPage, selectedAccount]);
  return (
    <div>
      <h1>Get Image</h1>
      {/* <button onClick={getImage}>Get Image</button> */}
      { !loading?(
        images.length > 0
          ? (images.
            map((imgData, index) => {
              return <img key={index} src={`data:image/jpeg;base64,${imgData}`} width={300} height={300}></img>
            }))
          : (
            <p>No Image Found</p>
          )
      ):(
        <p>Loading...</p>
      )
      }
      <button onClick={() => pagination(currentPage - 1)} disabled={currentPage === 1}>Prev</button>
      <button onClick={() => pagination(currentPage + 1)}>Next</button>
    </div>
  )
}

export default FindImage
