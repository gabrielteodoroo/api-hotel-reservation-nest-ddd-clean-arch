import { Module } from '@nestjs/common'
import { PrismaService } from './prisma.service'
import { EmployeeRepository } from '@/domain/employee/repositories/employee-repository'
import { EmployeePrismaRepository } from './repositories/employee-prisma-repository'
import { BookingRepository } from '@/domain/booking/repositories/booking-repository'
import { BookingPrismaRepository } from './repositories/booking-prisma-repository'
import { RoomRepository } from '@/domain/employee/repositories/room-repository'
import { RoomPrismaRepository } from './repositories/room-prisma-repository'

@Module({
	providers: [
		PrismaService,
		{ provide: EmployeeRepository, useClass: EmployeePrismaRepository },
		{ provide: BookingRepository, useClass: BookingPrismaRepository },
		{ provide: RoomRepository, useClass: RoomPrismaRepository }
	],
	exports: [
		PrismaService,
		EmployeeRepository,
		BookingRepository,
		RoomRepository
	]
})
export class PrismaModule {}
