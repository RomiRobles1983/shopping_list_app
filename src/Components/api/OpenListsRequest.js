const API_URL = `http://localhost:8000`;

export default () => {
    return fetch(`${API_URL}/lists`)
        .then(response => response.json())
        .then(data => {
            console.log('Lists retrieved:', data);
            return data;
        })
        .catch(error => {
            console.error('Error fetching lists:', error);
            throw error;
        });
};