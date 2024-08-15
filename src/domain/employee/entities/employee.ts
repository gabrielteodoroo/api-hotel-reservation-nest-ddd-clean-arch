import Entity from '../../../core/entities/entity'
import Identity from '../../../core/entities/identity'
import Email from '../../shared/email'

type EmployeeType = {
	name: string
	email: Email
	password: string
}

export default class Employee extends Entity<EmployeeType> {
	static create(data: EmployeeType, id?: Identity) {
		return new Employee(data, id)
	}

	get name() {
		return this.attributes.name
	}

	get email() {
		return this.attributes.email
	}

	get password() {
		return this.attributes.password
	}

	set name(name: string) {
		this.attributes.name = name
	}

	set email(email: Email) {
		this.attributes.email = email
	}

	set password(password: string) {
		this.attributes.password = password
	}
}
