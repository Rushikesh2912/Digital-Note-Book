import React, { useState } from 'react';
import loginImag from "../images/loginImg.png";
import { useNavigate } from 'react-router-dom';
import loginbgImag from "../images/BgLoginImg.png";

const Login = (props) => {
  const [crediential, setCrediential] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  //Add users
  const handleClick = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    //TODO APT Call
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: crediential.username, password: crediential.password }), // body data type must match "Content-Type" header
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //Save the Auth- Token in redirectory
      localStorage.setItem('token', json.authToken);
      props.showAlert("Login Successfully", "success");
      navigate('/about');
    } else {
      props.showAlert("Invalid Username & Password", "danger");
    }
  }

  const onChange = (e) => {
    setCrediential({ ...crediential, [e.target.name]: e.target.value });
  }

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(prevState => !prevState);
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div className='col-md-5 ps-0 d-none d-md-block' style={{
        backgroundImage: `url(${loginbgImag})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        flex: '1',
      }} />
      <div className="login-page" style={{ flex: '2', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <div className="container" style={{ maxWidth: "70rem" }}>
          <div className="row" style={{ marginBottom: "8rem" }}>
            <div className="col-lg-10 offset-lg-1">
              <h3 style={{ marginTop: "58px", marginBottom: "-3.5rem" }}><b>Login Now</b></h3>
              <div className="bg-white shadow rounded">
                <div className="row" style={{ marginTop: "4rem" }}>
                  <div className="col-md-7 pe-0">
                    <div className="form-left h-100 py-5 px-5">
                      <form action="" className="row g-4">
                        <div className="col-12">
                          <label>Username<span className="text-danger">*</span></label>
                          <div className="input-group">
                            <div className="input-group-text"><i className="bi bi-person-fill"></i></div>
                            <input type="text" className="form-control" id='username' name='username' value={crediential.username} onChange={onChange} placeholder="Enter username" />
                          </div>
                        </div>

                        <div className="col-12">
                          <label>Password<span className="text-danger">*</span></label>
                          <div className="input-group">
                            <div className="input-group-text"><i className={`fas ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`} onClick={handleShowPassword}></i></div>
                            <input type={showPassword ? 'text' : 'password'} className="form-control" id='password' name="password" value={crediential.password} onChange={onChange} placeholder="Enter Password" />
                          </div>
                        </div>

                        <div className="col-sm-6">
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="inlineFormCheck" />
                            <label className="form-check-label" htmlFor="inlineFormCheck">Remember me</label>
                          </div>
                        </div>

                        <div className="col-sm-6">
                          <a href="/" className="float-end text-primary">Forgot Password?</a>
                        </div>

                        <div className="col-12">
                          <button type="submit" onClick={handleClick} className="btn btn-primary px-4 float-end mt-4">login</button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-md-5 ps-0 d-none d-md-block">
                    <img src={loginImag} alt="img" style={{ width: '94%', height: '20rem' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
