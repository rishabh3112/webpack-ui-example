import { Injectable } from '@nestjs/common';
import { execSync } from 'child_process';
import { resolve } from 'path';

@Injectable()
export class ApiService {
  private DEFAULTS = resolve(__dirname, '../../defaults');

  scaffoldDefaults(user) {
    execSync(`cp -r ${this.DEFAULTS}/* ${user}`);
  }
}
