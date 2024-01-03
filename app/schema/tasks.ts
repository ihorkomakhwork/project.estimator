import { JTDDataType } from 'ajv/dist/jtd';

const createTaskDTO = {
    properties: {
        title: { type: 'string' },
        customerId: { type: 'uint32' },
        projecEstimationId: { type: 'uint32' },
        estimate: {
            type: 'string',
            metadata: { format: 'interval' },
        },
        description: { type: 'string' },
    },
    additionalProperties: false,
};

const updateTaskDTO = {
    optionalProperties: {
        title: { type: 'string' },
        customerId: { type: 'uint32' },
        projecEstimationId: { type: 'uint32' },
        estimate: {
            type: 'string',
            metadata: { format: 'interval' },
        },
        description: { type: 'string' },
    },
    additionalProperties: false,
};

export type TCreateTaskDTO = JTDDataType<typeof createTaskDTO>;
export type TUpdateTaskDTO = JTDDataType<typeof updateTaskDTO>;

export default ({ schema }) => ({
    createDTO: schema.compile(createTaskDTO),
    updateDTO: schema.compile(updateTaskDTO),
});
