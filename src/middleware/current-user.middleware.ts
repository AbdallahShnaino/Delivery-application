import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ClientService } from 'src/client/client.service';
import { Client } from 'src/client/entity/client.entity';
import { DelivererService } from 'src/deliverer/deliverer.service';
import { Deliverer } from 'src/deliverer/entity/deliverer.entity';
import { Manager } from 'src/manager/entity/manager.entity';
import { ManagerService } from 'src/manager/manager.service';

declare global {
  namespace Express {
    interface Request {
      currentUser?: Client | Manager | Deliverer;
    }
  }
}

declare module 'express-session' {
  export interface SessionData {
    userId: number;
    type: string;
  }
}
@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(
    private clientService: ClientService,
    private managerService: ManagerService,
    private delivererService: DelivererService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { userId, type } = req.session || {};
    if (userId) {
      let user = null;
      if (type == 'client') {
        user = await this.clientService.findWithId(userId);
      }
      if (type == 'deliverer') {
        user = await this.delivererService.findWithId(userId);
      }
      if (type == 'manager') {
        user = await this.managerService.findWithId(userId);
      }

      req.currentUser = user;
    }
    next();
  }
}
