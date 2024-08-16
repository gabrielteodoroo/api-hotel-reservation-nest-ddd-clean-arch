import { CreateEmployeeUseCase } from '@/domain/employee/use-cases/create-employee'
import { EmployeePresenter } from '@/infra/presenters/employee-presenter'
import {
	BadRequestException,
	Body,
	Controller,
	HttpCode,
	Post
} from '@nestjs/common'
import { CreateEmployeeDTO } from '../dtos/create-employee.dto'

@Controller('/employees')
export class CreateEmployeeController {
	constructor(
		private readonly createEmployeeUseCase: CreateEmployeeUseCase
	) {}

	@Post()
	@HttpCode(201)
	async handle(@Body() body: CreateEmployeeDTO) {
		const { name, email, password } = body
		const response = await this.createEmployeeUseCase.handle({
			name,
			email,
			password
		})

		if (response.isLeft()) {
			throw new BadRequestException(response.value.message)
		}

		return EmployeePresenter.toHTTP(response.value)
	}
}
