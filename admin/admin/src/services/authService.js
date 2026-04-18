import axiosInstance from '../api/axiosInstance';

export const authService = {
  // LOGIN user
  async login(email, password, rememberMe = false) {
    try {
      // Mocked endpoint behavior based on user request (no explicit Swagger route found)
      // await axiosInstance.post('/Auth/login', { email, password });
      
      // Simulate network wait
      await new Promise(resolve => setTimeout(resolve, 800));

      // For safety, checking demo credentials but allowing others logic if API falls back
      if (email === 'admin@example.com' && password === 'password123') {
        const user = { email, name: 'Admin User', role: 'Administrator' };
        
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem('isLoggedIn', 'true');
        storage.setItem('userEmail', email);
        
        return { success: true, user };
      } else {
        throw new Error('Invalid credentials. Please verify your email and password.');
      }
    } catch (error) {
      console.warn('Login error.', error);
      throw error;
    }
  },

  // LOGOUT user
  logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('token'); // Clear token if implemented
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('userEmail');
    sessionStorage.removeItem('token');
  }
};
