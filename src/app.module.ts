import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { RhAdminModule } from './rh-admin/rh-admin.module';
import { LeavesModule } from './leaves/leaves.module';
import { TasksModule } from './tasks/tasks.module';
import { ProjectsModule } from './projects/projects.module';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [UserModule,
  MongooseModule.forRoot("mongodb://127.0.0.1:27017", { dbName: "pfe" }),
  ConfigModule.forRoot(),
  RhAdminModule,
  LeavesModule,
  TasksModule,
  ProjectsModule,
  AuthModule,
  MailerModule.forRoot({
    // transport :{
    //  host: "sandbox.smtp.mailtrap.io",
    //   port: 2525,
    //   auth: {
    //    user: "1f90d744e76860",
    //    pass: "22128dc7d83407"
    //   }
     transport :{
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "63c385b7a777c4",
        pass: "63f759aae171b7"
      }
    
    },
      defaults: {
        from: '"No Reply" <noreply@example.com>',
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
