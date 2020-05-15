import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { User } from 'src/users/user.entity';

@Entity()
export class Post extends BaseEntity {
    constructor(author: User, title: string, content: string) {
        super();
        this.author = author;
        this.title = title;
        this.content = content;
    }

    @ApiProperty() // used to generate Swagger documentation that `Post` model contains id of type number
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty()
    @ManyToOne(type => User, { eager: true })
    @JoinColumn({ name: 'authorId', referencedColumnName: 'id' })
    author: User;

    @ApiProperty()
    @Column('varchar', { length: 255 })
    title: string;

    @ApiProperty()
    @Column('text')
    content: string;

    static indexName() {
        return Post.name.toLowerCase();
    }

    toIndex() {
        return {
            id: this.id,
            author: this.author.name,
            title: this.title,
            content: this.content
        }
    }
}

export class PostDto {
    @ApiProperty()
    @IsNotEmpty()
    title: string;

    @ApiProperty()
    @IsNotEmpty()
    content: string;
}
