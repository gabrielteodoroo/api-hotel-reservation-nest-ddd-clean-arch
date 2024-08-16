import { PartialType } from '@nestjs/swagger'
import { CreateRoomDTO } from './create-room.dto'

export class EditRoomDTO extends PartialType(CreateRoomDTO) {}
