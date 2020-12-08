/* eslint @typescript-eslint/interface-name-prefix: 0 */
import { AppEnvironment, IAppEnvs } from './app';
import { ISlackEnvs } from './slack';
import { IClickUpEnvs } from './clickUp';
import { IGitHubEnvs } from './github'

interface AllAppEnvs extends IAppEnvs, ISlackEnvs, IClickUpEnvs, IGitHubEnvs {
	NODE_ENV: AppEnvironment;
	PWD: string;
}

export { AppEnvironment, AllAppEnvs };
