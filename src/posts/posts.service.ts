import { Injectable } from '@nestjs/common';
import { Post } from './post.entity';

@Injectable()
export class PostsService {
    private posts: Post[] = [];

    async createPost(title: string, authorId: string, content: string): Promise<any> {
        const insertedPost = await Post.insert(new Post(authorId, title, content));
        return insertedPost.identifiers[0].id;
    }

    getPosts = async (): Promise<Post[]> => await Post.find();
    getSinglePost = async (id: string): Promise<Post> => await Post.findOneOrFail(id);
}
