import { JTDDataType } from 'ajv/dist/jtd';

const position = {
    properties: {
        area: {
            enum: ['manager', 'developer'],
        },
        level: {
            enum: ['trainee', 'junior', 'middle', 'senior', 'lead', 'c-level'],
        },
        specialization: {
            enum: [
                'frontend',
                'backend',
                'full-stack',
                'qa',
                'devops',
                'designer',
                'project-manager',
                'cto',
                'ceo',
            ],
        },
    },
    additionalProperties: false,
};

export type TPosition = JTDDataType<typeof position>;

export default ({ schema }) => schema.compile(position);
