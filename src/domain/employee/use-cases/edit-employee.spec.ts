import { InMemoryEmployeeRepository } from '../../../../test/repositories/in-memory-employee-repository'
import { HashSimulator } from '../../../../test/services/hash-simulator'
import Email from '../../shared/email'
import Employee from '../entities/employee'
import { HashRepository } from '../services/hash-repository'
import { EditEmployeeUseCase } from './edit-employee'

let employeeRepository: InMemoryEmployeeRepository
let hashRepository: HashRepository
let useCase: EditEmployeeUseCase

describe('Edit employee', () => {
	beforeEach(() => {
		employeeRepository = new InMemoryEmployeeRepository()
		hashRepository = new HashSimulator()
		useCase = new EditEmployeeUseCase(employeeRepository, hashRepository)
	})

	test('should edit a employee', async () => {
		const employee = Employee.create({
			name: 'Ana Maria',
			email: Email.create('ana@email.com'),
			password: '123'
		})

		employeeRepository.items.push(employee)

		const editedEmployee = await useCase.handle({
			id: employee.id.toString(),
			name: 'Ana Maria Silva',
			email: 'anasilva@email.com',
			password: '1234'
		})

		expect(employeeRepository.items[0]).toEqual(editedEmployee.value)
		expect(editedEmployee.isRight()).toBe(true)
	})

	test('should returns null if invalid id is provided', async () => {
		const response = await useCase.handle({
			id: '1',
			name: 'Ana Maria Silva',
			email: 'anasilva@email.com',
			password: '1234'
		})

		expect(response.isLeft()).toEqual(true)
	})

	test('Should return null if an invalid email is provided.', async () => {
		const employee = Employee.create({
			name: 'Ana Maria',
			email: Email.create('ana@email.com'),
			password: '123'
		})

		employeeRepository.items.push(employee)

		const response = await useCase.handle({
			id: employee.id.toString(),
			name: 'Ana Maria Silva',
			email: 'ana@email',
			password: '1234'
		})

		expect(response.isLeft()).toEqual(true)
	})

	test('Should return null if an existing email is provided.', async () => {
		const ana = Employee.create({
			name: 'Ana Maria',
			email: Email.create('ana@email.com'),
			password: '123'
		})

		employeeRepository.items.push(ana)

		const anaSilva = Employee.create({
			name: 'Ana Maria Silva',
			email: Email.create('anasilva@email.com'),
			password: '123'
		})

		employeeRepository.items.push(anaSilva)

		const response = await useCase.handle({
			id: ana.id.toString(),
			name: 'Ana Maria Silva',
			email: 'anasilva@email.com',
			password: '1234'
		})

		expect(response.isLeft()).toEqual(true)
	})
})
