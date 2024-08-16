import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { RoomRepository } from '@/domain/employee/repositories/room-repository'
import { RoomPrismaMapper } from '../mappers/room-prisma-mapper'
import Room from '@/domain/employee/entities/room'

@Injectable()
export class RoomPrismaRepository implements RoomRepository {
	constructor(private readonly prismaService: PrismaService) {}

	async create(room: Room): Promise<Room> {
		const data = RoomPrismaMapper.toPersistence(room)

		const newRoom = await this.prismaService.room.create({ data })

		return RoomPrismaMapper.toDomain(newRoom)
	}

	async findMany(): Promise<Room[]> {
		const rooms = await this.prismaService.room.findMany()

		return rooms.map(RoomPrismaMapper.toDomain)
	}

	async findById(data: { id: string }): Promise<Room | null> {
		const room = await this.prismaService.room.findFirst({
			where: { id: data.id }
		})

		if (!room) return null

		return RoomPrismaMapper.toDomain(room)
	}

	async save(room: Room): Promise<void> {
		const data = RoomPrismaMapper.toPersistence(room)

		await this.prismaService.room.update({
			where: { id: room.id.toString() },
			data
		})
	}

	async delete(id: string): Promise<void> {
		await this.prismaService.room.delete({
			where: { id }
		})
	}
}
