import { startApp } from '@app/service';
import { AlertMonitorModule } from '@app/alert-monitor/alert-monitor.module';

(async function bootstrap() {
  process.env['app.name'] = 'alert-monitor';
  await startApp(AlertMonitorModule, 'alert-monitor');
})();
