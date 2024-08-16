import Booking from '@/domain/booking/entities/booking'
import { RoomPresenter } from './room-presenter'

export class BookingPresenter {
	static toHTTP(entity: Booking) {
		return {
			id: entity.id.toString(),
			email: entity.email.value,
			customer: entity.customer,
			days: entity.days,
			isActive: entity.isActive,
			room: RoomPresenter.toHTTP(entity.room)
		}
	}
}
