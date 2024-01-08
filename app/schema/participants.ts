import { JTDDataType } from 'ajv/dist/jtd';

const participant = {
    properties: {
        employeeId: { type: 'uint32' },
        projectEstimationId: { type: 'uint32' },
    },
    additionalProperties: false,
};

export type TParticipant = JTDDataType<typeof participant>;

export default ({ schema }) => schema.compile(participant);
