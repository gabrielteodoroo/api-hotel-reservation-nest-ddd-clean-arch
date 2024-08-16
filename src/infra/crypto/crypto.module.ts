import { HashRepository } from '@/domain/employee/services/hash-repository'
import { Module } from '@nestjs/common'
import { HashService } from './hash.service'
import { TokenRepository } from '@/domain/employee/services/token-repository'
import { JwtToken } from './jwt.service'

@Module({
	providers: [
		{ provide: HashRepository, useClass: HashService },
		{ provide: TokenRepository, useClass: JwtToken }
	],
	exports: [HashRepository, TokenRepository]
})
export class CryptoModule {}
