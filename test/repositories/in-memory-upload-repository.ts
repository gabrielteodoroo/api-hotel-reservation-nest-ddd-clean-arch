import { File } from '@/domain/upload/entities/file'
import { UploadRepository } from '@/domain/upload/repositories/upload-repository'

export class InMemoryUploadRepository extends UploadRepository {
	async upload(file: File): Promise<Record<'path', string>> {
		return {
			path: 'upload/file.name'
		}
	}
}
