const API_URL = `http://localhost:8000`;

const saveList = async (listData) => {
  if (!listData.name) {
    throw new Error('El nombre de la lista no puede estar vacío.');
  }

  try {
    const method = listData._id ? 'PUT' : 'POST'; // Utiliza PUT para actualizaciones
    const url = `${API_URL}/lists`;

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(listData),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Error al guardar la lista. Detalles: ${errorMessage}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error al guardar la lista:', error.message);
    throw error;
  }
};

export default saveList;
