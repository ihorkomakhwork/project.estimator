import type { TCreateUserDTO, TUpdateUserDTO, TUserDAO } from '../schema/users';
import type { TParticipant } from '../schema/participants';
import type { TEstmation } from '../schema/estimations';
import type { TLoginDTO } from '../schema/auth';
import type {
    TCreateEmployeeDTO,
    TUpdateEmployeeDTO,
    TEmployeeDAO,
} from '../schema/employees';
import type {
    TCreateProposalDTO,
    TUpdateProposalDTO,
} from '../schema/proposals';
import type {
    TCreatePositionDTO,
    TUpdatePositionDTO,
    TPositionDAO,
} from '../schema/positions';
import type {
    TCreateCustomerDTO,
    TUpdateCustomerDTO,
    TCustomerDAO,
} from '../schema/customers';

export interface ICreateUserDTO extends TCreateUserDTO {}
export interface IUpdateUserDTO extends TUpdateUserDTO {}
export interface IUserDAO extends TUserDAO {}
export interface ICreateEmployeeDTO extends TCreateEmployeeDTO {}
export interface IUpdateEmployeeDTO extends TUpdateEmployeeDTO {}
export interface IEmployeeDAO extends TEmployeeDAO {}
export interface ICustomerDAO extends TCustomerDAO {}
export interface ICreateCustomerDTO extends TCreateCustomerDTO {}
export interface IUpdateCustomerDTO extends TUpdateCustomerDTO {}
export interface IParticipant extends TParticipant {}
export interface IEstimation extends TEstmation {}
export interface ICreatePositionDTO extends TCreatePositionDTO {}
export interface IUpdatePositionDTO extends TUpdatePositionDTO {}
export interface IPositionDAO extends TPositionDAO {}
export interface ILoginDTO extends TLoginDTO {}
export interface ICreateProposalDTO extends TCreateProposalDTO {}
export interface IUpdateProposalDTO extends TUpdateProposalDTO {}
export interface IProposalDAO extends TCreateProposalDTO {}
