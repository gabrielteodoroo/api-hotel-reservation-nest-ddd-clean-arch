import Entity from '@/core/entities/entity'
import { File } from './file'

describe('File entity', () => {
	test('Should create a file', () => {
		const file = File.create({
			name: 'gabriel.jpg',
			type: 'image/jpeg',
			content: Buffer.from('teste image')
		})

		expect(file).toBeInstanceOf(Entity)
		expect(file.name).toBe('gabriel.jpg')
		expect(file.type).toBe('image/jpeg')
		expect(file.content).toBeInstanceOf(Buffer)
	})
})
