// /src/app/admin/categories/page.js

'use client';

import { useState, useEffect } from 'react';

export default function CategoriesPage() {
  const [name, setName] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Aquí llamaremos a la API para cargar las categorías
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // Aquí llamaremos a la API para crear una nueva categoría
  };

  return (
    <div className="admin-page">
      <h1 className="admin-page__title">Gestión de Categorías</h1>

      <div className="admin-page__form-container">
        <h2 className="admin-page__subtitle">Crear Nueva Categoría</h2>
        <form onSubmit={handleFormSubmit} className="form">
          <div className="form__group">
            <label htmlFor="categoryName" className="form__label">Nombre</label>
            <input
              type="text"
              id="categoryName"
              className="form__input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej: Sahumerios"
              required
            />
          </div>
          <button type="submit" className="btn btn--primary">
            Guardar Categoría
          </button>
        </form>
      </div>

      <div className="admin-page__list-container">
        <h2 className="admin-page__subtitle">Categorías Existentes</h2>
        {/* Aquí mostraremos la lista de categorías */}
        <p>Cargando categorías...</p>
      </div>
    </div>
  );
}