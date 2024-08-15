import { InMemoryEmployeeRepository } from '../../../../test/repositories/in-memory-employee-repository'
import Identity from '../../../core/entities/identity'
import Email from '../../shared/email'
import Employee from '../entities/employee'
import { DeleteEmployeeUseCase } from './delete-employee'

let employeeRepository: InMemoryEmployeeRepository
let useCase: DeleteEmployeeUseCase

describe('Delete employee', () => {
	beforeEach(() => {
		employeeRepository = new InMemoryEmployeeRepository()
		useCase = new DeleteEmployeeUseCase(employeeRepository)

		const employee = Employee.create(
			{
				name: 'Gabriel Teodoro',
				email: Email.create('gabriel@email.com'),
				password: '123456'
			},
			new Identity('1')
		)

		employeeRepository.items.push(employee)
	})

	test('should delete a employee', async () => {
		expect(employeeRepository.items).toHaveLength(1)
		const response = await useCase.handle({ id: '1' })

		expect(response.isRight()).toBe(true)
		expect(employeeRepository.items).toHaveLength(0)
	})

	test('should returns null if invalid id is provided', async () => {
		const response = await useCase.handle({ id: '2' })

		expect(response.isLeft()).toBe(true)
	})
})
