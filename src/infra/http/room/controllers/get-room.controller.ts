import { Controller, Get, NotFoundException, Param } from '@nestjs/common'
import { RoomPresenter } from '@/infra/presenters/room-presenter'
import { Public } from '@/infra/auth/public'
import { GetRoomUseCase } from '@/domain/employee/use-cases/get-room'

@Public()
@Controller('/rooms/:id')
export class GetRoomController {
	constructor(private readonly getRoomUseCase: GetRoomUseCase) {}

	@Get()
	async handle(@Param('id') id: string) {
		const response = await this.getRoomUseCase.handle({ id })

		if (response.isLeft()) {
			throw new NotFoundException(response.value.message)
		}

		return RoomPresenter.toHTTP(response.value)
	}
}
