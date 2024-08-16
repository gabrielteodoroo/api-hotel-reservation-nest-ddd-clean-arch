import Identity from '@/core/entities/identity'
import Booking from '@/domain/booking/entities/booking'
import Room from '@/domain/employee/entities/room'
import Email from '@/domain/shared/email'
import Money from '@/domain/shared/money'
import { Booking as BookingPrisma, Prisma } from '@prisma/client'

type BookingDatabase = Prisma.BookingGetPayload<{
	include: {
		room: true
	}
}>

export class BookingPrismaMapper {
	static toDomain(entity: BookingDatabase): Booking {
		return Booking.create(
			{
				customer: entity.customer,
				days: entity.days,
				email: Email.create(entity.email),
				isActive: entity.isActive,
				room: Room.create(
					{
						...entity.room,
						price: Money.create(entity.room.price)
					},
					new Identity(entity.room.id)
				)
			},
			new Identity(entity.id)
		)
	}

	static toPersistence(entity: Booking): BookingPrisma {
		return {
			id: entity.id.toString(),
			customer: entity.customer,
			days: entity.days,
			email: entity.email.value,
			isActive: entity.isActive,
			roomId: entity.room.id.toString()
		}
	}
}
