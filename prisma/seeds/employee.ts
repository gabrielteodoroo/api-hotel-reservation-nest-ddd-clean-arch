import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt'
import { randomUUID } from 'crypto'

const prisma = new PrismaClient()

async function main() {
	const id = randomUUID()
	await prisma.employee.upsert({
		where: { id },
		update: {},
		create: {
			id,
			email: 'admin@email.com',
			name: 'admin',
			password: await hash('admin123', 10)
		}
	})
}

main()
	.catch(async error => {
		console.log(error)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
