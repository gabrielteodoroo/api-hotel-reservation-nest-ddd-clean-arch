import Employee from '../../src/domain/employee/entities/employee'
import { EmployeeRepository } from '../../src/domain/employee/repositories/employee-repository'

export class InMemoryEmployeeRepository extends EmployeeRepository {
	items: Employee[] = []

	async create(employee: Employee) {
		this.items.push(employee)
		return employee
	}

	async findMany() {
		return this.items
	}

	async findById({ id }: { id: string }) {
		const employee = this.items.find(item => item.id.toString() === id)

		if (!employee) {
			return null
		}

		return employee
	}

	async save(employee: Employee) {
		const itemIndex = this.items.findIndex(item => item.id === employee.id)

		this.items[itemIndex] = employee
	}

	async delete(id: string) {
		const itemIndex = this.items.findIndex(
			item => item.id.toString() === id
		)

		this.items.splice(itemIndex, 1)
	}

	async findByEmail(data: { email: string }): Promise<Employee | null> {
		const employee = this.items.find(
			item => item.email.value === data.email
		)

		if (!employee) {
			return null
		}

		return employee
	}
}
