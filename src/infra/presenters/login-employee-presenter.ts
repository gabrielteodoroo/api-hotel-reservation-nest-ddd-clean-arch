import Employee from '@/domain/employee/entities/employee'

export class LoginEmployeePresenter {
	static toHTTP(entitity: Employee) {
		return {
			id: entitity.id.toString(),
			name: entitity.name,
			email: entitity.email.value
		}
	}
}
