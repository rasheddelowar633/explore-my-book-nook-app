BookNook – একটি ছোট অনলাইন লাইব্রেরি
প্রজেক্টের মূল ধারণা (Project Theme)
BookNook হলো একটি ছোট অনলাইন লাইব্রেরি ওয়েবসাইট।
এখানে ব্যবহারকারীরা:
•	লাইব্রেরিতে থাকা সব বই দেখতে পারবে।
•	নতুন বই যোগ করতে পারবে।
•	কয়েক দিনের জন্য বই ধার নিতে পারবে।
•	কোন কোন বই ধার নিয়েছে, সেগুলো দেখতে পারবে।
•	ধার নেওয়া বই আবার লাইব্রেরিতে ফেরত দিতে পারবে।
সহজভাবে বলতে গেলে:
"একটি বই যোগ করো, একটি বই ধার নাও এবং বইটি ফেরত দাও।"
গুরুত্বপূর্ণ নিয়ম (Key Rules)
১. GitHub Commits
•	Client-side Repository-তে কমপক্ষে ১৫টি গুরুত্বপূর্ণ GitHub Commit থাকতে হবে।
•	Server-side Repository-তে কমপক্ষে ৮টি গুরুত্বপূর্ণ GitHub Commit থাকতে হবে।
২. README.md
Client-side Repository-তে একটি অর্থবহ README.md ফাইল তৈরি করতে হবে।
এতে থাকতে হবে:
•	তোমার ওয়েবসাইটের নাম।
•	Live Website-এর URL।
•	ওয়েবসাইটের কমপক্ষে ৫টি গুরুত্বপূর্ণ Feature Bullet Point আকারে লিখতে হবে।
৩. Lorem Text ব্যবহার করা যাবে না
•	ওয়েবসাইটে কোনো Lorem Ipsum Text ব্যবহার করা যাবে না।
•	কোনো Error বা Success Message দেখানোর জন্য Default Browser Alert ব্যবহার করা যাবে না।
•	এর পরিবর্তে Toast Notification ব্যবহার করতে হবে।
৪. ওয়েবসাইট Hosting / Deployment
তুমি তোমার অ্যাপ্লিকেশন Hosting করার জন্য Vercel, Render ইত্যাদি ব্যবহার করতে পারবে।
যেহেতু তুমি একটি Single Page Application তৈরি করবে, তাই নিচের বিষয়গুলো নিশ্চিত করতে হবে:
•	যেকোনো Route থেকে পেজ Reload করলে যেন কোনো Error না আসে।
•	কোনো Logged-in User Private Route-এ থাকা অবস্থায় পেজ Reload করলে তাকে যেন আবার Login Page-এ পাঠিয়ে না দেওয়া হয়।
Main Requirements (প্রধান শর্তাবলি)
১. Layout Structure (ওয়েবসাইটের কাঠামো)
Navbar
Navbar-এর বাম পাশে ওয়েবসাইটের Logo এবং নাম (BookNook) দেখাতে হবে।
Navbar-এ নিচের Link-গুলো থাকবে:
•	Home
•	All Books
•	Add Book
•	My Books
•	My Borrows
Private Routes:
নিচের তিনটি Route শুধুমাত্র Login করা User দেখতে পারবে:
•	Add Book
•	My Books
•	My Borrows
যখন User Login করা থাকবে না:
•	Login Button দেখাতে হবে।
•	Register Button দেখাতে হবে।
যখন User Login করা থাকবে:
•	User-এর Profile Photo দেখাতে হবে।
•	Profile Photo-তে Click করলে একটি Dropdown Menu দেখাতে হবে।
Dropdown Menu-তে থাকবে:
•	User Name
•	My Profile
•	Logout Button
Footer
Footer-এ নিচের বিষয়গুলো থাকতে হবে:
•	Website Logo
•	ওয়েবসাইট সম্পর্কে ছোট একটি Description।
•	Contact Information।
•	Social Media Links।
•	Copyright Information।
বিশেষ শর্ত: ওয়েবসাইটের প্রতিটি পেজে Navbar এবং Footer দেখাতে হবে।
২. Home Page
Home Page-এ নিচের Section-গুলো তৈরি করতে হবে।
A. Banner / Slider
Swiper.js ব্যবহার করে একটি Slider তৈরি করতে হবে।
শর্ত:
•	কমপক্ষে ৩টি Slide থাকতে হবে।
•	প্রতিটি Slide-এ একটি Title থাকতে হবে।
•	ছোট Description থাকতে হবে।
•	একটি "Browse Books" Button থাকতে হবে।
Button-এ Click করলে User-কে All Books Page-এ নিয়ে যেতে হবে।
B. New Arrivals (Dynamic Section)
MongoDB Database থেকে সর্বশেষ যোগ করা ৬টি বই Load করতে হবে এবং Card আকারে দেখাতে হবে।
প্রতিটি Card-এ থাকতে হবে:
1.	Book Image
2.	Book Title
3.	Author Name
4.	Category
5.	View Details Button
বিশেষ শর্ত:
•	নতুন যোগ করা বইগুলো সবার আগে দেখাতে হবে।
•	MongoDB-এর sort() এবং limit() ব্যবহার করতে হবে।
•	Card-গুলোর নিচে একটি "See All Books" Button রাখতে হবে।
•	Button-এ Click করলে All Books Page-এ যাবে।
C. অতিরিক্ত ২টি Section
নিজের আইডিয়া অনুযায়ী Home Page-এ আরও ২টি Static Section তৈরি করতে হবে।
উদাহরণ:
•	How Borrowing Works (কীভাবে বই ধার নিতে হয়)
•	Top Categories (জনপ্রিয় বইয়ের ক্যাটাগরি)
•	Reader Reviews (পাঠকদের মতামত)
এগুলো থেকে নিজের পছন্দমতো যেকোনো দুটি তৈরি করতে পারবে।
৩. Authentication (User Login এবং Registration)
User Navbar থেকে Login Page-এ যেতে পারবে।
যদি কোনো User Login না করে Private Route-এ প্রবেশ করার চেষ্টা করে অথবা Borrow Button-এ Click করে, তাহলে তাকে Login Page-এ পাঠাতে হবে।
Login সফল হওয়ার পর তাকে আবার তার কাঙ্ক্ষিত Route-এ ফিরিয়ে দিতে হবে।
গুরুত্বপূর্ণ
Authentication-এর সম্পূর্ণ কাজ Next.js-এর মধ্যে Better Auth এবং MongoDB Adapter ব্যবহার করে করতে হবে।
A. User Login
একটি Login Page তৈরি করতে হবে, যেখানে User Login করতে পারবে।
Login Form-এ নিচের বিষয়গুলো থাকবে:
1.	Email
2.	Password
3.	Forget Password
Login Button
যদি Login সফল হয়:
- User-কে তার কাঙ্ক্ষিত Route অথবা Home Page-এ নিয়ে যেতে হবে।
যদি Login ব্যর্থ হয়:
- Form-এর যেকোনো জায়গায় Toast অথবা Error Message দেখাতে হবে।
এছাড়াও থাকতে হবে:
•	Register Page-এ যাওয়ার জন্য একটি Link।
•	Google Social Login Button।
Google Button-এ Click করলে:
•	User Google Account দিয়ে Authentication সম্পন্ন করবে।
•	Authentication সফল হলে তাকে তার কাঙ্ক্ষিত Route অথবা Home Page-এ পাঠাতে হবে।
B. User Registration
একটি Registration Page তৈরি করতে হবে, যেখানে User নতুন Account তৈরি করতে পারবে।
Registration Form-এ নিচের Field-গুলো থাকবে:
1.	Name
2.	Email
3.	Photo URL
4.	Password
5.	Register Button
যদি Registration সফল হয়:
- User-কে Login Page-এ পাঠাতে হবে।
যদি Registration ব্যর্থ হয়:
- Form-এর যেকোনো জায়গায় Toast অথবা Error Message দেখাতে হবে।
Password Validation
Password যাচাই করার জন্য নিচের শর্তগুলো অনুসরণ করতে হবে।
Invalid Password হলে Error Message দেখাতে হবে এবং Registration সম্পন্ন করা যাবে না।
Password-এর শর্ত:
•	Password-এর মধ্যে কমপক্ষে একটি Uppercase Letter থাকতে হবে (A-Z)।
•	Password-এর মধ্যে কমপক্ষে একটি Lowercase Letter থাকতে হবে (a-z)।
•	Password কমপক্ষে ৬ অক্ষরের হতে হবে।
এছাড়াও Registration Page-এ থাকতে হবে:
•	Login Page-এ যাওয়ার জন্য একটি Link।
•	Google Social Login Button।
Google Button-এ Click করলে:
•	User Google Account দিয়ে Login করতে পারবে।
•	Authentication সফল হলে তাকে Home Page-এ নিয়ে যেতে হবে।
বিশেষ নির্দেশনা
এই Assignment-এর জন্য Email Verification অথবা Forget Password Method Implement করার প্রয়োজন নেই।
কারণ এগুলো Implement করলে পরীক্ষকের (Examiner) জন্য কিছুটা অসুবিধা হতে পারে।
Assignment-এর Result পাওয়ার পর চাইলে এগুলো যুক্ত করতে পারবে।
৪. CRUD Operation
সকল Data MongoDB Database-এ সংরক্ষণ করতে হবে।
Book Image Upload করার জন্য নিচের যেকোনো একটি Service ব্যবহার করতে পারবে:
•	imgbb
•	postimage
সকল Success এবং Error Message দেখানোর জন্য Toast Notification ব্যবহার করতে হবে।
CRUD-এর চারটি Operation হলো:
•	Create
•	Read
•	Update
•	Delete
A. Add Book (Create)
Private Route: /add-book
নতুন বই যোগ করার জন্য একটি Form তৈরি করতে হবে।
Form-এ নিচের Field-গুলো থাকবে:
1.	Book Title — বইয়ের নাম।
2.	Author Name — লেখকের নাম।
3.	Category — বইয়ের ক্যাটাগরি।
4.	Book Image — বইয়ের ছবি Upload।
5.	Short Description — বই সম্পর্কে সংক্ষিপ্ত বিবরণ।
6.	User Name — Login করা User-এর নাম (Read-only)।
7.	User Email — Login করা User-এর Email (Read-only)।
8.	Add Book Button।
Category-এর Select Option:
•	Fiction
•	Science
•	History
•	Kids
•	Others
User Name এবং Email অবশ্যই Login করা User-এর তথ্য থেকে নিতে হবে। এগুলো User পরিবর্তন করতে পারবে না।
Form Submit করলে:
•	Book Data Database-এ Save করতে হবে।
•	বইটি কখন যোগ করা হয়েছে সেই Date সংরক্ষণ করতে হবে।
•	সফলভাবে যোগ হলে Success Toast দেখাতে হবে।
B. All Books (Read)
Public Route: /books
এই Page-এ Database থেকে সব বই দেখাতে হবে।
শর্ত:
•	সব বই Card আকারে দেখাতে হবে।
•	Desktop View-তে প্রতি Row-তে ৩টি Card থাকবে।
প্রতিটি Card-এ থাকবে:
1.	Book Image
2.	Book Title
3.	Author Name
4.	Category
5.	View Details Button
C. Book Details (Read)
Private Route: /books/:id
প্রতিটি বইয়ের বিস্তারিত তথ্য দেখাতে হবে।
যেমন:
•	Book Image
•	Book Title
•	Author Name
•	Category
•	Description
•	কে বইটি যোগ করেছে তার তথ্য।
এছাড়াও একটি "Borrow This Book" Button রাখতে হবে।
এই Button-এর মাধ্যমে User বই ধার নিতে পারবে। Borrow System নিচে বিস্তারিত দেওয়া হয়েছে।
D. My Books (Update & Delete)
Private Route: /my-books
এই Page-এ শুধুমাত্র Login করা User যে বইগুলো যোগ করেছে, সেগুলো দেখাতে হবে।
বইগুলো Table অথবা Card আকারে দেখাতে পারবে।
Update
•	প্রতিটি Book-এর জন্য একটি Edit Button থাকতে হবে।
•	Edit Button-এ Click করলে একটি Form Open হবে।
•	Form-এর মধ্যে আগের Data আগে থেকেই Filled থাকবে।
•	User চাইলে Data পরিবর্তন করতে পারবে।
•	Save করলে Database Update হবে।
•	Update সফল হলে Success Toast দেখাতে হবে।
Delete
•	প্রতিটি Book-এর জন্য একটি Delete Button থাকতে হবে।
•	Delete Button-এ Click করলে একটি Confirmation Modal দেখাতে হবে।
•	Default Browser Confirm ব্যবহার করা যাবে না।
•	User Confirm করলে Book-টি UI এবং Database উভয় জায়গা থেকে Delete করতে হবে।
E. Borrow System (বই ধার নেওয়ার ব্যবস্থা)
Private Route: /my-borrows
Borrow (বই ধার নেওয়া)
Book Details Page-এ "Borrow This Book" Button থাকবে।
এই Button-এ Click করলে একটি Modal Open হবে।
Modal-এর Form-এ থাকবে:
•	User Name (Read-only)
•	User Email (Read-only)
•	Confirm Borrow Button
Submit করলে:
একটি নতুন MongoDB Collection তৈরি করতে হবে, যার নাম হবে borrows।
এই Collection-এ নিচের Data Save করতে হবে:
1.	Book ID
2.	Book Title
3.	Book Image
4.	User Email
5.	Borrow Date
6.	Return Date
My Borrows
এই Page-এ Login করা User যে বইগুলো ধার নিয়েছে, সেগুলো দেখাতে হবে।
Table-এর মধ্যে থাকবে:
1.	Book Image
2.	Book Title
3.	Borrow Date
4.	Return Date
5.	Return Book Button
Return Book Button-এ Click করলে বইটি ফেরত দেওয়ার ব্যবস্থা করতে হবে।
৫. Server API এবং Token Check
Express JS এবং MongoDB ব্যবহার করে Backend Server তৈরি করতে হবে।
এই Assignment-এর জন্য মোট ৮টি API Route তৈরি করতে হবে।
HTTP Method	API Route	কাজ
GET	/books	সব বই পাওয়া (Public)
GET	/books/:id	একটি নির্দিষ্ট বই পাওয়া
POST	/books	নতুন বই যোগ করা
PATCH	/books/:id	বইয়ের তথ্য Update করা
DELETE	/books/:id	বই Delete করা
POST	/borrows	বই ধার নেওয়া
GET	/borrows	Login করা User-এর ধার নেওয়া বই পাওয়া
DELETE	/borrows/:id	ধার নেওয়া বই ফেরত দেওয়া
৬. অন্যান্য Requirements
Loading
- Data Load হওয়ার সময় একটি Loading Spinner দেখাতে হবে।
Not Found Page
•	একটি Custom 404 Not Found Page তৈরি করতে হবে।
•	সেখানে একটি "Back to Home" Button রাখতে হবে।
•	Button-এ Click করলে Home Page-এ ফিরে যাবে।
Page Title
প্রতিটি Route অনুযায়ী Page Title পরিবর্তন করতে হবে।
উদাহরণ:
•	BookNook | Home
•	BookNook | All Books
•	BookNook | Add Book
•	BookNook | My Books
UI Design Requirements (ডিজাইন সংক্রান্ত শর্তাবলি)
Unique Design
প্রথমে সিদ্ধান্ত নিতে হবে তুমি কেমন ধরনের Website তৈরি করতে চাও।
এরপর অনলাইনে বিভিন্ন Website অথবা ThemeForest-এর মতো Website থেকে Design Idea সংগ্রহ করতে পারো।
তবে মনে রাখতে হবে:
তোমার Website Design যেন আগে করা অন্য কোনো Project-এর মতো না হয় এবং Module অথবা Conceptual Session-এ দেখানো উদাহরণের সঙ্গেও যেন একই রকম না হয়।
এছাড়াও Website Design-এর জন্য বিভিন্ন Blog থেকে Free Resources সংগ্রহ করতে পারো।
Design Rules
1. সব Section-এর Main Heading-এর Font, Size এবং Color একই ধরনের রাখতে হবে।
2. Paragraph-এর মধ্যে সুন্দর Spacing রাখতে হবে, যাতে Text সহজে পড়া যায়।
3. সব Image-এর Size এবং Spacing একই রাখতে হবে।
4. Home Page-এ যে Button Style ব্যবহার করবে, অন্য Page-গুলোতেও একই Button Style ব্যবহার করতে হবে।
5. প্রতিটি Section-এ সঠিক Spacing এবং Alignment বজায় রাখতে হবে।
6. Navbar-এর Logo এবং Heading-এর Style ও Size Home Page-এর মতো একই রাখতে হবে।
7. Image দেখানোর জন্য Grid Layout ব্যবহার করতে হবে এবং সব Image-এর Size সমান রাখতে হবে।
8. সব Card-এর Height এবং Width সমান রাখতে হবে। বিশেষ করে Services, Projects অথবা Products Section-এর Card-গুলো।
9. পুরোনো Twitter Bird Logo-এর পরিবর্তে নতুন X Logo ব্যবহার করতে হবে।
10. Responsiveness নিশ্চিত করতে হবে।
অর্থাৎ Website যেন সব ধরনের Device-এ সুন্দরভাবে কাজ করে:
•	Mobile
•	Tablet
•	Desktop
Design Resources
নিচের Website-গুলো থেকে Design Inspiration এবং UI Component সংগ্রহ করতে পারবে।
1.	Uiverse — সুন্দর UI Components।
2.	Dev Meets Devs — Developer Resources।
3.	Free Images and Resources — Free Images ও Resources।
4.	ThemeForest — Website Template এবং Design।
5.	CodeCanyon — বিভিন্ন Script এবং Development Resources।
Challenges (চ্যালেঞ্জিং Requirements)
এই অংশে কিছু অতিরিক্ত গুরুত্বপূর্ণ Feature Implement করতে হবে।
১. Available Copies (বইয়ের সংখ্যা নিয়ন্ত্রণ)
Add Book Form-এ একটি নতুন Field যোগ করতে হবে:
Total Copies
এর মাধ্যমে একটি বইয়ের মোট কয়টি কপি আছে, তা নির্ধারণ করা হবে।
যখন কোনো User বই Borrow করবে:
•	বইয়ের Available Copies ১ কমে যাবে।
•	MongoDB-এর $inc Operator ব্যবহার করতে হবে।
যখন User বই Return করবে:
•	Available Copies ১ বেড়ে যাবে।
•	এখানেও $inc ব্যবহার করতে হবে।
যদি Available Copies = 0 হয়:
•	Borrow Button Disable করে দিতে হবে।
•	Button-এর পরিবর্তে অথবা পাশে "Not Available" দেখাতে হবে।
২. No Double Borrow (একই বই দুইবার ধার নেওয়া যাবে না)
একজন User একই সময়ে একই বই দুইবার Borrow করতে পারবে না।
যদি কোনো User আগে থেকেই একটি বই Borrow করে থাকে এবং আবার সেই বই Borrow করার চেষ্টা করে, তাহলে:
•	Borrow Request Reject করতে হবে।
•	Error Toast দেখাতে হবে।
৩. JWT (JSON Web Token)
Backend API সুরক্ষিত করার জন্য JWT Validation Implement করতে হবে।
অর্থাৎ যেসব API Private বা Protected, সেগুলোতে সঠিক JWT Token ছাড়া Access করা যাবে না।
Optional Requirements (ঐচ্ছিক Requirements)
এগুলো বাধ্যতামূলক নয়। তবে চাইলে Implement করতে পারবে।
১. Dark / Light Theme
Navbar-এ একটি Button রাখতে পারো, যার মাধ্যমে User Website-এর Theme পরিবর্তন করতে পারবে।
•	Dark Mode
•	Light Mode
২. Animation
Website-কে আরও সুন্দর এবং Interactive করার জন্য Animation ব্যবহার করতে পারবে।
এক্ষেত্রে ব্যবহার করতে পারো:
•	Framer Motion
•	AOS
Technology Stack (যেসব Technology ব্যবহার করতে হবে)
Frontend
•	Next.js (App Router)
•	Hero UI / DaisyUI / Shadcn UI
•	TypeScript অথবা JavaScript
Authentication & Authorization
•	Better Auth
•	MongoDB Adapter
•	JWT
Backend
•	Express.js
•	MongoDB
•	TypeScript (যদি ভালোভাবে জানা থাকে)
•	অথবা JavaScript
কী কী Submit করতে হবে (What to Submit)
Assignment সম্পন্ন করার পর নিচের ৩টি জিনিস Submit করতে হবে:
1. Client-side GitHub Repository
তোমার Frontend বা Client-side Source Code-এর GitHub Link।
2. Server-side GitHub Repository
তোমার Backend বা Server-side Source Code-এর GitHub Link।
3. Live Website Link
তোমার সম্পূর্ণ Deploy করা Website-এর Live URL।
সহজভাবে সম্পূর্ণ Assignment-এর সারসংক্ষেপ
তোমাকে মূলত BookNook নামে একটি Online Library Management Website তৈরি করতে হবে।
এখানে User নতুন বই যোগ করতে পারবে, সব বই দেখতে পারবে, বইয়ের বিস্তারিত জানতে পারবে, বই ধার নিতে পারবে এবং ধার নেওয়া বই ফেরত দিতে পারবে।
প্রজেক্টের গুরুত্বপূর্ণ কাজগুলো এক নজরে
1.	Frontend তৈরি
Next.js App Router দিয়ে সম্পূর্ণ Responsive UI তৈরি।
2.	Authentication
Better Auth, Google Login এবং MongoDB Adapter দিয়ে Login/Register।
3.	Backend তৈরি
Express.js ও MongoDB দিয়ে ৮টি API তৈরি।
4.	CRUD Operation
বই Add, Read, Update এবং Delete।
5.	Borrow System
বই Borrow ও Return করার ব্যবস্থা।
6.	Security
JWT Validation এবং Protected API।
7.	Extra Challenges
Available Copies এবং No Double Borrow।
8.	Deployment
Frontend ও Backend Deploy করে GitHub Repository এবং Live Link Submit।
আমার পরামর্শ: Assignment তৈরি করার সময় প্রথমে MongoDB Database এবং Express.js Backend তৈরি করো। এরপর Next.js Frontend, Authentication, CRUD এবং Borrow System একে একে Implement করো। এতে Project বুঝতে এবং Error Fix করতে অনেক সহজ হবে।

