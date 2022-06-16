import './App.css';
//import About from './components/About.js';
import React ,{useState} from 'react';
import Navbar from './components/Navbar';
import TextForm  from './components/TextForm';

import Alert from './components/Alert';
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

<Navbar  aboutText='aboutTextutils' mode={mode} toggleMode={toggleMode}/>
 <Alert alert={alert}/>
<div className="container my-3" >
 <TextForm  showAlert={showAlert} heading="Enter the text to analyze" mode={mode}/>

 {/*<About/>*/}
</div>

</>
  );
}

export default App;
