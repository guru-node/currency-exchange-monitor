import { DataProcessorModule } from '@app/data-processor/data-processor.module';
import { startApp } from '@app/service';

(async function bootstrap() {
  process.env['app.name'] = 'data-processor';
  await startApp(DataProcessorModule, 'data-processor');
})();
