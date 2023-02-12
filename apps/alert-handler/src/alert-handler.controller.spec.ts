import { Test, TestingModule } from '@nestjs/testing';
import { AlertHandlerController } from './alert-handler.controller';
import { AlertHandlerService } from './alert-handler.service';

describe('AlertHandlerController', () => {
  let alertHandlerController: AlertHandlerController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AlertHandlerController],
      providers: [AlertHandlerService],
    }).compile();

    alertHandlerController = app.get<AlertHandlerController>(AlertHandlerController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(alertHandlerController.getHello()).toBe('Hello World!');
    });
  });
});
