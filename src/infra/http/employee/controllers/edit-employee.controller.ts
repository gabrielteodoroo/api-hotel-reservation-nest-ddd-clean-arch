import {
	BadRequestException,
	Body,
	Controller,
	HttpCode,
	NotFoundException,
	Param,
	Put
} from '@nestjs/common'
import { EmployeePresenter } from '@/infra/presenters/employee-presenter'
import { EditEmployeeUseCase } from '@/domain/employee/use-cases/edit-employee'
import { EditEmployeeDTO } from '../dtos/edit-employee.dto'
import { NotFoundError } from '@/core/errors/custom-errors/not-found-error'

@Controller('/employees/:id')
export class EditEmployeeController {
	constructor(private readonly editEmployeeUseCase: EditEmployeeUseCase) {}

	@Put()
	@HttpCode(204)
	async handle(@Param('id') id: string, @Body() body: EditEmployeeDTO) {
		const { email, name, password } = body

		const response = await this.editEmployeeUseCase.handle({
			id,
			email,
			name,
			password
		})

		if (response.isLeft()) {
			if (response.value.constructor === NotFoundError) {
				throw new NotFoundException(response.value.message)
			}
			throw new BadRequestException(response.value.message)
		}

		return EmployeePresenter.toHTTP(response.value)
	}
}
