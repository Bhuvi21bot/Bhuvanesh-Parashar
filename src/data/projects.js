// DRAFT COPY — written to be clean and presentable out of the box.
// Swap in your real write-ups and GitHub/demo links whenever you're ready;
// leave a link as "" to keep its button hidden in the modal.

const projects = [
  {
    id: 'busmate',
    name: 'BusMate',
    tagline: 'Real-time campus bus tracking & transport management',
    tags: ['React', 'Node.js', 'Socket.IO', 'MongoDB'],
    size: 'lg',
    overview:
      'BusMate is a real-time transport tracking platform built to help students track campus buses live, cutting down on wait times and uncertainty.',
    problem:
      'Students had no visibility into where their bus actually was, which meant missed rides and long, unpredictable waits at the stop.',
    solution:
      'A live tracking app that shows each bus on a map in real time, predicts ETAs per stop, and notifies riders when a bus is delayed.',
    techStack: ['React', 'Node.js', 'Express', 'Socket.IO', 'MongoDB', 'Google Maps API'],
    features: [
      'Live bus location tracking on an interactive map',
      'ETA prediction for each stop',
      'Route & schedule management for admins',
      'Push notifications for delays',
    ],
    architecture:
      'A React client subscribes to live location updates over Socket.IO from a Node/Express server, which persists routes and schedules in MongoDB and integrates with the Google Maps API for mapping and ETA calculation.',
    challenges:
      'Keeping location updates smooth and accurate at scale, handling spotty GPS signal gracefully, and making sure the UI stayed responsive under frequent real-time updates.',
    results:
      'Built and incubated through the college incubation cell as a working end-to-end product.',
    role: 'Built solo, incubated with the college incubation cell',
    links: { github: '', demo: '' },
  },
  {
    id: 'campusgrid',
    name: 'CampusGrid',
    tagline: 'Unified campus management & resource grid platform',
    tags: ['React', 'Express', 'PostgreSQL'],
    size: 'md',
    overview:
      'CampusGrid centralizes campus resources, schedules, and communication into a single dashboard.',
    problem:
      'Campus information was scattered across notice boards, emails, and disconnected tools, making it hard to find or manage anything in one place.',
    solution:
      'A unified web dashboard where students, faculty, and admins can manage resources, bookings, and announcements from one place.',
    techStack: ['React', 'Express.js', 'PostgreSQL', 'Tailwind CSS', 'JWT Auth'],
    features: [
      'Role-based dashboards for students, faculty & admins',
      'Resource & room booking system',
      'Centralized announcements & notices',
      'Analytics for resource utilization',
    ],
    architecture:
      'A React frontend talks to an Express REST API backed by PostgreSQL, with JWT-based auth controlling role-specific access across student, faculty, and admin views.',
    challenges:
      'Designing a permissions model flexible enough to support multiple roles without becoming a maintenance headache.',
    results: 'Used as a working prototype for streamlining day-to-day campus operations.',
    role: 'Solo build',
    links: { github: '', demo: '' },
  },
  {
    id: 'studyos',
    name: 'StudyOS',
    tagline: 'All-in-one productivity OS for focused studying',
    tags: ['React', 'Firebase', 'Framer Motion'],
    size: 'md',
    overview:
      'StudyOS brings notes, schedules, and focus tools into one distraction-free workspace for students.',
    problem:
      'Students juggle separate apps for notes, tasks, and timers, which fragments focus instead of supporting it.',
    solution:
      'A single workspace combining a note editor, task planner, and a Pomodoro-style focus timer, synced across devices.',
    techStack: ['React', 'Firebase', 'Zustand', 'Framer Motion'],
    features: [
      'Distraction-free note editor',
      'Task & deadline planner',
      'Built-in focus / Pomodoro timer',
      'Cross-device sync',
    ],
    architecture:
      'React with Zustand for local state, Firebase for auth and real-time data sync, and Framer Motion for the interface transitions that keep the experience calm and fast.',
    challenges: 'Making offline-first sync reliable without ever losing a student\u2019s notes or progress.',
    results: 'A complete, usable workspace built end to end as a personal productivity tool.',
    role: 'Solo build',
    links: { github: '', demo: '' },
  },
  {
    id: 'ayurvedatrace',
    name: 'AyurvedaTrace',
    tagline: 'Traceability platform for Ayurvedic herbal supply chains',
    tags: ['React', 'Python', 'ML', 'Blockchain'],
    size: 'lg',
    overview:
      'AyurvedaTrace traces Ayurvedic herbs from farm to shelf, helping verify authenticity and quality at every step.',
    problem:
      'Limited transparency in herbal sourcing makes it hard to verify authenticity, opening the door to adulteration and eroding consumer trust.',
    solution:
      'An end-to-end traceability system that combines tamper-evident, ledger-based record-keeping with ML-assisted quality checks at each stage of the supply chain.',
    techStack: ['React', 'Python', 'Flask', 'Scikit-learn', 'Blockchain ledger'],
    features: [
      'Batch-level herb traceability from farm to retail',
      'ML-assisted quality & authenticity scoring',
      'QR-based consumer verification',
      'Supplier & batch analytics dashboard',
    ],
    architecture:
      'A Flask API serves a React frontend, with a Scikit-learn model scoring batch quality and a ledger-style data layer keeping every step of the chain tamper-evident and auditable.',
    challenges:
      'Sourcing reliable labeled data for the quality model and designing records that stay tamper-evident without adding friction for suppliers.',
    results: 'Built as a working proof-of-concept for transparent herbal supply chains.',
    role: 'Solo build',
    links: { github: '', demo: '' },
  },
]

export default projects
