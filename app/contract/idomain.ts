import type { TCreateUserDTO, TUpdateUserDTO, TUserDAO } from '../schema/users';
import type { TEmployee } from '../schema/employees';
import type { TCustomer } from '../schema/customers';
import type { TParticipant } from '../schema/participants';
import type { TEstmation } from '../schema/estimations';
import type { TPosition } from '../schema/positions';
import type { TTask } from '../schema/tasks';
import type { TProposal } from '../schema/proposals';
import type { TLoginDTO } from '../schema/auth';

export interface ICreateUserDTO extends TCreateUserDTO {}
export interface IUpdateUserDTO extends TUpdateUserDTO {}
export interface IUserDAO extends TUserDAO {}
export interface IEmployee extends TEmployee {}
export interface ICustomer extends TCustomer {}
export interface IParticipant extends TParticipant {}
export interface IEstimation extends TEstmation {}
export interface IPosition extends TPosition {}
export interface ITask extends TTask {}
export interface IProposal extends TProposal {}
export interface ILoginDTO extends TLoginDTO {}
