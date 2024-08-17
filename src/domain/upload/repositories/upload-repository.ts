import { File } from '../entities/file'

export abstract class UploadRepository {
	abstract upload(file: File): Promise<Record<'path', string>>
}
