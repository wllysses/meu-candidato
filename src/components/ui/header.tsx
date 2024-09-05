import { VoteIcon } from "lucide-react";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <Link to="/">
      <header className="bg-white shadow border-b p-4 w-full flex items-center justify-center">
        <div className="flex flex-col gap-2 items-center">
          <div className="size-8 rounded-md bg-primary flex items-center justify-center">
            <VoteIcon color="white" size={20} />
          </div>
          <h2 className="font-bold text-xl">
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
      </header>
    </Link>
  );
}
