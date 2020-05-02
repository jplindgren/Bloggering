import { Controller, Post, Body, Get, Param, UseGuards, HttpCode, Req } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Post as BlogPost, PostDto } from './post.entity';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) { }

    @Get()
    @ApiResponse({ type: BlogPost, status: 200, isArray: true }) // for Swagger documentation: API returns an array of Post models
    async findAll(): Promise<BlogPost[]> {
        return this.postsService.getPosts();
    }

    @Get(':id')
    @ApiResponse({ type: BlogPost, status: 200 })
    async find(@Param('id') postId: string): Promise<BlogPost> {
        return this.postsService.getSinglePost(postId);
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    @HttpCode(200)
    @ApiResponse({ status: 200 })
    async create(@Body() newPost: PostDto, @Req() req) {
        const userId = req['user'].id;
        const newPostId = await this.postsService.createPost(newPost.title, userId, newPost.content);
        return { id: newPostId };
    }
}
