import {
  Home,
  Users,
  UserPlus,
  UserX,
  FilePlus2,
  FileText,
  BookOpen,
  GraduationCap,
  ClipboardList,
  ClipboardType,
  Wallet,
  Receipt,
  Banknote,
  Megaphone,
  Bell,
  Calendar,
  MessageSquare,
  Image as ImageIcon,
  NotebookText,
  FileVideo,
  PenTool,
  CheckSquare,
  Layers,
  Database,
  Settings,
  Package,
  MessageCircle,
  BarChart3,
  FileSpreadsheet,
  Building,
  Briefcase,
  School,
  Landmark,
  CreditCard,
  Box,
  ChartPie,
  FolderCog,
  ClipboardCheck,
  FileArchive,
  Gift,
  Users2,
  Star,
  ChevronRight,
  AlertTriangle,
  Wrench,
  Fingerprint,
  IdCard,
  Clock,
} from "lucide-react";

const NAVLINKS = [
  // { label: "Home", href: "/home" },
  {
    label: "Students",
    href: "#",
    children: [
      {
        label: "Enquiry",
        href: "#",
        children: [
          {
            label: "Add New Enquiry",
            href: "/students/enquiries/new",
          },
          {
            label: "View Enquiry Details",
            href: "/students/enquiries",
          },
        ],
      },
      {
        label: "Admission",
        href: "#",
        children: [
          {
            label: "Add New Student",
            href: "/students/new",
          },
          {
            label: "View Active Students",
            href: "/students/active",
          },
          {
            label: "View Inactive Students",
            href: "/students/in-active",
          },
          {
            label: "View Students by Batch",
            href: "/students/batch",
          },
          {
            label: "Admission Cancellation / Refund",
            href: "/students/refund",
          },
          {
            label: "Upload / Import Bulk Student",
            href: "/students/new/bulk",
          },
        ],
      },
    ],
  },
  {
    label: "Staff",
    href: "#",
    children: [
      {
        label: "Staff Details",
        href: "#",
        children: [
          {
            label: "Add / View Staff",
            href: "/staffs",
          },
          {
            label: "Staff Attendance",
            href: "/staffs/attendance",
          },
        ],
      },
    ],
  },
  {
    label: "Account",
    href: "#",
    children: [
      {
        label: "Expenses",
        href: "#",
        children: [
          {
            label: "Bills",
            href: "/accounts/expenses/bills",
          },
          {
            label: "Vouchers",
            href: "/accounts/expenses/vouchers",
          },
        ],
      },
      {
        label: "Cheque / Fees",
        href: "#",
        children: [
          {
            label: "Payment Updates",
            href: "/accounts/fees/payments",
          },
          {
            label: "Fees Summary",
            href: "/accounts/fees/summary",
          },
          {
            label: "Fees Overview",
            href: "/accounts/fees/overview",
          },
        ],
      },
    ],
  },
  {
    label: "Educare",
    href: "#",
    children: [
      {
        label: "ANNOUNCEMENTS",
        href: "#",
        children: [
          {
            label: "Daily Thoughts",
            href: "/educare/announcements/daily-thoughts",
          },
          {
            label: "Holiday Calendar",
            href: "/educare/announcements/holiday-calendar",
          },
          {
            label: "Notice",
            href: "/educare/announcements/notices",
          },
          {
            label: "Emergency Circular",
            href: "/educare/announcements/emergency-circular",
          },
          {
            label: "View Complaint/Remarks",
            href: "/educare/announcements/view-complaints",
          },
          {
            label: "Gallery",
            href: "/educare/announcements/gallery",
          },
        ],
      },
      {
        label: "STUDY MATERIALS",
        href: "#",
        children: [
          {
            label: "Home Work",
            href: "/educare/study-materials/homework",
          },
          {
            label: "Class Work",
            href: "/educare/study-materials/classwork",
          },
          {
            label: "Notes",
            href: "/educare/study-materials/notes",
          },
          {
            label: "DPP",
            href: "/educare/study-materials/dpp",
          },
          {
            label: "Video Links",
            href: "/educare/study-materials/videos",
          },
        ],
      },
      {
        label: "App Promo",
        href: "#",
        children: [
          {
            label: "Publications",
            href: "/educare/app-promo/publications",
          },
          {
            label: "Banner Images",
            href: "/educare/app-promo/banner-images",
          },
        ],
      },
      {
        label: "Students",
        href: "#",
        children: [
          {
            label: "Suggestions / Messages",
            href: "/educare/students/suggestions",
          },
          {
            label: "Faculty Notice",
            href: "/educare/students/faculty-notice",
          },
        ],
      },
    ],
  },
  {
    label: "Lectures",
    href: "#",
    children: [
      {
        label: "Lectures",
        href: "#",
        children: [
          {
            label: "New Lecture",
            href: "/lectures/new",
          },
          {
            label: "View Lecture Schedules",
            href: "/lectures",
          },
          {
            label: "Lecture Report Faculty",
            href: "/lectures/report/faculty",
          },
        ],
      },
    ],
  },
  {
    label: "Tests",
    href: "#",
    children: [
      {
        label: "Tests",
        href: "#",
        children: [
          {
            label: "Tests",
            href: "/tests",
          },
          {
            label: "Exams",
            href: "/tests/exams",
          },
          {
            label: "Results Summary",
            href: "/tests/results",
          },
        ],
      },
      // {
      //   label: "Mock Tests",
      //   href: "#",
      //   children: [
      //     {
      //       label: "Add / View Test Set",
      //       href: "/tests/set",
      //     },
      //     {
      //       label: "Question Bank",
      //       href: "/tests/question-bank",
      //     },
      //   ],
      // },
      // {
      //   label: "Daily Quiz",
      //   href: "#",
      //   children: [
      //     {
      //       label: "Daily Quiz",
      //       href: "/tests/daily-quiz",
      //     },
      //   ],
      // },
    ],
  },
  {
    label: "Whatsapp",
    href: "#",
    children: [
      {
        label: "Whatsapp Message",
        href: "#",
        children: [
          {
            label: "Pending Fees",
            href: "/whatsapp/pending-fees",
          },
          {
            label: "Upcoming Fees",
            href: "/whatsapp/upcoming-fees",
          },
          {
            label: "Absent Students",
            href: "/whatsapp/absent-students",
          },
        ],
      },
    ],
  },
  {
    label: "Settings",
    href: "#",
    children: [
      {
        label: "Organization",
        href: "#",
        children: [
          {
            label: "Settings",
            href: "/settings",
          },
          {
            label: "Financial Year",
            href: "/settings/financial-year",
          },
          {
            label: "Courses",
            href: "/settings/courses",
          },
          {
            label: "Standard",
            href: "/settings/standards",
          },
          {
            label: "Batches",
            href: "/settings/batches",
          },
          {
            label: "Branches",
            href: "/settings/branches",
          },
          {
            label: "Subject",
            href: "/settings/subject",
          },
          {
            label: "Topic",
            href: "/settings/topic",
          },
          {
            label: "Exams",
            href: "/settings/exams",
          },
          {
            label: "School / College",
            href: "/settings/school-colleges",
          },
          {
            label: "Board",
            href: "/settings/board",
          },
          {
            label: "Banks",
            href: "/settings/banks",
          },
          {
            label: "Class Room",
            href: "/settings/class-room",
          },
          {
            label: "Expense Type / Category",
            href: "/settings/expense-category",
          },
          {
            label: "Hall Ticket Settings",
            href: "/settings/hall-tickets",
          },
        ],
      },
      {
        label: "STAFF PAYROLL",
        href: "#",
        children: [
          {
            label: "Staff / Faculty Holiday",
            href: "/settings/staff-holiday",
          },
          {
            label: "Late / HalfDay",
            href: "/settings/late-half",
          },
        ],
      },
      {
        label: "User",
        href: "#",
        children: [
          {
            label: "Admin / Staff",
            href: "/settings/staff",
          },
          {
            label: "Master Admin",
            href: "/settings/master-admin",
          },
        ],
      },
    ],
  },
];

export const SIDEBAR_NAVLINKS = [
  {
    id: 1,
    title: "Home",
    icon: Home,
    url: "/home",
  },
  {
    id: 2,
    title: "Students",
    icon: Users,
    items: [
      {
        id: 21,
        title: "Enquiry",
        icon: FilePlus2,
        items: [
          {
            id: 211,
            title: "Add New Enquiry",
            icon: FilePlus2,
            url: "/students/enquiries/new",
          },
          {
            id: 212,
            title: "View Enquiry Details",
            icon: FileText,
            url: "/students/enquiries",
          },
        ],
      },
      {
        id: 22,
        title: "Admission",
        icon: UserPlus,
        items: [
          {
            id: 221,
            title: "Add New Student",
            icon: UserPlus,
            url: "/students/new",
          },
          {
            id: 222,
            title: "View Active Students",
            icon: Users,
            url: "/students/active",
          },
          {
            id: 223,
            title: "View Inactive Students",
            icon: UserX,
            url: "/students/in-active",
          },
          {
            id: 224,
            title: "View Students by Batch",
            icon: Layers,
            url: "/students/batch",
          },
          {
            id: 225,
            title: "Admission Cancellation / Refund",
            icon: CreditCard,
            url: "/students/refund",
          },
          {
            id: 226,
            title: "Upload / Import Bulk Student",
            icon: Database,
            url: "/students/new/bulk",
          },
          {
            id: 227,
            title: "Promote Students",
            icon: Star,
            url: "/students/promote",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Staff",
    icon: Briefcase,
    items: [
      {
        id: 31,
        title: "Staff Details",
        icon: Users2,
        items: [
          {
            id: 311,
            title: "Add / View Staff",
            icon: FileText,
            url: "/staffs",
          },
          {
            id: 312,
            title: "Staff Attendance",
            icon: ClipboardCheck,
            url: "/staffs/attendance",
          },
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Account",
    icon: Wallet,
    items: [
      {
        id: 41,
        title: "Expenses",
        icon: Receipt,
        items: [
          {
            id: 411,
            title: "Bills",
            icon: FileText,
            url: "/accounts/expenses/bills",
          },
          {
            id: 412,
            title: "Vouchers",
            icon: ClipboardType,
            url: "/accounts/expenses/vouchers",
          },
          {
            id: 413,
            title: "Expense Summary",
            icon: FileSpreadsheet,
            url: "/accounts/expenses/summary",
          },
        ],
      },
      {
        id: 42,
        title: "Cheque / Fees",
        icon: Banknote,
        items: [
          {
            id: 421,
            title: "Payment Updates",
            icon: CreditCard,
            url: "/accounts/fees/payments",
          },
          {
            id: 422,
            title: "Fees Summary",
            icon: BarChart3,
            url: "/accounts/fees/summary",
          },
          {
            id: 423,
            title: "Fees Overview",
            icon: ChartPie,
            url: "/accounts/fees/overview",
          },
        ],
      },
    ],
  },
  {
    id: 5,
    title: "Educare",
    icon: BookOpen,
    items: [
      {
        id: 51,
        title: "Announcements",
        icon: Megaphone,
        items: [
          {
            id: 511,
            title: "Daily Thoughts",
            icon: NotebookText,
            url: "/educare/announcements/daily-thoughts",
          },
          {
            id: 512,
            title: "Holiday Calendar",
            icon: Calendar,
            url: "/educare/announcements/holiday-calendar",
          },
          {
            id: 513,
            title: "Notice",
            icon: Bell,
            url: "/educare/announcements/notices",
          },
          {
            id: 514,
            title: "Emergency Circular",
            icon: AlertTriangle,
            url: "/educare/announcements/emergency-circular",
          },
          {
            id: 515,
            title: "Send Complaint/Remarks",
            icon: MessageCircle,
            url: "/educare/announcements/send-complaint",
          },
          {
            id: 516,
            title: "View Complaint/Remarks",
            icon: MessageSquare,
            url: "/educare/announcements/view-complaints",
          },
          {
            id: 517,
            title: "Gallery",
            icon: ImageIcon,
            url: "/educare/announcements/gallery",
          },
        ],
      },
      {
        id: 52,
        title: "Study Materials",
        icon: NotebookText,
        items: [
          {
            id: 521,
            title: "Home Work",
            icon: ClipboardList,
            url: "/educare/study-materials/homework",
          },
          {
            id: 522,
            title: "Class Work",
            icon: ClipboardCheck,
            url: "/educare/study-materials/classwork",
          },
          {
            id: 523,
            title: "Notes",
            icon: FileText,
            url: "/educare/study-materials/notes",
          },
          {
            id: 524,
            title: "DPP",
            icon: PenTool,
            url: "/educare/study-materials/dpp",
          },
          {
            id: 525,
            title: "Video Links",
            icon: FileVideo,
            url: "/educare/study-materials/videos",
          },
        ],
      },
    ],
  },
  {
    id: 6,
    title: "Lectures",
    icon: GraduationCap,
    items: [
      {
        id: 61,
        title: "Lectures",
        icon: BookOpen,
        items: [
          {
            id: 611,
            title: "New Lecture",
            icon: FilePlus2,
            url: "/lectures/new",
          },
          {
            id: 612,
            title: "View Lecture Schedules",
            icon: Calendar,
            url: "/lectures",
          },
          {
            id: 613,
            title: "Lecture Report Standard",
            icon: FileSpreadsheet,
            url: "/lectures/report/standard",
          },
          {
            id: 614,
            title: "Lecture Report Faculty",
            icon: Users,
            url: "/lectures/report/faculty",
          },
        ],
      },
    ],
  },
  {
    id: 7,
    title: "Tests",
    icon: ClipboardList,
    items: [
      {
        id: 71,
        title: "Tests",
        icon: ClipboardCheck,
        items: [
          { id: 711, title: "Tests", icon: ClipboardList, url: "/tests" },
          { id: 712, title: "Exams", icon: BookOpen, url: "/tests/exams" },
          {
            id: 713,
            title: "Results Summary",
            icon: BarChart3,
            url: "/tests/results",
          },
        ],
      },
      {
        id: 72,
        title: "Mock Tests",
        icon: CheckSquare,
        items: [
          {
            id: 721,
            title: "Add / View Test Set",
            icon: Layers,
            url: "/tests/set",
          },
          {
            id: 722,
            title: "Question Bank",
            icon: Database,
            url: "/tests/question-bank",
          },
        ],
      },
      {
        id: 73,
        title: "Daily Quiz",
        icon: PenTool,
        items: [
          {
            id: 731,
            title: "Daily Quiz",
            icon: PenTool,
            url: "/tests/daily-quiz",
          },
        ],
      },
    ],
  },
  {
    id: 8,
    title: "Manage App",
    icon: Settings,
    items: [
      {
        id: 81,
        title: "Settings",
        icon: FolderCog,
        items: [
          {
            id: 811,
            title: "Manage Classes",
            icon: School,
            url: "/settings/app/classes",
          },
          {
            id: 812,
            title: "Manage Subjects",
            icon: BookOpen,
            url: "/settings/app/subjects",
          },
          {
            id: 813,
            title: "Manage Topics",
            icon: Layers,
            url: "/settings/app/topics",
          },
          {
            id: 814,
            title: "Manage CBSE Classes",
            icon: School,
            url: "/settings/app/cbse/classes",
          },
          {
            id: 815,
            title: "Manage CBSE Subjects",
            icon: BookOpen,
            url: "/settings/app/cbse/subjects",
          },
        ],
      },
      {
        id: 82,
        title: "Manage",
        icon: Settings,
        items: [
          {
            id: 821,
            title: "Manage Announcement",
            icon: Megaphone,
            url: "/settings/app/announcements",
          },
          {
            id: 822,
            title: "Manage Banner Images",
            icon: ImageIcon,
            url: "/settings/app/banners",
          },
          {
            id: 823,
            title: "Manage CBSE Study Material",
            icon: NotebookText,
            url: "/settings/app/cbse/study-material",
          },
          {
            id: 824,
            title: "Manage Courses",
            icon: BookOpen,
            url: "/settings/app/courses",
          },
          {
            id: 825,
            title: "Manage Events",
            icon: Calendar,
            url: "/settings/app/events",
          },
          {
            id: 826,
            title: "Manage Loksatta MQP",
            icon: FileArchive,
            url: "/settings/app/loksatta-mqp",
          },
          {
            id: 827,
            title: "Manage Mind Maps & Flash Cards",
            icon: Layers,
            url: "/settings/app/mind-maps",
          },
          {
            id: 828,
            title: "Manage PPT & Videos",
            icon: FileVideo,
            url: "/settings/app/ppt",
          },
          {
            id: 829,
            title: "Manage Study Material",
            icon: FileText,
            url: "/settings/app/study-material",
          },
          {
            id: 830,
            title: "Manage Top Images",
            icon: ImageIcon,
            url: "/settings/app/top-images",
          },
          {
            id: 831,
            title: "Manage Results",
            icon: BarChart3,
            url: "/settings/app/results",
          },
          {
            id: 832,
            title: "Manage Smart Tools",
            icon: Wrench,
            url: "/settings/app/smart-tools",
          },
          {
            id: 833,
            title: "View Referrals",
            icon: Gift,
            url: "/settings/app/referrals",
          },
        ],
      },
    ],
  },
  {
    id: 9,
    title: "Inventory",
    icon: Package,
    items: [
      {
        id: 91,
        title: "Inventory",
        icon: Box,
        items: [
          {
            id: 911,
            title: "Manage Vendors",
            icon: Users,
            url: "/inventory/vendors",
          },
          {
            id: 912,
            title: "Manage Product Category",
            icon: Layers,
            url: "/inventory/category",
          },
          {
            id: 913,
            title: "Manage Bills",
            icon: FileText,
            url: "/inventory/bills",
          },
          {
            id: 914,
            title: "Manage Stock",
            icon: Package,
            url: "/inventory/stock",
          },
          {
            id: 915,
            title: "Vendor Payments",
            icon: CreditCard,
            url: "/inventory/vendors/payments",
          },
          {
            id: 916,
            title: "Vendor Ledgers",
            icon: FileSpreadsheet,
            url: "/inventory/vendors/ledgers",
          },
        ],
      },
    ],
  },
  {
    id: 10,
    title: "Whatsapp",
    icon: MessageCircle,
    items: [
      {
        id: 101,
        title: "Whatsapp Message",
        icon: MessageSquare,
        items: [
          {
            id: 1011,
            title: "Send Whatsapp Message",
            icon: MessageCircle,
            url: "/whatsapp/send",
          },
          {
            id: 1012,
            title: "Pending Fees",
            icon: CreditCard,
            url: "/whatsapp/pending-fees",
          },
          {
            id: 1013,
            title: "Upcoming Fees",
            icon: Calendar,
            url: "/whatsapp/upcoming-fees",
          },
          {
            id: 1014,
            title: "Absent Students",
            icon: UserX,
            url: "/whatsapp/absent-students",
          },
          {
            id: 1015,
            title: "Birthdays",
            icon: Gift,
            url: "/whatsapp/birthdays",
          },
        ],
      },
    ],
  },
  {
    id: 11,
    title: "Reports",
    icon: BarChart3,
    items: [
      {
        id: 111,
        title: "Biometric",
        icon: Fingerprint,
        items: [
          {
            id: 1111,
            title: "Student Biometric Attendance",
            icon: ClipboardCheck,
            url: "/reports/biometrics/students",
          },
          {
            id: 1112,
            title: "Faculty Biometric Attendance",
            icon: Users,
            url: "/reports/biometrics/faculty",
          },
          {
            id: 1113,
            title: "Monthly Biometric - Faculty",
            icon: Calendar,
            url: "/reports/biometrics/faculty/monthly",
          },
          {
            id: 1114,
            title: "Biometric Attendance Count",
            icon: BarChart3,
            url: "/reports/biometrics/attendance",
          },
        ],
      },
      {
        id: 112,
        title: "Fees Report",
        icon: Receipt,
        items: [
          {
            id: 1121,
            title: "Fees Report",
            icon: BarChart3,
            url: "/reports/fees",
          },
        ],
      },
      {
        id: 113,
        title: "Lecture Report",
        icon: FileSpreadsheet,
        items: [
          {
            id: 1131,
            title: "Lecture Report",
            icon: FileText,
            url: "/reports/lectures",
          },
          {
            id: 1132,
            title: "Topic Wise Lecture Report",
            icon: Layers,
            url: "/reports/lectures/topic-wise",
          },
        ],
      },
      {
        id: 114,
        title: "Fees Installment Summary",
        icon: Wallet,
        items: [
          {
            id: 1141,
            title: "Fees Installment Summary",
            icon: FileSpreadsheet,
            url: "/reports/fees/installment",
          },
        ],
      },
      {
        id: 115,
        title: "Report Card",
        icon: FileText,
        items: [
          {
            id: 1151,
            title: "Report Card",
            icon: FileText,
            url: "/reports/report-card",
          },
        ],
      },
      {
        id: 116,
        title: "ID Card / Hall Ticket",
        icon: CreditCard,
        items: [
          {
            id: 1161,
            title: "ID Card",
            icon: CreditCard,
            url: "/reports/id-card",
          },
        ],
      },
      {
        id: 117,
        title: "Income & Expenses Report",
        icon: Wallet,
        items: [
          {
            id: 1171,
            title: "Income & Expenses",
            icon: FileSpreadsheet,
            url: "/reports/incomes-expenses",
          },
        ],
      },
      {
        id: 118,
        title: "Stock Report",
        icon: Package,
        items: [
          {
            id: 1181,
            title: "Stock Report",
            icon: BarChart3,
            url: "/reports/stock",
          },
        ],
      },
      {
        id: 119,
        title: "Admission Cancellation Report",
        icon: FileText,
        items: [
          {
            id: 1191,
            title: "Admission Cancellation / Refund",
            icon: CreditCard,
            url: "/reports/admission-refund",
          },
        ],
      },
    ],
  },
  {
    id: 12,
    title: "Settings",
    icon: Settings,
    items: [
      {
        id: 121,
        title: "Organization",
        icon: Building,
        items: [
          { id: 1211, title: "Settings", icon: Settings, url: "/settings" },
          {
            id: 1212,
            title: "Branches",
            icon: Landmark,
            url: "/settings/branches",
          },
          {
            id: 1213,
            title: "Financial Year",
            icon: Calendar,
            url: "/settings/financial-year",
          },
          {
            id: 1214,
            title: "Courses",
            icon: BookOpen,
            url: "/settings/courses",
          },
          {
            id: 1215,
            title: "Standard",
            icon: GraduationCap,
            url: "/settings/standards",
          },
          {
            id: 1216,
            title: "Batches",
            icon: Layers,
            url: "/settings/batches",
          },
          {
            id: 1217,
            title: "Subject",
            icon: BookOpen,
            url: "/settings/subject",
          },
          {
            id: 1218,
            title: "Topic",
            icon: NotebookText,
            url: "/settings/topic",
          },
          {
            id: 1219,
            title: "Exams",
            icon: ClipboardList,
            url: "/settings/exams",
          },
          {
            id: 1220,
            title: "School / College",
            icon: School,
            url: "/settings/school-colleges",
          },
          { id: 1221, title: "Board", icon: BookOpen, url: "/settings/board" },
          { id: 1222, title: "Banks", icon: Landmark, url: "/settings/banks" },
          {
            id: 1223,
            title: "Class Room",
            icon: Box,
            url: "/settings/class-room",
          },
          {
            id: 1224,
            title: "SMS Settings",
            icon: MessageCircle,
            url: "/settings/sms",
          },
          {
            id: 1225,
            title: "Expense Type / Category",
            icon: FileSpreadsheet,
            url: "/settings/expense-category",
          },
          {
            id: 1226,
            title: "Hall Ticket Settings",
            icon: CreditCard,
            url: "/settings/hall-tickets",
          },
          {
            id: 1227,
            title: "Student Id Prefix",
            icon: IdCard,
            url: "/settings/student-id-prefix",
          },
          {
            id: 1228,
            title: "Receipt Prefix",
            icon: Receipt,
            url: "/settings/receipt-prefix",
          },
        ],
      },
      {
        id: 122,
        title: "Staff Payroll",
        icon: ClipboardCheck,
        items: [
          {
            id: 1221,
            title: "Staff / Faculty Holiday",
            icon: Calendar,
            url: "/settings/staff-holiday",
          },
          {
            id: 1222,
            title: "Late / HalfDay",
            icon: Clock,
            url: "/settings/late-half",
          },
        ],
      },
      {
        id: 123,
        title: "User",
        icon: Users,
        items: [
          {
            id: 1231,
            title: "Admin / Staff",
            icon: UserPlus,
            url: "/settings/admin",
          },
          {
            id: 1232,
            title: "Master Admin",
            icon: Star,
            url: "/settings/master-admin",
          },
        ],
      },
    ],
  },
];

export default NAVLINKS;

const OLD_NAVLINKS = [
  { label: "Home", href: "/home" },
  {
    label: "Students",
    href: "#",
    children: [
      {
        label: "Enquiry",
        href: "#",
        children: [
          {
            label: "Add New Enquiry",
            href: "/students/enquiries/new",
          },
          {
            label: "View Enquiry Details",
            href: "/students/enquiries",
          },
        ],
      },
      {
        label: "Admission",
        href: "#",
        children: [
          {
            label: "Add New Student",
            href: "/students/new",
          },
          {
            label: "View Active Students",
            href: "/students/active",
          },
          {
            label: "View Inactive Students",
            href: "/students/in-active",
          },
          {
            label: "View Students by Batch",
            href: "/students/batch",
          },
          {
            label: "Admission Cancellation / Refund",
            href: "/students/refund",
          },
          {
            label: "Upload / Import Bulk Student",
            href: "/students/new/bulk",
          },
          {
            label: "Promote Students",
            href: "/students/promote",
          },
        ],
      },
    ],
  },
  {
    label: "Staff",
    href: "#",
    children: [
      {
        label: "Staff Details",
        href: "#",
        children: [
          {
            label: "Add / View Staff",
            href: "/staffs",
          },
          {
            label: "Staff Attendance",
            href: "/staffs/attendance",
          },
        ],
      },
    ],
  },
  {
    label: "Account",
    href: "#",
    children: [
      {
        label: "Expenses",
        href: "#",
        children: [
          {
            label: "Bills",
            href: "/accounts/expenses/bills",
          },
          {
            label: "Vouchers",
            href: "/accounts/expenses/vouchers",
          },
          {
            label: "Expense Summary",
            href: "/accounts/expenses/summary",
          },
        ],
      },
      {
        label: "Cheque / Fees",
        href: "#",
        children: [
          {
            label: "Payment Updates",
            href: "/accounts/fees/payments",
          },
          {
            label: "Fees Summary",
            href: "/accounts/fees/summary",
          },
          {
            label: "Fees Overview",
            href: "/accounts/fees/overview",
          },
        ],
      },
    ],
  },
  {
    label: "Educare",
    href: "#",
    children: [
      {
        label: "ANNOUNCEMENTS",
        href: "#",
        children: [
          {
            label: "Daily Thoughts",
            href: "/educare/announcements/daily-thoughts",
          },
          {
            label: "Holiday Calendar",
            href: "/educare/announcements/holiday-calendar",
          },
          {
            label: "Notice",
            href: "/educare/announcements/notices",
          },
          {
            label: "Emergency Circular",
            href: "/educare/announcements/emergency-circular",
          },
          {
            label: "Send Complaint/Remarks",
            href: "/educare/announcements/send-complaint",
          },
          {
            label: "View Complaint/Remarks",
            href: "/educare/announcements/view-complaints",
          },
          {
            label: "Gallery",
            href: "/educare/announcements/gallery",
          },
        ],
      },
      {
        label: "STUDY MATERIALS",
        href: "#",
        children: [
          {
            label: "Home Work",
            href: "/educare/study-materials/homework",
          },
          {
            label: "Class Work",
            href: "/educare/study-materials/classwork",
          },
          {
            label: "Notes",
            href: "/educare/study-materials/notes",
          },
          {
            label: "DPP",
            href: "/educare/study-materials/dpp",
          },
          {
            label: "Video Links",
            href: "/educare/study-materials/videos",
          },
          {
            label: "E-Learnings",
            href: "/educare/study-materials/e-learnings",
          },
        ],
      },
      {
        label: "App Promo",
        href: "#",
        children: [
          {
            label: "Publications",
            href: "/educare/app-promo/publications",
          },
          {
            label: "Banner Images",
            href: "/educare/app-promo/banner-images",
          },
        ],
      },
      {
        label: "Students",
        href: "#",
        children: [
          {
            label: "Suggestions / Messages",
            href: "/educare/students/suggestions",
          },
          {
            label: "Faculty Notice",
            href: "/educare/students/faculty-notice",
          },
          {
            label: "Student Doubts",
            href: "/educare/students/doubts",
          },
        ],
      },
    ],
  },
  {
    label: "Lectures",
    href: "#",
    children: [
      {
        label: "Lectures",
        href: "#",
        children: [
          {
            label: "New Lecture",
            href: "/lectures/new",
          },
          {
            label: "View Lecture Schedules",
            href: "/lectures",
          },
          {
            label: "Lecture Report Standard",
            href: "/lectures/report/standard",
          },
          {
            label: "Lecture Report Faculty",
            href: "/lectures/report/faculty",
          },
        ],
      },
    ],
  },
  {
    label: "Tests",
    href: "#",
    children: [
      {
        label: "Tests",
        href: "#",
        children: [
          {
            label: "Tests",
            href: "/tests",
          },
          {
            label: "Exams",
            href: "/tests/exams",
          },
          {
            label: "Results Summary",
            href: "/tests/results",
          },
        ],
      },
      // {
      //   label: "Mock Tests",
      //   href: "#",
      //   children: [
      //     {
      //       label: "Add / View Test Set",
      //       href: "/tests/set",
      //     },
      //     {
      //       label: "Question Bank",
      //       href: "/tests/question-bank",
      //     },
      //   ],
      // },
      // {
      //   label: "Daily Quiz",
      //   href: "#",
      //   children: [
      //     {
      //       label: "Daily Quiz",
      //       href: "/tests/daily-quiz",
      //     },
      //   ],
      // },
    ],
  },
  {
    label: "Manage App",
    href: "#",
    children: [
      {
        label: "Settings",
        href: "#",
        children: [
          {
            label: "Manage Classes",
            href: "/settings/app/classes",
          },
          {
            label: "Manage Subjects",
            href: "/settings/app/subjects",
          },
          {
            label: "Manage Topics",
            href: "/settings/app/topics",
          },
          {
            label: "Manage CBSE Classes",
            href: "/settings/app/cbse/classes",
          },
          {
            label: "Manage CBSE Subjects",
            href: "/settings/app/cbse/subjects",
          },
        ],
      },
      {
        label: "Manage",
        href: "#",
        children: [
          {
            label: "Manage Announcement",
            href: "/settings/app/announcements",
          },
          {
            label: "Manage Banner Images",
            href: "/settings/app/banners",
          },
          {
            label: "Manage CBSE Study Material",
            href: "/settings/app/cbse/study-material",
          },
          {
            label: "Manage Courses",
            href: "/settings/app/courses",
          },
          {
            label: "Manage Events",
            href: "/settings/app/events",
          },
          {
            label: "Manage Loksatta MQP",
            href: "/settings/app/loksatta-mqp",
          },
          {
            label: "Manage Mind Maps & Flash Cards",
            href: "/settings/app/mind-maps",
          },
          {
            label: "Manage PPT & Videos",
            href: "/settings/app/ppt",
          },
          {
            label: "Manage Study Material",
            href: "/settings/app/study-material",
          },
          {
            label: "Manage Top Images",
            href: "/settings/app/top-images",
          },
          {
            label: "Manage Results",
            href: "/settings/app/results",
          },
          {
            label: "Manage Smart Tools",
            href: "/settings/app/smart-tools",
          },
          {
            label: "View Referrals",
            href: "/settings/app/referrals",
          },
        ],
      },
    ],
  },
  {
    label: "Inventory",
    href: "#",
    children: [
      {
        label: "Inventory",
        href: "#",
        children: [
          {
            label: "Manage Vendors",
            href: "/inventory/vendors",
          },
          {
            label: "Manage Product Category",
            href: "/inventory/category",
          },
          {
            label: "Manage Bills",
            href: "/inventory/bills",
          },
          {
            label: "Manage Stock",
            href: "/inventory/stock",
          },
          {
            label: "Vendor Payments",
            href: "/inventory/vendors/payments",
          },
          {
            label: "Vendor Ledgers",
            href: "/inventory/vendors/ledgers",
          },
        ],
      },
    ],
  },
  {
    label: "Whatsapp",
    href: "#",
    children: [
      {
        label: "Whatsapp Message",
        href: "#",
        children: [
          {
            label: "Send Whatsapp Message",
            href: "/whatsapp/send",
          },
          {
            label: "Pending Fees",
            href: "/whatsapp/pending-fees",
          },
          {
            label: "Upcoming Fees",
            href: "/whatsapp/upcoming-fees",
          },
          {
            label: "Absent Students",
            href: "/whatsapp/absent-students",
          },
          {
            label: "Birthdays",
            href: "/whatsapp/birthdays",
          },
        ],
      },
    ],
  },
  {
    label: "Reports",
    href: "#",
    children: [
      {
        label: "Biometric",
        href: "#",
        children: [
          {
            label: "Student Biometric Attendance",
            href: "/reports/biometrics/students",
          },
          {
            label: "Faculty Biometric Attendance",
            href: "/reports/biometrics/faculty",
          },
          {
            label: "Monthly Biometric - Faculty",
            href: "/reports/biometrics/faculty/monthly",
          },
          {
            label: "Biometric Attendance Count",
            href: "/reports/biometrics/attendance",
          },
        ],
      },
      {
        label: "Fees Report",
        href: "#",
        children: [
          {
            label: "Fees Report",
            href: "/reports/fees",
          },
        ],
      },
      {
        label: "Lecture Report",
        href: "#",
        children: [
          {
            label: "Lecture Report",
            href: "/reports/lectures",
          },
          {
            label: "Topic Wise Lecture Report",
            href: "/reports/lectures/topic-wise",
          },
        ],
      },
      {
        label: "Fees Installment Summary",
        href: "#",
        children: [
          {
            label: "Fees Installment Summary",
            href: "/reports/fees/installment",
          },
        ],
      },
      {
        label: "Report Card",
        href: "#",
        children: [
          {
            label: "Report Card",
            href: "/reports/report-card",
          },
        ],
      },
      {
        label: "ID Card / Hall Ticket",
        href: "#",
        children: [
          {
            label: "ID Card",
            href: "/reports/id-card",
          },
        ],
      },
      {
        label: "Income & Expenses Report",
        href: "#",
        children: [
          {
            label: "Income & Expenses",
            href: "/reports/incomes-expenses",
          },
        ],
      },
      {
        label: "Stock Report",
        href: "#",
        children: [
          {
            label: "Stock Report",
            href: "/reports/stock",
          },
        ],
      },
      {
        label: "Admission Cancellation Report",
        href: "#",
        children: [
          {
            label: "Admission Cancellation / Refund",
            href: "/reports/admission-refund",
          },
        ],
      },
    ],
  },
  {
    label: "Settings",
    href: "#",
    children: [
      {
        label: "Organization",
        href: "#",
        children: [
          {
            label: "Settings",
            href: "/settings",
          },
          {
            label: "Branches",
            href: "/settings/branches",
          },
          {
            label: "Financial Year",
            href: "/settings/financial-year",
          },
          {
            label: "Courses",
            href: "/settings/courses",
          },
          {
            label: "Standard",
            href: "/settings/standards",
          },
          {
            label: "Batches",
            href: "/settings/batches",
          },
          {
            label: "Subject",
            href: "/settings/subject",
          },
          {
            label: "Topic",
            href: "/settings/topic",
          },
          {
            label: "Exams",
            href: "/settings/exams",
          },
          {
            label: "School / College",
            href: "/settings/school-colleges",
          },
          {
            label: "Board",
            href: "/settings/board",
          },
          {
            label: "Banks",
            href: "/settings/banks",
          },
          {
            label: "Class Room",
            href: "/settings/class-room",
          },
          {
            label: "SMS Settings",
            href: "/settings/sms",
          },
          {
            label: "Expense Type / Category",
            href: "/settings/expense-category",
          },
          {
            label: "Hall Ticket Settings",
            href: "/settings/hall-tickets",
          },
          {
            label: "Student Id Prefix",
            href: "/settings/student-id-prefix",
          },
          {
            label: "Receipt Prefix",
            href: "/settings/receipt-prefix",
          },
        ],
      },
      {
        label: "STAFF PAYROLL",
        href: "#",
        children: [
          {
            label: "Staff / Faculty Holiday",
            href: "/settings/staff-holiday",
          },
          {
            label: "Late / HalfDay",
            href: "/settings/late-half",
          },
        ],
      },
      {
        label: "User",
        href: "#",
        children: [
          {
            label: "Admin / Staff",
            href: "/settings/staff",
          },
          {
            label: "Master Admin",
            href: "/settings/master-admin",
          },
        ],
      },
    ],
  },
];

export const INTERNAL_LINKS = {
  LOGIN: "/login",
  ADD_ENQUIRY: "/students/enquiries/new",
  DISPLAY_ENQUIRIES: "/students/enquiries",
  ADD_STUDENT: "/students/new",
  ACTIVE_STUDENTS: "/students/active",
  INACTIVE_STUDENTS: "/students/in-active",
  ADD_STAFF: "/staffs/new",
  VIEW_STAFFS: "/staffs",
  ADD_BILLS: "/accounts/expenses/bills/new",
  VIEW_BILLS: "/accounts/expenses/bills",
  ADD_VOUCHERS: "/accounts/expenses/vouchers/new",
  VIEW_VOUCHERS: "/accounts/expenses/vouchers",
  EXPENSE_SUMMARY: "/accounts/expenses/summary",
  VIEW_CHEQUE_PAYMENT_UPDATES: "/accounts/fees/payments",
  FEES_SUMMARY: "/accounts/fees/summary",
  FEES_OVERVIEW: "/accounts/fees/overview",
  VIEW_DAILY_THOUGHTS: "/educare/announcements/daily-thoughts",
  ADD_DAILY_THOUGHTS: "/educare/announcements/daily-thoughts/new",
  VIEW_HOLIDAY_CALENDAR: "/educare/announcements/holiday-calendar",
  ADD_HOLIDAY_CALENDAR: "/educare/announcements/holiday-calendar/new",
  VIEW_STUDENTS_NOTICE_MANAGEMENT: "/educare/announcements/notices",
  ADD_STUDENTS_NOTICE_MANAGEMENT: "/educare/announcements/notices/new",
  VIEW_EMERGENCY_CIRCULARS: "/educare/announcements/emergency-circular",
  ADD_EMERGENCY_CIRCULARS: "/educare/announcements/emergency-circular/new",
  SEND_COMPLAINTS_REMARKS: "/educare/announcements/send-complaint",
  VIEW_COMPLAINTS_REMARKS: "/educare/announcements/view-complaints",
  ADD_TO_GALLERY: "/educare/announcements/gallery/new",
  VIEW_GALLERY: "/educare/announcements/gallery",
  ADD_HOMEWORK: "/educare/study-materials/homework/new",
  VIEW_HOMEWORK: "/educare/study-materials/homework",
  ADD_CLASSWORK: "/educare/study-materials/classwork/new",
  VIEW_CLASSWORK: "/educare/study-materials/classwork",
  ADD_NOTES: "/educare/study-materials/notes/new",
  VIEW_NOTES: "/educare/study-materials/notes",
  ADD_DPP: "/educare/study-materials/dpp/new",
  VIEW_DPP: "/educare/study-materials/dpp",
  ADD_VIDEO_LINKS: "/educare/study-materials/videos/new",
  VIEW_VIDEO_LINKS: "/educare/study-materials/videos",
  ADD_E_LEARNING: "/educare/study-materials/e-learnings/new",
  VIEW_E_LEARNING: "/educare/study-materials/e-learnings",
  ADD_PUBLICATIONS: "/educare/app-promo/publications/new",
  VIEW_PUBLICATIONS: "/educare/app-promo/publications",
  ADD_BANNER_IMAGES: "/educare/app-promo/banner-images/new",
  VIEW_BANNER_IMAGES: "/educare/app-promo/banner-images",
  ADD_LECTURES: "/lectures/new",
  VIEW_LECTURES: "/lectures",
  ADD_TESTS: "/tests/new",
  VIEW_TESTS: "/tests",
  ADD_ADMIN: "/settings/staff/new",
  VIEW_ADMINS: "/settings/staff",
  ADD_MASTER_ADMIN: "/settings/master-admin/new",
  VIEW_MASTER_ADMINS: "/settings/master-admin",
};
