import { initialBookings } from '../data/bookingsData'; // For fallback

// NOTE: The Swagger documentation at https://yancarz-be.azurewebsites.net/swagger/index.html
// does NOT define any Bookings or Reservations endpoint.
// All methods in this service use safe local mock data to keep the UI functional
// without crashing on network errors.

export const bookingsService = {

  // GET all bookings
  // NOTE: No /Bookings or /Reservations endpoint exists in Swagger. Using fallback data.
  async getBookings() {
    try {
      console.warn('getBookings: No Bookings endpoint is defined in the backend Swagger spec. Using fallback data.');
      return Array.isArray(initialBookings) ? initialBookings : [];
    } catch (error) {
      console.warn('Error in getBookings fallback:', error.message);
      return [];
    }
  },

  // CREATE booking
  // NOTE: No POST /Bookings endpoint exists in Swagger. Returning local mock.
  async createBooking(newBooking) {
    try {
      console.warn('createBooking: No Bookings endpoint in Swagger. Returning local mock.');
      return {
        ...newBooking,
        id: Date.now(),
        reference: `BK${Date.now().toString().slice(-4)}`,
        status: 'pending',
        createdAt: new Date().toISOString().split('T')[0],
      };
    } catch (error) {
      console.warn('Error in createBooking mock:', error.message);
      return { ...newBooking, id: Date.now(), status: 'pending' };
    }
  },

  // UPDATE booking
  // NOTE: No PUT /Bookings/{id} endpoint exists in Swagger. Returning local mock.
  async updateBooking(id, updates) {
    try {
      console.warn(`updateBooking: No Bookings endpoint in Swagger. Returning local mock for id=${id}.`);
      return { id, ...updates };
    } catch (error) {
      console.warn(`Error in updateBooking mock for id=${id}:`, error.message);
      return { id, ...updates };
    }
  },

  // DELETE booking
  // NOTE: No DELETE /Bookings/{id} endpoint exists in Swagger. Returning local mock.
  async deleteBooking(id) {
    try {
      console.warn(`deleteBooking: No Bookings endpoint in Swagger. Returning local mock for id=${id}.`);
      return { id };
    } catch (error) {
      console.warn(`Error in deleteBooking mock for id=${id}:`, error.message);
      return { id };
    }
  },

  // CHANGE status — simulated only, no backend endpoint in Swagger
  async changeStatus(id, status) {
    try {
      return { success: true, status };
    } catch (error) {
      return { success: true, status };
    }
  },
};