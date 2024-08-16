import { Module } from '@nestjs/common'
import { EmployeeModule } from './employee/employee.module'
import { RoomModule } from './room/room.module'

@Module({
	imports: [EmployeeModule, RoomModule],
	exports: [EmployeeModule, RoomModule]
})
export class HttpModule {}
