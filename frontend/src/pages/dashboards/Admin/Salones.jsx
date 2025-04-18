import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Salones() {
  const [noSalon, setNoSalon] = useState('');
  const [capacidad, setCapacidad] = useState('');
  const [tipo, setTipo] = useState('');
  const [salones, setSalones] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    obtenerSalones();
  }, []);

  useEffect(() => {
    if (mensaje || error) {
      const timer = setTimeout(() => {
        setMensaje('');
        setError('');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [mensaje, error]);

  const obtenerSalones = async () => {
    try {
      const res = await axios.get('http://localhost:3001/salones');
      setSalones(res.data);
    } catch (err) {
      console.error('Error al obtener salones:', err);
      setError('No se pudieron cargar los salones.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');
    setError('');

    if (!noSalon || !capacidad || !tipo) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:3001/salones', {
        no_salon: noSalon,
        capacidad,
        tipo
      });
      setMensaje(res.data.message);
      setNoSalon('');
      setCapacidad('');
      setTipo('');
      obtenerSalones();
    } catch (err) {
      setError(err.response?.data?.error || 'Error al registrar el salón.');
    }
  };

  return (
    <div className="materias-component">
      <div className="contenedor-materias">
        <h2>Registrar Salón</h2>
        <form onSubmit={handleSubmit} className="form-materia">
          <input
            type="text"
            placeholder="Número de salón"
            value={noSalon}
            onChange={(e) => setNoSalon(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Capacidad"
            value={capacidad}
            onChange={(e) => setCapacidad(Number(e.target.value))}
            required
          />
          <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          required
        >
          <option value="">Selecciona el tipo de salón</option>
          <option value="aula">Aula</option>
          <option value="laboratorio">Laboratorio</option>
          <option value="auditorio">Auditorio</option>
        </select>
        <button type="submit">Registrar</button>
      </form>

        {mensaje && <div className="mensaje-exito">{mensaje}</div>}
        {error && <div className="mensaje-error">{error}</div>}

        <hr />

        <h3>Salones Registrados</h3>
        {salones.length > 0 ? (
          <table className="tabla-materias">
            <thead>
              <tr>
                <th>ID</th>
                <th>No. Salón</th>
                <th>Capacidad</th>
                <th>Tipo</th>
              </tr>
            </thead>
            <tbody>
              {salones.map((salon) => (
                <tr key={salon.ID_salon}>
                  <td>{salon.ID_salon}</td>
                  <td>{salon.no_salon}</td>
                  <td>{salon.capacidad}</td>
                  <td>{salon.tipo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No hay salones registrados aún.</p>
        )}
      </div>
    </div>
  );
}

export default Salones;
