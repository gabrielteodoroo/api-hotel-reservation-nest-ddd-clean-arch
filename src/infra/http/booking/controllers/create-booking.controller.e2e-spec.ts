import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '@/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { DatabaseModule } from '@/infra/database/database.module'
import { randomUUID } from 'crypto'
import { Room } from '@prisma/client'

describe('CreateBookingController', () => {
	let app: INestApplication
	let prisma: PrismaService

	let room: Room

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

		await prisma.room.create({
			data: room
		})
	})

	test('/bookings (POST)', async () => {
		const response = await request(app.getHttpServer())
			.post('/bookings')
			.send({
				customer: 'Ana Clara',
				email: 'ana@email.com',
				days: 2,
				roomId: room.id
			})

		console.log(response)

		expect(response.statusCode).toBe(201)
		expect(response.body).toHaveProperty('id')

		const bookings = await prisma.booking.findMany()

		expect(bookings).toHaveLength(1)
	})
})
