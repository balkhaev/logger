# Logger
Маленький (1kb, min), универсальный (Node/Browser), цветной (4 цвета!) логгер. Каждый экземпляр логгера обдалает своим цветом, благодаря чему проще ориентироваться в консоли.

## Использование
```js
import logger from 'ba-logger'

const log = logger('MyApp')
const log2 = logger('MyApp2')

log('Test log')
log2.error('Error log')
```

## Условия активации
- Browser - если в хеш части урла присутствует debug=enable
- Node - при process.env.debug === '1' или присутствующем флаге -d