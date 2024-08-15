import Room from '../entities/room'

export abstract class RoomRepository {
	abstract create(data: Room): Promise<Room>
	abstract findMany(): Promise<Room[]>
	abstract findById(data: { id: string }): Promise<Room | null>
	abstract save(data: Room): Promise<void>
	abstract delete(id: string): Promise<void>
}
