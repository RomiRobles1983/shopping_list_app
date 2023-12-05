const API_URL = `http://localhost:8000`;

const openListByName = async (listName) => {// Performs a GET request to the API to open the list by name
  try {
    const response = await fetch(`${API_URL}/lists/${listName}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error fetching items for the list');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching items for the list:', error.message);
    throw error;
  }
};

export default openListByName;
