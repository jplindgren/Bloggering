import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn  } from 'typeorm';


export const SEED_BLOG_POSTS = [{
    id: 1,
    authorId: 'xxx',
    title: 'Build a NodeJS App with Typescript',
    content: 'Whats wrong with Javascript?'
  }, {
    id: 2,
    authorId: 'yyy',
    title: 'Dont build a NodeJS App with Typescript',
    content: 'Whats wrong with Typescript?'
  }];
  
@Entity()
export class Post {
    @ApiProperty() // used to generate Swagger documentation that `Post` model contains id of type number
    id: number;

    @ApiProperty()
    authorId: string;

    @ApiProperty()
    title: string;

    @ApiProperty()
    content: string;
}