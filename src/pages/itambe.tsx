import { useQueries } from "react-query";
import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";
import { getMayors, getCouncilors } from "../services/api";
import { Button } from "../components/ui/button";
import { CandidateCard } from "../components/ui/candidate-card";
import { Header } from "../components/ui/header";
import { Loading } from "../components/ui/loading";

export default function ItambePage() {
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
      queryFn: () => getMayors("25976"),
    },
    {
      queryKey: ["councilors"],
      queryFn: () => getCouncilors("25976"),
    },
  ]);

  console.log(mayors);
  console.log(councilors);

  if (mayorsLoading || councilorsLoading) return <Loading />;
  if (mayorsError || councilorsError) return <div>Algo deu errado...</div>;

  return (
    <>
      <Header />
      <main className="mt-12 px-4 w-full container mx-auto">
        <Link to="/">
          <Button variant="ghost" className="gap-2">
            <ArrowLeftIcon />
            Voltar
          </Button>
        </Link>

        <h2 className="mt-8 font-semibold text-2xl">
          Candidatos em <span className="text-primary">Itambé/PE</span>
        </h2>

        <section id="mayors" className="my-6 w-full">
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
    </>
  );
}
