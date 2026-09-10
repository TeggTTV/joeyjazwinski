Chapter 10: Database System Development Lifecycle
This summary talks about the approach required to develop a database system, aka the Database System Development Lifecycle (DSDL).
10.1 - 10.2 Overview & The Information Systems Lifecycle
An Information System (IS) are the resources that enable the collection, management, control, and dissemination of information throughout an organization. A database application is a fundamental component of an IS.

The Database System Development Lifecycle is a methodology for developing a database system to ensure it meets the organizational requirements effectively. It usually not linear. It often loops to previous stages.
10.3 Database Planning
Database Planning involves the management activities that allow the stages of the lifecycle to be done as efficiently and effectively as possible.
Mission Statement: Defines the major aims of the database system, providing its primary purpose and a clear path for the project.
Mission Objectives: Each objective should identify a particular task that the database system must support.
10.4 System Definition & User Views
System Definition describes the scope and boundaries of the database system, including its major user views, users, and application areas.
User Views: Defines what is required of a database system from the perspective of a particular job role (such as Manager or Supervisor) or enterprise application area (such as Marketing or Personnel). A database system may have one or more user views. Identifying user views ensures that no major users are forgotten.
10.5 Requirements Collection and Analysis
This stage involves gathering and analyzing information about the part of the organization that will be supported by the database system. Fact-finding techniques are used to identify the requirements of the new system.
Information gathered includes:
Description of data used or generated.
Details of how data is used or generated.
Any additional requirements for the new database system.
10.6 Database Design
Database design is the process of creating a design for a database that will support the enterprise’s operations and objectives.
Conceptual Database Design
The process of constructing a model of the information used in an enterprise, independent of all physical aspects. It involves identifying entities, relationships, and attributes.
Logical Database Design
The process of constructing a model of the information used in an enterprise based on a specific data model (e.g., relational), but independent of a particular DBMS and other physical methods. This stage involves normalization and checking against user transactions.
Physical Database Design
The process of producing a description of the implementation of the database on secondary storage. It describes the base relations, file organizations, and indexes used to achieve efficient access to the data, and any associated integrity constraints and security measures.
10.7 DBMS Selection
DBMS Selection is the selection of an appropriate DBMS to support the database system.
Define Terms of Reference: State the objectives and scope of the study.
Shortlist: Choose two or three products for evaluation.
Evaluate: Assess the features and performance of the shortlisted products.
Recommend and Report: Document the selection process and provide a recommendation.
10.8 Application Design
This stage involves designing the user interface and the application programs that use and process the database.
Transaction Design
A transaction is an action, or series of actions, carried out by a single user or application program, which accesses or changes the content of the database.
Retrieval transactions: Used to retrieve data for display or report generation.
Update transactions: Used to insert new records, delete old records, or modify existing records.
Mixed transactions: Involve both retrieval and update of data.
User Interface (UI) Design Guidelines
Meaningful titles: Use clear and explanatory titles.
Comprehensible instructions: Use terminology familiar to the user.
Logical grouping/layout: Group related items together.
Visually appealing layout: Ensure the interface is clean and professional.
Consistent use of color: Apply colors sparingly and consistently.
Consistent terminology: Use the same terms across all screens.
Consistent use of abbreviations: Follow a standard for short forms.
10.9 Prototyping
A prototype is a working model of a database system. Prototyping allows the designer or user to visualize and evaluate how the final system will look and function. It is used to identify the features of a system that work well and to suggest improvements or even new features.
10.10 Implementation
Implementation is the physical development of the database and application designs. It involves using the DDL (Data Definition Language) to create database schemas and empty database files, and the DML (Data Manipulation Language) to create the application programs.
10.11 Data Conversion and Loading
This stage involves transferring existing data into the new database and converting existing applications to run on the new database.
Migration planning: Strategic planning for moving data from a legacy system to the new system.
Utilities: Most DBMSs provide utilities to load existing files into the new database.
10.12 Testing
Testing is the process of executing application programs with the intent of finding errors. Make sure to use planned test strategies and realistic data,
Fault detection: The goal is to discover faults rather than to prove the system works.
Test environments: Use a separate environment from the live production system to conduct tests.
Usability Criteria:
Learnability: How long does it take for new users to become productive?
Performance: How well does the system response match user expectations?
Robustness: How tolerant is the system of user error?
Recoverability: How easily can the user recover from an error?
Adaptability: How well does the system accommodate different user skill levels?
Sign-off: Formal acceptance of the system after successful testing.
10.13 Operational Maintenance
Operational Maintenance is the process of monitoring and maintaining the database system following installation.
Performance monitoring: Observing the system to ensure performance remains within acceptable levels.
Database tuning: Adjusting the physical design to improve performance.
Capacity planning: Ensuring the system can handle future growth in data and users.
Parallel running: A strategy where both the old and new systems run simultaneously for a period of time to verify that the new system produces correct results.
10.14 CASE Tools
Computer-Aided Software Engineering (CASE) tools provide automated support for the activities of the development lifecycle.
Categories of CASE Tools
Upper-CASE: Supports the initial stages of the lifecycle (planning, requirements collection, and design).
Lower-CASE: Supports the later stages (implementation, testing, and maintenance).
Integrated-CASE (I-CASE): Supports all stages of the lifecycle.
Efficiency vs. Effectiveness
Efficiency: Refers to the speed and cost-effectiveness of the development process.
Effectiveness: Refers to the quality and suitability of the resulting system.
Specific Benefits
Standards: Enforces organizational standards throughout development.
Integration: Stores all project information in a central repository.
Standard methods: Ensures a structured approach is followed.
Consistency: Automatically checks for inconsistencies in the design.
Automation: Automates repetitive tasks like documentation and code generation.
Chapter Summary & Key Takeaways
The Database System Development Lifecycle (DSDL) is a framework for managing the complexities of database creation.
Successful systems start with Mission Statements and Objectives.
Design is divided into three distinct phases: Conceptual, Logical, and Physical.
Application design must consider both transaction logic and user interface usability.
Testing should be intense, focusing on fault detection and specific usability criteria.
Maintenance is an ongoing process involving monitoring, tuning, and capacity planning.
CASE tools improve both the efficiency of the development process and the effectiveness of the final product.
