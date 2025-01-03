import axios from "axios";

const apiUrl = "http://localhost:3000";

export const registerInstitutionService = async (
  name,
  cnpj,
  headquarters,
  phone,
  password
) => {
  try {
    const response = await axios.post(
      `${apiUrl}/institution/register-institution`,
      {
        institutionName: name,
        cnpj: cnpj,
        headquarters: headquarters,
        phone: phone,
        password: password,
      }
    );

    if (response.data) {
      return true;
    }

    return;
  } catch (error) {
    return false;
  }
};

export const loginInstitutonService = async (cnpj, password) => {
  try {
    const response = await axios.post(
      `${apiUrl}/institution/auth-institution`,
      {
        cnpj: cnpj,
        password: password,
      }
    );

    if (response.data) {
      return true;
    }

    return;
  } catch (error) {
    return false;
  }
};

export const registerCertificateService = async (
  instution,
  courseName,
  duration,
  modality,
  studentName,
  cpf,
  start,
  graduate
) => {
  try {
    const response = await axios.post(
      `${apiUrl}/institution/emit-certificate`,
      {
        courseProvider: instution,
        courseName: courseName,
        courseDuration: duration,
        teachingModality: modality,
        name: studentName,
        cpf: cpf,
        startDate: start,
        graduationDate: graduate,
      }
    );

    if (response.data) {
      return response.data.certificateHash;
    }

    return;
  } catch (error) {
    return false;
  }
};

export const validateCertificate = async (hash) => {
  try {
    const response = await axios.post(
      `${apiUrl}/institution/validate-certificate`,
      { transactionHash: hash }
    );

    if (response.data) {
      return response.data;
    }

    return;
  } catch (error) {
    return false;
  }
};
