import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/css/style.css";
import { loginInstitutonService } from "../../Services/services";
import { useNavigate } from "react-router-dom";

const Header = () => (
  <header className="th-header header-layout1">
    <div className="sticky-wrapper">
      <div className="menu-area">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-auto">
              <div className="header-logo">
                <Link to="/">
                  <img src="src/assets/img/logo.png" alt="EduChain" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="logo-bg"></div>
      </div>
    </div>
  </header>
);

const LoginForm = ({
  passwordType,
  passwordIcon,
  togglePasswordVisibility,
  handleInputChange,
  handleSubmit,
}) => (
  <div className="contact-sec space bg-repeat overflow-hidden">
    <div className="container">
      <div className="row align-items-center justify-content-center">
        <div className="col-xl-6 pe-xxl-5">
          <div className="title-area">
            <h2 className="sec-title text-white">
              Conecte-se a sua instituição
            </h2>
          </div>
          <form id="registerForm" method="POST" onSubmit={handleSubmit}>
            <div className="row">
              <div className="form-group style-border2 col-md-6">
                <input
                  type="text"
                  className="form-control"
                  name="cnpj"
                  id="cnpj"
                  placeholder="CNPJ"
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
                  required
                />
                <span
                  id="togglePassword"
                  className="position-absolute"
                  style={{ cursor: "pointer", right: "30px", top: "18px" }}
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
);

const Login = () => {
  const navigate = useNavigate();
  const [passwordType, setPasswordType] = useState("password");
  const [passwordIcon, setPasswordIcon] = useState("👁️");
  const [formData, setFormData] = useState({
    cnpj: "",
    password: "",
  });

  const togglePasswordVisibility = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      setPasswordIcon("🙈");
    } else {
      setPasswordType("password");
      setPasswordIcon("👁️");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await loginInstitutonService(
      formData.cnpj,
      formData.password
    );

    if (response) {
      navigate("/registerCertificate");
    } else {
      alert("Erro ao realizar login!");
    }
  };

  return (
    <div>
      <Header />
      <div className="contact-page-1 space">
        <LoginForm
          passwordType={passwordType}
          passwordIcon={passwordIcon}
          togglePasswordVisibility={togglePasswordVisibility}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Login;
