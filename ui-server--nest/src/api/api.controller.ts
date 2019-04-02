import { Controller, Post, Body } from '@nestjs/common';
import { InitPayloadDto } from './InitPayLoad.dto';
import { ApiService } from './api.service';

@Controller('api')
export class ApiController {
  private readonly USER_DIRECTORY = process.env.PWD ? process.env.PWD : process.cwd();
    constructor(private readonly apiService: ApiService) {
  }
  @Post('init')
  async init(@Body() initPlayload: InitPayloadDto): Promise<{
    value: any,
  }> {
    if (initPlayload.type === 'defaults') {
      await this.apiService.scaffoldDefaults(this.USER_DIRECTORY);
      return {
        value: true,
      };
    }
    return {
      value: 'WIP',
    };
  }
}
