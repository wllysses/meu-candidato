import axios from "axios";
import { Candidate } from "../@types/candidate";

export const httpClient = axios.create({
  baseURL: "https://divulgacandcontas.tse.jus.br/divulga/rest/v1",
});

export const getMayors = async (cityId: string): Promise<Candidate[]> => {
  const response = await httpClient.get(
    `/candidatura/listar/2024/${cityId}/2045202024/11/candidatos`
  );
  return response.data.candidatos;
};

export const getCouncilors = async (cityId: string): Promise<Candidate[]> => {
  const response = await httpClient.get(
    `/candidatura/listar/2024/${cityId}/2045202024/13/candidatos`
  );
  return response.data.candidatos;
};

export const getCandidateData = async (cityId: string, candidateId: string) => {
  const response = await httpClient.get(
    `/candidatura/buscar/2024/${cityId}/2045202024/candidato/${candidateId}`
  );
  return response.data;
};
