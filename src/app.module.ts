import { JwtModule } from '@nestjs/jwt';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MorganInterceptor, MorganModule } from 'nest-morgan';
import {
  Module,
  NestModule,
  RequestMethod,
  MiddlewareConsumer,
} from '@nestjs/common';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { jwtConstants } from './auth/constants';
import { AppController } from './app.controller';
import { UserService } from './user/user.service';
import { TodosModule } from './todos/todos.module';
import { PrismaService } from './prisma/prisma.service';
import { AuthMiddleware } from './auth/auth.middleware';

@Module({
  imports: [
    UserModule,
    TodosModule,
    MorganModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '4h' },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    UserService,
    PrismaService,
    {
      provide: APP_INTERCEPTOR,
      useClass: MorganInterceptor('combined'),
    },
  ],
  exports: [UserService, PrismaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('todos', { path: 'user', method: RequestMethod.GET });
  }
}
