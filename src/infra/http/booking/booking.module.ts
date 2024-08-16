import { BookingRepository } from '@/domain/booking/repositories/booking-repository'
import { CreateBookingUseCase } from '@/domain/booking/use-cases/create-booking'
import { RoomRepository } from '@/domain/employee/repositories/room-repository'
import { DatabaseModule } from '@/infra/database/database.module'
import { Module } from '@nestjs/common'
import { CreateBookingController } from './controllers/create-booking.controller'
import { ListBookingsUseCase } from '@/domain/booking/use-cases/list-bookings'
import { ListBookingsController } from './controllers/list-bookings.controller'
import { GetBookingUseCase } from '@/domain/booking/use-cases/get-booking'
import { GetBookingController } from './controllers/get-booking.controller'
import { CancelBookingUseCase } from '@/domain/booking/use-cases/cancel-booking'
import { CancelBookingController } from './controllers/cancel-booking.controller'

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
		},
		{
			provide: GetBookingUseCase,
			useFactory: (bookingRepository: BookingRepository) => {
				return new GetBookingUseCase(bookingRepository)
			},
			inject: [BookingRepository]
		},
		{
			provide: CancelBookingUseCase,
			useFactory: (
				bookingRepository: BookingRepository,
				roomRepository: RoomRepository
			) => {
				return new CancelBookingUseCase(
					bookingRepository,
					roomRepository
				)
			},
			inject: [BookingRepository, RoomRepository]
		}
	],
	controllers: [
		CreateBookingController,
		ListBookingsController,
		GetBookingController,
		CancelBookingController
	]
})
export class BookingModule {}
