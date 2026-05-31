





## Requirements Documents
## CLUB HUB:
Providing a Centralized Web-Based platform where students and
administrators can find, join manage clubs in Handong























## 1

## Team

Name Email ID Role
## Buhendwa
## Christopher Lulando
christopherbuhendwa
## @handong.ac.kr
22300360 UI/UX Researcher &
DevOps
Seunghun Hyeon tmdgns4970@handon
g.ac.kr
## 22100791 Project Manager
Elise Nicole de la
## Bastide
## 22300245@handong.
ac.kr
## 22300245 Frontend Lead
Leo Ricardo leo.ricardo@handong.
ac.kr
22400238 Dev-Lead
## Sailesh Lama 22300362@handong.
ac.kr
## 22300362 Developer
























## 2

Table of Contents
## 1. Introduction
● 1.1 Background (The Problem)
## ● 1.2 Proposed Solution & Scope
## 2. Requirement Discovery
## ● 2.1 Discovery Methods
● 2.2 Stories and Scenarios
## 3. Requirement Elicitation
## ● 3.1 Stakeholders Identification
## ● 3.2 User Requirements:
## 4. Requirement Specification
## ● 4.1 Use Case Diagram
## ● 4.2 System Requirements
## ● 4.3 Structured Specification
## ● 4.3 Information Architecture
## 5. Requirement Validation
● 5.1 Validation via Prototyping
## ● 5.2 Validation Review Checklists
## ● 5.3 Test Case Generation
## 3



















## 4

## 1. Introduction
## 1.1 Problem Space
Handong Global University students currently face difficulties when trying to discover, compare,
and join campus clubs. Club-related information is spread across multiple channels such as
physical announcement boards, personal networks, social media posts, and informal messages.
Because there is no centralized platform that organizes club information in one place, students
must manually search through different sources to find recruitment schedules, club descriptions,
activity details, and application methods.
This fragmented information environment creates several problems. First, students may miss
recruitment periods because deadlines are not delivered through a reliable and unified channel.
Second, new students or students with fewer personal connections may have less access to
club information. Third, club leaders must repeatedly promote their clubs through different
channels, which increases management effort and may still fail to reach the intended audience.
As a result, the current process is inefficient, inconsistent, and dependent on personal networks
rather than equal access.
1.2 Purpose of the To-Be System
The To-Be system, Handong ClubHub, aims to solve this problem by providing a centralized
web-based platform where students can easily find campus club information and where club
administrators can manage recruitment and announcements. The system will improve
accessibility by gathering club descriptions, categories, schedules, recruitment status,
announcements, and event information into one integrated service.
The main goal of ClubHub is not simply to display club information, but to support the full
discovery-to-application process. Students should be able to search and filter clubs, view
detailed club pages, follow clubs of interest, check recruitment notices, and access
application-related information. Club administrators should be able to update club profiles, post
announcements, manage recruitment notices, and provide reliable information to students.

## 5

## 1.3 System Scope
The scope of the To-Be system includes the following core functions:
## 1. Club Information Page
The system will provide a centralized list of campus clubs and organizations. Each club
page will include basic information such as the club name, description, category, activity
schedule, recruitment status, and related announcements.
- Search and Filtering
Students will be able to search for clubs and filter them by category, recruitment status,
and activity schedule. This feature directly addresses the current problem of manually
checking multiple information sources.
- Recruitment and Announcement Management
Club administrators will be able to upload and manage recruitment notices, event
updates, and announcements through an admin dashboard. This reduces the burden of
spreading information across disconnected channels.
- Follow or Bookmark Function
Students will be able to follow or bookmark clubs so that they can easily revisit selected
clubs and receive relevant updates in a personalized space.
## 5. Recruitment Deadline Alerts
The system will support notifications or alerts for important recruitment dates and
deadlines, helping students avoid missing application periods.
## 6. User Authentication
The system will provide secure login for students and club administrators so that
user-specific features and admin management functions can be separated properly.
1.4 Out of Scope
To keep the project realistic within the semester timeline, the following features are outside the
initial scope:
● Full mobile application development for iOS or Android
● Online payment or membership fee management
● Real-time chat between students and club leaders
● AI-based club recommendation
## 6

● University-wide official administrative approval workflow
● Advanced analytics dashboard for club performance
These features may be considered for future expansion, but the first version will focus on
building a functional MVP that centralizes club information, supports search/filtering, and
enables basic recruitment management.
## 1.5 Expected Value
By implementing ClubHub, students will gain equal and convenient access to club information
regardless of their personal connections. Club leaders will be able to manage announcements
and recruitment information more efficiently. The university community will benefit from
improved student engagement, better information transparency, and a more organized club
recruitment process.
## 2. Requirements Discovery
## 2.1 Interviews
The interviews were structured into two parts. First, each interviewee was asked a series of the
same questions to allow comparison across groups. Following this, group-specific follow-up
questions were asked to explore the unique experiences and requirements of each group.
2.1.1 Interview Questions and Findings
- Where do you currently go to find information about clubs?
Most either ask around or get information from people they may know in the club.

- Where do you currently go to find information about club events?
Most either ask people they may know in the club or wait till they see an announcement
about the club event being posted in a KakaoTalk group chat.

- Do you think that you have a clear picture of the clubs that are currently active
on campus?
No, most have knowledge about a few popular clubs and have little knowledge about
## 7

other clubs active on campus.

- If there were a centralized system for all club information, would you use it?
What would you expect it to have?
Yes. Would expect to have an area to see a calendar of upcoming events for clubs, also
to have at least the general information about each club.

- Was there ever a time when you missed a club event or a recruitment
deadline? What happened?
Some had the experience. It happened mostly because of missed announcements in
KakaoTalk group chats or simply not seeing the flyers due to the number of flyers
already being displayed around campus.

- Do you think that the current methods (e.g. KakaoTalk, flyers) do a good job at
informing students about club activities? Why or why not?
To some extent it does a good job but it does take some level of effort to find information.
Everyday they are bombarded with many messages about different events and clubs
whether they have interest in it or not.

- (Club Member) How do you normally go about recruiting new members to your
club? What is the most frustrating part of the process?
Posting announcements in the major group chats on campus and putting up flyers. The
frustrating part is that all clubs are usually recruiting at the same time so their
recruitment announcements in KakaoTalk get buried amongst the other announcements.

- (Club Member) Do you try to recruit international students? Why or why not?
Most don’t really recruit international students due to the language barrier. But those that
do always try to make the extra effort to reach out to the international community and
promote in the international group chats.

## 8

- (Club Member) What features would you want from a platform like ClubHub?
A place to promote events, share club information and somewhere to post media of
previous club events so new students can get a clear idea of what the club is about.

- (Non-member) Is it hard to keep up to date with events hosted by clubs you are
interested in?
Yes, as announcements can be easy to miss.

- (Non-member) What would make you more likely to attend club events?
Being able to easily find information about events without having to hunt down the
information.
2.2 Stories and Scenarios
## 2.2.1.      Recruit New Club Members
Context: Taehyung, a junior at Handong University, has been elected as leader for the dance
club that he has been a part of for the past two years. A new semester is about to start and
once again, the club must recruit new members.
Story: Instead of relying on the flyers that are hung around campus or messages sent in
KakaoTalk group chats that often get buried amongst many other messages, Taehyung logs into
ClubHub. He navigates to his club’s page to create a new post for the recruitment of new club
members. He inputs any important details such as recruitment dates, audition requirements, link
to application, and contact information. He also uploads photos and/or videos from past
performances to help entice the viewer to apply for the club. Once Taehyung publishes the post,
it is then displayed on the ClubHub feed page where any student can easily view it.

2.2.2.      An International Student Finding a Club
Context: David is a new international student at Handong University. He was previously a part of
his secondary school’s dance club and wants to continue that interest at university but is
unfamiliar with how clubs are promoted on campus. He is currently unable to create a
## 9

KakaoTalk account, meaning that he has no access to the group chats that most clubs use to
post announcements. He is introduced to ClubHub during iHANST (orientation week).
Story: Before being introduced to ClubHub, David has tried finding information about clubs on
the Handong website but finds the information to be out of date. He also sees the many flyers
around campus about different clubs but is unable to differentiate which club would suit him as
all the information is in Korean. Additionally, he is unaware of any announcements made in
KakaoTalk as he is currently unable of creating a KakaoTalk account. He is then introduced to
ClubHub.
David logs onto ClubHub for the first time. On the homepage, he is able to find a list of the
university’s clubs and uses the search and filter features to find any dance-related clubs. He
goes through each club’s page and finds up-to-date information about the club and photos and
videos of the club’s activities. From this, he is able to understand each club’s style and activities,
and can now find a club that matches his interest. Once he has found a club that matches his
interests, David then follows the recruitment information given on the club’s page and submits
his application.

## 2.2.3.      The Student Who Keeps Missing Events
Context: Jiyeon, a student at Handong University, is not a member of any club, but enjoys
attending club events like concerts and performances. She knows about the announcements
made either through KakaoTalk or through flyers. However, she often misses these posts
whether it be because the announcements that get posted in KakaoTalk get buried by other
messages, or simply because she does not look at the flyers around campus. She also finds
herself having to ask around about any upcoming events.
Story: Jiyeon opens ClubHub and navigates to the Events page. Here, they are able to see
a chronological list of upcoming club events in one centralized place. She can easily find
detailed information for each event such as date, time, location and ticketing details. Jiyeon
also bookmarks events she is interested in and saves specific clubs to her profile to stay
updated on their events. With this, she can easily keep track of upcoming events and no
longer miss opportunities of attending events of the clubs she enjoys.

## 10

## 2.3 Existing System Features

Currently there is an app called “모보까” that promotes themselves as being a place to get
the latest events and news from Handong University clubs. Its homepage describes its
purpose as providing both on-campus performance information and club information,
something that directly mirrors what is trying to be done with ClubHub. The platform also
shows three main sections: Things to See/Events, Recruiting, and Clubs. Authentication is
handled via Google sign-in, with only Handong University email accounts.



## 2.3.1 모보까 Limitations
-      Backend server is offline
All features of the platform are inaccessible as the pages produce error messages such
as “Cannot connect to the server. Check if the server is running or contact the administrator”, or
that the contents have failed to load. This suggests that the back-end infrastructure is no longer
running, thus making all content on the platform inaccessible and unusable.
## 11



-      Login is non-functional
The only authentication method provided is the Google sign-in with a Handong
University email. As the back-end server is offline, the login flow does not complete. This results
in students who are trying to sign in to be redirected to the server error page, preventing access
to any of the platform’s features.




-      Korean only interface
All of the content on the platform is entirely in Korean, with no English language option.
This creates an accessibility barrier for the international students, limiting the platform’s usability
and inclusiveness.

## 12

## 3. Requirement Elicitation
## 3.1 Stakeholder Identification
Based on requirements discovery data (including interviews, user stories, and analysis of
existing campus systems), the following stakeholders have been identified for the ClubHub
system:
Stakeholder Description & Role Key Concerns/Pain Points
## Students
(General
## Users)
Primary end-users (Domestic &
International) seeking to
discover and join clubs.
Missing recruitment deadlines; reliance on
fragmented personal networks; exclusion
from KakaoTalk-centric announcements.
## Club
## Executives
Administrators responsible for
recruiting, posting
announcements, and
managing club data.
Difficulty reaching a broad audience;
recruitment posts being buried in
high-traffic, disconnected channels.
## International
## Students
A sub-group with specific
accessibility needs.
Language barriers on Korean-only
platforms; lack of access to local apps (e.g.,
KakaoTalk); unfamiliarity with campus
culture.
## New
## Students
First-year students without
established campus networks.
Disproportionately disadvantaged by the
lack of a centralized, public information
hub.
## University
## Staff
Passive stakeholders
benefiting from increased
engagement.
Indirect interest in organized student
activity; does not interact with the MVP
directly.



## 13

3.2 High-Level User Requirements
The following requirements are extracted from interview findings, user scenarios, and existing
system analysis. (UR - User Requirement)
ID Requirement
## Name
## Description Source
UR-01 Club
## Discovery
Students shall browse a centralized directory
of active clubs including name, category, and
status.
## Interview Q3, Q4
UR-02 Search &
## Filtering
Students shall search by keyword and filter by
category or recruitment status.
## Interview Q1, Q2;
## Scenario 2.2.2
UR-03 Club Detail
## Pages
Each club shall have a dedicated page with
activity descriptions, schedules, and media.
## Interview Q9;
## Scenario 2.2.2
UR-04 Event
## Browsing
Users shall view a chronological list of
upcoming events (date, time, location) without
logging in.
## Interview Q4;
## Scenario 2.2.3
UR-05 Follow &
## Bookmark
Logged-in users shall follow clubs and
bookmark events for personalized updates.
## Interview Q10, Q11;
## Scenario 2.2.3
UR-06 Recruitment
## Alerts
Users shall view active recruitment notices and
receive alerts for upcoming deadlines.
## Interview Q5;
## Scenario 2.2.3
UR-07 Post Creation Club Executives shall create and publish posts
with dates, links, and media.
## Interview Q7;
## Scenario 2.2.1
UR-08 Profile
## Management
Club Executives shall update club metadata
(schedules, photos) to ensure data accuracy.
## Scenario 2.2.2;
## Section 2.3
UR-09 User
## Authentication
The system shall provide secure login to
separate student features from executive
admin features.
## Section 1.3, 2.3
## 14

UR-10 Multilingual
## Interface
Critical interface elements and club info shall
be accessible in both Korean and English.
## Interview Q8; Section
## 2.3.1; Scenario 2.2.2


## 4. Requirement Specification
This section details the formal specifications of the Handong ClubHub system, translating the
elicited user requirements into technical blueprints. It now reflects the system's dual purpose: a
comprehensive recruitment platform and a centralized hub for all club-hosted events, activities,
and announcements.
## 4.1 Use Case Diagram Description

System Boundary: Handong ClubHub Web Platform
## Actors:
- Student: A standard Handong student user looking to join a club or attend campus
events.
- Club Executive: A student user with elevated privileges linked to a specific club entity.
## Use Case Relationships:
## 15


## 4.2 System Requirements
4.2.1 Functional Requirements (FR)
FR1: Authentication and Account Management
● 1.1: The system shall provide a user interface for registration using a Handong email
address.
● 1.2: The system shall enforce Role-Based Access Control (RBAC) to distinguish
between "Student" and "Club Executive" privileges.
FR2: Club Page and Information (Core)
● 2.1: The system shall display all registered campus clubs in a searchable interface.
● 2.2: The system shall allow users to filter clubs by category (e.g., Academic, Religious,
Sports, Arts) and active recruitment status.
● 2.3: The system shall display a dedicated "Club Details" page containing the club's
mission, meeting times, and historical/upcoming events.
● 2.4: The system shall allow users to follow their favorite clubs
FR3: Event and Activity Management (Core)
● 3.1: The system shall allow a Club Executive to create, edit, and delete event posts
(e.g., performances, general meetings, project exhibitions) containing a title, date,
image, and description.
● 3.2: The system shall aggregate and display all active club events in a centralized
"Events Grid" accessible to all students.
● 3.3: The system shall automatically archive events from the main grid once the event
date has passed.
● 3.4: The system shall allow students to join an event and automatically input it to the
user calendar.
FR4: Recruitment and Application Submission (Core)
● 4.1: The system shall allow a Club Executive to toggle an is_recruiting status and define
custom application questions.
## 16

● 4.2: The system shall allow students to fill out and submit these custom applications
directly through the platform.
FR5: Applicant Review and Status Management
● 5.1: The system shall provide a secure dashboard for Club Executives to view and
update the status of incoming applications (Pending, Interview Scheduled, Accepted,
## Rejected).
● 5.2: The system shall notify students when their application status is updated.
4.2.2 Non-Functional Requirements (NFR)
- Product Requirements (Performance, Scalability, UX/UI, Reliability)
NFR1: Usability (UX/UI)
● 1.1: The system shall implement a mobile-first responsive design supporting:
○ Screen sizes from 320px (mobile) to 1920px (desktop).
● 1.2: A user shall be able to:
○ Locate a club within ≤ 3 interactions (clicks/taps) from the homepage.
○ Locate an event or application form within ≤ 3 interactions.
● 1.3: The system shall maintain UI consistency across all pages:
○ Navigation bar, card layouts, and interaction patterns must remain uniform.
● 1.4: The system should achieve:
○ ≥ 90% task completion rate in usability testing (finding a club, applying, viewing
events).
● 1.5: Error messages shall be:
## ○ Human-readable
○ Displayed within < 200ms after invalid input
NFR2: Performance (Latency & Throughput)
● 2.1: The system shall ensure:
○ Initial page load time ≤ 2.0 seconds
○ Club PAGE & Events Grid render time ≤ 1.5 seconds
● 2.2: API response times:
○ GET requests ≤ 500ms
○ POST/PUT requests ≤ 800ms
## 17

● 2.3: Search and filtering operations shall return results within:
○ ≤ 1 second
● 2.4: Event creation and application submission shall complete within:
○ ≤ 2 seconds including database write
NFR3: Scalability
● 3.1: The system shall support:
○ ≥ 500 concurrent active users
○ ≥ 1,000 registered users
● 3.2: The system shall handle:
○ Traffic spikes during Weeks 1–3 recruitment period without degradation
● 3.3: Backend services shall:
○ Scale horizontally using stateless API design
● 3.4: Database shall:
○ Support indexing on:
■ club category
■ recruitment status
■ event date
● 3.5: System shall maintain:
○ < 10% performance degradation under peak load
NFR4: Reliability & Availability
● 4.1: The system shall maintain:
○ ≥ 99.9% uptime per semester
● 4.2: System shall recover from failures within:
○ ≤ 5 minutes (auto-restart / failover)
● 4.3: Data persistence guarantees:
○ No loss of:
■ submitted applications
■ posted events
● 4.4: Backup requirements:
○ Database backups performed daily
NFR5: Data Consistency
## 18

● 5.1: Event and club data shall be:
○ synchronized in real-time or near real-time (< 2 seconds delay)
● 5.2: Updates made by Club Executives shall:
○ Reflect in the system immediately after commit
● 5.3: Application status updates shall:
○ Be visible to users within ≤ 1 second
- Organizational Requirements (Infrastructure & Development Constraints)
NFR6: System Architecture
● 6.1: The system shall follow a 3-tier architecture:
○ Presentation layer (Next.js frontend)
○ Application layer (Node.js / Supabase APIs)
○ Data layer (PostgreSQL)
● 6.2: The system shall use:
○ RESTful API design principles
○ JSON format for all data exchange
NFR7: Infrastructure & Traffic Management
● 7.1: The system shall support:
○ Deployment on cloud infrastructure (e.g., Vercel, Supabase)
● 7.2: Static assets (images, logos, posters) shall:
○ Be served via CDN for faster delivery
NFR8: Maintainability
● 8.1: The codebase shall:
○ Follow modular architecture (separation of concerns)
● 8.2: API endpoints shall:
○ Be documented using OpenAPI or Swagger
● 8.3: The system shall support:
○ Continuous Integration / Continuous Deployment (CI/CD)

## 19

NFR9: Compatibility
● 9.1: The system shall support:
○ Modern browsers:
■ Chrome, Safari, Edge (latest 2 versions)
● 9.2: The system shall function on:
○ Android and iOS mobile browsers
● 9.3: No installation shall be required (web-based platform)
- External Requirements (Security, Privacy, Compliance)
NFR10: Security (Authentication & Authorization)
● 10.1: All protected endpoints shall require:
○ JWT-based authentication
● 10.2: Role-Based Access Control :
○ Student vs Club Executive permissions enforced at API level
● 10.3: Session security:
○ Tokens shall expire after ≤ 24 hours
● 10.4: Protection mechanisms:
○ Rate limiting (e.g., max 100 requests/min/user)
○ Input validation to prevent:
■ SQL Injection
■ XSS attacks
NFR11: Data Protection & Privacy (PIPA Compliance)
● 11.1: The system shall comply with:
○ South Korean Personal Information Protection Act (PIPA)
● 11.2: User data requirements:
○ Passwords must be hashed using bcrypt
○ Sensitive data must be encrypted at rest
● 11.3: Data collection:
○ Only necessary data shall be collected
● 11.4: Users shall:
○ Be able to request deletion of their data
## 20

NFR12: Notification Reliability
● 12.1: Notifications (application status updates, events):
○ Shall be delivered within ≤ 2 seconds
● 12.2: System shall support:
○ In-web notifications (mandatory)
○ Optional push notifications (future extension)
NFR13: Logging & Monitoring
● 13.1: The system shall log:
○ User actions (login, application submission, event posting)
○ System errors and failures
● 13.2: Monitoring tools shall:
○ Track uptime, latency, and error rates














## 21

## 4.3 Structured Specification
The following tables provide the detailed functional specifications for the four primary pillars of
the ClubHub system: Club Browsing, Event Posting, Event Viewing, and Application
## Submission.
Structured Specification 1: View Club List and Information
## Attribute Description
Function Browse and View Club Directory
## Description
Allows students to discover campus clubs, apply filters, follow
clubs, and view detailed club profiles.
## Inputs
Search_Query (String), Category_Filter (Enum),
Recruitment_Status (Boolean).
Source Student UI (Directory Page).
## Outputs
A rendered list or grid of Club_Object data (Name, Category, Logo,
## Intro).
Destination Student UI.
Pre-condition The system database contains at least one registered club.
## Post-condition
The user is presented with accurate club information matching their
query.
## 22

## Side Effects None.

Structured Specification 2: Post an Event or Activity
## Attribute Description
## Function Create Event Post
Description Allows a Club Executive to publish an announcement, performance,
or activity to the public platform.
Inputs Club_ID, Event_Title (String), Event_Date (Date/Time), Description
(Text), Poster_Image (File/URL).
Source Club Executive UI (Event Management Dashboard).
Outputs Database record created in the Events table. Success confirmation
message.
## Destination Backend Database.
Pre-condition The user is securely authenticated and holds "Club Executive"
privileges for the specific Club_ID.
Post-condition The new event immediately becomes visible on the public-facing
Events Grid and the club's specific profile page.
## 23

Side Effects Generates a push/in-app notification to students who have
"favorited" the club (if feature is active).

## Structured Specification 3: View Events Grid
## Attribute Description
## Function Browse Campus Events
Description Allows students to view a chronological grid of all upcoming club
performances, announcements, and activities.
Inputs Date_Range (Optional Date Filter).
Source Student UI (Events Grid Page).
Outputs A sorted array of Event_Object data, ordered by chronological
proximity (soonest first).
Destination Student UI.
Pre-condition None. (Accessible to both guests and logged-in students).
Post-condition Events whose Event_Date has passed are automatically filtered out
of the "Upcoming" view.
## Side Effects None.
## 24

## Structured Specification 4: Submit Club Application
## Attribute Description
## Function Submit Recruitment Application
Description Allows a registered student to apply to a club during an active
recruitment cycle.
Inputs User_ID (from auth token), Club_ID, Answers (JSON array
mapping to the club's custom questions).
Source Student UI (Application Form).
Outputs Database record created in the Applications table.
Destination Backend Database; Student UI (Success Banner).
Pre-condition 1. The user is authenticated as a "Student".
- Target club's is_recruiting status is True.
Post-condition The application is visible in the student's dashboard as Pending
and populates in the Club Executive's review queue.
## Side Effects None.



## 25

## 4.4 Information Architecture
4.4.1. Navigation flow






## 26

5.1 Validation via Prototyping
This section utilizes low-fidelity UI mockups to visually validate the core system requirements
defined in Section 4.3. By mapping the structured inputs and outputs to a tangible interface, we
ensure the proposed Handong ClubHub system is feasible, usable, and accurately aligned with
stakeholder needs.
## 5.1.1 Prototype 1: Club Page Validation

Figure 1: Student UI - Club page & Filtering
● Validation Scenario: This prototype validates Structured Specification 1 (Browse
and View Club Directory).
## ● Traceability Checklist:
○ The interface successfully incorporates the required Search_Query via the top
search bar.
○ The Category_Filter and Recruitment_Status inputs are visually
represented as toggle buttons (e.g., Academic, Sports, Currently Recruiting).
## 27

○ The system output (Club_Object) is successfully rendered as a grid of cards
displaying the club logo, name, and introductory text, proving the feasibility of the
database query.

## 5.1.2 Prototype 2: Event Creation Validation

Figure 2: Club Executive UI - Event Management Dashboard
● Validation Scenario: This prototype validates Structured Specification 2 (Create
Event Post), demonstrating the elevated privileges of the Club Executive actor.
## ● Traceability Checklist:
○ The form accurately captures all required system inputs: Event_Title,
Event_Date (via calendar picker), Description, and Poster_Image upload
functionality.
## 28

○ The layout confirms that a user with the correct pre-conditions (Club Executive
status) can cleanly interact with the system to generate a database record before
hitting the "Publish Event" action button.



## 5.1.3 Prototype 3: Campus Events Grid Validation

Figure 3: Student UI - Chronological Events Grid
## 29

● Validation Scenario: This prototype validates Structured Specification 3 (Browse
## Campus Events).
## ● Traceability Checklist:
○ The UI demonstrates the Date_Range input through the "Select Dates" filter
drop-down.
○ The interface successfully outputs the Event_Object array. The visual
hierarchy proves the post-condition requirement that events are sorted
chronologically by proximity, allowing students to seamlessly browse campus
activities without needing to log in.

## 5.1.4 Prototype 4: Application Submission Validation

## 30

Figure 4: Student UI - Recruitment Application & Success State
● Validation Scenario: This prototype validates Structured Specification 4 (Submit
Recruitment Application), which is the most critical conversion point of the platform.
## ● Traceability Checklist:
○ The interface accommodates the custom Answers input via structured text fields
(e.g., "Why do you want to join?").
○ Crucially, this mockup visually validates the exact system output and destination:
Student UI (Success Banner). The overlaying "Application Submitted
Successfully!" modal proves the system provides immediate, human-readable
feedback to the user once the database record is created.












## 31

## 5.2: Review Checklists
5.2.1 Purpose of Review
The purpose of Phase 5.2 is to verify that all requirements produced during the project are clear,
testable, consistent, and traceable to the original problem space. As the editor, the main
responsibility is to ensure that the final requirements document flows logically from the identified
As-Is problems to the proposed To-Be system features.
This review focuses on two main goals:
## 1. Traceability Check
Every requirement should be connected to a specific problem, user need, or project
objective.
## 2. Verifiability Check
Every requirement should be written in a way that can be tested, reviewed, or
demonstrated during the final validation stage.
## 5.2.2 Traceability Checklist

## Check Item Review Question Status
Problem Alignment Does each requirement solve one of the original
problems, such as information fragmentation,
manual searching, or dependency on personal
networks?
## Checked
To-Be Scope Alignment Is each requirement included within the defined
scope of the ClubHub system?
## Checked
User Need Connection Is the requirement connected to a specific user
group, such as students or club administrators?
## Checked
Feature Consistency Does the requirement match the planned
features, such as club directory, filtering,
## Checked
## 32

announcements, following, alerts, or
authentication?
No Unplanned Expansion Does the requirement avoid adding features that
are outside the MVP scope?
## Checked
Requirement Source Can the requirement be traced back to user
research, use cases, user stories, or the project
proposal?
## Checked


## 5.2.3 Verifiability Checklist

## Check Item Review Question Status
Clear Wording Is the requirement written clearly without vague words such as
“easy,” “fast,” or “good” unless they are defined?
## Checked
## Testable
## Condition
Can the requirement be tested through a demo, checklist, or
acceptance test?
## Checked
## Measurable
## Output
Does the requirement describe an observable system behavior or
output?
## Checked
## Single
## Responsibility
Does each requirement describe only one function or quality
attribute?
## Checked
## Acceptance
## Criteria
Is it possible to define pass/fail criteria for the requirement?
## Checked
## Implementation
## Feasibility
Can the requirement realistically be implemented within the
project schedule and technical stack?
## Checked

## 33

## 5.2.4 Requirement Review Example
Revised version:
-> The platform should allow students to access the club list, search function, and
club detail pages within three clicks from the main page.

## 34
## Original Requirement Problem Traced Review Result
Users should be able to browse a list
of campus clubs.
Solves fragmented club information. Valid and testable.
Users should be able to filter clubs
by category and recruitment status.
Solves manual searching across
multiple channels.
Valid and testable.
Club leaders should be able to
upload announcements.
Solves inconsistent information
sharing.
Valid and testable.
Users should be able to follow clubs. Supports personalized access to
selected club updates.
Valid and testable.
The platform should be easy to use. Related to usability, but wording is
vague.
Needs revision.

## 5.2.5 Editor’s Review Criteria
As the editor, Seunghun will review the final requirements based on the following
criteria:
● Requirements must directly support the original problem definition.
● Functional requirements must be connected to student or club administrator
needs.
● Non-functional requirements must be written in measurable or reviewable terms.
● Requirements must not exceed the agreed MVP scope.
● Duplicate or overlapping requirements should be merged.
● Vague requirements should be rewritten into testable statements.
● The final document should follow a logical flow:
## Problem → User Need → Requirement → Feature → Validation Method
## 5.2.6 Final Review Output
The final output of Phase 5.2 will be a reviewed requirements checklist and a short
editorial report. The report will identify whether each requirement is traceable, verifiable,
and aligned with the project scope. Any unclear or untestable requirements will be
marked for revision before the final validation and packaging stage.



## 35