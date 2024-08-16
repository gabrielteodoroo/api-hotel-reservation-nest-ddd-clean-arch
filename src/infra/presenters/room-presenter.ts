import Room from '@/domain/employee/entities/room'

export class RoomPresenter {
	static toHTTP(room: Room) {
		return {
			id: room.id.toString(),
			name: room.name,
			price: room.price.value,
			image: room.image,
			hasWifi: room.hasWifi,
			hasAir: room.hasAir,
			hasKitchen: room.hasKitchen,
			isPetFriendly: room.isPetFriendly,
			isAvailable: room.isAvailable
		}
	}
}
