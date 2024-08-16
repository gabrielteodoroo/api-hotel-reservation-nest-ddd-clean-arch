import { BookingRepository } from '@/domain/booking/repositories/booking-repository'
import { CreateBookingUseCase } from '@/domain/booking/use-cases/create-booking'
import { RoomRepository } from '@/domain/employee/repositories/room-repository'
import { DatabaseModule } from '@/infra/database/database.module'
import { Module } from '@nestjs/common'
import { CreateBookingController } from './controllers/create-booking.controller'
import { ListBookingsUseCase } from '@/domain/booking/use-cases/list-bookings'
import { ListBookingsController } from './controllers/list-bookings.controller'

@Module({
	imports: [DatabaseModule],
	providers: [
		{
			provide: CreateBookingUseCase,
			useFactory: (
				bookingRepository: BookingRepository,
				roomRepository: RoomRepository
			) => {
				return new CreateBookingUseCase(
					bookingRepository,
					roomRepository
				)
			},
			inject: [BookingRepository, RoomRepository]
		},
		{
			provide: ListBookingsUseCase,
			useFactory: (bookingRepository: BookingRepository) => {
				return new ListBookingsUseCase(bookingRepository)
			},
			inject: [BookingRepository]
		}
	],
	controllers: [CreateBookingController, ListBookingsController]
})
export class BookingModule {}
