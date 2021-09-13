import { Body, Controller, Get, Post } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemCreateDto, ItemDTO } from './dto/item.dto';

@Controller('api/item')
export class ItemController {
  constructor(private serv: ItemService) {}

  @Get()
  public async getAll(): Promise<ItemDTO[]> {
    return await this.serv.getAll();
  }

  @Post()
  public async post(@Body() dto: ItemCreateDto): Promise<ItemDTO> {
    const item = ItemDTO.from(dto);
    return this.serv.create(item);
  }
}
