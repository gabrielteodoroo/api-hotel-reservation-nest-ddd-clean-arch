import {
	BadRequestException,
	Controller,
	Delete,
	HttpCode,
	NotFoundException,
	Param
} from '@nestjs/common'
import { DeleteRoomUseCase } from '@/domain/employee/use-cases/delete-room'
import { NotAllowedError } from '@/core/errors/custom-errors/not-allowed-error'

@Controller('/rooms/:id')
export class DeleteRoomController {
	constructor(private readonly deleteRoomUseCase: DeleteRoomUseCase) {}

	@Delete()
	@HttpCode(204)
	async handle(@Param('id') id: string) {
		const response = await this.deleteRoomUseCase.handle({ id })

		if (response.isLeft()) {
			if (response.value.constructor === NotAllowedError) {
				throw new BadRequestException(response.value.message)
			}
			throw new NotFoundException(response.value.message)
		}
	}
}
