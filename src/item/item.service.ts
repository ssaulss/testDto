import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from '../model/item.entity';
import { Repository } from 'typeorm';
import { ItemCreateDto, ItemDTO } from './dto/item.dto';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item) private readonly repo: Repository<Item>,
  ) {}

  public async getAll(): Promise<ItemDTO[]> {
    const items = await this.repo.find();
    const dateSring = items[0].createDateTime.toTimeString();
    console.log(dateSring);
    return items.map((e) => ItemDTO.fromEntity(e));
  }

  public async create(dto: ItemCreateDto): Promise<ItemDTO> {
    const ent: Item = dto.toEntity();
    return this.repo.save(ent).then((e) => ItemDTO.fromEntity(e));
  }
}
