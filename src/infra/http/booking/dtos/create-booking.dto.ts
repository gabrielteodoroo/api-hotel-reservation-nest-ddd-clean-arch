import { IsEmail, IsInt, IsNotEmpty, IsUUID } from 'class-validator'

export class CreateBookingDTO {
	@IsInt({ message: 'Invalid number of days' })
	@IsNotEmpty({ message: 'Number of days is required' })
	days: number

	@IsNotEmpty({ message: 'Customer name is required' })
	customer: string

	@IsNotEmpty({ message: 'Room ID is required' })
	@IsUUID('all', { message: 'Invalid room ID' })
	roomId: string

	@IsNotEmpty({ message: 'Email is required' })
	@IsEmail({}, { message: 'Invalid email' })
	email: string
}
