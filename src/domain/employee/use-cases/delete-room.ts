import { NotAllowedError } from '../../../core/errors/custom-errors/not-allowed-error'
import { NotFoundError } from '../../../core/errors/custom-errors/not-found-error'
import { Either, left, right } from '../../../core/errors/either/either'
import { BookingRepository } from '../../booking/repositories/booking-repository'
import { RoomRepository } from '../repositories/room-repository'

type Request = {
	id: string
}

type Response = Either<NotFoundError | NotAllowedError, boolean>

export class DeleteRoomUseCase {
	constructor(
		private roomRepository: RoomRepository,
		private bookingRepository: BookingRepository
	) {}

	async handle({ id }: Request): Promise<Response> {
		const room = await this.roomRepository.findById({ id })

		if (!room) {
			return left(new NotFoundError())
		}

		const bookingExists = await this.bookingRepository.findByRoomId(
			room.id.toString()
		)

		if (bookingExists) {
			return left(new NotAllowedError())
		}

		await this.roomRepository.delete(id)

		return right(true)
	}
}
