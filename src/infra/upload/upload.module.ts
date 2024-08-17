import { Module } from '@nestjs/common'
import { UploadService } from './upload.service'
import { UploadS3Repository } from './upload-s3-repository'
import { UploadRepository } from '@/domain/upload/repositories/upload-repository'

@Module({
	providers: [
		UploadService,
		{ provide: UploadRepository, useClass: UploadS3Repository }
	],
	exports: [UploadService, UploadRepository]
})
export class UploadModule {}
