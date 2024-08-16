import {
	Body,
	Controller,
	HttpCode,
	NotFoundException,
	Param,
	Put
} from '@nestjs/common'
import { EditRoomUseCase } from '@/domain/employee/use-cases/edit-room'
import { EditRoomDTO } from '../dtos/edit-room.dto'
import { RoomPresenter } from '@/infra/presenters/room-presenter'

@Controller('/rooms/:id')
export class EditRoomController {
	constructor(private readonly editRoomUseCase: EditRoomUseCase) {}

	@Put()
	@HttpCode(204)
	async handle(@Body() body: EditRoomDTO, @Param('id') id: string) {
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

		const response = await this.editRoomUseCase.handle({
			id,
			hasAir,
			hasKitchen,
			hasWifi,
			image,
			isAvailable,
			isPetFriendly,
			name,
			price
		})

		if (response.isLeft()) {
			throw new NotFoundException(response.value.message)
		}

		return RoomPresenter.toHTTP(response.value)
	}
}
