import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { CreateRoomUseCase } from '@/domain/employee/use-cases/create-room'
import { CreateRoomDTO } from '../dtos/create-room.dto'
import { RoomPresenter } from '@/infra/presenters/room-presenter'

@Controller('/rooms')
export class CreateRoomController {
	constructor(private readonly createRoomUseCase: CreateRoomUseCase) {}

	@Post()
	@HttpCode(201)
	async handle(@Body() body: CreateRoomDTO) {
		const {
			hasAir,
			hasKitchen,
			hasWifi,
			image,
			isAvailable,
			isPetFriendly,
			name,
			price
		} = body

		const response = await this.createRoomUseCase.handle({
			hasAir,
			hasKitchen,
			hasWifi,
			image,
			isAvailable,
			isPetFriendly,
			name,
			price
		})

		return RoomPresenter.toHTTP(response.value)
	}
}
