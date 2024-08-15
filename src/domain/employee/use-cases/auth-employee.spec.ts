import { InMemoryEmployeeRepository } from '../../../../test/repositories/in-memory-employee-repository'
import { HashSimulator } from '../../../../test/services/hash-simulator'
import { TokenSimulator } from '../../../../test/services/token'
import Email from '../../shared/email'
import Employee from '../entities/employee'
import { HashRepository } from '../services/hash-repository'
import { AuthEmployeeUseCase } from './auth-employee'

let employeeRepository: InMemoryEmployeeRepository
let hashRepository: HashRepository
let tokenRepository: TokenSimulator
let useCase: AuthEmployeeUseCase

describe('Auth employee', () => {
	beforeEach(() => {
		employeeRepository = new InMemoryEmployeeRepository()
		hashRepository = new HashSimulator()
		tokenRepository = new TokenSimulator()
		useCase = new AuthEmployeeUseCase(
			employeeRepository,
			hashRepository,
			tokenRepository
		)
	})

	test('Should authenticate an employee', async () => {
		const hashedPassword = await hashRepository.hash('1234')

		const employee = Employee.create({
			name: 'Ana Maria',
			email: Email.create('ana@email.com'),
			password: hashedPassword
		})

		employeeRepository.items.push(employee)

		const response = await useCase.handle({
			email: 'ana@email.com',
			password: '1234'
		})

		expect(response.isRight()).toBe(true)
		expect(response.value).toEqual({
			token: expect.any(String),
			employee: expect.any(Employee)
		})
	})

	test('Should not authenticate an employee with a non-existent email', async () => {
		const hashedPassword = await hashRepository.hash('1234')

		const employee = Employee.create({
			name: 'Ana Maria',
			email: Email.create('ana@email.com'),
			password: hashedPassword
		})

		employeeRepository.items.push(employee)

		const response = await useCase.handle({
			email: 'ana@email',
			password: '1234'
		})

		expect(response.isLeft()).toEqual(true)
	})
	test('Should not authenticate an employee with invalid credentials', async () => {
		const hashedPassword = await hashRepository.hash('1234')

		const employee = Employee.create({
			name: 'Ana Maria',
			email: Email.create('ana@email.com'),
			password: hashedPassword
		})

		employeeRepository.items.push(employee)

		const response = await useCase.handle({
			email: 'ana@email.com',
			password: 'abc123'
		})

		expect(response.isLeft()).toEqual(true)
	})
})
