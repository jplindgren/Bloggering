import { Controller, Post, Body, Get, Param, Patch, UseGuards, HttpCode, Req } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Post as BlogPost, PostDto } from './post.entity'
import { PostsService } from './posts.service';
import { identity } from 'rxjs';

@Controller('posts')
export class PostsController {    
    constructor(private readonly postsService:PostsService) {         
    }

    @Get()    
    @ApiResponse({ type: BlogPost, status: 200, isArray: true }) // for Swagger documentation: API returns an array of Post models
    findAll(): Array<BlogPost> {
        return this.postsService.getPosts();
    }

    @Get(':id')
    @ApiResponse({ type: BlogPost, status: 200 })
    find(@Param('id') postId: number): BlogPost {
        return this.postsService.getSinglePost(postId);
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    @HttpCode(200)
    @ApiResponse({ status: 200 }) 
    create(@Body() newPost: PostDto, @Req() req) {        
        const userId = req['user'].thirdPartyId;
        const newPostId = this.postsService.createPost(newPost.title, userId ,newPost.content);        
        return {id: newPostId};
    }
}
