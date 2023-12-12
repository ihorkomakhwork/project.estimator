import { JTDDataType } from 'ajv/dist/jtd';

const employee = {
    properties: {
        userId: { type: 'uint8' },
        salary: { type: 'uint8' },
        positionId: { type: 'uint8' },
    },
    //additionalProperties: false,
    optionalProperties: {
        avaliable: { type: 'boolean' },
    },
};

export type TEmployee = JTDDataType<typeof employee>;

export default ({ schema }) => schema.compile(employee);
