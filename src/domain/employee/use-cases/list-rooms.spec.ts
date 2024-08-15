import { InMemoryRoomRepository } from '../../../../test/repositories/in-memory-room-repository'
import Money from '../../shared/money'
import Room from '../entities/room'
import { ListRoomsUseCase } from './list-rooms'

let roomRepository: InMemoryRoomRepository
let useCase: ListRoomsUseCase

describe('List room', () => {
	beforeEach(() => {
		roomRepository = new InMemoryRoomRepository()
		useCase = new ListRoomsUseCase(roomRepository)
	})

	test('should list rooms', async () => {
		const room = Room.create({
			name: 'Suíte Presidencial',
			price: Money.create(120000),
			image: 'room.jpg'
		})

		roomRepository.items.push(room)

		const response = await useCase.handle()

		expect(response.isRight()).toBe(true)
		expect(response.value).toHaveLength(1)
	})

	test('should return empty array if there are no rooms', async () => {
		const response = await useCase.handle()

		expect(response.isRight()).toBe(true)
		expect(response.value).toHaveLength(0)
	})
})
