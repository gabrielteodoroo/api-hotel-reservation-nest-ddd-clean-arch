import { InMemoryBookingRepository } from '../../../../test/repositories/in-memory-booking-repository'
import { InMemoryRoomRepository } from '../../../../test/repositories/in-memory-room-repository'
import Room from '../../employee/entities/room'
import Email from '../../shared/email'
import Money from '../../shared/money'
import Booking from '../entities/booking'
import { ListBookingsUseCase } from './list-bookings'

let bookingRepository: InMemoryBookingRepository
let roomRepository: InMemoryRoomRepository
let useCase: ListBookingsUseCase

describe('List bookings', () => {
	beforeEach(() => {
		bookingRepository = new InMemoryBookingRepository()
		roomRepository = new InMemoryRoomRepository()
		useCase = new ListBookingsUseCase(bookingRepository)
	})

	test('should list bookings', async () => {
		const room = Room.create({
			name: 'Suíte Presidencial',
			price: Money.create(120000),
			image: 'room.jpg'
		})

		roomRepository.items.push(room)

		const booking = Booking.create({
			room,
			customer: 'Gabriel Teodoro',
			days: 5,
			email: Email.create('gabriel@email.com'),
			isActive: true
		})

		bookingRepository.items.push(booking)

		const response = await useCase.handle()

		expect(response.value).toHaveLength(1)
		expect(response.isRight()).toBe(true)
	})

	test('should return empty array if there are no bookings', async () => {
		const response = await useCase.handle()

		expect(response.isRight()).toBe(true)
		expect(response.value).toHaveLength(0)
	})
})
