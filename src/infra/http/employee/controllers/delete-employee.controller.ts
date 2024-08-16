import {
	BadRequestException,
	Controller,
	Delete,
	HttpCode,
	NotFoundException,
	Param
} from '@nestjs/common'
import { DeleteEmployeeUseCase } from '@/domain/employee/use-cases/delete-employee'
import { EmployeePayload, LoggedEmployee } from '@/infra/auth/logged-employee'

@Controller('/employees/:id')
export class DeleteEmployeeController {
	constructor(
		private readonly deleteEmployeeUseCase: DeleteEmployeeUseCase
	) {}

	@Delete()
	@HttpCode(204)
	async handle(
		@Param('id') id: string,
		@LoggedEmployee() employee: EmployeePayload
	) {
		if (employee.id === id) {
			throw new BadRequestException('You cannot delete yourself')
		}

		const response = await this.deleteEmployeeUseCase.handle({
			id
		})

		if (response.isLeft()) {
			throw new NotFoundException(response.value.message)
		}
	}
}
