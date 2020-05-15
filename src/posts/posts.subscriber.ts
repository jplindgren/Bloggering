import { EventSubscriber, EntitySubscriberInterface, Connection, InsertEvent, UpdateEvent } from "typeorm";
import { Post } from "./post.entity";
import { ElasticsearchService } from '@nestjs/elasticsearch';

@EventSubscriber()
export class PostSubscriber implements EntitySubscriberInterface<Post> {
    private readonly esService: ElasticsearchService;
    constructor(connection: Connection, elasticSearchService: ElasticsearchService) {
        connection.subscribers.push(this);
        this.esService = elasticSearchService;
    }

    listenTo() {
        return Post;
    }

    async createOrUpdateIndexForPost(post: Post) {
        const indexName = Post.indexName();
        try {
            await this.esService.index({
                index: indexName,
                id: post.id,
                body: post.toIndex(),
            });
        } catch (error) {
            console.log(error); //TODO: correct log
        }
    }

    async afterInsert(event: InsertEvent<Post>) {
        await this.createOrUpdateIndexForPost(event.entity);
    }

    afterUpdate(event: UpdateEvent<Post>) {
        console.log(`After Post Updated: `, event);
    }
}