import { JTDDataType } from 'ajv/dist/jtd';

const task = {
    properties: {
        title: { type: 'string' },
        customerId: { type: 'uint8' },
        projecEstimationId: { type: 'uint8' },
        estimate: {
            type: 'string',
            metadata: { format: 'interval' },
        },
        description: { type: 'string' },
    },
    additionalProperties: false,
};

export type TTask = JTDDataType<typeof task>;

export default ({ schema }) => schema.compile(task);
