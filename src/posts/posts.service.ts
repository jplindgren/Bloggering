import { Injectable } from '@nestjs/common';
import { Post } from './post.entity';

@Injectable()
export class PostsService {
    private posts: Post[] = [];
    
    createPost(title: string, authorId:string, content: string) : number{
        var id = this.posts.length + 1;
        const post = new Post(id, authorId, title, content);
        this.posts.push(post);
        return id;
    }

    getPosts = () : Array<Post> => this.posts;
    getSinglePost = (id: number) : Post => this.posts.find(x => x.id == id);        
}
