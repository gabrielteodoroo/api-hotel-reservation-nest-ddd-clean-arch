import { InMemoryBookingRepository } from '../../../../test/repositories/in-memory-booking-repository'
import { InMemoryRoomRepository } from '../../../../test/repositories/in-memory-room-repository'
import Identity from '../../../core/entities/identity'
import Room from '../../employee/entities/room'
import Money from '../../shared/money'
import { CreateBookingUseCase } from './create-booking'

let roomRepository: InMemoryRoomRepository
let bookingRepository: InMemoryBookingRepository
let useCase: CreateBookingUseCase

describe('Create booking', () => {
	beforeEach(() => {
		roomRepository = new InMemoryRoomRepository()
		bookingRepository = new InMemoryBookingRepository()
		useCase = new CreateBookingUseCase(bookingRepository, roomRepository)

		const room = Room.create(
			{
				name: 'Suíte Presidencial',
				price: Money.create(200000),
				image: 'image.jpg'
			},
			new Identity('2')
		)

		const roomBooked = Room.create(
			{
				name: 'Suíte Presidencial 2',
				price: Money.create(250000),
				image: 'room2.jpg',
				isAvailable: false
			},
			new Identity('5')
		)

		roomRepository.items.push(roomBooked)
		roomRepository.items.push(room)
	})

	test('should create a room booking', async () => {
		const response = await useCase.handle({
			customer: 'Gabriel Teodoro',
			email: 'gabriel@email.com',
			days: 3,
			roomId: '2'
		})

		expect(bookingRepository.items[0].customer).toBe('Gabriel Teodoro')
		expect(bookingRepository.items[0].days).toEqual(3)
		expect(bookingRepository.items[0].isActive).toBe(true)
		expect(bookingRepository.items[0].room.isAvailable).toBe(false)
		expect(bookingRepository.items[0].email.value).toBe('gabriel@email.com')
		expect(response.isRight()).toBe(true)
	})

	test('should not create a booking for a non-existent room', async () => {
		const response = await useCase.handle({
			customer: 'Gabriel Teodoro',
			email: 'gabriel@email.com',
			days: 3,
			roomId: '10'
		})

		expect(response.isLeft()).toBe(true)
	})

	test('should not create a booking for a room that is not available', async () => {
		const response = await useCase.handle({
			customer: 'Gabriel Teodoro',
			email: 'gabriel@email.com',
			days: 3,
			roomId: '5'
		})

		expect(response.isLeft()).toBe(true)
	})

	test('should not create a booking with an invalid email', async () => {
		const response = await useCase.handle({
			customer: 'Gabriel Teodoro',
			email: 'gabriel',
			days: 3,
			roomId: '2'
		})

		expect(response.isLeft()).toBe(true)
	})
})
