import { Test, TestingModule } from '@nestjs/testing';
import { AlertMonitorController } from './alert-monitor.controller';
import { AlertMonitorService } from './alert-monitor.service';

describe('AlertMonitorController', () => {
  let alertMonitorController: AlertMonitorController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AlertMonitorController],
      providers: [AlertMonitorService],
    }).compile();

    alertMonitorController = app.get<AlertMonitorController>(AlertMonitorController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(alertMonitorController.getHello()).toBe('Hello World!');
    });
  });
});
