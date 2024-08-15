import { InvalidEmailError } from '../../../core/errors/custom-errors/invalid-email-error'
import { NotAllowedError } from '../../../core/errors/custom-errors/not-allowed-error'
import { Either, left, right } from '../../../core/errors/either/either'
import Email from '../../shared/email'
import Employee from '../entities/employee'
import { EmployeeRepository } from '../repositories/employee-repository'
import { HashRepository } from '../services/hash-repository'

type Request = {
	name: string
	email: string
	password: string
}

type Response = Either<NotAllowedError | InvalidEmailError, Employee>

export class CreateEmployeeUseCase {
	constructor(
		private employeeRepository: EmployeeRepository,
		private hashRepository: HashRepository
	) {}

	async handle({ email, name, password }: Request): Promise<Response> {
		const emailExists = await this.employeeRepository.findByEmail({ email })

		if (emailExists) {
			return left(new NotAllowedError())
		}

		const emailEmployee = Email.create(email)

		if (!emailEmployee.validate()) {
			return left(new InvalidEmailError())
		}

		const passwordEmployee = await this.hashRepository.hash(password)

		const employee = Employee.create({
			email: emailEmployee,
			name,
			password: passwordEmployee
		})

		await this.employeeRepository.create(employee)

		return right(employee)
	}
}
