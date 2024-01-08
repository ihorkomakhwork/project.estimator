import { JTDDataType } from 'ajv/dist/jtd';

const createEstimationDTO = {
    properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        price: { type: 'uint32' },
        customerId: { type: 'uint32' },
        employeeId: { type: 'uint32' },
        status: { type: 'string' },
    },
    additionalProperties: false,
} as const;

const updateEstimationDTO = {
    optionalProperties: {
        name: { type: 'string' },
        description: { type: 'string' },
        price: { type: 'uint32' },
        customerId: { type: 'uint32' },
        employeeId: { type: 'uint32' },
        status: { type: 'string' },
    },
    additionalProperties: false,
} as const;

export type TCreateEstimationDTO = JTDDataType<typeof createEstimationDTO>;
export type TEstimationDAO = JTDDataType<typeof createEstimationDTO>;
export type TUpdateEstimationDTO = JTDDataType<typeof updateEstimationDTO>;

export default ({ schema }) => ({
    createDTO: schema.compile(createEstimationDTO),
    updateDTO: schema.compile(updateEstimationDTO),
    dao: schema.compile(createEstimationDTO),
});
