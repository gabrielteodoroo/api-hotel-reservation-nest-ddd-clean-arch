import { Either, right } from '@/core/errors/either/either'
import { UploadRepository } from '../repositories/upload-repository'
import { File } from '../entities/file'

type Request = {
	name: string
	type: string
	content: Buffer
}

type Response = Either<null, Record<'path', string>>

export class SaveFileUseCase {
	constructor(private uploadRepository: UploadRepository) {}

	async handle(data: Request): Promise<Response> {
		const { content, name, type } = data

		const upload = File.create({
			name,
			content,
			type
		})

		const uploadedFile = await this.uploadRepository.upload(upload)

		return right(uploadedFile)
	}
}
