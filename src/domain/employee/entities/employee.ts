import { Optional } from '@/core/types/optional'
import Entity from '../../../core/entities/entity'
import Identity from '../../../core/entities/identity'
import Email from '../../shared/email'

type EmployeeType = {
	name: string
	email: Email
	password: string
	createdAt: Date
	updatedAt: Date
}

export default class Employee extends Entity<EmployeeType> {
	static create(
		data: Optional<EmployeeType, 'createdAt' | 'updatedAt'>,
		id?: Identity
	) {
		const now = new Date()
		return new Employee(
			{
				...data,
				createdAt: data.createdAt ?? now,
				updatedAt: data.updatedAt ?? now
			},
			id
		)
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

	get createdAt() {
		return this.attributes.createdAt
	}

	get updatedAt() {
		return this.attributes.updatedAt
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
