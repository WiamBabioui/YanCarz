import { agenciesService } from './agenciesService';
import { bookingsService } from './bookingsService';

export const dashboardService = {
  // Aggregate stats from agencies and bookings
  async getDashboardStats() {
    try {
      const agencies = await agenciesService.getAgencies();
      const bookings = await bookingsService.getBookings();

      const activeAgencies = agencies.filter(a => a.status === 'active').length;
      const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length;
      const pendingBookings = bookings.filter(b => b.status === 'pending').length;
      const totalRevenue = agencies.reduce((sum, a) => {
        const match = a.revenue ? a.revenue.match(/(\d+,?\d*)\s*MAD/) : null;
        return sum + (match ? parseInt(match[1].replace(',', '')) : 0);
      }, 0);

      return {
        activeAgencies,
        confirmedBookings,
        pendingBookings,
        totalBookings: bookings.length,
        totalRevenue
      };
    } catch (error) {
      console.warn('Dashboard service error:', error);
      return {
        activeAgencies: 0,
        confirmedBookings: 0,
        pendingBookings: 0,
        totalBookings: 0,
        totalRevenue: 0
      };
    }
  }
};
