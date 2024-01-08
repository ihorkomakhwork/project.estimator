export default ({ tasksEntity, employeesEntity, estimationsService }) => ({
    manHours: async (employerId, estimate) => {
        const employee = await employeesEntity.readById(employerId);
        console.debug('employee', employee);
        return employee.salary * estimate;
    },
    async calculate(projectEstimationId: number) {
        const tasks = await tasksEntity.read({ projectEstimationId });
        let cost = 0;
        for await (const task of tasks) {
            const { employeeId, estimate } = task;
            cost += await this.manHours(employeeId, estimate);
        }
        await estimationsService.updateById(projectEstimationId, { cost });
    },
});
