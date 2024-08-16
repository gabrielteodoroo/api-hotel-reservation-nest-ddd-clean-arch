import Identity from '@/core/entities/identity'
import Employee from '@/domain/employee/entities/employee'
import Email from '@/domain/shared/email'
import { Employee as EmployeeDatabase } from '@prisma/client'

export class EmployeePrismaMapper {
	static toDomain(entity: EmployeeDatabase): Employee {
		return Employee.create(
			{
				name: entity.name,
				email: Email.create(entity.email),
				password: entity.password
			},
			new Identity(entity.id)
		)
	}

	static toPersistence(entity: Employee): EmployeeDatabase {
		return {
			id: entity.id.toString(),
			name: entity.name,
			email: entity.email.value,
			password: entity.password
		}
	}
}
