import { Test, TestingModule } from '@nestjs/testing';
import { ApiController } from './api.controller';
import { resolve } from 'path';
import { existsSync } from 'fs';
import { ApiService } from './api.service';

describe('Api Controller', () => {
  let controller: ApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApiController],
      providers: [ApiService]
    }).compile();

    controller = module.get<ApiController>(ApiController);
  });

  it('should scaffold defaults and return "Defaults Scaffolded" when type is "defaults"', async () => {
    const output = expect(await controller.init(
      {
        type: 'defaults',
      },
    ));
    output.toEqual({ value: true});

    const USER_DIRECTORY = resolve(__dirname, '../../');
    expect( existsSync(resolve(USER_DIRECTORY, 'src', 'index.js')) ).toBe(true);
    expect( existsSync(resolve(USER_DIRECTORY, 'webpack.config.js')) ).toBe(true);

  });
  it('should return "WIP" when type is not "defaults"', async () => {
    const output1 = expect(await controller.init(
      {
        type: 'init-generator',
      },
    ));

    const output2 = expect(await controller.init(
      {
        type: 'custom-scaffold',
      },
    ));

    output1.toEqual({ value: 'WIP'});
    output2.toEqual({ value: 'WIP'});
  });
});
