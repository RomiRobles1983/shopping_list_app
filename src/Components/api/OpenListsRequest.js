const API_URL = `http://localhost:8000`;

const openLists = async () => {// // Performs a GET request to the API to open the lists saved in the database.
    try {
        const response = await fetch(`${API_URL}/lists`);
        
        if (!response.ok) {
            throw new Error('Error fetching lists');
        }

        const data = await response.json();
        console.log('Lists retrieved:', data);
        return data;
    } catch (error) {
        console.error('Error fetching lists:', error);
        throw error;
    }
};

export default openLists;