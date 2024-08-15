import Booking from '../../src/domain/booking/entities/booking'
import { BookingRepository } from '../../src/domain/booking/repositories/booking-repository'

export class InMemoryBookingRepository implements BookingRepository {
	items: Booking[] = []

	async create(booking: Booking) {
		this.items.push(booking)
		return booking
	}

	async findMany() {
		return this.items
	}

	async findById(id: string) {
		const booking =
			this.items.find(booking => booking.id.toString() === id) || null

		if (!booking) {
			return null
		}

		return booking
	}

	async cancel(booking: Booking) {
		const index = this.items.findIndex(
			bookingItem => bookingItem.id === booking.id
		)

		this.items[index] = booking
	}

	async findByRoomId(roomId: string) {
		const booking = this.items.find(
			booking => booking.room.id.toString() === roomId
		)

		if (!booking) {
			return null
		}

		return booking
	}
}
