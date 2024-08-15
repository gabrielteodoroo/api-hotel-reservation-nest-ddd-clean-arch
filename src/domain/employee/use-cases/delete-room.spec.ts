import { InMemoryBookingRepository } from '../../../../test/repositories/in-memory-booking-repository'
import { InMemoryRoomRepository } from '../../../../test/repositories/in-memory-room-repository'
import Identity from '../../../core/entities/identity'
import Booking from '../../booking/entities/booking'
import Email from '../../shared/email'
import Money from '../../shared/money'
import Room from '../entities/room'
import { DeleteRoomUseCase } from './delete-room'

let bookingRepository: InMemoryBookingRepository
let roomRepository: InMemoryRoomRepository
let useCase: DeleteRoomUseCase

describe('Delete room', () => {
	beforeEach(() => {
		bookingRepository = new InMemoryBookingRepository()
		roomRepository = new InMemoryRoomRepository()
		useCase = new DeleteRoomUseCase(roomRepository, bookingRepository)

		const room = Room.create(
			{
				name: 'Suíte Presidencial',
				price: Money.create(120000),
				image: 'room.jpg'
			},
			new Identity('1')
		)

		roomRepository.items.push(room)

		const roomBooked = Room.create(
			{
				name: 'Suíte Presidencial',
				price: Money.create(120000),
				image: 'room.jpg',
				isAvailable: false
			},
			new Identity('2')
		)

		roomRepository.items.push(roomBooked)

		const booking = Booking.create(
			{
				room: roomBooked,
				customer: 'Gabriel Teodoro',
				days: 5,
				email: Email.create('gabriel@email.com'),
				isActive: true
			},
			new Identity('1')
		)

		bookingRepository.items.push(booking)
	})

	test('should delete a room', async () => {
		expect(roomRepository.items).toHaveLength(2)
		const response = await useCase.handle({ id: '1' })

		expect(response.isRight()).toBe(true)
		expect(roomRepository.items).toHaveLength(1)
	})

	test('Should not delete a room that already has a reservation.', async () => {
		const response = await useCase.handle({ id: '2' })
		expect(response.isLeft()).toEqual(true)
	})

	test('Should not delete a room that already has a reservation.', async () => {
		const response = await useCase.handle({ id: 'abc' })
		expect(response.isLeft()).toEqual(true)
	})
})
