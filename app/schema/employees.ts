import { JTDDataType } from 'ajv/dist/jtd';

const createEmployeeDTO = {
    properties: {
        userId: { type: 'uint32' },
        salary: { type: 'uint32' },
        positionId: { type: 'uint32' },
    },
    //additionalProperties: false,
    optionalProperties: {
        avaliable: { type: 'boolean' },
    },
};

const updateEmployeeDTO = {
    optionalProperties: {
        userId: { type: 'uint32' },
        salary: { type: 'uint32' },
        positionId: { type: 'uint32' },
        avaliable: { type: 'boolean' },
    },
    additionalProperties: false,
};

export type TCreateEmployeeDTO = JTDDataType<typeof createEmployeeDTO>;
export type TUpdateEmployeeDTO = JTDDataType<typeof updateEmployeeDTO>;
export type TEmployeeDAO = TCreateEmployeeDTO;

export default ({ schema }) => ({
    dao: schema.compile(createEmployeeDTO),
    createDTO: schema.compile(createEmployeeDTO),
    updateDTO: schema.compile(updateEmployeeDTO),
});
