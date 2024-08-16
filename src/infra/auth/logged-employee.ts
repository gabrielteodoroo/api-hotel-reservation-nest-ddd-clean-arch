import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export type EmployeePayload = {
	id: string
	name: string
	email: string
}

export const LoggedEmployee = createParamDecorator(
	(_: never, context: ExecutionContext) => {
		const request = context.switchToHttp().getRequest()
		return request.user as EmployeePayload
	}
)
