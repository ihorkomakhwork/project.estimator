# Main Flow requirments

This system is designed for calculating the cost of a project in an IT company.

### Proposals

The client creates a proposal for a project, forming a proposal entity. Subsequently, employees can review this proposal, initiating the time estimation process.

### Estmations

Company managers check which employees are available, and if they are, add them to the list of participants in the hypothetical project, starting to estimate tasks, assign responsibilities, and calculate the time required. All person-hours for all tasks are summed up, thus calculating the cost. If everyone is satisfied, the estimate is marked as "resolve." This indicates that the project cost has been calculated, and the client and the company begin collaboration. At any time, both the company and the client can reject the estimate or put it on hold.

### Roles

The system includes a "user" entity who can take on one of the roles: client, employee, or administrator.


##### Admin

The administrator is responsible for adding new employees to the system, specifying their position, salary, and whether the employee is available. The administrator also adds new positions and can add new administrators.

##### Employee

An employee can occupy a specific position, which the administrator configures flexibly from existing parameters such as:

 - Level
    - Trainee
    - Junior
    - Middle
    - Senior
    - Lead
    - C-Level
- Field of activity:
    - Management
    - Development
- Specialization:
    - Back-end
    - Front-end
    - Project Manager
    - CEO

Depending on the field of work, whether in management or development, different access rights can be assigned. For example, only a manager can make changes to the estimate, while a developer can only indicate whether they are available or not.


##### Client

The client can create new proposals and make changes to the estimate. Additionally, the client may have different licenses, such as an individual entrepreneur or a legal entity. Depending on this, different taxes apply, and the project cost changes accordingly.