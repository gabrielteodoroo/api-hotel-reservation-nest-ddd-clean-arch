import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '@/app.module'
import { hash } from 'bcrypt'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { DatabaseModule } from '@/infra/database/database.module'
import { JwtService } from '@nestjs/jwt'
import { randomUUID } from 'crypto'

describe('CreateRoomController', () => {
	let app: INestApplication
	let prisma: PrismaService
	let jwt: JwtService

	let employee: any

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

		await prisma.employee.create({
			data: employee
		})
	})

	test('/rooms (POST)', async () => {
		const token = jwt.sign(employee)
		const response = await request(app.getHttpServer())
			.post('/rooms')
			.set('Authorization', `Bearer ${token}`)
			.send({
				name: 'Suíte presidencial',
				price: 120000,
				image: 'quarto.jpg'
			})

		expect(response.statusCode).toBe(201)
		expect(response.body).toHaveProperty('id')
		expect(response.body).toHaveProperty('name', 'Suíte presidencial')
	})
})
