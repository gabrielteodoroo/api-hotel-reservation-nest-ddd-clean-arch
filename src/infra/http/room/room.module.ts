import { RoomRepository } from '@/domain/employee/repositories/room-repository'
import { CreateRoomUseCase } from '@/domain/employee/use-cases/create-room'
import { DatabaseModule } from '@/infra/database/database.module'
import { Module } from '@nestjs/common'
import { CreateRoomController } from './controllers/create-room.controller'
import { ListRoomsUseCase } from '@/domain/employee/use-cases/list-rooms'
import { ListRoomController } from './controllers/list-rooms.controller'
import { GetRoomUseCase } from '@/domain/employee/use-cases/get-room'
import { GetRoomController } from './controllers/get-room.controller'
import { EditRoomUseCase } from '@/domain/employee/use-cases/edit-room'
import { EditRoomController } from './controllers/edit-room.controller'
import { DeleteRoomUseCase } from '@/domain/employee/use-cases/delete-room'
import { BookingRepository } from '@/domain/booking/repositories/booking-repository'
import { DeleteRoomController } from './controllers/delete-room.controller'

@Module({
	imports: [DatabaseModule],
	providers: [
		{
			provide: CreateRoomUseCase,
			useFactory: (roomRepository: RoomRepository) => {
				return new CreateRoomUseCase(roomRepository)
			},
			inject: [RoomRepository]
		},
		{
			provide: ListRoomsUseCase,
			useFactory: (roomRepository: RoomRepository) => {
				return new ListRoomsUseCase(roomRepository)
			},
			inject: [RoomRepository]
		},
		{
			provide: GetRoomUseCase,
			useFactory: (roomRepository: RoomRepository) => {
				return new GetRoomUseCase(roomRepository)
			},
			inject: [RoomRepository]
		},
		{
			provide: EditRoomUseCase,
			useFactory: (roomRepository: RoomRepository) => {
				return new EditRoomUseCase(roomRepository)
			},
			inject: [RoomRepository]
		},
		{
			provide: DeleteRoomUseCase,
			useFactory: (
				roomRepository: RoomRepository,
				bookingRepository: BookingRepository
			) => {
				return new DeleteRoomUseCase(roomRepository, bookingRepository)
			},
			inject: [RoomRepository, BookingRepository]
		}
	],
	controllers: [
		CreateRoomController,
		ListRoomController,
		GetRoomController,
		EditRoomController,
		DeleteRoomController
	]
})
export class RoomModule {}
