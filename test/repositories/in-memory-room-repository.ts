import Room from '../../src/domain/employee/entities/room'
import { RoomRepository } from '../../src/domain/employee/repositories/room-repository'

export class InMemoryRoomRepository extends RoomRepository {
	items: Room[] = []

	async create(room: Room) {
		this.items.push(room)
		return room
	}

	async findMany() {
		return this.items
	}

	async findById({ id }: { id: string }) {
		const room = this.items.find(item => item.id.toString() === id)

		if (!room) {
			return null
		}

		return room
	}

	async save(room: Room) {
		const itemIndex = this.items.findIndex(item => item.id === room.id)

		this.items[itemIndex] = room
	}

	async delete(id: string) {
		const itemIndex = this.items.findIndex(
			item => item.id.toString() === id
		)

		this.items.splice(itemIndex, 1)
	}
}
