import { Either, right } from '../../../core/errors/either/either'
import Employee from '../entities/employee'
import { EmployeeRepository } from '../repositories/employee-repository'

type Response = Either<null, Employee[]>
export class ListEmployeesUseCase {
	constructor(private employeeRepository: EmployeeRepository) {}

	async handle(): Promise<Response> {
		const employees = await this.employeeRepository.findMany()

		return right(employees)
	}
}
