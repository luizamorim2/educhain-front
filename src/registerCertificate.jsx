import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./assets/css/style.css";

const RegisterCertificate = () => {
  const [formData, setFormData] = useState({
    name: '',
    cpf: '',
    locale: '',
    duration: '',
    modality: '',
    startDate: '',
    graduationDate: '',
    companyCNPJ: '',
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

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Cadastro realizado com sucesso!');
        setFormData({
          name: '',
          cpf: '',
          locale: '',
          duration: '',
          modality: '',
          startDate: '',
          graduationDate: '',
          companyCNPJ: '',
        });
      } else {
        const error = await response.json();
        alert(`Erro: ${error.message}`);
      }
    } catch (err) {
      alert('Erro ao conectar ao servidor.');
      console.error(err);
    }
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
        <div className="contact-sec space bg-repeat overflow-hidden" data-bg-src="">
          <div className="container">
            <div className="row align-items-center justify-content-center">
              <div className="col-xl-6 pe-xxl-5">
                <div className="title-area">
                  <span className="sub-title style2">Área de registro</span>
                  <h2 className="sec-title text-white">Registrar certificado</h2>
                </div>
                <form id="registerForm" onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="form-group style-border2 col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Nome do estudante"
                        required
                      />
                    </div>
                    <div className="form-group style-border2 col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        name="cpf"
                        value={formData.cpf}
                        onChange={handleChange}
                        placeholder="CPF"
                        required
                      />
                    </div>
                    <div className="form-group style-border2 col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        name="locale"
                        value={formData.locale}
                        onChange={handleChange}
                        placeholder="Nome do curso"
                        required
                      />
                    </div>
                    <div className="form-group style-border2 col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        placeholder="Duração"
                        required
                      />
                    </div>
                    <div className="form-group style-border2 col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        name="modality"
                        value={formData.modality}
                        onChange={handleChange}
                        placeholder="Modalidade de ensino"
                        required
                      />
                    </div>
                    <div className="form-group style-border2 col-md-6">
                      <input
                        type="date"
                        className="form-control"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        placeholder="Data de inicio"
                        required
                      />
                    </div>
                    <div className="form-group style-border2 col-md-6">
                      <input
                        type="date"
                        className="form-control"
                        name="graduationDate"
                        value={formData.graduationDate}
                        onChange={handleChange}
                        placeholder="Data de graduação"
                        required
                      />
                    </div>
                    <div className="form-group style-border2 col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        name="companyCNPJ"
                        value={formData.companyCNPJ}
                        onChange={handleChange}
                        placeholder="CNPJ Da empresa"
                        required
                      />
                    </div>
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
      </div>
    </>
  );
};

export default RegisterCertificate;