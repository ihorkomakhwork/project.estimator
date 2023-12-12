import { JTDDataType } from 'ajv/dist/jtd';

const participant = {
    properties: {
        employeeId: { type: 'uint8' },
        estimationId: { type: 'uint8' },
    },
    additionalProperties: false,
};

export type TParticipant = JTDDataType<typeof participant>;

export default ({ schema }) => schema.compile(participant);
