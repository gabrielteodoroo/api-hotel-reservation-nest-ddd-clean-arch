import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '@/app.module'
import { hash } from 'bcrypt'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { DatabaseModule } from '@/infra/database/database.module'
import { JwtService } from '@nestjs/jwt'
import { randomUUID } from 'crypto'

describe('Create employee controller', () => {
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

	test('/employees (POST)', async () => {
		const token = jwt.sign(employee)
		const response = await request(app.getHttpServer())
			.post('/employees')
			.set('Authorization', `Bearer ${token}`)
			.send({
				name: 'Gabriel teodoro',
				email: 'gabriel@email.com',
				password: 'gabriel123'
			})
		expect(response.statusCode).toBe(201)
	})
})
