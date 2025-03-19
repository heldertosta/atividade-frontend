'use client';

import { useState } from 'react';
import StudentCard from './components/StudentCard';

export default function Home() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({ name: '', grade1: '', grade2: '' });
  const [editIndex, setEditIndex] = useState(null);

  // Função para calcular média
  const calculateAverage = (grade1, grade2) => {
    const avg = (Number(grade1) + Number(grade2)) / 2;
    return Number(avg.toFixed(2));
  };

  // Função para determinar status
  const getStatus = (average) => (average >= 6 ? 'Aprovado' : 'Reprovado');

  // Lida com mudanças nos inputs do formulário
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Adiciona ou edita aluno
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, grade1, grade2 } = formData;

    if (!name || !grade1 || !grade2) return; // Validação básica

    const average = calculateAverage(grade1, grade2);
    const newStudent = {
      name,
      grade1, // Armazena nota original
      grade2, // Armazena nota original
      average,
      status: getStatus(average),
    };

    if (editIndex !== null) {
      // Edição
      setStudents((prev) =>
        prev.map((student, index) =>
          index === editIndex ? newStudent : student
        )
      );
      setEditIndex(null);
    } else {
      // Adição
      setStudents((prev) => [...prev, newStudent]);
    }

    // Limpa o formulário
    setFormData({ name: '', grade1: '', grade2: '' });
  };

  // Exclui um aluno
  const handleDelete = (index) => {
    setStudents((prev) => prev.filter((_, i) => i !== index));
    if (editIndex === index) {
      setEditIndex(null);
      setFormData({ name: '', grade1: '', grade2: '' });
    }
  };

  // Preenche o formulário para edição
  const handleEdit = (index) => {
    const student = students[index];
    setFormData({
      name: student.name,
      grade1: student.grade1,
      grade2: student.grade2,
    });
    setEditIndex(index);
  };

  return (
    <div className="container">
      <h1>Situação dos Alunos</h1>

      {/* Formulário */}
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Nome do aluno"
        />
        <input
          type="number"
          name="grade1"
          value={formData.grade1}
          onChange={handleInputChange}
          placeholder="Nota 1"
          min="0"
          max="10"
        />
        <input
          type="number"
          name="grade2"
          value={formData.grade2}
          onChange={handleInputChange}
          placeholder="Nota 2"
          min="0"
          max="10"
        />
        <button type="submit">{editIndex !== null ? 'Atualizar' : 'Calcular'}</button>
      </form>

      {/* Cards */}
      <div className="cards-wrapper">
        {students.map((student, index) => (
          <StudentCard
            key={index}
            name={student.name}
            average={student.average}
            status={student.status}
            onDelete={() => handleDelete(index)}
            onEdit={() => handleEdit(index)}
          />
        ))}
      </div>
    </div>
  );
}