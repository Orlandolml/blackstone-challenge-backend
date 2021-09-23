"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.listen(5000).then(() => console.log('Server is listening on port 5000'));
}
bootstrap();
//# sourceMappingURL=main.js.map