import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use((req, res, next) => {
    res.removeHeader('x-powered-by');
    res.removeHeader('date');
    next();
  });
  app.use(
    session({
      secret: 'SADNGHSAHFGUHSDIUGSDFNGIDSFKHNGSDFGH',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 6000 * 60,
      },
    }),
  );

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.listen(3000);
}
bootstrap();

/* 
Users:
* Manager: Sees all deliveries and requests on the map
* Deliverer: Sees notification only when a new delivery is required, containing the location of both pickup and dropoff, if accepted, the delivery man will see the rest of the details
*Client: Can make orders, see the delivery man taking his order and their location, gets notified when the delivery man is within certain range of pickup and dropoff
 You will use nestjs, sequelize, mysql and Socket io


*/
