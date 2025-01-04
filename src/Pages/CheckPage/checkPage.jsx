import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../assets/css/style.css";
import logo from "../../assets/img/logo.png";

const Header = () => {
  const [loggedUser, setLoggedUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("cnpj");
    if (user) {
      setLoggedUser(user);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header className="th-header header-layout1">
      <div className="sticky-wrapper">
        <div className="menu-area">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-auto">
                <div className="header-logo">
                  <Link to="/">
                  <img src={logo} alt="EduChain" />
                  </Link>
                </div>
              </div>
              <div className="col-auto ms-auto">
                {loggedUser && (
                  <div className="d-flex align-items-center">
                    <span className="me-3">Logado como: {loggedUser}</span>
                    <button
                      className="btn btn-danger"
                      onClick={handleLogout}
                    >
                      Deslogar
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="logo-bg"></div>
        </div>
      </div>
    </header>
  );
};

const CertificateForm = ({ hashId, handleChange, handleSubmit }) => (
  <div className="contact-sec space bg-repeat overflow-hidden">
    <div className="container">
      <div className="row align-items-center justify-content-center">
        <div className="col-xl-6 pe-xxl-5">
          <div className="title-area">
            <span className="sub-title style2">Verificar Certificado</span>
            <h2 className="sec-title text-white">Insira o Hash ID</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="form-group style-border2 col-md-12">
                <input
                  type="text"
                  className="form-control"
                  name="hashId"
                  value={hashId}
                  onChange={handleChange}
                  placeholder="Hash ID"
                  required
                />
              </div>
            </div>
            <div className="row mt-4">
              <div className="style-border2 col-md-12">
                <button type="submit" className="btn btn-primary">
                  Checkar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
);

const CheckPage = () => {
  useEffect(() => {
      document.title = 'EduChain - Verificar certificado';
    }, []);
  const [hashId, setHashId] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setHashId(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (hashId.trim()) {
      navigate(`/certificate/${hashId}`);
    } else {
      alert("Por favor, insira um hash ID válido.");
    }
  };

  return (
    <>
      <Header />
      <div className="contact-page-1 space">
        <CertificateForm
          hashId={hashId}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </>
  );
};

export default CheckPage;
