





## System Modeling
## Software Engineering

## Team 6





















Table of contents
## 1. Overview & Flowchart
## ● 1.1 System Flowchart
## 2. Context Model
## ● 2.1 System Boundaries
## ● 2.2 Context Diagram
## 3. Interaction Models
## ● 3.1 Use Case Diagram
## ● 3.2 Sequence Diagrams
## 4. Structural Models
● 4.1 Database Structure / ERD
## ● 4.2 Class Diagram
## 5. Behavioral Models
## ● 5.1 Activity Diagram
## ● 5.2 State Machine Diagram
## 6. Architectural Design
## ● 6.1 Architectural Pattern















## 1. Overview & Flowchart
## 1.1 System Overview
Handong ClubHub is a centralized web-based platform designed to improve club discovery,
recruitment, and event participation for students at Handong Global University. The system
integrates club information, recruitment management, and campus event announcements into a
single platform accessible to both students and club executives.
The primary purpose of the system is to:
● Help students discover clubs and campus activities efficiently
● Simplify the club application and recruitment process
● Provide club executives with tools to manage recruitment and events
● Centralize campus club-related information that is currently fragmented across social
media, KakaoTalk chats, and offline promotion channels
## 1.2 System Flowchart

## 1.3 Flowchart Description
The Handong ClubHub system begins at the Home Page, where users are prompted to either
log in or create a new account using their Handong email credentials.
After authentication, the system determines the role of the user and redirects them to either the
Student Dashboard or the Club Executive Dashboard.
## 1. Student Flow
Students can browse the club directory, filter clubs by category, and view detailed club
information such as recruitment status, schedules, and upcoming activities. If recruitment is
open, students may submit an application by filling out a custom questionnaire provided by the
club.
After submission, students can monitor the status of their application through the dashboard.
Students can additionally browse the Events Grid to discover club-hosted performances,
meetings, and activities. Events may be joined directly and optionally added to a personal
calendar.
## 2. Club Executive Flow
Club Executives access an administrative dashboard where they can manage club information,
recruitment periods, and application forms. Executives can review submitted applications and
update their status to Accepted, Rejected, Interview Scheduled, or Pending.
Club Executives can also create and manage event posts that become visible on the public
Events Grid. When an application status is updated, the system automatically sends a
notification to the corresponding student.
The flowchart demonstrates the interaction between the system’s authentication process, user
roles, and the major functional components defined in the Requirement Engineering document.








## 2. Context Model
2.1 Context diagram

## 2.2 Context Model Description
This context diagram represents the overall architecture of the Handong ClubHub system and
its interactions with supporting subsystems.
The Handong ClubHub platform serves as the central coordinating system connecting
authentication services, recruitment management, event management, notifications, and
database storage into a unified platform for campus clubs.
Each subsystem contributes to a specific functionality within the platform:
● The Authentication System ensures secure access and role verification.
● The Club Management System maintains club-related information.
● The Recruitment & Application System processes student applications.
● The Event Management System handles campus events and announcements.
● The Notification System distributes automated updates to users.
● The Database System stores and retrieves all platform data.
● The Calendar Integration System allows synchronization of events with external
calendars.

Together, these systems create a centralized and integrated club management platform for
students and club executives at Handong Global University.
2.3 Context of Handong ClubHub
The context model illustrates the relationship between the Handong ClubHub system and the
external systems that interact with it. Similar to the example provided in the lecture and sample
document, Handong ClubHub acts as the central system that communicates with multiple
supporting systems required for authentication, notifications, event management, and data
storage.
The following systems interact with the Handong ClubHub platform:
## 1. Authentication System
● Role: Handles user authentication and authorization using Handong student email
credentials.
● Interaction: Verifies user identity during login and registration processes and manages
role-based access for Students and Club Executives.
## 2. Club Management System
● Role: Manages club information including club profiles, recruitment status, categories,
and executive permissions.
● Interaction: Allows Club Executives to update and maintain club-related information
visible to students.
## 3. Recruitment & Application System
● Role: Handles club recruitment workflows and application processing.
● Interaction: Stores submitted applications, custom questionnaire responses, and
application status updates.
## 4. Event Management System
● Role: Manages club-hosted events, performances, activities, and announcements.
● Interaction: Allows Club Executives to create and manage event posts while students
browse and join events.
## 5. Notification System
● Role: Sends automated notifications related to:
○ Application status changes
○ Recruitment updates
○ Event announcements

● Interaction: Delivers notifications to students through email or in-app alerts.
## 6. Database System
● Role: Stores all persistent platform data including:
○ User accounts
○ Club information
## ○ Applications
## ○ Events
## ○ Notifications
● Interaction: Supports data retrieval and storage across all subsystems.
## 7. Calendar Integration System
● Role: Handles synchronization between club events and external calendar services.
● Interaction: Allows students to add events directly to personal calendars.
















## 3. Interaction Model
## 3.1 Use Case Diagram









## Student
The student can perform the following actions:
Log in/Register
## Actor Student
Use Case Login/Register
Description Allows Handong students to create an account or log in to
their existing account using their Handong email address
Stimulus Student navigates to ClubHub and clicks login or register
Response The system authenticates the student and gives them
access to the platform with student features
Comments This is required to do any personalized features like
following a club or submitting applications

Browse and filter club list
## Actor Student

Use Case Browse and filter club list
Description Allows students to view and filter the list of active Handong
clubs
Stimulus Student opens the club directory and applies filters
Response The system displays a filtered list of the clubs matching the
selected criteria
Comments Centralizes all active clubs in one area

View club details
## Actor Student
Use Case View club details
Description Allows students to view detailed information about a club
Stimulus Student clicks on a club from the club list
Response The system displays the club’s page which includes the
club’s description, activity schedule, announcements, etc.
Comments Helps students who previously had no access to club
information due to language barriers and lack of KakaoTalk
access

Browse event grid
## Actor Student
Use Case Browse event grid
Description Allows students to view a chronological list of all upcoming
events
Stimulus Student navigates to the events page
Response The system displays all the upcoming events sorted by date
Comments Helps with the problem of students missing events due to
missed flyers or buried KakaoTalk announcements

Follow/Bookmark club
## Actor Student
Use Case Follow/Bookmark club
Description Allows students with accounts to follow clubs they are
interested in
Stimulus Student clicks the follow button on a club’s detail page
Response The system saves the club to the student’s profile and
enables alert notifications for that club
Comments Allows student to keep track of clubs they are interested in


Submit application
## Actor Student
Use Case Submit application
Description Allows students with accounts to apply to a club during their
recruitment period
Stimulus Student clicks apply on a club page that has recruitment
open
Response The system displays a custom application form, accepts the
student’s answers, stores the filled application, and
displays a success confirmation. The application appears
as Pending in the student’s dashboard
Comments Only available during a club’s recruitment period, and the
student must be logged in to apply

Track application status
## Actor Student
Use Case Track application status
Description Allows a student to view the current status of their
submitted application
Stimulus Student navigates to their dashboard to check their
application
Response The system displays their application status (Pending,
## Accepted, Rejected)
Comments Application statuses are updated in real time


## Club Leader
The club leader can perform the following actions:

Log in/Register
## Actor Club Leader
Use Case Login/Register
Description Allows Handong club leader to create an account or log in
to their existing account using their Handong email address
Stimulus Club leader navigates to ClubHub and clicks login or
register
Response The system authenticates the club leader and gives them
access to the platform with club management features

Comments Club leaders use the same login system as students but
are granted additional permissions to manage their club
upon authentication

Manage club profile
## Actor Club Leader
Use Case Manage club profile
Description Allows a club leader to update their club’s profile
information to ensure it is accurate and up to date
Stimulus Club leader navigates to their club management dashboard
and edit club details
Response The system saves the updated club information and the
changes are immediately reflected on the club’s page
Comments Ensures students have access to accurate and current club
information

Post and manage events
## Actor Club Leader
Use Case Post and manage events
Description Allows a club leader to create, edit, and delete events or
announcements for their club
Stimulus Club leader navigates to their club’s event page and clicks
on create, edit or delete
Response The system saves the event and immediately displays it on
the public events grid and on the club’s page. Students who
follow the club receive a notification
Comments Replaces the current method of posting announcements in
multiple KakaoTalk group chats repeatedly

Review incoming applications
## Actor Club Leader
Use Case Review incoming applications
Description Allows a club leader to view all applications submitted by
students for their club
Stimulus Club leader navigates to the applicant review dashboard
Response The system displays all submitted applications with each
applicant’s answers and current status
Comments Replaces the previous process of checking application
responses and individually messaging applicants


Update application status
## Actor Club Leader
Use Case Update application status
Description Allows a club leader to update the status of a submitted
application
Stimulus Club leader selects an application and changes its status
Response The system updates the application status and notifies the
applicant of the change
Comments Any update made here is seen immediately in the student’s
dashboard

## 3.2 Sequence Diagrams
## 3.2.1 Application Submission Sequence

Figure I: Sequence Diagram for Application Submission
This sequence diagram illustrates the chronological flow of data, API interactions, and backend
logic required when a student submits a club application. The transaction initiates at the Next.js
presentation layer, where the user inputs their application data into the UI form. Upon
submission, the frontend client transmits an HTTP POST request to the Node.js backend
(/api/applications). This request payload is critical; it securely packages the applicant's

JWT (JSON Web Token) for authentication, the specific Club_ID, and a JSON array of the
custom Answers provided by the student.
Before processing the payload, the backend API acts as a secure controller. It first validates the
JWT to ensure the session is authentic. Next, it executes a read query (SELECT
is_recruiting) against the PostgreSQL Clubs table to verify that the target club's
recruitment window is currently active. If this business logic validation passes, the API executes
a write operation, inserting the user's ID, the club's ID, and the form data into the
Applications table. Upon a successful database commit, the API resolves the request with
an HTTP 201 (Created) status code alongside a success JSON response. The Next.js frontend
intercepts this response and updates the DOM to display the "Application Submitted
Successfully!" banner, completing the user journey.

## 3.2.2 Event Creation Sequence

Figure II: Sequence Diagram for Event Creation
This sequence maps the backend communication, data persistence, and strict authorization flow
executed when a Club Executive publishes a new campus event. The process begins with the
frontend capturing the event metadata (Title, Date, Description, Poster URL) via the Executive
Dashboard UI. The Next.js client dispatches an HTTP POST request to the /api/events
endpoint, passing the event payload, the target Club_ID, and the user's JWT.

Because this is a privileged action, the Node.js backend immediately enforces Role-Based
Access Control (RBAC). It queries the PostgreSQL database (e.g., a Users_Clubs relationship
table) to verify that the authenticated User_ID officially holds "Executive" privileges for that
specific Club_ID. If the authorization fails, the process aborts. If authorized, the backend
validates the event payload schema to prevent malformed data injections. The validated data is
then mapped to an SQL INSERT statement and committed to the Events table. Following
database confirmation, an HTTP 201 (Created) response is returned to the client. The frontend
then processes this success state to render a visual confirmation to the executive and triggers a
state refresh to instantly populate the new event on the public-facing Events Grid.

3.2.3 Club Filtering and Browsing Sequence

Figure X: Sequence Diagram for Club Filtering and Browsing
This sequence diagram details the rapid data retrieval architecture utilized when a student
browses and filters the campus club directory. Unlike the previous transactional diagrams, this
represents a stateless, read-heavy operation utilizing an HTTP GET request. The interaction is
triggered when the student toggles UI filters (such as selecting the "Academic" category or
checking the "Currently Recruiting" box). The Next.js frontend dynamically constructs
parameterized query strings (e.g., ?category=Academic&is_recruiting=true) and
routes the GET request to the Node.js /api/clubs endpoint.
Upon receiving the request, the backend API parses the URL parameters to dynamically
construct a safe SQL SELECT query. This query is executed against the PostgreSQL Clubs
table to fetch only the records that satisfy the exact user-defined conditions. The database
returns the matching rows, which the Node.js controller then sanitizes and formats into a

structured JSON array (Club_Objects). An HTTP 200 (OK) response delivers this data
payload back to the Next.js client. Finally, the frontend's state management system updates,
rendering the retrieved data into the visual Club Cards displayed on the user's screen.



















## 4. Structural Models
4.1 ERD — Key design choices:


● USERS table uses a role field (student / club_executive) matching FR1.2's RBAC
requirement, rather than separate tables — keeps auth simple.
● APPLICATIONS.answers is stored as JSON, directly matching the Answers (JSON
array mapping to custom questions) input from Structured Spec 4.
● CLUBS.is_recruiting is a boolean field, matching the is_recruiting toggle from FR4.1
and Spec 2.
● CLUB_FOLLOWS is a junction table (User ↔ Club many-to-many), supporting UR-05's
follow/bookmark feature.
● EVENTS.is_archived supports FR3.3's auto-archiving requirement.
● NOTIFICATIONS table supports FR5.2 (status update alerts) and NFR12 (delivery within
2 seconds).
4.2 Class Diagram — Key design choices:


● User is the base class; Student and ClubExecutive extend it — this mirrors the RBAC
structure and the two actors from the Use Case Diagram in section 4.1 of the
requirements.

● Methods on each class map directly to the use cases: submitApplication(),
toggleRecruitment(), reviewApplications(), etc.
● Application.updateStatus() takes an ApplicationStatus enum (Pending / Interview
Scheduled / Accepted / Rejected) from FR5.1.
● Event.archive() is a dedicated method reflecting FR3.3's automatic archiving
post-condition.
● Multiplicities (1..*, 0..*) match cardinalities in the ERD for consistency.
































## 5. Behavioral Models
## 5.1 Activity Diagram: Club Executive Application Review Process

This model outlines the sequential, conditional workflow executed by a Club Executive actor
when reviewing an incoming recruitment application. It illustrates the step-by-step logic from
initial authentication through evaluation branches to final system notifications.
## Logical Behavioral Steps:
- Start: The Club Executive logs into the ClubHub platform using their authenticated
Handong email credentials.
- Authentication Guard: The system verifies the user's token and Role-Based Access
Control (RBAC) permissions.
○ If unauthorized: Deny access and redirect to the login page.
○ If authorized (Club Executive): Grant access to the secure administrative
interface.
- Navigate to Dashboard: The Executive opens the Club Executive UI Dashboard and
accesses the Incoming Applications Queue.
- Select Candidate: The Executive clicks on a specific student application that is currently
in the Pending state.
- Review Phase (Data Fetch): The system pulls and displays the candidate's data,
including their user profile details and answers submitted via the club's custom question
form.
- Decision Node 1 (Initial Screening / Portfolio Review):
○ Branch [Fail Criteria]: If the applicant does not meet the basic criteria, the
Executive selects "Reject".
■ Action: Skip directly to Step 10 (Rejection Path).
○ Branch [Pass Criteria]: If the candidate passes the initial screening, the
Executive marks the application status as Under Review.
- Decision Node 2 (Evaluation Requirements):
○ Branch [Interview/Audition Required]: For clubs requiring practical evaluations
(e.g., dance audition or interview):
■ Action: The Executive inputs schedule details (date, time, location) into
the dashboard.
■ Action: The system shifts the application state to Interview
## Scheduled.
■ Action: The interview is conducted, and the Executive uploads final
evaluation notes.
○ Branch [No Interview Required]: Move directly to the final evaluation based
strictly on the written application.
- Decision Node 3 (Final Decision):
○ Branch [Approve]: The Executive selects "Accept".
■ Action: The application state updates to Accepted.
○ Branch [Decline]: The Executive selects "Reject".
■ Action: The application state updates to Rejected.

- Database Update Execution: The system securely commits the updated status
(Accepted or Rejected) to the PostgreSQL relational database (guaranteed execution
within ≤ 2 seconds).
- Notification Trigger: The Application Layer hooks into the database commit event and
fires an automated web notification to the target Student’s UI panel (delivered within ≤ 2
seconds).
- End: The application review cycle for the given applicant terminates, and the record
transitions to a persistent historical state.
5.2 State Machine Diagram: Lifecycle of an Application Object
This model represents the discrete states that an individual Application object occupies
throughout its lifecycle, including the valid events, triggers, and guards that govern state
transitions.
## Current State Target State Triggering Event Guard Condition /
## Context
## System Action / Side
## Effect
(Initial State)
## Pending
Student submits
the recruitment
form.
Target club’s
is_recruiting ==
## True.
Generates unique
Application_ID;
logs timestamp and
saves answers array
into the database.
## Pending Under
## Review
## Club Executive
opens the
application record.
Executive must hold
authenticated rights for
that specific Club_ID.
Updates the review
dashboard timestamp.
## Under Review Interview
## Scheduled
## Executive
schedules an
audition/interview
slot.
The club requires an
interactive screening
phase.
Dispatches an
automated schedule
notification to the
applicant (≤ 2
seconds).
## Under Review Accepted
Executive confirms
direct selection.
No additional
interview/audition
required.
Commits status
update to database;
fires Accepted
banner on Student UI.
## Under Review Rejected
Executive triggers
screening
rejection.
Application fails to meet
structural club
standards.
Commits status
update; dispatches
rejection alert to
student profile.

## Interview
## Scheduled
## Accepted
Executive confirms
final selection
post-evaluation.
Interview or audition
metrics successfully
met.
Commits to database;
sends acceptance
notification; updates
active club
membership list.
## Interview
## Scheduled
## Rejected
Executive triggers
post-interview
rejection.
Performance metrics
not achieved.
Commits to database;
dispatches final
rejection update
notification.
## Accepted
(Final State) Application cycle
completes.
Persistent data
persistence guarantees
active.
Record remains
locked as a read-only
archive in historical
logs.
## Rejected
(Final State) Application cycle
completes.
Persistent data
persistence guarantees
active.
Record remains
locked as a read-only
archive in historical
logs.










- Architecture design
## 6.1. Architectural Pattern

Identification: ClubHub adopts a 3-Tier Architecture to cleanly separate system
responsibilities.
● Presentation Layer (Frontend): Built with Next.js. It is deployed on cloud infrastructure
(e.g., Vercel), and static assets such as images and logos are served via a CDN for fast
and efficient delivery.
● Application Layer (Backend API): Composed of Node.js and Supabase APIs. This
layer strictly adheres to RESTful API design principles, and all data exchange between
the client and server is conducted using JSON format.
● Data Layer (Database): Utilizes a PostgreSQL relational database. This layer ensures
data integrity and persistently stores critical system data, including club applications,
event schedules, and user profiles.
## Justification:
● Scalability & Traffic Handling: A stateless API design is applied to enable the
horizontal scaling of backend services. This is essential to securely handle traffic spikes
without performance degradation during the critical early-semester recruitment periods
(Weeks 1–3) and to stably support over 500 concurrent active users.
● Separation of Concerns & Maintainability: By strictly separating UI rendering (Next.js)
from core business logic (Node.js/Supabase), this modular architecture maximizes code
maintainability and allows frontend and backend teams to iterate independently.
● Performance Optimization: To guarantee fast search and filtering responses (under 1
second), the Data Layer (PostgreSQL) is optimized with indexing on key fields such as
'club category', 'recruitment status', and 'event date'.
● Security & Access Control (RBAC): Routing all data transactions through the
Application Layer ensures robust security. It allows the system to securely enforce
JWT-based authentication and Role-Based Access Control (RBAC) at the API level,
clearly distinguishing permissions between regular Students and Club Executives.



