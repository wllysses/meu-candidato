import { Link } from "react-router-dom";
import { VoteIcon } from "lucide-react";
import { Button } from "../components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center flex-col">
      <div className="flex flex-col gap-2 items-center">
        <div className="size-12 rounded-md bg-primary p-2 flex items-center justify-center">
          <VoteIcon color="white" size={50} />
        </div>
        <h2 className="font-bold text-3xl">
          Meu <span className="text-primary">Candidato</span>
        </h2>
        <p className="text-muted-foreground text-xs">
          Dados extraídos em tempo real do{" "}
          <Link
            to="https://divulgacandcontas.tse.jus.br/divulga/#/home"
            target="_blank"
            className="font-semibold hover:underline"
          >
            TSE
          </Link>
        </p>
      </div>

      <div className="mt-8 w-full max-w-xl px-2">
        <h3 className="font-semibold text-center">Escolha o seu município:</h3>

        <div className="w-full mt-4 flex items-center justify-center gap-4 flex-wrap">
          <Link to="/itambe">
            <Button>Itambé/PE</Button>
          </Link>
          <Link to="/juripiranga">
            <Button>Juripiranga/PB</Button>
          </Link>
        </div>
      </div>

      <footer className="mt-20 text-muted-foreground text-xs text-center">
        <p className="mt-4">
          Desenvolvidor por{" "}
          <Link
            to="https://linkedin.com/in/wllysses"
            target="_blank"
            className="font-semibold hover:underline"
          >
            Wllysses Tavares
          </Link>
        </p>
      </footer>
    </main>
  );
}
