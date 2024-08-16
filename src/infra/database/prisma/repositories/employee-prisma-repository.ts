import { EmployeeRepository } from '@/domain/employee/repositories/employee-repository'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import Employee from '@/domain/employee/entities/employee'
import { EmployeePrismaMapper } from '../mappers/employee-prisma-mapper'

@Injectable()
export class EmployeePrismaRepository implements EmployeeRepository {
	constructor(private readonly prismaService: PrismaService) {}

	async create(employee: Employee): Promise<Employee> {
		const data = EmployeePrismaMapper.toPersistence(employee)

		const newEmployee = await this.prismaService.employee.create({ data })

		return EmployeePrismaMapper.toDomain(newEmployee)
	}

	async findMany(): Promise<Employee[]> {
		const employees = await this.prismaService.employee.findMany()

		return employees.map(EmployeePrismaMapper.toDomain)
	}

	async findById(data: { id: string }): Promise<Employee | null> {
		const employee = await this.prismaService.employee.findFirst({
			where: { id: data.id }
		})

		if (!employee) return null

		return EmployeePrismaMapper.toDomain(employee)
	}

	async findByEmail(data: { email: string }): Promise<Employee | null> {
		const employee = await this.prismaService.employee.findFirst({
			where: { email: data.email }
		})

		if (!employee) return null

		return EmployeePrismaMapper.toDomain(employee)
	}

	async save(employee: Employee): Promise<void> {
		const data = EmployeePrismaMapper.toPersistence(employee)

		await this.prismaService.employee.update({
			where: { id: employee.id.toString() },
			data
		})
	}

	async delete(id: string): Promise<void> {
		await this.prismaService.employee.delete({
			where: { id }
		})
	}
}
