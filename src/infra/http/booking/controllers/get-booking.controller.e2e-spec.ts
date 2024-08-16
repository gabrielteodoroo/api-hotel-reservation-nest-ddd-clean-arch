import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '@/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { DatabaseModule } from '@/infra/database/database.module'
import { randomUUID } from 'crypto'
import { Booking, Room } from '@prisma/client'

describe('GetBookingsController', () => {
	let app: INestApplication
	let prisma: PrismaService

	let room: Room
	let booking: Booking

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule, DatabaseModule]
		}).compile()

		app = moduleFixture.createNestApplication()
		app.useGlobalPipes(new ValidationPipe())
		prisma = moduleFixture.get(PrismaService)

		await app.init()

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

		await prisma.room.create({
			data: room
		})

		await prisma.booking.create({
			data: booking
		})
	})

	test('/bookings/:id (GET)', async () => {
		const response = await request(app.getHttpServer())
			.get(`/bookings/${booking.id}`)
			.send()

		expect(response.statusCode).toBe(200)
		expect(response.body).toHaveProperty('id')
	})
})
