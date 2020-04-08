import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn  } from 'typeorm';

@Entity()
export class Post {    
    constructor(id: number, authorId: string, title: string, content:string) {
        this.id = id;
        this.authorId = authorId;
        this.title = title;
        this.content = content;
    }

    @ApiProperty() // used to generate Swagger documentation that `Post` model contains id of type number
    id: number;

    @ApiProperty()
    authorId: string;

    @ApiProperty()
    title: string;

    @ApiProperty()
    content: string;
}

export class PostDto{
    @ApiProperty()
    @IsNotEmpty()
    title: string

    @ApiProperty()
    @IsNotEmpty()
    content: string
}