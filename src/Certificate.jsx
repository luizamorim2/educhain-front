import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "./assets/css/Certificate.css";
import educhain from "./assets/educhain.png";

const apiUrl = "http://localhost:3000/institution/validate-certificate";

export function CertificatePage() {
  const { hash } = useParams();

  const [authCertificate, setAuthCertificate] = useState("");
  const [certificateParams, setCertificateParams] = useState({
    promise: false,
    message: "Hash inválida. Tente novamente!",
    validate: {
      studentCPF: "",
      courseName: "",
      institutionCNPJ: "",
      certificateHash: "",
      studentName: "",
      courseDuration: "",
      teachingModality: "",
      startDate: "",
      graduationDate: "",
    },
  });

  const validateCertificate = async () => {
    if (!hash) {
      setCertificateParams({
        ...certificateParams,
        message: "Hash não fornecida. Verifique o link e tente novamente!",
      });
      return;
    }

    try {
      const response = await axios.post(
        apiUrl,
        { transactionHash: hash },
        {
          headers: {
            "Content-Type": "application/json",
          }
        }
      );

      // Verifique se a resposta contém os dados necessários
      if (response.data && response.data.promise) {
        setAuthCertificate(`https://sepolia.etherscan.io/tx/${hash}`);
        setCertificateParams({
          ...response.data,
          message: "Certificado validado com sucesso!",
        });
      } else {
        setCertificateParams({
          ...certificateParams,
          message: "Certificado inválido ou não encontrado. Tente novamente.",
        });
      }
    } catch (error) {
      console.error(error);
      setCertificateParams({
        ...certificateParams,
        message: "Erro ao validar o certificado. Por favor, tente novamente.",
      });
    }
  };

  useEffect(() => {
    validateCertificate();
  }, [hash]);

  // Garantir que certificateParams.validate não seja undefined
  const { validate } = certificateParams;
  const isValid = certificateParams.promise && validate;

  return (
    <section className="section-page-settings">
      <img src={educhain} alt="Educhain Logo" className="img-settings" />
      {!certificateParams.promise ? (
        <p>{certificateParams.message}</p>
      ) : (
        isValid && (
          <p className="certificate-message-settings">
            Atestamos que <b>{validate.studentName}</b>, portador do CPF{" "}
            <b>{validate.studentCPF}</b>, inscrito no curso de{" "}
            <b>{validate.courseName}</b>, de modalidade{" "}
            <b>{validate.teachingModality}</b>, fornecido pela instituição com Cadastro Nacional de Pessoas Jurídicas{" "}
            <b>{validate.institutionCNPJ}</b>, concluiu o curso em{" "}
            <b>{validate.graduationDate}</b>, tendo o iniciado em{" "}
            <b>{validate.startDate}</b>, com carga horária de{" "}
            <b>{validate.courseDuration}</b> horas.
          </p>
        )
      )}
      <div className="hash-box">
        <b>
          <p>{hash}</p>
        </b>
        <p>______________________________________________________________</p>
        <p>Assinatura Digital da Transação</p>
      </div>
      <div className="hash-box">
        <b>
          <p>{isValid ? validate.certificateHash : "Carregando..."}</p>
        </b>
        <p>______________________________________________________________</p>
        <p>Assinatura Digital do Certificado</p>
      </div>
      {authCertificate && (
        <a
          href={authCertificate}
          target="_blank"
          rel="noopener noreferrer"
          className="verify-link"
        >
          Verificar Autenticidade
        </a>
      )}
    </section>
  );
}
