import React, { useEffect, useState } from 'react';
import './Sectors.css';
import userIcon from '../Assets/person.png';

function Sectors() {
  const [name, setName] = useState('');
  const [values, setValues] = useState([]);
  const [options, setOptions] = useState([]);
  const [agreeTerms, setAgreeTerms] = useState(false);

  useEffect(() => {
      fetch("http://ec2-35-181-51-247.eu-west-3.compute.amazonaws.com:8090/kouekamdev/sectors/GetAllSectors").then((data)=>data.json()).then((val)=>setValues(val))
  }, [])

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAgreeTermsChange = () => {
    setAgreeTerms(!agreeTerms);
  };

  console.log(values, "valeurs");

  /*const handleSave = () => {
    // Add your save logic here
    console.log('Name:', name);
    console.log('Sectors:', sectors);
    console.log('Agree to terms:', agreeTerms);
  };*/

  return (
    <div className='container'>
      <div className="header">
        <div className="text">
          Please enter your name and pick the Sectors you are currently involved in.
        </div>
      </div>

      <div className="inputs">
        <div className="input">
        <label htmlFor="nom">Name</label>
          <div className="both">
            <img src={userIcon} alt="" />
            <input name="nom" type="text" placeholder='Enter your name' value={name} onChange={handleNameChange} />
          </div>
        </div>
      </div>

    <div className="sectorsContainer">
          <div className="sectors">
                  <label htmlFor="">Sector</label>
                  <select onChange={(e)=>setOptions(e.target.value)}>
                    {
                        values.map((opts,i)=><option key={i}>{opts}</option>)
                    }
                  </select>
            </div>
    </div>
    
    <div class="checkbox-container">
        <input type="checkbox" id="terms-agree" class="checkbox"/>
        <label for="terms-agree">I agree to the <a href="#">Terms and Conditions</a>.</label>
    </div>


      <div className="save-info">
        <div className="save" >Save</div>
      </div>
    </div>
  );
}

export default Sectors;
