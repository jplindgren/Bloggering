import { Controller, Post, Body, Get, Param, Patch, UseGuards, HttpCode } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Post as BlogPost, SEED_BLOG_POSTS } from './post.entity'

@Controller('posts')
export class PostsController {
    @Get()    
    @ApiResponse({ type: BlogPost, status: 200, isArray: true }) // for Swagger documentation: API returns an array of Post models
    findAll(): Array<BlogPost> {
        return SEED_BLOG_POSTS;
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    @HttpCode(200)
    @ApiResponse({ status: 200 }) 
    createPost(@Body('name') name: string) {
        return "Post created";
    }
}
