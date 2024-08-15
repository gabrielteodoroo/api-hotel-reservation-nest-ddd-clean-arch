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
}

export default class Booking extends AggregateRoot<BookingType> {
	static create(data: Optional<BookingType, 'isActive'>, id?: Identity) {
		return new Booking({ ...data, isActive: data.isActive ?? true }, id)
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

	set isActive(isActive: boolean) {
		this.attributes.isActive = isActive
	}
}
