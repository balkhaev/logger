# Logger
Маленький (1kb, min), универсальный (Node/Browser) логгер

## Использование
```js
import logger from 'ba-logger'

const log = logger('MyApp')

log('Test log')
log.error('Error log')
```

´´´MyApp´´´´ Test log
```diff
- ´´´MyApp´´´´ Error log
```
