//Used to create and aldo update Lists.

const API_URL = `http://localhost:8000`;

const saveList = async (listData) => {
  if (!listData.name) {
    throw new Error('Your list has no name!');
  }
  if (!listData.items || listData.items.length === 0) {
    throw new Error('Your list is empty!'); //// Verify that the list has a name and at least one element
  }
  
  try {
    const method = listData._id ? 'PUT' : 'POST'; /// Determines whether a new list is being created (POST) or updated (PUT).
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
      throw new Error(`Your list could not be saved: Details ${errorMessage}`); //// If the response is unsuccessful, throws an error with details of the error
    }

    return await response.json();
  } catch (error) {
    console.error('Your list could not be saved:', error.message);
    throw error;
  }
};

export default saveList;
