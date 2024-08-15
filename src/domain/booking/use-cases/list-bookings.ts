import { Either, right } from '../../../core/errors/either/either'
import Booking from '../entities/booking'
import { BookingRepository } from '../repositories/booking-repository'

type Response = Either<null, Booking[]>

export class ListBookingsUseCase {
	constructor(private roomRepository: BookingRepository) {}

	async handle(): Promise<Response> {
		const bookings = await this.roomRepository.findMany()

		return right(bookings)
	}
}
