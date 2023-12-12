import { JTDDataType } from 'ajv/dist/jtd';

const estmation = {
    properties: {
        title: { type: 'string' },
        responsibleEmployeeId: { type: 'uint8' },
        proposalId: { type: 'uint8' },
        state: {
            enum: ['holding', 'processing', 'rejected', 'resolve'],
        },
        message: { type: 'string' },
    },
    additionalProperties: false,
};

export type TEstmation = JTDDataType<typeof estmation>;
export default ({ schema }) => schema.compile(estmation);