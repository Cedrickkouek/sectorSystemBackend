import React, { useEffect, useState } from "react";
import "./Sectors.css";
import userIcon from "../Assets/person.png";
import Axios from "axios";
import { BriefcaseIcon, UserIcon } from "@heroicons/react/outline";

function Sectors() {
  const [values, setValues] = useState([]);
  const [options, setOptions] = useState([]);
  const [action, setAction] = useState("Save");
  const [formData, setFormData] = useState({
    name: "",
    sector: "",
    agreeTerms: false,
  });
  const [formData2, setFormData2] = useState({
    oldName: "",
    newName: "",
    sector: "",
  });
  const [isChecked, setIsChecked] = useState(false);


  useEffect(() => {
    fetch(
      "https://ec2-35-181-51-247.eu-west-3.compute.amazonaws.com:8090/kouekamdev/sectors/GetAllSectors"
    )
      .then((data) => data.json())
      .then((val) => setValues(val));
  }, []);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleChange = (e) => {
    if (action === "Save") {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    } else {
      setFormData2({
        ...formData2,
        [e.target.name]: e.target.value,
      });
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedSector = document.querySelector('.sectors select').value;

    const formDataObject = action === "Save" ? {
      name: formData.name,
      sector: selectedSector,
      agreeTerms: isChecked
    } : {
      oldName: formData2.oldName,
      newName: formData2.newName,
      sector: selectedSector
    };

    const url = action === "Edit User" ? 'https://ec2-35-181-51-247.eu-west-3.compute.amazonaws.com:8090/kouekamdev/Users/EditUser' : 'https://ec2-35-181-51-247.eu-west-3.compute.amazonaws.com:8090/kouekamdev/Users/CreateUser';

    const method = action === "Edit User" ? 'PUT' : 'POST';

    Axios({
      method: method,
      url: url,
      data: formDataObject
    })
      .then(response => {
        alert("Data saved or edited successfully");
        console.log(response);
      })
      .catch(err => {
        alert("Error: Failed to save or edit data");
        console.log(err);
      });
  };

  return (
    <div className="container">
      <div className="box form-box">
        <div className="header">
          <div className="text">{action}</div>
          {action === "Save" ? (
            <h4 className="text2">
              Please enter your name and pick the Sectors you are currently
              involved in.
            </h4>
          ) : (
            <div></div>
          )}
        </div>

        <div className="inputs">
          {action === "Save" ? (
            <div>
              <div className="input">
                <label htmlFor="nom">Name</label>
                <input
                  onChange={handleChange}
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  required
                />
                <UserIcon className="userI" />
              </div>
            </div>
          ) : (
            <div>
              <div className="input i2">
                <label htmlFor="oldName">Old Name</label>
                <input
                  onChange={handleChange}
                  name="oldName"
                  type="text"
                  placeholder="Enter your Current name"
                  required
                />
                <UserIcon className="userI" onChange={handleChange} />
              </div>
              <div className="input">
                <label htmlFor="newName">New Name</label>
                <input
                  onChange={handleChange}
                  name="newName"
                  type="text"
                  placeholder="Enter your New name or leave blank"
                  required
                />
                <UserIcon className="userI" />
              </div>
            </div>
          )}
        </div>

        <div className="sectorsContainer">
          <div className="sectors">
            <label htmlFor="">Sector</label>
            <select
              onChange={(e) => setOptions(e.target.value)}
              defaultValue=""
            >
              <option value="" disabled selected>
                Select a sector
              </option>
              {values.map((opts, i) => (
                <option key={i}>{opts}</option>
              ))}
            </select>
            <BriefcaseIcon className="workingSector" />
          </div>
        </div>

        {action === "Save" ? (
          <div className="checkbox-container">
            <input
              type="checkbox"
              id="terms-agree"
              className="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
              required
            />
            <label className="yep" htmlFor="terms-agree">
              Agree to <a href="#">Terms</a>.
            </label>
          </div>
        ) : (
          <div></div>
        )}

        <div className="save-info">
          <div
            className={action === "Edit User" ? "save gray" : "save"}
            onClick={() => {
              setAction("Save");
            }}
          >
            Save
          </div>
          <div
            className={action === "Save" ? "save gray" : "save"}
            onClick={() => {
              setAction("Edit User");
            }}
          >
            Edit User
          </div>
        </div>
        <div>
          <button
            onClick={handleSubmit}
            className="save-info btn"
            type="submit"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sectors;
