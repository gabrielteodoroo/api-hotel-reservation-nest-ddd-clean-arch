import Room from '../../employee/entities/room'
import Identity from '../../../core/entities/identity'
import { Optional } from '../../../core/types/optional'
import AggregateRoot from '../../../core/entities/aggregate-root'
import Email from '../../shared/email'

type BookingType = {
	room: Room
	days: number
	customer: string
	email: Email
	isActive: boolean
	createdAt: Date
	updatedAt: Date
}

export default class Booking extends AggregateRoot<BookingType> {
	static create(
		data: Optional<BookingType, 'isActive' | 'createdAt' | 'updatedAt'>,
		id?: Identity
	) {
		const now = new Date()
		return new Booking(
			{
				...data,
				isActive: data.isActive ?? true,
				createdAt: data.createdAt ?? now,
				updatedAt: data.updatedAt ?? now
			},
			id
		)
	}

	get room() {
		return this.attributes.room
	}

	get days() {
		return this.attributes.days
	}

	get customer() {
		return this.attributes.customer
	}

	get email() {
		return this.attributes.email
	}

	get isActive() {
		return this.attributes.isActive
	}

	get createdAt() {
		return this.attributes.createdAt
	}

	get updatedAt() {
		return this.attributes.updatedAt
	}

	set isActive(isActive: boolean) {
		this.attributes.isActive = isActive
	}
}
