import { Module } from '@nestjs/common'
import { CreateEmployeeController } from './controllers/create-employee.controller'
import { CreateEmployeeUseCase } from '@/domain/employee/use-cases/create-employee'
import { EmployeeRepository } from '@/domain/employee/repositories/employee-repository'
import { HashRepository } from '@/domain/employee/services/hash-repository'
import { CryptoModule } from '@/infra/crypto/crypto.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { AuthEmployeeUseCase } from '@/domain/employee/use-cases/auth-employee'
import { TokenRepository } from '@/domain/employee/services/token-repository'
import { LoginController } from './controllers/login.controller'
import { ListEmployeesUseCase } from '@/domain/employee/use-cases/list-employees'
import { ListEmployeesController } from './controllers/list-employees.controller'
import { GetEmployeeUseCase } from '@/domain/employee/use-cases/get-employee'
import { GetEmployeeController } from './controllers/get-employee.controller'
import { EditEmployeeUseCase } from '@/domain/employee/use-cases/edit-employee'
import { EditEmployeeController } from './controllers/edit-employee.controller'
import { DeleteEmployeeUseCase } from '@/domain/employee/use-cases/delete-employee'
import { DeleteEmployeeController } from './controllers/delete-employee.controller'

@Module({
	imports: [CryptoModule, DatabaseModule],
	providers: [
		{
			provide: CreateEmployeeUseCase,
			useFactory: (
				employeeRepository: EmployeeRepository,
				hashRepository: HashRepository
			) => {
				return new CreateEmployeeUseCase(
					employeeRepository,
					hashRepository
				)
			},
			inject: [EmployeeRepository, HashRepository]
		},

		{
			provide: AuthEmployeeUseCase,
			useFactory: (
				employeeRepository: EmployeeRepository,
				hashRepository: HashRepository,
				tokenRepository: TokenRepository
			) => {
				return new AuthEmployeeUseCase(
					employeeRepository,
					hashRepository,
					tokenRepository
				)
			},
			inject: [EmployeeRepository, HashRepository, TokenRepository]
		},

		{
			provide: ListEmployeesUseCase,
			useFactory: (employeeRepository: EmployeeRepository) => {
				return new ListEmployeesUseCase(employeeRepository)
			},
			inject: [EmployeeRepository]
		},

		{
			provide: GetEmployeeUseCase,
			useFactory: (employeeRepository: EmployeeRepository) => {
				return new GetEmployeeUseCase(employeeRepository)
			},
			inject: [EmployeeRepository]
		},

		{
			provide: EditEmployeeUseCase,
			useFactory: (
				employeeRepository: EmployeeRepository,
				hashRepository: HashRepository
			) => {
				return new EditEmployeeUseCase(
					employeeRepository,
					hashRepository
				)
			},
			inject: [EmployeeRepository, HashRepository]
		},
		{
			provide: DeleteEmployeeUseCase,
			useFactory: (employeeRepository: EmployeeRepository) => {
				return new DeleteEmployeeUseCase(employeeRepository)
			},
			inject: [EmployeeRepository]
		}
	],
	controllers: [
		CreateEmployeeController,
		LoginController,
		ListEmployeesController,
		GetEmployeeController,
		EditEmployeeController,
		DeleteEmployeeController
	]
})
export class EmployeeModule {}
