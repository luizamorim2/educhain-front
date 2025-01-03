import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./assets/css/style.css";

const Login = () => {
  const [passwordType, setPasswordType] = useState('password');
  const [passwordIcon, setPasswordIcon] = useState('👁️');

  const togglePasswordVisibility = () => {
    if (passwordType === 'password') {
      setPasswordType('text');
      setPasswordIcon('🙈');
    } else {
      setPasswordType('password');
      setPasswordIcon('👁️');
    }
  };

  return (
    
    <div>
      <header className="th-header header-layout1">
        <div className="sticky-wrapper">
          <div className="menu-area">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-auto">
                  <div className="header-logo">
                    <a href="index.html">
                      <img src="src/assets/img/logo.png" alt="" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="logo-bg"></div>
          </div>
        </div>
      </header>

      <div className="contact-page-1 space">
        <div className="contact-sec space bg-repeat overflow-hidden" data-bg-src="">
          <div className="container">
            <div className="row align-items-center justify-content-center">
              <div className="col-xl-6 pe-xxl-5">
                <div className="title-area">
                  <h2 className="sec-title text-white">Conecte-se a sua instituição</h2>
                </div>
                <form id="registerForm" method="POST">
                  <div className="row">
                    <div className="form-group style-border2 col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        name="cnpj"
                        id="cnpj"
                        placeholder="CNPJ"
                        required
                      />
                    </div>
                    <div className="form-group style-border2 col-md-6 position-relative">
                      <input
                        type={passwordType}
                        className="form-control"
                        name="password"
                        id="password"
                        placeholder="Senha"
                        required
                      />
                      <span
                        id="togglePassword"
                        className="position-absolute"
                        style={{ cursor: 'pointer', right: '30px', top: '18px' }}
                        onClick={togglePasswordVisibility}
                      >
                        {passwordIcon}
                      </span>
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-12 text-center">
                      <button type="submit" className="btn btn-primary">
                        Login
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <script src="assets/js/vendor/jquery-3.7.1.min.js"></script>
      <script src="assets/js/swiper-bundle.min.js"></script>
      <script src="assets/js/bootstrap.min.js"></script>
      <script src="assets/js/jquery.magnific-popup.min.js"></script>
      <script src="assets/js/jquery.counterup.min.js"></script>
      <script src="assets/js/jquery-ui.min.js"></script>
      <script src="assets/js/imagesloaded.pkgd.min.js"></script>
      <script src="assets/js/isotope.pkgd.min.js"></script>
      <script src="assets/js/gsap.min.js"></script>
      <script src="assets/js/waypoints.js"></script>
      <script src="assets/js/wow.js"></script>
      <script src="assets/js/main.js"></script>
      <script src="script.js"></script>
    </div>
  );
};

export default Login;
