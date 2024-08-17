import { InMemoryUploadRepository } from '../../../../test/repositories/in-memory-upload-repository'
import { SaveFileUseCase } from './save-file'

let uploadRepository: InMemoryUploadRepository
let useCase: SaveFileUseCase

describe('Upload files', () => {
	beforeEach(() => {
		uploadRepository = new InMemoryUploadRepository()
		useCase = new SaveFileUseCase(uploadRepository)
	})

	test('should upload a file', async () => {
		const response = await useCase.handle({
			name: 'gabriel.jpg',
			type: 'image/jpeg',
			content: Buffer.from('teste image')
		})

		expect(response.isRight()).toBe(true)

		expect(response.value).toEqual({
			path: expect.any(String)
		})
	})
})
