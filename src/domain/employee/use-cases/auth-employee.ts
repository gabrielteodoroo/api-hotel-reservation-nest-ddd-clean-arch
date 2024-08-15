import { InvalidCredentialsError } from '../../../core/errors/custom-errors/invalid-credentials-error'
import { Either, left, right } from '../../../core/errors/either/either'
import Employee from '../entities/employee'
import { EmployeeRepository } from '../repositories/employee-repository'
import { HashRepository } from '../services/hash-repository'
import { TokenRepository } from '../services/token-repository'

type Request = {
	email: string
	password: string
}

type Response = Either<
	InvalidCredentialsError,
	{ employee: Employee; token: string }
>

export class AuthEmployeeUseCase {
	constructor(
		private employeeRepository: EmployeeRepository,
		private hashRepository: HashRepository,
		private tokenRepository: TokenRepository
	) {}

	async handle({ email, password }: Request): Promise<Response> {
		const employee = await this.employeeRepository.findByEmail({ email })

		if (!employee) {
			return left(new InvalidCredentialsError())
		}

		const passwordMatch = await this.hashRepository.compare(
			password,
			employee.password
		)

		if (!passwordMatch) {
			return left(new InvalidCredentialsError())
		}

		const token = this.tokenRepository.generate({
			id: employee.id.toString(),
			email: employee.email.value,
			name: employee.name
		})

		return right({ employee, token })
	}
}
