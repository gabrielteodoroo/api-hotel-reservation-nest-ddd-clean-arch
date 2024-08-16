import { Controller, Get } from '@nestjs/common'

import { BookingPresenter } from '@/infra/presenters/booking-presenter'
import { ListBookingsUseCase } from '@/domain/booking/use-cases/list-bookings'

@Controller('/bookings')
export class ListBookingsController {
	constructor(private readonly listBookingUseCase: ListBookingsUseCase) {}

	@Get()
	async handle() {
		const response = await this.listBookingUseCase.handle()

		return response.value.map(BookingPresenter.toHTTP)
	}
}
