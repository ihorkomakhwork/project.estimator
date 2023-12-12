import type { IApplication } from '../../lib/lib';
import IMapper from './imapper';
import ISource from './isource';

export default interface IContainer extends IApplication {
    source: ISource;
    repository: IMapper;
}
