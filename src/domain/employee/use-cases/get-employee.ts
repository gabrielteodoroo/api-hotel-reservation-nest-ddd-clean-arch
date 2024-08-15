import { NotFoundError } from '../../../core/errors/custom-errors/not-found-error'
import { Either, left, right } from '../../../core/errors/either/either'
import Employee from '../entities/employee'
import { EmployeeRepository } from '../repositories/employee-repository'

type Request = {
	id: string
}

type Response = Either<NotFoundError, Employee>

export class GetEmployeeUseCase {
	constructor(private employeeRepository: EmployeeRepository) {}

	async handle({ id }: Request): Promise<Response> {
		const employee = await this.employeeRepository.findById({ id })

		if (!employee) {
			return left(new NotFoundError())
		}

		return right(employee)
	}
}
