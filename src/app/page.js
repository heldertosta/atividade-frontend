import StudentCard from './components/StudentCard';

export default function Home() {
  return (
    <div className="container">
      <h1>Situação dos Alunos</h1>
      <div className="cards-wrapper">
        <StudentCard name="João Silva" status="Aprovado" />
        <StudentCard name="Maria Oliveira" status="Reprovado" />
      </div>
    </div>
  );
}