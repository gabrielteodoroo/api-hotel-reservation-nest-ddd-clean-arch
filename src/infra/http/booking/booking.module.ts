import { BookingRepository } from '@/domain/booking/repositories/booking-repository'
import { CreateBookingUseCase } from '@/domain/booking/use-cases/create-booking'
import { RoomRepository } from '@/domain/employee/repositories/room-repository'
import { DatabaseModule } from '@/infra/database/database.module'
import { Module } from '@nestjs/common'
import { CreateBookingController } from './controllers/create-booking.controller'

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
		}
	],
	controllers: [CreateBookingController]
})
export class BookingModule {}
