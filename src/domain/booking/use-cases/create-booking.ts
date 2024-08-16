import { InvalidEmailError } from '../../../core/errors/custom-errors/invalid-email-error'
import { NotFoundError } from '../../../core/errors/custom-errors/not-found-error'
import { RoomAlreaddyBookedError } from '../../../core/errors/custom-errors/room-alreaddy-booked-error'
import { Either, left, right } from '../../../core/errors/either/either'
import { RoomRepository } from '../../employee/repositories/room-repository'
import Email from '../../shared/email'
import Booking from '../entities/booking'
import { BookingRepository } from '../repositories/booking-repository'

type Request = {
	roomId: string
	days: number
	customer: string
	email: string
	isActive?: boolean
}

type Response = Either<NotFoundError | RoomAlreaddyBookedError, Booking>

export class CreateBookingUseCase {
	constructor(
		private bookingRepository: BookingRepository,
		private roomRepository: RoomRepository
	) {}

	async handle(data: Request): Promise<Response> {
		const roomExists = await this.roomRepository.findById({
			id: data.roomId
		})

		if (!roomExists) {
			return left(new NotFoundError())
		}

		if (!roomExists.isAvailable) {
			return left(new RoomAlreaddyBookedError())
		}

		const emailObject = Email.create(data.email)

		if (!emailObject.validate()) {
			return left(new InvalidEmailError())
		}

		const booking = Booking.create({
			room: roomExists,
			days: data.days,
			customer: data.customer,
			email: emailObject
		})

		await this.bookingRepository.create(booking)

		roomExists.isAvailable = false

		await this.roomRepository.save(roomExists)

		return right(booking)
	}
}
