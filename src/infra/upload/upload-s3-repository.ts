import { File } from '@/domain/upload/entities/file'
import { UploadRepository } from '@/domain/upload/repositories/upload-repository'
import { UploadService } from './upload.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UploadS3Repository implements UploadRepository {
	constructor(private readonly uploadService: UploadService) {}

	async upload(file: File): Promise<Record<'path', string>> {
		const uploadedFile = await this.uploadService.uploadFile(
			file.name,
			file.type,
			file.content
		)

		return {
			path: uploadedFile
		}
	}
}
