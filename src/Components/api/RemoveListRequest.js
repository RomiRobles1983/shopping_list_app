const API_URL = `http://localhost:8000`;

const removeList = async (listName) => {
    try {//Make a DELETE request to the API to delete the list.
        const response = await fetch(`${API_URL}/lists/${listName}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: listName }), // Send the name of the List in the body.
        });

        if (!response.ok) {
            throw new Error('Error eliminating the list');
        }

        return await response.json();
    } catch (error) {
        console.error('Error eliminating the list:', error.message);
        throw error;
    }
};

export default removeList;