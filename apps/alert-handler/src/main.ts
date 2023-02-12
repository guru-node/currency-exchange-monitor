import { startApp } from '@app/service';
import { AlertHandlerModule } from '@app/alert-handler/alert-handler.module';

(async function bootstrap() {
  process.env['app.name'] = 'alert-handler';
  await startApp(AlertHandlerModule, 'alert-handler');
})();
