import { Controller, Get } from '@nestjs/common'
import { ListEmployeesUseCase } from '@/domain/employee/use-cases/list-employees'
import { EmployeePresenter } from '@/infra/presenters/employee-presenter'

@Controller('/employees')
export class ListEmployeesController {
	constructor(private readonly listEmployeeUseCase: ListEmployeesUseCase) {}

	@Get()
	async handle() {
		const response = await this.listEmployeeUseCase.handle()

		return response.value.map(EmployeePresenter.toHTTP)
	}
}
