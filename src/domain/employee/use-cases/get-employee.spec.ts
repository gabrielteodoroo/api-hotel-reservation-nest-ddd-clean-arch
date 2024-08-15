import { InMemoryEmployeeRepository } from '../../../../test/repositories/in-memory-employee-repository'
import Email from '../../shared/email'
import Employee from '../entities/employee'
import { GetEmployeeUseCase } from './get-employee'

let employeeRepository: InMemoryEmployeeRepository
let useCase: GetEmployeeUseCase

describe('Detail employee', () => {
	beforeEach(() => {
		employeeRepository = new InMemoryEmployeeRepository()
		useCase = new GetEmployeeUseCase(employeeRepository)
	})

	test('should return a employee by id', async () => {
		const employee = Employee.create({
			name: 'Gabriel Teodoro',
			email: Email.create('gabriel@email.com'),
			password: '123'
		})

		employeeRepository.items.push(employee)

		const response = await useCase.handle({
			id: employee.id.toString()
		})

		expect(employeeRepository.items[0]).toEqual(response.value)
		expect(response.isRight()).toBe(true)
	})

	test('should return null if invalid id is provided', async () => {
		const response = await useCase.handle({
			id: '1'
		})

		expect(response.isLeft()).toBe(true)
	})
})
