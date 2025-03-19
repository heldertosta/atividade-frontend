import './StudentCard.css'; 

const StudentCard = ({ name, status }) => {
  return (
    <div className={`card ${status === 'Aprovado' ? 'approved' : 'rejected'}`}>
      <h2>{name}</h2>
      <p>Situação: <span className="status-text">{status}</span></p>
    </div>
  );
};

export default StudentCard;