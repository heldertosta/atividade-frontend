import './StudentCard.css';

const StudentCard = ({ name, average, status, onDelete, onEdit }) => {
  return (
    <div className={`card ${status === 'Aprovado' ? 'approved' : 'rejected'}`}>
      <h2>{name}</h2>
      <p>Média: {average}</p>
      <p>Situação: <span className="status-text">{status}</span></p>
      <div className="card-buttons">
        <button onClick={onEdit}>Editar</button>
        <button onClick={onDelete} className="delete-btn">Excluir</button>
      </div>
    </div>
  );
};

export default StudentCard;