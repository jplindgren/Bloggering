import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { PostsModule } from './posts/posts.module'
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import * as glob from 'glob';
import * as cookieParser from 'cookie-parser';

const controllers =
  glob.sync('*.module/*.controller.ts', { cwd: __dirname, absolute: true }) // go through all the modules containing controllers
    .map(require) // require every one of them
    .map(imported => imported.default);
    // and return each one's default export (which is expected to be a NestJS controller class)

@Module({
  imports: [PostsModule, AuthModule],
  controllers: controllers,
  providers: [AppService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    consumer.apply(cookieParser()).forRoutes('/');
  }
}
