import { RoomRepository } from '@/domain/employee/repositories/room-repository'
import { CreateRoomUseCase } from '@/domain/employee/use-cases/create-room'
import { DatabaseModule } from '@/infra/database/database.module'
import { Module } from '@nestjs/common'
import { CreateRoomController } from './controllers/create-room.controller'
import { ListRoomsUseCase } from '@/domain/employee/use-cases/list-rooms'
import { ListRoomController } from './controllers/list-rooms.controller'

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
		}
	],
	controllers: [CreateRoomController, ListRoomController]
})
export class RoomModule {}
