import React, { useEffect, useState } from 'react';
import './Sectors.css';
import userIcon from '../Assets/person.png';

function Sectors() {
  const [values, setValues] = useState([]);
  const [options, setOptions] = useState([]);
  const [agreeTerms, setAgreeTerms] = useState(false);

  useEffect(() => {
      fetch("http://ec2-35-181-51-247.eu-west-3.compute.amazonaws.com:8090/kouekamdev/sectors/GetAllSectors").then((data)=>data.json()).then((val)=>setValues(val))
  }, [])


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
    <div className="container">
       <div className="box form-box">
       <div className="header">
          <h1 className="text">
            Please enter your name and pick the Sectors  you are currently involved in.
          </h1>
        </div>

        <div className="inputs">
          <div className="input">
          <label htmlFor="nom">Name</label>
              <input name="nom" type="text" placeholder='Enter your name'/>
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
          <label className="yep" for="terms-agree">I agree to the <a href="#">Terms</a>.</label>
      </div>


        <div className="save-info">
          <div className="save" >Save</div>
          <div className="save" >Edit User</div>
        </div>
       </div>
    </div>
  );
}

export default Sectors;
