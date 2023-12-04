class ApiService {
    apiUrl = 'http://localhost:3000';
  
    async login(data) {
      try {
        const response = await fetch(`${this.apiUrl}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
  
        if (!response.ok) {
          throw new Error('Error en la solicitud de inicio de sesión');
        }
  
        return response.json();
      } catch (error) {
        console.error('Error en la solicitud de inicio de sesión:', error);
        throw error;
      }
    }
  
    // Agrega las demás funciones según sea necesario
  }
  
  export default new ApiService();
  