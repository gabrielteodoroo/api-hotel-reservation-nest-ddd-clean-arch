import { UploadRepository } from '@/domain/upload/repositories/upload-repository'
import { SaveFileUseCase } from '@/domain/upload/use-cases/save-file'
import { UploadModule } from '@/infra/upload/upload.module'
import { Module } from '@nestjs/common'
import { SaveFileController } from './controllers/save-file.controller'

@Module({
	imports: [UploadModule],
	providers: [
		{
			provide: SaveFileUseCase,
			useFactory: (uploadRepository: UploadRepository) => {
				return new SaveFileUseCase(uploadRepository)
			},
			inject: [UploadRepository]
		}
	],
	controllers: [SaveFileController]
})
export class UploadFileModule {}
