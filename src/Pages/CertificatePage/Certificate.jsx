import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import educhain from "../../assets/educhain.png";
import "./Certificate.css"; 

const apiUrl = "http://localhost:3000/institution/validate-certificate";

export function CertificatePage() {
  useEffect(() => {
    document.title = "EduChain - Certificado";
  }, []);
  const { hash } = useParams();

  const [authCertificate, setAuthCertificate] = useState("");
  const [certificateParams, setCertificateParams] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const validateCertificate = async () => {
    try {
      const response = await axios.post(
        `${apiUrl}`,
        { transactionHash: hash },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const isValid =
        response.data?.validate?.studentName &&
        response.data?.validate?.courseName;

      if (isValid) {
        setAuthCertificate(`https://sepolia.etherscan.io/tx/${hash}`);
        setCertificateParams(response.data);
        setErrorMessage("");
      } else {
        setCertificateParams(null);
        setErrorMessage("Certificado inválido ou dados incompletos.");
      }
    } catch (error) {
      console.error("Erro na validação:", error);
      setCertificateParams(null);
      setErrorMessage(
        "Erro ao validar o certificado. Tente novamente mais tarde."
      );
    }
  };

  useEffect(() => {
    validateCertificate();
  }, []);

  const downloadPDF = async () => {
    const element = document.querySelector(".section-page-settings");
    const buttons = document.querySelectorAll(".download-button, a");

    buttons.forEach((button) => (button.style.display = "none"));

    try {
      const canvas = await html2canvas(element, {
        scale: 4,
        useCORS: true,
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("certificado.pdf");
    } catch (error) {
      console.error("Erro ao gerar o PDF:", error);
    } finally {
      buttons.forEach((button) => (button.style.display = "inline-block"));
    }
  };

  return (
    <section className="certificate-page section-page-settings">
      {" "}
      {}
      <img src={educhain} className="img-settings" alt="Educhain logo" />
      {errorMessage ? (
        <p className="error-message">{errorMessage}</p>
      ) : certificateParams ? (
        <>
          <p className="certificate-message-settings">
            Atestamos que <b>{certificateParams.validate.studentName}</b>,
            portador do CPF <b>{certificateParams.validate.studentCPF}</b>,
            inscrito no curso de <b>{certificateParams.validate.courseName}</b>,
            de modalidade <b>{certificateParams.validate.teachingModality}</b>,
            fornecido pela instituição com Cadastro Nacional de Pessoas
            Jurídicas <b>{certificateParams.validate.institutionCNPJ}</b>,
            concluiu o curso em{" "}
            <b>{certificateParams.validate.graduationDate}</b>, tendo o iniciado
            em <b>{certificateParams.validate.startDate}</b>, com carga horária
            de <b>{certificateParams.validate.courseDuration}</b> horas.
          </p>
          <div className="hash-box">
            <b>
              <p>{hash}</p>
            </b>
            <p>
              ______________________________________________________________
            </p>
            <p>Assinatura Digital da Transação</p>
          </div>
          <div className="hash-box">
            <b>
              <p>{certificateParams.validate.certificateHash}</p>
            </b>
            <p>
              ______________________________________________________________
            </p>
            <p>Assinatura Digital do Certificado</p>
          </div>
          <a href={authCertificate} target="_blank" rel="noopener noreferrer">
            Verificar Autenticidade
          </a>
          <button onClick={downloadPDF} className="download-button">
            Baixar Certificado em PDF
          </button>
        </>
      ) : (
        <p>Validando o certificado...</p>
      )}
    </section>
  );
}
