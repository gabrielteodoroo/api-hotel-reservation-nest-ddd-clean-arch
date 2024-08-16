import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '@/app.module'
import { hash } from 'bcrypt'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { DatabaseModule } from '@/infra/database/database.module'
import { JwtService } from '@nestjs/jwt'
import { randomUUID } from 'crypto'
import { Employee, Room } from '@prisma/client'

describe('DeleteRoomController', () => {
	let app: INestApplication
	let prisma: PrismaService
	let jwt: JwtService

	let employee: Employee
	let room: Room

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule, DatabaseModule]
		}).compile()

		app = moduleFixture.createNestApplication()
		app.useGlobalPipes(new ValidationPipe())
		prisma = moduleFixture.get(PrismaService)
		jwt = moduleFixture.get(JwtService)

		await app.init()

		employee = {
			id: randomUUID(),
			name: 'estefane',
			email: 'estefane@email.com',
			password: await hash('estefane123', 10)
		}

		room = {
			id: randomUUID(),
			name: 'Suíte Presidencial',
			image: 'quarto.jpg',
			price: 120000,
			hasWifi: true,
			hasAir: true,
			hasKitchen: true,
			isPetFriendly: true,
			isAvailable: true
		}

		await prisma.room.create({
			data: room
		})

		await prisma.employee.create({
			data: employee
		})

		await prisma
	})

	test('/rooms/:id (DELETE)', async () => {
		const token = jwt.sign(employee)

		const oldRooms = await prisma.room.findMany()

		expect(oldRooms).toHaveLength(1)

		const response = await request(app.getHttpServer())
			.delete(`/rooms/${room.id}`)
			.set('Authorization', `Bearer ${token}`)
			.send()

		expect(response.statusCode).toBe(204)

		const rooms = await prisma.room.findMany()

		expect(rooms).toHaveLength(0)
	})
})
