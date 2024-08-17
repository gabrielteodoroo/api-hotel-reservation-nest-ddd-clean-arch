import { S3 } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UploadService extends S3 {
	constructor() {
		super({
			credentials: {
				accessKeyId: process.env.S3_KEY_ID,
				secretAccessKey: process.env.S3_ACCESS_KEY
			},
			region: process.env.S3_REGION,
			endpoint: process.env.S3_ENDPOINT
		})
	}

	async uploadFile(name: string, type: string, buffer: Buffer) {
		const file = new Upload({
			client: this,
			params: {
				Bucket: process.env.S3_BUCKET_NAME,
				Key: `uploads/${name}`,
				Body: buffer,
				ContentType: type,
				ACL: 'public-read'
			}
		})

		const uploadedFile = await file.done()

		return uploadedFile.Location
	}
}
