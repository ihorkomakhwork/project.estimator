import IContainer from '../../contract/icrontainer';

export default ({ costService, accessHooks }: IContainer) => ({
    hooks: {
        prev: [accessHooks.allowPositionAreas(['manager'])],
    },
    async readById({ id }) {
        await costService.calculate(id);
        return { message: 'Cost calculated successfully' };
    },
});
