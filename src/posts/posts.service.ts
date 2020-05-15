import { Injectable, ForbiddenException } from '@nestjs/common';
import { Post } from './post.entity';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { User } from 'src/users/user.entity';

@Injectable()
export class PostsService {
    private readonly esService: ElasticsearchService;
    constructor(elasticSearchService: ElasticsearchService) {
        this.esService = elasticSearchService;
    }

    async search(options: any): Promise<Post> {
        const { body } = await this.esService.search({
            index: Post.indexName(),
            body: {
                query: {
                    // eslint-disable-next-line @typescript-eslint/camelcase
                    multi_match: {
                        query: options.query,
                        fields: ['title^3', 'content', 'author'],
                    }
                }
            }
        });
        return body.hits;
    }

    async createPost(title: string, author: User, content: string): Promise<any> {
        if (!author.isActive)
            throw new ForbiddenException("Cannot create a post because the user is inactive");

        const insertedPost = await Post.insert(new Post(author, title, content));
        return insertedPost.identifiers[0].id;
    }
    getPosts = async (): Promise<Post[]> => await Post.find();
    getSinglePost = async (id: string): Promise<Post> => await Post.findOneOrFail(id);
}
