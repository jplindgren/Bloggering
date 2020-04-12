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
    constructor(authorId: string, title: string, content: string) {
        super();
        this.authorId = authorId;
        this.title = title;
        this.content = content;
    }

    @ApiProperty() // used to generate Swagger documentation that `Post` model contains id of type number
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid', nullable: true })
    authorId: string;

    @ApiProperty()
    @ManyToOne(type => User)
    @JoinColumn({ name: 'authorId' })
    author: User;

    @ApiProperty()
    @Column('varchar', { length: 255 })
    title: string;

    @ApiProperty()
    @Column('text')
    content: string;
}

export class PostDto {
    @ApiProperty()
    @IsNotEmpty()
    title: string;

    @ApiProperty()
    @IsNotEmpty()
    content: string;
}
