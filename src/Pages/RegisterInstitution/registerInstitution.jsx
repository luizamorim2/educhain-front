import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../../assets/css/style.css";
import { registerInstitutionService } from "../../Services/services";

const RegisterInstitution = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    cnpj: "",
    email: "",
    number: "",
    locale: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await registerInstitutionService(
      formData.name,
      formData.cnpj,
      formData.locale,
      formData.number,
      formData.password
    );

    if (response) {
      navigate("/login");
    } else {
      alert("Erro ao cadastrar instituição!");
    }
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
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

      <div className="contact-page-1 space">
        <div
          className="contact-sec space bg-repeat overflow-hidden"
          data-bg-src=""
        >
          <div className="container">
            <div className="row align-items-center justify-content-center">
              <div className="col-xl-6 pe-xxl-5">
                <div className="title-area">
                  <span className="sub-title style2">Área de registro</span>
                  <h2 className="sec-title text-white">
                    Cadastrar instituição
                  </h2>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="form-group style-border2 col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Nome da instituição"
                        required
                      />
                    </div>
                    <div className="form-group style-border2 col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        name="cnpj"
                        value={formData.cnpj}
                        onChange={handleInputChange}
                        placeholder="CNPJ"
                        required
                      />
                    </div>
                    <div className="form-group style-border2 col-md-6">
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email"
                        required
                      />
                    </div>
                    <div className="form-group style-border2 col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        name="number"
                        value={formData.number}
                        onChange={handleInputChange}
                        placeholder="Telefone"
                        required
                      />
                    </div>
                    <div className="form-group style-border2 col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        name="locale"
                        value={formData.locale}
                        onChange={handleInputChange}
                        placeholder="Sede da Empresa"
                        required
                      />
                    </div>
                    <div className="form-group style-border2 col-md-6 position-relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Senha"
                        required
                      />
                      <span
                        id="togglePassword"
                        className="position-absolute"
                        style={{
                          cursor: "pointer",
                          right: "30px",
                          top: "18px",
                        }}
                        onClick={togglePassword}
                      >
                        {showPassword ? "🙈" : "👁️"}
                      </span>
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="style-border2 col-md-6">
                      <button type="submit" className="btn btn-primary">
                        Cadastrar
                      </button>
                    </div>
                    <div className="style-border2 col-md-6">
                      <h6 className="sec-title text-white">
                        Já tem cadastro?{" "}
                        <Link to="/login" className="text-primary">
                          efetue login
                        </Link>
                      </h6>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterInstitution;
