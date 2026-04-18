import { agenciesService } from './agenciesService';
import { bookingsService } from './bookingsService';

export const analyticsService = {
  // Aggregate analytics data from agencies and bookings
  async getAnalyticsData(timeRange = '7days') {
    try {
      const agencies = await agenciesService.getAgencies();
      const bookings = await bookingsService.getBookings();

      // In a real application, filters should be applied based on timeRange.
      // E.g., filtering `createdAt` fields in agencies/bookings arrays.

      const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length;
      const pendingBookings = bookings.filter(b => b.status === 'pending').length;
      const cancelledBookings = bookings.length - confirmedBookings - pendingBookings;

      const totalRevenue = agencies.reduce((sum, a) => {
        const match = a.revenue ? a.revenue.match(/(\d+,?\d*)\s*MAD/) : null;
        return sum + (match ? parseInt(match[1].replace(',', '')) : 0);
      }, 0);

      const topAgencies = [...agencies].sort((a, b) => (b.bookings || 0) - (a.bookings || 0)).slice(0, 5);

      return {
        totalAgencies: agencies.length,
        totalBookings: bookings.length,
        confirmedBookings,
        pendingBookings,
        cancelledBookings,
        totalRevenue,
        topAgencies
      };
    } catch (error) {
      console.warn('Analytics service error:', error);
      return {
        totalAgencies: 0,
        totalBookings: 0,
        confirmedBookings: 0,
        pendingBookings: 0,
        cancelledBookings: 0,
        totalRevenue: 0,
        topAgencies: []
      };
    }
  }
};
