import { Module } from '@nestjs/common'
import { EmployeeModule } from './employee/employee.module'
import { RoomModule } from './room/room.module'
import { BookingModule } from './booking/booking.module'
import { UploadFileModule } from './upload/upload-file.module'

@Module({
	imports: [EmployeeModule, RoomModule, BookingModule, UploadFileModule],
	exports: [EmployeeModule, RoomModule, BookingModule, UploadFileModule]
})
export class HttpModule {}
