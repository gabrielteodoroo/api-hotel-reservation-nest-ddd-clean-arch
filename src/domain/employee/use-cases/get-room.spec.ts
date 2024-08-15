import { InMemoryRoomRepository } from '../../../../test/repositories/in-memory-room-repository'
import Money from '../../shared/money'
import Room from '../entities/room'
import { GetRoomUseCase } from './get-room'

let roomRepository: InMemoryRoomRepository
let useCase: GetRoomUseCase

describe('Detail room', () => {
	beforeEach(() => {
		roomRepository = new InMemoryRoomRepository()
		useCase = new GetRoomUseCase(roomRepository)
	})

	test('should return a room by id', async () => {
		const room = Room.create({
			name: 'Suíte Presidencial',
			price: Money.create(120000),
			image: 'room.jpg'
		})

		roomRepository.items.push(room)

		const response = await useCase.handle({
			id: room.id.toString()
		})

		expect(response.isRight()).toBe(true)
	})

	test('should return error if invalid id is provided', async () => {
		const response = await useCase.handle({
			id: '1'
		})

		expect(response.isLeft()).toEqual(true)
	})
})
