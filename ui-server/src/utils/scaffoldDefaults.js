import { execSync } from 'child_process';
import { resolve } from 'path';
const DEFAULTS = resolve(__dirname, "../defaults");

export function scaffoldDefaults(user) {
    execSync(`cp -r ${DEFAULTS}/* ${user}`);
}
