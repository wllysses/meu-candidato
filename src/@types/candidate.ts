export interface Candidate {
  id: number;
  ufCandidatura: string;
  nomeCompleto: string;
  nomeUrna: string;
  numero: number;
  partido: {
    sigla: string;
  };
  nomeColigacao: string;
  dataUltimaAtualizacao: string;
  fotoUrl: string;
  descricaoSituacao: string;
  descricaoSituacaoPartido: string;
  descricaoTotalizacao: string;
  dataDeNascimento: string;
  grauInstrucao: string;
  descricaoSexo: string;
  descricaoEstadoCivil: string;
  descricaoCorRaca: string;
  ocupacao: string;
  totalDeBens: number;
  bens: MaterialGood[];
  eleicoesAnteriores: PreviousElection[];
}

export interface Candidates {
  candidatos: Candidate[];
}

interface MaterialGood {
  ordem: string;
  valor: number;
  descricao: string;
}

interface PreviousElection {
  situacaoTotalizacao: string;
  cargo: string;
  local: string;
  nrAno: number;
}
