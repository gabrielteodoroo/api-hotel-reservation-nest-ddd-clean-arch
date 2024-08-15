import { Either, right } from '../../../core/errors/either/either'
import Room from '../entities/room'
import { RoomRepository } from '../repositories/room-repository'

type Response = Either<null, Room[]>

export class ListRoomsUseCase {
	constructor(private roomRepository: RoomRepository) {}

	async handle(): Promise<Response> {
		const rooms = await this.roomRepository.findMany()

		return right(rooms)
	}
}
