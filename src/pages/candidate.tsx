import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import {
  ArrowLeftIcon,
  BanIcon,
  CheckIcon,
  CircleDollarSignIcon,
  LoaderCircleIcon,
  UserRoundCogIcon,
} from "lucide-react";
import { getCandidateData } from "../services/api";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Header } from "../components/ui/header";
import { Separator } from "../components/ui/separator";
import { Loading } from "../components/ui/loading";
import { Candidate } from "../@types/candidate";

export default function CandidatePage() {
  const navigate = useNavigate();

  const { codigoMunicipio, candidatoId } = useParams();

  const {
    data: candidate,
    isLoading,
    isError,
  } = useQuery<Candidate>(["candidate", candidatoId], () =>
    getCandidateData(codigoMunicipio as string, candidatoId as string)
  );

  if (isLoading) return <Loading />;

  if (isError) return <div>Algo deu errado...</div>;

  return (
    <>
      <Header />

      <main className="mt-12 w-full px-4 container mx-auto">
        <Button
          variant="ghost"
          className="gap-2 mb-6"
          onClick={() => navigate(-1)}
        >
          <ArrowLeftIcon />
          Voltar
        </Button>
        <section className="w-full relative p-4 bg-white rounded shadow flex items-center justify-center flex-col">
          <span className="absolute top-4 right-4 text-xs text-muted-foreground max-sm:hidden">
            Última atualização:{" "}
            {new Date(
              candidate?.dataUltimaAtualizacao as string
            ).toLocaleDateString("pt-BR")}
          </span>
          <img
            src={candidate?.fotoUrl}
            alt="Foto do Candidato"
            className="rounded -mt-10 w-24"
          />
          <div className="mt-4 flex flex-col gap-4 items-center">
            <div className="bg-primary rounded p-2 text-white">
              <h2 className="font-bold text-4xl">{candidate?.numero}</h2>
            </div>
            <h3 className="font-semibold text-3xl">{candidate?.nomeUrna}</h3>
          </div>
          <div className="mt-6 w-full flex flex-col gap-2">
            <div
              className={`w-full p-2 rounded ${
                candidate?.descricaoSituacao !== "Deferido"
                  ? "bg-red-500"
                  : "bg-primary"
              }`}
            >
              <h5 className={`font-semibold text-lg text-white `}>
                {candidate?.descricaoSituacao}
              </h5>
              <p className="text-white text-sm italic">Situação Candidatura</p>
            </div>
            <div
              className={`w-full p-2 rounded ${
                candidate?.descricaoSituacaoPartido === "Deferido"
                  ? "bg-primary"
                  : "bg-red-500"
              }`}
            >
              <h5 className="font-semibold text-lg text-white">
                {candidate?.descricaoSituacaoPartido}
              </h5>
              <p className="text-white text-sm italic">
                Situação Partido/Federação/Coligação
              </p>
            </div>
          </div>
        </section>

        <section className="w-full my-8">
          <Card>
            <CardHeader>
              <CardTitle>Informações pessoais</CardTitle>
            </CardHeader>

            <CardContent>
              <ul className="w-full flex flex-col gap-2">
                <li className="w-full flex items-center gap-2">
                  <span className="font-semibold">Nome completo:</span>{" "}
                  {candidate?.nomeCompleto}
                </li>
                <Separator className="mt-2" />
                <li className="w-full flex items-center gap-2">
                  <span className="font-semibold">Data de Nascimento:</span>{" "}
                  {new Date(
                    candidate?.dataDeNascimento as string
                  ).toLocaleDateString("pt-BR")}
                </li>
                <Separator className="mt-2" />
                <li className="w-full flex items-center gap-2">
                  <span className="font-semibold">Gênero:</span>{" "}
                  {candidate?.descricaoSexo}
                </li>
                <Separator className="mt-2" />
                <li className="w-full flex items-center gap-2">
                  <span className="font-semibold">Cor/raça:</span>{" "}
                  {candidate?.descricaoCorRaca}
                </li>
                <Separator className="mt-2" />
                <li className="w-full flex items-center gap-2">
                  <span className="font-semibold">Estavo Civil:</span>{" "}
                  {candidate?.descricaoEstadoCivil}
                </li>
                <Separator className="mt-2" />
                <li className="w-full flex items-center gap-2">
                  <span className="font-semibold">Nível de Escolaridade:</span>{" "}
                  {candidate?.grauInstrucao}
                </li>
                <Separator className="mt-2" />
                <li className="w-full flex items-center gap-2">
                  <span className="font-semibold">Ocupação:</span>{" "}
                  {candidate?.ocupacao}
                </li>
                <Separator className="mt-2" />
              </ul>
            </CardContent>
          </Card>
        </section>

        <section className="w-full my-8">
          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle>Patrimônio declarado</CardTitle>
              <CardDescription>
                <Badge variant="secondary">
                  {candidate?.totalDeBens.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </Badge>
              </CardDescription>
            </CardHeader>

            <CardContent>
              <ul className="w-full flex flex-col gap-2">
                {!candidate?.bens.length && <span>Nenhum bem declarado.</span>}
                {candidate?.bens.map((bem) => (
                  <>
                    <li
                      key={bem.ordem}
                      className="w-full flex items-center gap-2"
                    >
                      <div className="p-2 rounded bg-muted">
                        <CircleDollarSignIcon />
                      </div>
                      <div>
                        <h5 className="font-semibold text-sm">
                          {bem.descricao}
                        </h5>
                        <span className="text-muted-foreground text-sm">
                          {bem.valor.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </span>
                      </div>
                    </li>
                    <Separator className="mt-2" />
                  </>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        <section className="w-full my-8">
          <Card>
            <CardHeader>
              <CardTitle>Eleições Anteriores</CardTitle>
            </CardHeader>

            <CardContent>
              <ul className="w-full flex flex-col gap-2">
                {candidate?.eleicoesAnteriores.map((eleicao) => (
                  <>
                    <li className="w-full flex items-center gap-2">
                      <div
                        className={`p-2 rounded text-white ${
                          eleicao.situacaoTotalizacao.includes("Concorrendo")
                            ? "bg-yellow-500"
                            : eleicao.situacaoTotalizacao.includes("Não")
                            ? "bg-red-500"
                            : eleicao.situacaoTotalizacao.includes("Suplente")
                            ? "bg-blue-500"
                            : "bg-primary"
                        }`}
                      >
                        {eleicao.situacaoTotalizacao.includes("Não") ? (
                          <span title="Não eleito">
                            <BanIcon />
                          </span>
                        ) : eleicao.situacaoTotalizacao.includes(
                            "Concorrendo"
                          ) ? (
                          <span title="Concorrendo">
                            <LoaderCircleIcon />
                          </span>
                        ) : eleicao.situacaoTotalizacao.includes("Suplente") ? (
                          <span title="Suplente">
                            <UserRoundCogIcon />
                          </span>
                        ) : (
                          <span title="Eleito">
                            <CheckIcon />
                          </span>
                        )}
                      </div>
                      <div>
                        <h5 className="font-semibold">
                          {eleicao.cargo} de {eleicao.local}
                        </h5>
                        <span className="text-muted-foreground">
                          {eleicao.nrAno}
                        </span>
                      </div>
                    </li>
                    <Separator className="mt-2" />
                  </>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="text-center p-4">
        <p className="text-xs text-muted-foreground">
          Desenvolvido por{" "}
          <Link
            to="https://linkedin.com/in/wllysses"
            target="_blank"
            className="font-semibold hover:underline"
          >
            Wllysses Tavares
          </Link>
        </p>
      </footer>
    </>
  );
}
