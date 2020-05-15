import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PostSubscriber } from './posts.subscriber';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ElasticsearchConfigService } from 'src/config/elasticsearch/configuration.service';
import { ElasticsearchConfigModule } from 'src/config/elasticsearch/configuration.module';

@Module({
  imports: [ElasticsearchConfigModule, ElasticsearchModule.registerAsync({
    imports: [ElasticsearchConfigModule],
    useClass: ElasticsearchConfigService
  })],
  controllers: [PostsController],
  providers: [PostsService, PostSubscriber],
})
export class PostsModule { }
