import { Controller, Get } from '@nestjs/common'
import { RoomPresenter } from '@/infra/presenters/room-presenter'
import { ListRoomsUseCase } from '@/domain/employee/use-cases/list-rooms'
import { Public } from '@/infra/auth/public'

@Public()
@Controller('/rooms')
export class ListRoomController {
	constructor(private readonly listRoomUseCase: ListRoomsUseCase) {}

	@Get()
	async handle() {
		const response = await this.listRoomUseCase.handle()

		return response.value.map(RoomPresenter.toHTTP)
	}
}
