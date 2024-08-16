import { Controller, Get, NotFoundException, Param } from '@nestjs/common'
import { EmployeePresenter } from '@/infra/presenters/employee-presenter'
import { GetEmployeeUseCase } from '@/domain/employee/use-cases/get-employee'

@Controller('/employees/:id')
export class GetEmployeeController {
	constructor(private readonly getEmployeeUseCase: GetEmployeeUseCase) {}

	@Get()
	async handle(@Param('id') id: string) {
		const response = await this.getEmployeeUseCase.handle({ id })

		if (response.isLeft()) {
			throw new NotFoundException(response.value.message)
		}

		return EmployeePresenter.toHTTP(response.value)
	}
}
