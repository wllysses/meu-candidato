import axios from "axios";
import { Candidates } from "../@types/candidate";

export const httpClient = axios.create({
  baseURL: "https://divulgacandcontas.tse.jus.br/divulga/rest/v1",
});

export const getMayors = async (cityId: string): Promise<Candidates[]> => {
  const response = await httpClient.get(
    `/candidatura/listar/2024/${cityId}/2045202024/11/candidatos`
  );
  return response.data;
};

export const getCouncilors = async (cityId: string): Promise<Candidates[]> => {
  const response = await httpClient.get(
    `/candidatura/listar/2024/${cityId}/2045202024/13/candidatos`
  );
  return response.data;
};

export const getCandidateData = async (cityId: string, candidateId: string) => {
  const response = await httpClient.get(
    `/candidatura/buscar/2024/${cityId}/2045202024/candidato/${candidateId}`
  );
  return response.data;
};
