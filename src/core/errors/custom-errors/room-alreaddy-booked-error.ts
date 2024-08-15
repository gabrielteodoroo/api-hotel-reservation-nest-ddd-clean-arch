import { BaseError } from '../base-error'

export class RoomAlreaddyBookedError extends BaseError {
	constructor() {
		super('Room Alreaddy Booked')
	}
}
