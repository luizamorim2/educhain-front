import React, {useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/css/style.css";

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

function HeroSection() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("cnpj");
    setIsLoggedIn(!!user);
  }, []);

  return (
    <div
      className="th-hero-wrapper hero-1"
      id="hero"
      style={{ backgroundImage: "url('src/assets/img/banner.webp')" }}
    >
      <div className="container">
        <div className="hero-style1 text-center">
          <span className="sub-title custom-anim-top wow animated">
            Use Tecnologia blockchain para emitir certificados
          </span>
          <h1 className="hero-title">
            <span className="title1 custom-anim-top wow animated">
              EduChain
            </span>
          </h1>
          {!isLoggedIn && (  
          <div className="btn-group custom-anim-top wow animated">
            <Link to="/registerInstitution" className="th-btn">
              Cadastrar Instituição{" "}
              <i className="fa-solid fa-arrow-right ms-2"></i>
            </Link>
          </div>
        )}
          <div
                ></div>
          {isLoggedIn && (
            <div className="btn-group custom-anim-top wow animated">
              <Link to="/registerCertificate" className="th-btn">
                Emitir Certificado{" "}
                <i className="fa-solid fa-arrow-right ms-2"></i>
              </Link>
            </div>
          )}
          <div
                ></div>
          <div className="btn-group custom-anim-top wow animated">
            <Link to="/certificate/" className="th-btn">
              Verificar certificado{" "}
              <i className="fa-solid fa-arrow-right ms-2"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer-wrapper">
      <div className="widget-area"></div>
      <div className="term_list">
        <a href="/privacy-policy" target="_self" className="bold">
          <span>Política de Privacidade</span>
        </a>
        <a href="/event-policy" target="_self">
          <span>Política de Eventos</span>
        </a>
        <a href="/content-manual" target="_self">
          <span>Manual de Conteúdo</span>
        </a>
        <a href="/support" target="_blank">
          <span>Atendimento ao Cliente</span>
        </a>
      </div>
      <div className="copyright-wrap">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-lg-6">
              <p className="copyright-text bg-repeat">
                <i className="fas fa-copyright"></i> EduChain. Todos os direitos
                reservados.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function HomePage() {
  useEffect(() => {
    document.title = 'EduChain - Pagina inicial';
  }, []);
  return (
    <>
      <Header />
      <HeroSection />
      <Footer />
    </>
  );
}

export default HomePage;
