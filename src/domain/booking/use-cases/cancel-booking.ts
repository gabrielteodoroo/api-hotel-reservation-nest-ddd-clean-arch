import { NotFoundError } from '../../../core/errors/custom-errors/not-found-error'
import { Either, left, right } from '../../../core/errors/either/either'
import { RoomRepository } from '../../employee/repositories/room-repository'
import { BookingRepository } from '../repositories/booking-repository'

type Request = {
	bookingId: string
}

type Response = Either<NotFoundError, boolean>

export class CancelBookingUseCase {
	constructor(
		private bookingRepository: BookingRepository,
		private roomRepository: RoomRepository
	) {}

	async handle({ bookingId }: Request): Promise<Response> {
		const bookingExists = await this.bookingRepository.findById(bookingId)

		if (!bookingExists) {
			return left(new NotFoundError())
		}

		bookingExists.isActive = false

		await this.bookingRepository.cancel(bookingExists)

		const { room } = bookingExists

		room.isAvailable = true

		await this.roomRepository.save(room)

		return right(true)
	}
}
