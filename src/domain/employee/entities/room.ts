import Entity from '../../../core/entities/entity'
import Identity from '../../../core/entities/identity'
import { Optional } from '../../../core/types/optional'
import Money from '../../shared/money'

type RoomType = {
	name: string
	price: Money
	image: string
	hasWifi: boolean
	hasAir: boolean
	hasKitchen: boolean
	isPetFriendly: boolean
	isAvailable: boolean
}

export default class Room extends Entity<RoomType> {
	static create(
		data: Optional<
			RoomType,
			| 'hasWifi'
			| 'hasAir'
			| 'hasKitchen'
			| 'isPetFriendly'
			| 'isAvailable'
		>,
		id?: Identity
	) {
		return new Room(
			{
				...data,
				hasWifi: data.hasWifi ?? false,
				hasAir: data.hasAir ?? false,
				hasKitchen: data.hasKitchen ?? false,
				isPetFriendly: data.isPetFriendly ?? false,
				isAvailable: data.isAvailable ?? true
			},
			id
		)
	}

	get name() {
		return this.attributes.name
	}

	get price() {
		return this.attributes.price
	}

	get image() {
		return this.attributes.image
	}

	get hasWifi() {
		return this.attributes.hasWifi
	}

	get hasAir() {
		return this.attributes.hasAir
	}

	get hasKitchen() {
		return this.attributes.hasKitchen
	}

	get isPetFriendly() {
		return this.attributes.isPetFriendly
	}

	get isAvailable() {
		return this.attributes.isAvailable
	}

	set name(name: string) {
		this.attributes.name = name
	}

	set price(price: Money) {
		this.attributes.price = price
	}

	set image(image: string) {
		this.attributes.image = image
	}

	set hasWifi(hasWifi: boolean) {
		this.attributes.hasWifi = hasWifi
	}

	set hasAir(hasAir: boolean) {
		this.attributes.hasAir = hasAir
	}

	set hasKitchen(hasKitchen: boolean) {
		this.attributes.hasKitchen = hasKitchen
	}

	set isPetFriendly(isPetFriendly: boolean) {
		this.attributes.isPetFriendly = isPetFriendly
	}

	set isAvailable(isAvailable: boolean) {
		this.attributes.isAvailable = isAvailable
	}
}
