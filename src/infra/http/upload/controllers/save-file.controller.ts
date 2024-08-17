import { SaveFileUseCase } from '@/domain/upload/use-cases/save-file'
import {
	Controller,
	HttpCode,
	Post,
	UploadedFile,
	UseInterceptors
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'

@Controller('/upload')
export class SaveFileController {
	constructor(private readonly saveFile: SaveFileUseCase) {}

	@Post()
	@HttpCode(200)
	@UseInterceptors(FileInterceptor('file'))
	async handle(@UploadedFile() file: Express.Multer.File) {
		const response = await this.saveFile.handle({
			name: file.originalname,
			type: file.mimetype,
			content: file.buffer
		})

		return response.value
	}
}
