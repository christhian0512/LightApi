import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as session from "express-session"
import * as passport from "passport"

//main app settings, guards, validation, session.
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      secret: "test-djvdxsde3-uejwewi33-4jr7868jei3-hgjshkadf",
      cookie: { maxAge: 60000 },
      resave: false,
      rolling: true,
      saveUninitialized: false,
    })
  )
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted : true,
  }))
  app.use(passport.initialize())
  app.use(passport.session())
  await app.listen(3000);
}
bootstrap();
