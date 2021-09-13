// item.dto.ts
import { IsOptional, IsString, IsUUID } from 'class-validator';
import { Item } from '../../model/item.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

interface IItemDto {
  name: string;
  description: string;
}

export class ItemDTO implements Readonly<ItemDTO> {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  createDateTime: string;

  @ApiProperty()
  createdBy: string;

  public static from(dto: Partial<ItemDTO>) {
    const it = new ItemDTO();
    it.name = dto.name;
    it.description = dto.description;
    it.createDateTime = dto.createDateTime;
    it.createdBy = dto.createdBy;
    return it;
  }

  public static fromEntity(entity: Item) {
    return this.from({
      id: entity.id,
      name: entity.name,
      description: entity.description,
      createDateTime: entity.createDateTime.toDateString(),
      createdBy: entity.createdBy,
    });
  }

  public toEntity() {
    console.log('QUI');
    const it = new Item();
    it.name = this.name;
    it.description = this.description;
    it.createDateTime = new Date();
    it.createdBy = 'me';
    it.lastChangedBy = 'me';
    return it;
  }
}

export class ItemCreateDto implements Omit<IItemDto, 'id'> {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  public static from(dto: Partial<ItemDTO>) {
    const it = new ItemDTO();
    it.name = dto.name;
    it.description = dto.description;
    return it;
  }

  public toEntity() {
    const it = new Item();
    console.log('QUI');
    it.name = this.name;
    it.description = this.description;
    it.createDateTime = new Date();
    // it.createdBy = user ? user.id : null;
    // it.lastChangedBy = user ? user.id : null;
    return it;
  }
}
