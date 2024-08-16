import { Module } from '@nestjs/common'
import { EmployeeModule } from './employee/employee.module'
import { RoomModule } from './room/room.module'
import { BookingModule } from './booking/booking.module'

@Module({
	imports: [EmployeeModule, RoomModule, BookingModule],
	exports: [EmployeeModule, RoomModule, BookingModule]
})
export class HttpModule {}
