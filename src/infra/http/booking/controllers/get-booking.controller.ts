import { Controller, Get, NotFoundException, Param } from '@nestjs/common'

import { BookingPresenter } from '@/infra/presenters/booking-presenter'
import { Public } from '@/infra/auth/public'
import { GetBookingUseCase } from '@/domain/booking/use-cases/get-booking'

@Controller('/bookings/:id')
@Public()
export class GetBookingController {
	constructor(private readonly getBookingUseCase: GetBookingUseCase) {}

	@Get()
	async handle(@Param('id') id: string) {
		const response = await this.getBookingUseCase.handle({ id })

		if (response.isLeft()) {
			throw new NotFoundException(response.value.message)
		}

		return BookingPresenter.toHTTP(response.value)
	}
}
