import { BookOpen, CalendarCheck, ShieldCheck } from "lucide-react";
import { ProjectDetailPage } from "../../../components/project-detail-page";

export default function Apometria() {
  return <ProjectDetailPage
    eyebrow="Cuidado espiritual"
    title="Apometria"
    description="Um tratamento espiritual realizado somente mediante indicação, com orientação prévia e acompanhamento dos representantes oficiais do projeto."
    image="/casa-sol/hero-apometria-casa.jpg"
    sectionLabel="Conteúdo em construção"
    sectionTitle="Indicação, preparo e acompanhamento."
    paragraphs={["O atendimento de Apometria não é aberto ao público em geral. A indicação acontece durante a gira e é definida pela espiritualidade que rege a Casa.", "Quando o tratamento é indicado, a pessoa recebe um material escrito preparado pela espiritualidade. A leitura desse conteúdo é parte importante da preparação para o atendimento.", "O comparecimento acontece somente após pré-agendamento. A continuidade, a data e as orientações são coordenadas pela espiritualidade e pelos representantes oficiais do projeto."]}
    highlights={[
      { icon: ShieldCheck, title: "Indicação espiritual", description: "A necessidade do tratamento é identificada pela espiritualidade durante o atendimento na gira." },
      { icon: BookOpen, title: "Material de orientação", description: "A pessoa indicada recebe um conteúdo escrito para ler e compreender antes de comparecer." },
      { icon: CalendarCheck, title: "Pré-agendamento", description: "O atendimento ocorre em data previamente coordenada pelos responsáveis oficiais do projeto." },
    ]}
  />;
}
