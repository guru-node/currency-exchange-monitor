import { Module } from '@nestjs/common';
import { ServiceModule } from '@app/service';
import { AlertHandlerController } from '@app/alert-handler/alert-handler.controller';
import { AlertHandlerService } from '@app/alert-handler/alert-handler.service';
import { AlertModel } from '@app/alert-handler/schema/alert.schema';

@Module({
  imports: [ServiceModule.register(), AlertModel],
  controllers: [AlertHandlerController],
  providers: [AlertHandlerService],
})
export class AlertHandlerModule {}
