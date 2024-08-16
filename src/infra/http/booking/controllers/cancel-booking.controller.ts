import {
	Controller,
	HttpCode,
	NotFoundException,
	Param,
	Patch
} from '@nestjs/common'
import { CancelBookingUseCase } from '@/domain/booking/use-cases/cancel-booking'

@Controller('/bookings/:id')
export class CancelBookingController {
	constructor(private readonly cancelBooking: CancelBookingUseCase) {}

	@Patch()
	@HttpCode(204)
	async handle(@Param('id') id: string) {
		const response = await this.cancelBooking.handle({
			bookingId: id
		})

		if (response.isLeft()) {
			throw new NotFoundException(response.value.message)
		}
	}
}
