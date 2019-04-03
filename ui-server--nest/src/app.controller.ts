import { Controller, Get, Res } from '@nestjs/common';
import { homedir } from 'os';

@Controller('/')
export class AppController {
    @Get()
    home(@Res() res) {
        res.sendFile('index.html');
    }
}
