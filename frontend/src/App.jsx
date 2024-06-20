import {BrowserRouter,Route,Routes}from 'react-router-dom' 
import Signup from './components/Signup'
import {Signin} from './components/Signin'
import SendMoney from './components/SendMoney'
import Dashboard from './components/Dashboard'
function App() {

  return (
    <BrowserRouter>
    <Routes>
    <Route path='/signup' element={<Signup/>}/>
    <Route path='/signin' element={<Signin/>} />
    <Route path='/dashboard' element={<Dashboard/>}/>
    <Route path='/send' element={<SendMoney/>} />

    </Routes>
    
    </BrowserRouter>

  )
}

export default App
