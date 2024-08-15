import { InMemoryEmployeeRepository } from '../../../../test/repositories/in-memory-employee-repository'
import { HashSimulator } from '../../../../test/services/hash-simulator'
import Email from '../../shared/email'
import Employee from '../entities/employee'
import { HashRepository } from '../services/hash-repository'
import { CreateEmployeeUseCase } from './create-employee'

let employeeRepository: InMemoryEmployeeRepository
let hashRepository: HashRepository
let useCase: CreateEmployeeUseCase

describe('Create room', () => {
	beforeEach(() => {
		employeeRepository = new InMemoryEmployeeRepository()
		hashRepository = new HashSimulator()
		useCase = new CreateEmployeeUseCase(employeeRepository, hashRepository)
	})

	test('should create a employee', async () => {
		const employee = await useCase.handle({
			email: 'gabriel@email.com',
			name: 'Gabriel',
			password: '123'
		})

		expect(employee.isRight()).toBe(true)
		expect(employeeRepository.items[0]).toEqual(employee.value)
	})

	test('Should not create an employee with an invalid email.', async () => {
		const employee = await useCase.handle({
			email: 'gabriel@',
			name: 'Gabriel',
			password: '123'
		})

		expect(employee.isLeft()).toBe(true)
	})

	test('Should not create an employee with an email that already exists.', async () => {
		const employee = Employee.create({
			email: Email.create('gabriel@email.com'),
			name: 'Gabriel',
			password: '123'
		})

		employeeRepository.items.push(employee)

		const response = await useCase.handle({
			email: 'gabriel@email.com',
			name: 'Gabriel',
			password: '123'
		})

		expect(response.isLeft()).toBe(true)
	})
})
