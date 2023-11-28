const API_URL = `http://localhost:8000`;

const removeList = async (listName) => {
    try {
        const response = await fetch(`${API_URL}/lists/${listName}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: listName }), // Envia el nombre de la lista en el cuerpo
        });

        if (!response.ok) {
            throw new Error('Error al eliminar la lista');
        }

        return await response.json();
    } catch (error) {
        console.error('Error al eliminar la lista:', error.message);
        throw error;
    }
};

export default removeList;