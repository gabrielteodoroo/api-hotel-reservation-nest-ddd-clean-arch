import { InMemoryRoomRepository } from '../../../../test/repositories/in-memory-room-repository'
import Money from '../../shared/money'
import Room from '../entities/room'
import { EditRoomUseCase } from './edit-room'

let roomRepository: InMemoryRoomRepository
let useCase: EditRoomUseCase

describe('Edit room', () => {
	beforeEach(() => {
		roomRepository = new InMemoryRoomRepository()
		useCase = new EditRoomUseCase(roomRepository)
	})

	test('should edit a room', async () => {
		const room = Room.create({
			name: 'Suíte Presidencial',
			price: Money.create(120000),
			image: 'room.jpg'
		})

		roomRepository.items.push(room)

		const response = await useCase.handle({
			id: room.id.toString(),
			name: 'Suíte',
			price: 200000,
			image: room.image,
			hasWifi: room.hasWifi,
			hasAir: room.hasAir,
			hasKitchen: room.hasKitchen,
			isPetFriendly: room.isPetFriendly,
			isAvailable: room.isAvailable
		})

		expect(response.isRight()).toBe(true)
		expect(roomRepository.items[0].name).toEqual('Suíte')
		expect(roomRepository.items[0].price.value).toEqual(200000)
	})

	test('should returns null if invalid id is provided', async () => {
		const response = await useCase.handle({
			id: 'abc',
			name: 'Suíte',
			price: 200000,
			image: 'room.jpg',
			hasWifi: true,
			hasAir: true,
			hasKitchen: true,
			isPetFriendly: true,
			isAvailable: true
		})

		expect(response.isLeft()).toBe(true)
	})
})
