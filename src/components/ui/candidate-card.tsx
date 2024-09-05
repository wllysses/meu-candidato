import { Link } from "react-router-dom";
import { Badge } from "./badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";
import { Candidate } from "../../@types/candidate";

interface CandidateCardProps {
  data: Candidate;
}

export function CandidateCard({ data }: CandidateCardProps) {
  return (
    <Card key={data.id} className="hover:scale-105 hover:duration-150">
      <Link to={`/candidato/${data.ufCandidatura}/${data.id}`}>
        <div className="flex justify-between">
          <CardHeader>
            <CardTitle>{data.nomeUrna}</CardTitle>
            <CardDescription>{data.nomeCompleto}</CardDescription>
            <span className="text-muted-foreground text-sm">
              {data.partido.sigla} - {data.nomeColigacao}
            </span>
          </CardHeader>
          <h2 className="text-xl p-6 font-bold">{data.numero}</h2>
        </div>
        <CardContent className="flex items-center gap-1">
          <Badge>{data.descricaoTotalizacao}</Badge>
          <Badge
            variant={
              data.descricaoSituacao !== "Deferido" ? "destructive" : "default"
            }
          >
            {data.descricaoSituacao}
          </Badge>
        </CardContent>
      </Link>
    </Card>
  );
}
