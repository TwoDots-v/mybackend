import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import * as basicAuth from 'express-basic-auth';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.use(
    ['/api','/docs-json']
    ,
    basicAuth({challenge:true, users:{["admin"]:"admin",},})
    );
  const config = new DocumentBuilder()
  .setTitle('Employee Management Nest')
  .setDescription('This is an Api for employees')
  .setVersion('1.0')
  .addTag('user')
  .addBearerAuth({
    description:'texte',
    name:'Authorization',
    bearerFormat:'bearer',
    type:'http',
    in:'Header'
    },'access-token')
  .build();
  const document=SwaggerModule.createDocument(app,config);
  SwaggerModule.setup('api',app,document);
  await app.listen(3000);
}
bootstrap();
