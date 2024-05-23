const { exampleService, setEnvironment } = require('openapi-sdk');

// 切换到生产环境
setEnvironment('production');

// 使用服务
(async () => {
  try {
    const data = await exampleService.getExampleData({ param1: 'value1' });
    console.log(data);
  } catch (error) {
    console.error(error.message);
  }
})();
