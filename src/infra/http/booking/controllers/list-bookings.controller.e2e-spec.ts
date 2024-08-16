import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '@/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { DatabaseModule } from '@/infra/database/database.module'
import { randomUUID } from 'crypto'
import { Booking, Employee, Room } from '@prisma/client'
import { JwtService } from '@nestjs/jwt'
import { hash } from 'bcrypt'

describe('ListBookingsController', () => {
	let app: INestApplication
	let prisma: PrismaService
	let jwt: JwtService

	let room: Room
	let booking: Booking

	let employee: Employee

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

		booking = {
			id: randomUUID(),
			customer: 'Ana Clara',
			days: 2,
			email: 'ana@email.com',
			isActive: false,
			roomId: room.id
		}

		await prisma.employee.create({
			data: employee
		})

		await prisma.room.create({
			data: room
		})

		await prisma.booking.create({
			data: booking
		})
	})

	test('/bookings (GET)', async () => {
		const token = jwt.sign(employee)

		const response = await request(app.getHttpServer())
			.get('/bookings')
			.set('Authorization', `Bearer ${token}`)
			.send({
				customer: 'Ana Clara',
				email: 'ana@email.com',
				days: 2,
				roomId: room.id
			})

		expect(response.statusCode).toBe(200)
		expect(response.body).toHaveLength(1)
	})
})
