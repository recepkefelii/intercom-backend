import { Controller, Get } from '@nestjs/common';

@Controller()
export class ServerController {
    @Get('')
    serverCheck() {
        return 'Server is up and running';
    }
}
