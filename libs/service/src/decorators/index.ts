import { ajv as _ajv } from '@app/service/decorators/ajv.decorator';
import { transform as _transform } from '@app/service/decorators/transform.decorator';

export namespace decorator {
  export import ajv = _ajv;
  export import transform = _transform;
}
