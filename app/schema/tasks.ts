import { JTDDataType } from 'ajv/dist/jtd';

const createTaskDTO = {
    properties: {
        title: { type: 'string' },
        employeeId: { type: 'uint32' },
        projectEstimationId: { type: 'uint32' },
        estimate: { type: 'uint32' },
        description: { type: 'string' },
    },
    additionalProperties: false,
};

const updateTaskDTO = {
    optionalProperties: {
        title: { type: 'string' },
        employeeId: { type: 'uint32' },
        projectEstimationId: { type: 'uint32' },
        estimate: { type: 'uint32' },
        description: { type: 'string' },
    },
    additionalProperties: false,
};

export type TCreateTaskDTO = JTDDataType<typeof createTaskDTO>;
export type TUpdateTaskDTO = JTDDataType<typeof updateTaskDTO>;
export type TTaskDAO = JTDDataType<typeof createTaskDTO>;
export default ({ schema }) => ({
    createDTO: schema.compile(createTaskDTO),
    updateDTO: schema.compile(updateTaskDTO),
    dao: schema.compile(createTaskDTO),
});
