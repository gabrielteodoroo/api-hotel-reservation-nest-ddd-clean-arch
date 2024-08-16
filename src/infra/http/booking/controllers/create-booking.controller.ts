import {
	BadRequestException,
	Body,
	Controller,
	HttpCode,
	NotFoundException,
	Post
} from '@nestjs/common'
import { CreateBookingUseCase } from '@/domain/booking/use-cases/create-booking'
import { CreateBookingDTO } from '../dtos/create-booking.dto'
import { Public } from '@/infra/auth/public'
import { NotFoundError } from 'rxjs'
import { BookingPresenter } from '@/infra/presenters/booking-presenter'

@Controller('/bookings')
@Public()
export class CreateBookingController {
	constructor(private readonly createBookingUseCase: CreateBookingUseCase) {}

	@Post()
	@HttpCode(201)
	async handle(@Body() body: CreateBookingDTO) {
		const { customer, days, email, roomId, isActive } = body

		const response = await this.createBookingUseCase.handle({
			customer,
			days,
			email,
			roomId,
			isActive
		})

		if (response.isLeft()) {
			if (response.value.constructor === NotFoundError) {
				throw new NotFoundException(response.value.message)
			}

			throw new BadRequestException(response.value.message)
		}

		return BookingPresenter.toHTTP(response.value)
	}
}
