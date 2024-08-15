import { InvalidEmailError } from '../../../core/errors/custom-errors/invalid-email-error'
import { NotFoundError } from '../../../core/errors/custom-errors/not-found-error'
import { Either, left, right } from '../../../core/errors/either/either'
import Email from '../../shared/email'
import Employee from '../entities/employee'
import { EmployeeRepository } from '../repositories/employee-repository'
import { HashRepository } from '../services/hash-repository'

type Request = {
	id: string
	name: string
	email: string
	password: string
}

type Response = Either<NotFoundError | InvalidEmailError, Employee>

export class EditEmployeeUseCase {
	constructor(
		private employeeRepository: EmployeeRepository,
		private hashRepository: HashRepository
	) {}

	async handle({ email, id, name, password }: Request): Promise<Response> {
		const employee = await this.employeeRepository.findById({ id })

		if (!employee) {
			return left(new NotFoundError())
		}

		const emailEmployee = Email.create(email)

		if (!emailEmployee.validate()) {
			return left(new InvalidEmailError())
		}

		const emailAlreadyExists = await this.employeeRepository.findByEmail({
			email
		})

		if (emailAlreadyExists && emailAlreadyExists.id.toString() !== id) {
			return left(new InvalidEmailError())
		}

		const hashedPassword = await this.hashRepository.hash(password)

		employee.name = name
		employee.email = emailEmployee
		employee.password = hashedPassword

		await this.employeeRepository.save(employee)

		return right(employee)
	}
}
