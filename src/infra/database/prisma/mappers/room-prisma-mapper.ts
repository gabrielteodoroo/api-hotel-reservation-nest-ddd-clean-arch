import Identity from '@/core/entities/identity'
import Room from '@/domain/employee/entities/room'
import Money from '@/domain/shared/money'
import { Room as RoomDatabase } from '@prisma/client'

export class RoomPrismaMapper {
	static toDomain(entity: RoomDatabase): Room {
		return Room.create(
			{
				image: entity.image,
				name: entity.name,
				price: Money.create(entity.price),
				hasAir: entity.hasAir,
				hasKitchen: entity.hasKitchen,
				hasWifi: entity.hasWifi,
				isAvailable: entity.isAvailable,
				isPetFriendly: entity.isPetFriendly,
				createdAt: entity.createdAt,
				updatedAt: entity.updatedAt
			},
			new Identity(entity.id)
		)
	}

	static toPersistence(entity: Room): RoomDatabase {
		return {
			id: entity.id.toString(),
			image: entity.image,
			name: entity.name,
			price: entity.price.value,
			hasAir: entity.hasAir,
			hasKitchen: entity.hasKitchen,
			hasWifi: entity.hasWifi,
			isAvailable: entity.isAvailable,
			isPetFriendly: entity.isPetFriendly,
			createdAt: entity.createdAt,
			updatedAt: entity.updatedAt
		}
	}
}
