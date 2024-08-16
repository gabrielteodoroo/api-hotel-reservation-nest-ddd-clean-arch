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

describe('EditRoomController', () => {
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

	test('/rooms/:id (PUT)', async () => {
		const token = jwt.sign(employee)
		const response = await request(app.getHttpServer())
			.put(`/rooms/${room.id}`)
			.set('Authorization', `Bearer ${token}`)
			.send({
				...room,
				name: 'Suíte',
				price: 300000
			})

		expect(response.statusCode).toBe(204)

		const response2 = await request(app.getHttpServer())
			.get(`/rooms/${room.id}`)
			.set('Authorization', `Bearer ${token}`)
			.send()

		expect(response2.statusCode).toBe(200)
		expect(response2.body).toHaveProperty('id')
		expect(response2.body).toHaveProperty('name', 'Suíte')
		expect(response2.body).toHaveProperty('price', 300000)
	})
})
