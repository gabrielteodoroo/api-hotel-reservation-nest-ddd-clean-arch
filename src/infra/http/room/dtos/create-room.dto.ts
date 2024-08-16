import { IsBoolean, IsInt, IsNotEmpty, IsOptional } from 'class-validator'

export class CreateRoomDTO {
	@IsNotEmpty({ message: 'Name is required' })
	name: string

	@IsNotEmpty({ message: 'Price is required' })
	@IsInt({ message: 'Price must be a number' })
	price: number

	@IsNotEmpty({ message: 'Image is required' })
	image: string

	@IsOptional()
	@IsBoolean({ message: 'hasWifi must be a boolean' })
	hasWifi: boolean

	@IsOptional()
	@IsBoolean({ message: 'hasAir must be a boolean' })
	hasAir: boolean

	@IsOptional()
	@IsBoolean({ message: 'hasKitchen must be a boolean' })
	hasKitchen: boolean

	@IsOptional()
	@IsBoolean({ message: 'isPetFriendly must be a boolean' })
	isPetFriendly: boolean

	@IsOptional()
	@IsBoolean({ message: 'isAvailable must be a boolean' })
	isAvailable: boolean
}
