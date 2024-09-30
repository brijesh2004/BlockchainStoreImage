
import FindImage from "../components/FindImage";
import UploadImg from "../components/UploadImg";
import { useWeb3Context } from "../contexts/useWeb3Context";

const Home = () => {
  const {web3State} = useWeb3Context();
  const {selectedAccount} = web3State;
  console.log(selectedAccount);
  return (
    <div>
      <h1>Home</h1>
      <UploadImg/>
      <FindImage/>
      
    </div>
  )
}

export default Home
