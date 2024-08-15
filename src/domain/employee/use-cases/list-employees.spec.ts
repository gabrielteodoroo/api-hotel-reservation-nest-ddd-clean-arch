import { InMemoryEmployeeRepository } from '../../../../test/repositories/in-memory-employee-repository'
import Email from '../../shared/email'
import Employee from '../entities/employee'
import { ListEmployeesUseCase } from './list-employees'

let employeeRepository: InMemoryEmployeeRepository
let useCase: ListEmployeesUseCase

describe('List employees', () => {
	beforeEach(() => {
		employeeRepository = new InMemoryEmployeeRepository()
		useCase = new ListEmployeesUseCase(employeeRepository)
	})

	test('should list employees', async () => {
		const employee = Employee.create({
			name: 'Gabriel Teodoro',
			email: Email.create('gabriel@email.com'),
			password: '123'
		})

		employeeRepository.items.push(employee)

		const response = await useCase.handle()

		expect(response.value).toHaveLength(1)
		expect(response.isRight()).toBe(true)
	})

	test('should return empty array if there are no employees', async () => {
		const response = await useCase.handle()

		expect(response.isRight()).toBe(true)
		expect(response.value).toHaveLength(0)
	})
})
