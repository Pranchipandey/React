import './App.css';
//import About from './components/About.js';
import React ,{useState} from 'react';
import Navbar from './components/Navbar';
import TextForm  from './components/TextForm';

import Alert from './components/Alert';
//import {
 // BrowserRouter as Router,
//  Routes,
  //Route,
 // Link
//} from 'react-router-dom';
function App() {
  const [mode,setMode] = useState('light');
  const [alert, setAlert] = useState(null);
  
   const showAlert = (message, type)=>{
      setAlert({
        msg: message,
        type: type
      })
      setTimeout(() => {
          setAlert(null);
      }, 1500);
  }

  const toggleMode= ()=>{
    if(mode==='light'){
      setMode('dark');
      document.body.style.backgroundColor='#042743';
     showAlert("Dark mode has been enable", "success")
    }
    else{
      setMode('light');
       document.body.style.backgroundColor='white';
       showAlert("Light mode has been enable", "success")
      }
  }
  return (
<>
{/*<Router>*/}
<Navbar  mode={mode} toggleMode={toggleMode}/>
 <Alert alert={alert}/>
{/*<div className="container">
        <Routes>
            <Route path="/about" element={<About />}>
            </Route>
            <Route path="/" element={<TextForm heading="Enter text to analyze"  mode={mode} showAlert={showAlert} />}>
            </Route>
          </Routes>
        </div>

</Router>*/}
<div className="container">
<TextForm heading="Enter text to analyze"  mode={mode} showAlert={showAlert} />

</div>
</>
  );
}

export default App;
