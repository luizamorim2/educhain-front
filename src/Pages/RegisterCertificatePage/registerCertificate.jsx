import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/css/style.css";
import { registerCertificateService } from "../../Services/services";

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
                    <img src="src/assets/img/logo.png" alt="EduChain" />
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

const CertificateForm = ({ formData, handleChange, handleSubmit }) => (
  <div className="contact-sec space bg-repeat overflow-hidden">
    <div className="container">
      <div className="row align-items-center justify-content-center">
        <div className="col-xl-6 pe-xxl-5">
          <div className="title-area">
            <span className="sub-title style2">Área de registro</span>
            <h2 className="sec-title text-white">Registrar certificado</h2>
          </div>
          <form id="registerForm" onSubmit={handleSubmit}>
            <div className="row">
              {[ 
                { name: "name", placeholder: "Nome do estudante", type: "text" },
                { name: "cpf", placeholder: "CPF", type: "text" },
                { name: "locale", placeholder: "Nome do curso", type: "text" },
                { name: "duration", placeholder: "Duração", type: "text" },
                { name: "modality", placeholder: "Modalidade de ensino", type: "text" },
                { name: "startDate", placeholder: "Data de início", type: "date" },
                { name: "graduationDate", placeholder: "Data de graduação", type: "date" },
                { name: "companyCNPJ", placeholder: "CNPJ Da empresa", type: "text" }
              ].map(({ name, placeholder, type }) => (
                <div className="form-group style-border2 col-md-6" key={name}>
                  <input
                    type={type}
                    className="form-control"
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    required
                  />
                </div>
              ))}
            </div>
            <div className="row mt-4">
              <div className="style-border2 col-md-6">
                <button type="submit" className="btn btn-primary">
                  Registrar certificado
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
);

const RegisterCertificate = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    cpf: "",
    locale: "",
    duration: "",
    modality: "",
    startDate: "",
    graduationDate: "",
    companyCNPJ: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await registerCertificateService(
      formData.companyCNPJ,
      formData.locale,
      formData.duration,
      formData.modality,
      formData.name,
      formData.cpf,
      formData.startDate,
      formData.graduationDate
    );

    if (response) {
      alert(
        `Certificado registrado com sucesso. A hash do certificado é ${response}`
      );
      navigate("/certificate/");
    }
  };

  return (
    <>
      {}
      <Header />
      <div className="contact-page-1 space">
        <CertificateForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </>
  );
};

export default RegisterCertificate;
