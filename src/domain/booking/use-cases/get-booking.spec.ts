import { InMemoryBookingRepository } from '../../../../test/repositories/in-memory-booking-repository'
import { InMemoryRoomRepository } from '../../../../test/repositories/in-memory-room-repository'
import Identity from '../../../core/entities/identity'
import Room from '../../employee/entities/room'
import Email from '../../shared/email'
import Money from '../../shared/money'
import Booking from '../entities/booking'
import { GetBookingUseCase } from './get-booking'

let bookingRepository: InMemoryBookingRepository
let roomRepository: InMemoryRoomRepository
let useCase: GetBookingUseCase

describe('Get booking', () => {
	beforeEach(() => {
		bookingRepository = new InMemoryBookingRepository()
		roomRepository = new InMemoryRoomRepository()
		useCase = new GetBookingUseCase(bookingRepository)
	})

	test('should return a room by id', async () => {
		const room = Room.create({
			name: 'Suíte Presidencial',
			price: Money.create(120000),
			image: 'room.jpg'
		})

		roomRepository.items.push(room)

		const booking = Booking.create(
			{
				room,
				customer: 'Gabriel Teodoro',
				days: 5,
				email: Email.create('gabriel@email.com'),
				isActive: true
			},
			new Identity('1')
		)

		bookingRepository.items.push(booking)

		const response = await useCase.handle({ id: '1' })

		expect(response.isRight()).toBe(true)
	})

	test('should return null if invalid id is provided', async () => {
		const response = await useCase.handle({ id: 'teste' })

		expect(response.isLeft()).toBe(true)
	})
})
