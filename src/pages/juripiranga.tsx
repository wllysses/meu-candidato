import { useQueries } from "react-query";
import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";
import { getMayors, getCouncilors } from "../services/api";
import { Button } from "../components/ui/button";
import { Header } from "../components/ui/header";
import { CandidateCard } from "../components/ui/candidate-card";
import { Loading } from "../components/ui/loading";

export default function JuripirangaPage() {
  const [
    { data: mayors, isLoading: mayorsLoading, isError: mayorsError },
    {
      data: councilors,
      isLoading: councilorsLoading,
      isError: councilorsError,
    },
  ] = useQueries([
    {
      queryKey: ["mayors"],
      queryFn: () => getMayors("20591"),
    },
    {
      queryKey: ["councilors"],
      queryFn: () => getCouncilors("20591"),
    },
  ]);

  console.log(mayors);
  console.log(councilors);

  if (mayorsLoading || councilorsLoading) return <Loading />;
  if (mayorsError || councilorsError) return <div>Algo deu errado...</div>;

  return (
    <>
      <Header />
      <main className="mt-12 w-full px-4 container mx-auto">
        <Link to="/">
          <Button variant="ghost" className="gap-2">
            <ArrowLeftIcon />
            Voltar
          </Button>
        </Link>

        <h2 className="mt-8 font-semibold text-2xl">
          Candidatos em <span className="text-primary">Juripiranga/PB</span>
        </h2>

        <section id="prefeitos" className="my-6 w-full">
          <h3 className="font-semibold text-xl">Prefeito</h3>
          <div className="mt-4 w-full grid grid-cols-2 gap-4 max-md:grid-cols-1">
            {mayors?.map((candidate) => (
              <CandidateCard data={candidate} />
            ))}
          </div>
        </section>

        <section id="vereadores" className="my-12 w-full">
          <h3 className="font-semibold text-xl">Vereadores</h3>
          <div className="mt-4 w-full grid grid-cols-2 gap-4 max-md:grid-cols-1">
            {councilors?.map((candidate) => (
              <CandidateCard data={candidate} />
            ))}
          </div>
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
