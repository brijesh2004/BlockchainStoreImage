
import './App.css'
import Wallet from './pages/Wallet'
import Web3Provider from './contexts/Web3Provider'
import { RouterProvider } from 'react-router-dom'
import { routes } from './routes/routes'

function App() {
  return (
    <Web3Provider>
     <RouterProvider router={routes}/>
    </Web3Provider>
  )
}

export default App
