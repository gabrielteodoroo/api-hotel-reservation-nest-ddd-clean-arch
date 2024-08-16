import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '@/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { DatabaseModule } from '@/infra/database/database.module'
import { randomUUID } from 'crypto'

describe('ListRoomsController', () => {
	let app: INestApplication
	let prisma: PrismaService

	let room: any

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

	test('/rooms (GET)', async () => {
		const response = await request(app.getHttpServer()).get('/rooms').send()

		expect(response.statusCode).toBe(200)
		expect(response.body).toHaveLength(1)
	})
})
