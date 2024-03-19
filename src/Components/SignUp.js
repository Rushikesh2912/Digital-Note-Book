import React, { useState } from 'react'
import signUpImg from '../images/signUpImg.png'
import { useNavigate} from 'react-router-dom'

const SignUp = (props) => {
  
  const [crediential, setCrediential] = useState({ name: "", email: "", username: "", cpassword: "", password: "" });
  let navigate = useNavigate();
  //Add users
  const handleClick = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    //TODO APT Call
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: crediential.name, email: crediential.email, username: crediential.username, cpassword : crediential.cpassword, password: crediential.password }), // body data type must match "Content-Type" header
    });
    const json = await response.json();
    console.log(json);
    if(json.success){
      //Save the Auth- Token in redirectory
      localStorage.setItem('token' , json.authToken);
      navigate('/login'); // Navigate to the root path
      props.showAlert("Account Create Successfully", "success");
    }else{
      props.showAlert("Invalid Text Feild", "danger");
    }
  }
  const onChange = (e) => {
    setCrediential({ ...crediential, [e.target.name]: e.target.value })
  }

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(prevState => !prevState);
  };
  return (
    <div>
      <div className="login-page">
        <div className="container" style={{ maxWidth: "70rem" }}>
          <div className="row" style={{ marginBottom: "8rem" }}>
            <div className="col-lg-10 offset-lg-1">
              <h3 style={{marginTop: "58px", marginBottom: "-3.5rem"}}><b>SignUp Now</b></h3>
              <div className="bg-white shadow rounded">
                <div className="row" style={{ marginTop: "4rem" }}>
                  <div className="col-md-5 ps-0 d-none d-md-block">
                    <img className='mx-3' src={signUpImg} alt="img" style={{ width: '97%', height: '30rem' }} />
                  </div>
                  <div className="col-md-7 pe-0">
                    <div className="form-left h-100 py-5 px-5">
                      <form action="" className="row g-4">

                        <div className="col-12">
                          <label>Email<span className="text-danger">*</span></label>
                          <div className="input-group">
                            <div className="input-group-text"><i class="fa-solid fa-envelope"></i></div>
                            <input type="email" className="form-control" id="email" name="email" value={crediential.email} onChange={onChange} required placeholder="Enter Email" />
                          </div>
                        </div>

                        <div className="col-12">
                          <label>Name<span className="text-danger">*</span></label>
                          <div className="input-group">
                            <div className="input-group-text"><i className="bi bi-person-fill"></i></div>
                            <input type="text" className="form-control" id="name" name="name" value={crediential.name} onChange={onChange} required minLength={3} placeholder="Enter Name " />
                          </div>
                        </div>

                        <div className="col-12">
                          <label>Username<span className="text-danger">*</span></label>
                          <div className="input-group">
                            <div className="input-group-text"><i className="bi bi-person-fill"></i></div>
                            <input type="text" className="form-control" id="username" name="username" value={crediential.username} onChange={onChange} required minLength={5} placeholder="Enter Username" />
                          </div>
                        </div>

                        <div className="col-12">
                          <label>Password<span className="text-danger">*</span></label>
                          <div className="input-group">
                            <div className="input-group-text"><i className={`fas ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`} onClick={handleShowPassword}></i></div>
                            <input type={showPassword ? 'text' : 'password'} className="form-control" id="password" name="password" value={crediential.password} onChange={onChange} required minLength={5} placeholder="Enter Password" />
                          </div>
                        </div>

                        <div className="col-12">
                          <label>Confirm Password<span className="text-danger">*</span></label>
                          <div className="input-group">
                            <div className="input-group-text"><i className={`fas ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`} onClick={handleShowPassword}></i></div>
                            <input type={showPassword ? 'text' : 'password'} className="form-control" id="cpassword" name="cpassword" value={crediential.cpassword} onChange={onChange} required minLength={5} placeholder="Enter Password" />                        
                          </div>
                        </div>

                        <div className="col-sm-6">
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="inlineFormCheck" />
                            <label className="form-check-label" htmlFor="inlineFormCheck">Remember me</label>
                          </div>
                        </div>

                        <div className="col-12">
                          <button type="submit" className="btn btn-primary px-4 float-end mt-4" onClick={handleClick}>SignUp</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
