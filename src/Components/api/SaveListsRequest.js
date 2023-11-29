const API_URL = `http://localhost:8000`;

const saveList = async (listData) => {
  if (!listData.name) {
    throw new Error('Your list has no name!');
  }
  if (!listData.items || listData.items.length === 0) {
    throw new Error('Your list is empty!');
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
      throw new Error(`Your list could not be saved: Details ${errorMessage}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Your list could not be saved:', error.message);
    throw error;
  }
};

export default saveList;
