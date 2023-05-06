// Apollo messages
export const INVALID_OR_EXPIRED_TOKEN_MESSAGE = 'Sorry! Your token is expired or invalid';
export const NOT_FOUND_EXCEPTION = 'Not Found Exception';
export const CONFLICT_EXCEPTION = 'conflict exception';
export const SOMETHING_WENT_WRONG = 'Something went wrong';
export const REQUEST_NOT_FOUND = 'Requests not found for current user';
export const TOKEN_NOT_FOUND = 'Token not found';
export const AUTH_TOKEN = 'cogent_token';
export const USER_EMAIL = 'helmer_user_email';
export const PRECONDITION_FAILED_EXCEPTION = 'Precondition Failed Exception';
export const UNAUTHORIZED = 'Unauthorized';
export const TOKEN_INVALID = 'Token Invalid';
export const FORGET_PASSWORD = 'Forgot password?'
export const PASSWORD = 'password'
export const TEXT = 'text'
export const LOGIN = 'Login'
export const SIGN_UP = 'Sign Up'
export const LOG_IN = 'Log In'
export const INVALID_EMAIL = "Invalid email address";
export const GET_STARTED = 'Get started for free'
export const SAVE = 'Save'
export const USER_ALREADY_EXIST = 'User already exists';
export const CREATE_USER_SUCCESS = "User created successfully"
export const RESET_PASSWORD = 'Reset Password'
export const FORGET_PASSWORD_INSTRUCTION = 'Please enter your associated email to reset password.'
export const SEND_INSTRUCTION = 'Send instructions'
export const BACK_TO_LOGIN = 'Back to login page'
export const SET_PASSWORD = 'Set your Password'
export const SET_PASSWORD_SUBTITLE = 'Set up password to complete your signup.'
export const FORBIDDEN_EXCEPTION = "forbidden exception";
export const EMAIL_CHANGED_OR_NOT_VERIFIED_MESSAGE = "Email changed or not verified, please verify your email";
export const WRONG_EMAIL_OR_PASSWORD = "You have entered wrong email or password";
export const ADMIN_NOT_ACCESSIBLE = 'This user is not able to access admin panel.'
export const NOT_FOUND_EMAIL_MESSAGE = "No user found with this email";
export const FORGET_PASSWORD_SUCCESS = "An email has been sent to your registered email address";
export const ROOT_ROUTE = "/";
export const DASHBOARD_ROUTE = "/dashboard";
export const RESET_PASSWORD_FAILURE = "Reset password failed";
export const SET_PASSWORD_FAILURE = "Set password failed";
export const RESET_PASSWORD_SUCCESS = "Password reset successfully"
export const SET_PASSWORD_SUCCESS = "Password set successfully"
export const FOLLOW_INSTRUCTIONS = 'Please follow provided link in email to reset your password'
export const PASSWORD_VALIDATION_MESSAGE = "Password must contain 8 characters, one uppercase, one lowercase, one number and one special case character";
export const INVITE_NEW_USER = 'Invite new user'
export const USERS = 'Users'
export const DATE_FORMAT = "MM/DD/YYYY"
export const USER_UPDATE_SUCCESS = "User updated successfully"
export const AT_LEAST_ONE_ROLE_REQUIRED = "Please select at least one role"
export const INTERNAL_SERVER_ERROR = 'Internal server error'
export const USER_PASSWORD_SUCCESS = "User password updated successfully"
export const SEARCH_PLACEHOLDER = "Name, Joining Date, Role, etc"
export const PAGE_LIMIT = 10
export const NO_USER_FOUND = 'No user found'
export const USERS_TABLE_HEADERS = ['Staff', 'Joined on', 'Role', 'Status', 'Email verified', 'Actions']
export const UNABLE_TO_FETCH_ALL_CASE_TYPES = 'Unable to fetch all case types'
export const UNABLE_TO_FETCH_LAW_TYPE = 'Unable to fetch law type'
export const CASE_CREATED_SUCCESS = 'Case created successfully'

export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\^$*.[\]{}()?\-"!@#=+%&/,><':;|_~`])\S{8,99}$/
export const SPACES_REGEX = /^\S+(?: \S+)*$/
export const phoneReg = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
export const ssnReg = /^(\d{3}-?\d{2}-?\d{4})|(xxx-xx-xxxx)$/i;


export const sidebarLink = {
  dashboard: "Dashboard",
  cases: "Cases",
  courts: "Courts",
  users: 'Users',
}

export const DASHBOARD_LINK = [
  { title: sidebarLink.dashboard, link: '/dashboard' },
  { title: sidebarLink.cases, link: '/cases' },
  { title: sidebarLink.courts, link: '/courts' },
  { title: sidebarLink.users, link: '/users' }
]
export const AUTH_LINKS = {
  FORGET_PASSWORD_LINK: '/forgot-password',
  LOGIN_LINK: '/login',
  SIGN_UP: '/signup',
  RESET_PASSWORD: '/reset-password',
}

export const LOGIN_FIELDS = [
  {
    title: "Email",
    fieldType: "email",
    name: "email",
  },
  {
    title: "Password",
    fieldType: "password",
    name: "password",
  }
]

export const SET_PASSWORD_FIELDS = [
  {
    title: "New Password",
    fieldType: "password",
    name: "password",
  },
  {
    title: "Confirm Password",
    fieldType: "password",
    name: "repeatPassword",
  }
]

export const INVITE_USER_FORM_FIELDS = [
  {
    title: "Email",
    fieldType: "email",
    name: "email",
  },
  {
    title: "First Name",
    fieldType: "text",
    name: "firstName",
  },
  {
    title: "Last Name",
    fieldType: "text",
    name: "lastName",
  }
]

export const GRAPHQL_QUERY_POLICY = {
  fetchPolicy: "network-only",
  nextFetchPolicy: "no-cache",
  notifyOnNetworkStatusChange: true,
}

export const languages_list = [
  { name: "Afrikaans", code: "af" },
  { name: "Albanian - shqip", code: "sq" },
  { name: "Amharic - አማርኛ", code: "am" },
  { name: "Arabic - العربية", code: "ar" },
  { name: "Aragonese - aragonés", code: "an" },
  { name: "Armenian - հայերեն", code: "hy" },
  { name: "Asturian - asturianu", code: "ast" },
  { name: "Azerbaijani - azərbaycan dili", code: "az" },
  { name: "Basque - euskara", code: "eu" },
  { name: "Belarusian - беларуская", code: "be" },
  { name: "Bengali - বাংলা", code: "bn" },
  { name: "Bosnian - bosanski", code: "bs" },
  { name: "Breton - brezhoneg", code: "br" },
  { name: "Bulgarian - български", code: "bg" },
  { name: "Catalan - català", code: "ca" },
  { name: "Central Kurdish - کوردی (دەستنوسی عەرەبی)", code: "ckb" },
  { name: "Chinese - 中文", code: "zh" },
  { name: "Chinese (Hong Kong) - 中文（香港）", code: "zh-HK" },
  { name: "Chinese (Simplified) - 中文（简体）", code: "zh-CN" },
  { name: "Chinese (Traditional) - 中文（繁體）", code: "zh-TW" },
  { name: "Corsican", code: "co" },
  { name: "Croatian - hrvatski", code: "hr" },
  { name: "Czech - čeština", code: "cs" },
  { name: "Danish - dansk", code: "da" },
  { name: "Dutch - Nederlands", code: "nl" },
  { name: "English", code: "en" },
  { name: "English (Australia)", code: "en-AU" },
  { name: "English (Canada)", code: "en-CA" },
  { name: "English (India)", code: "en-IN" },
  { name: "English (New Zealand)", code: "en-NZ" },
  { name: "English (South Africa)", code: "en-ZA" },
  { name: "English (United Kingdom)", code: "en-GB" },
  { name: "English (United States)", code: "en-US" },
  { name: "Esperanto - esperanto", code: "eo" },
  { name: "Estonian - eesti", code: "et" },
  { name: "Faroese - føroyskt", code: "fo" },
  { name: "Filipino", code: "fil" },
  { name: "Finnish - suomi", code: "fi" },
  { name: "French - français", code: "fr" },
  { name: "French (Canada) - français (Canada)", code: "fr-CA" },
  { name: "French (France) - français (France)", code: "fr-FR" },
  { name: "French (Switzerland) - français (Suisse)", code: "fr-CH" },
  { name: "Galician - galego", code: "gl" },
  { name: "Georgian - ქართული", code: "ka" },
  { name: "German - Deutsch", code: "de" },
  { name: "German (Austria) - Deutsch (Österreich)", code: "de-AT" },
  { name: "German (Germany) - Deutsch (Deutschland)", code: "de-DE" },
  { name: "German (Liechtenstein) - Deutsch (Liechtenstein)", code: "de-LI" },
  { name: "German (Switzerland) - Deutsch (Schweiz)", code: "de-CH" },
  { name: "Greek - Ελληνικά", code: "el" },
  { name: "Guarani", code: "gn" },
  { name: "Gujarati - ગુજરાતી", code: "gu" },
  { name: "Hausa", code: "ha" },
  { name: "Hawaiian - ʻŌlelo Hawaiʻi", code: "haw" },
  { name: "Hebrew - עברית", code: "he" },
  { name: "Hindi - हिन्दी", code: "hi" },
  { name: "Hungarian - magyar", code: "hu" },
  { name: "Icelandic - íslenska", code: "is" },
  { name: "Indonesian - Indonesia", code: "id" },
  { name: "Interlingua", code: "ia" },
  { name: "Irish - Gaeilge", code: "ga" },
  { name: "Italian - italiano", code: "it" },
  { name: "Italian (Italy) - italiano (Italia)", code: "it-IT" },
  { name: "Italian (Switzerland) - italiano (Svizzera)", code: "it-CH" },
  { name: "Japanese - 日本語", code: "ja" },
  { name: "Kannada - ಕನ್ನಡ", code: "kn" },
  { name: "Kazakh - қазақ тілі", code: "kk" },
  { name: "Khmer - ខ្មែរ", code: "km" },
  { name: "Korean - 한국어", code: "ko" },
  { name: "Kurdish - Kurdî", code: "ku" },
  { name: "Kyrgyz - кыргызча", code: "ky" },
  { name: "Lao - ລາວ", code: "lo" },
  { name: "Latin", code: "la" },
  { name: "Latvian - latviešu", code: "lv" },
  { name: "Lingala - lingála", code: "ln" },
  { name: "Lithuanian - lietuvių", code: "lt" },
  { name: "Macedonian - македонски", code: "mk" },
  { name: "Malay - Bahasa Melayu", code: "ms" },
  { name: "Malayalam - മലയാളം", code: "ml" },
  { name: "Maltese - Malti", code: "mt" },
  { name: "Marathi - मराठी", code: "mr" },
  { name: "Mongolian - монгол", code: "mn" },
  { name: "Nepali - नेपाली", code: "ne" },
  { name: "Norwegian - norsk", code: "no" },
  { name: "Norwegian Bokmål - norsk bokmål", code: "nb" },
  { name: "Norwegian Nynorsk - nynorsk", code: "nn" },
  { name: "Occitan", code: "oc" },
  { name: "Oriya - ଓଡ଼ିଆ", code: "or" },
  { name: "Oromo - Oromoo", code: "om" },
  { name: "Pashto - پښتو", code: "ps" },
  { name: "Persian - فارسی", code: "fa" },
  { name: "Polish - polski", code: "pl" },
  { name: "Portuguese - português", code: "pt" },
  { name: "Portuguese (Brazil) - português (Brasil)", code: "pt-BR" },
  { name: "Portuguese (Portugal) - português (Portugal)", code: "pt-PT" },
  { name: "Punjabi - ਪੰਜਾਬੀ", code: "pa" },
  { name: "Quechua", code: "qu" },
  { name: "Romanian - română", code: "ro" },
  { name: "Romanian (Moldova) - română (Moldova)", code: "mo" },
  { name: "Romansh - rumantsch", code: "rm" },
  { name: "Russian - русский", code: "ru" },
  { name: "Scottish Gaelic", code: "gd" },
  { name: "Serbian - српски", code: "sr" },
  { name: "Serbo - Croatian", code: "sh" },
  { name: "Shona - chiShona", code: "sn" },
  { name: "Sindhi", code: "sd" },
  { name: "Sinhala - සිංහල", code: "si" },
  { name: "Slovak - slovenčina", code: "sk" },
  { name: "Slovenian - slovenščina", code: "sl" },
  { name: "Somali - Soomaali", code: "so" },
  { name: "Southern Sotho", code: "st" },
  { name: "Spanish - español", code: "es" },
  { name: "Spanish (Argentina) - español (Argentina)", code: "es-AR" },
  { name: "Spanish (Latin America) - español (Latinoamérica)", code: "es-419" },
  { name: "Spanish (Mexico) - español (México)", code: "es-MX" },
  { name: "Spanish (Spain) - español (España)", code: "es-ES" },
  { name: "Spanish (United States) - español (Estados Unidos)", code: "es-US" },
  { name: "Sundanese", code: "su" },
  { name: "Swahili - Kiswahili", code: "sw" },
  { name: "Swedish - svenska", code: "sv" },
  { name: "Tajik - тоҷикӣ", code: "tg" },
  { name: "Tamil - தமிழ்", code: "ta" },
  { name: "Tatar", code: "tt" },
  { name: "Telugu - తెలుగు", code: "te" },
  { name: "Thai - ไทย", code: "th" },
  { name: "Tigrinya - ትግርኛ", code: "ti" },
  { name: "Tongan - lea fakatonga", code: "to" },
  { name: "Turkish - Türkçe", code: "tr" },
  { name: "Turkmen", code: "tk" },
  { name: "Twi", code: "tw" },
  { name: "Ukrainian - українська", code: "uk" },
  { name: "Urdu - اردو", code: "ur" },
  { name: "Uyghur", code: "ug" },
  { name: "Uzbek - o‘zbek", code: "uz" },
  { name: "Vietnamese - Tiếng Việt", code: "vi" },
  { name: "Walloon - wa", code: "wa" },
  { name: "Welsh - Cymraeg", code: "cy" },
  { name: "Western Frisian", code: "fy" },
  { name: "Xhosa", code: "xh" },
  { name: "Yiddish", code: "yi" },
  { name: "Yoruba - Èdè Yorùbá", code: "yo" },
  { name: "Zulu - isiZulu", code: "zu" }
];

export const skillSetList = [
  { value: "EUC L1", label: "EUC L1" },
  { value: " Network L1", label: " Network L1" },
  { value: "Network L2", label: "Network L2" },
  { value: "Network L3", label: "Network L3" },
  { value: "Network L4", label: "Network L4" },
  { value: "Developer", label: "Developer" },
  { value: "Tester", label: "Tester" },
  { value: "Mechanical Engineer", label: "Mechanical Engineer" },
  { value: "Control Engineer", label: "Control Engineer" },
  { value: "Mechanical Designer", label: "Mechanical Designer" },
  { value: "Devops", label: "Devops" },
];

export const availableToolsList = [
  { value: "Mask", label: "Mask" },
  { value: "Windows 10 PC with Charger", label: "Windows 10 PC with Charger" },
  { value: "Screw Driver Set", label: "Screw Driver Set" },
  { value: "Console Cable", label: "Console Cable" },
  { value: "Macbook", label: "Macbook" },
  { value: "Android Phone", label: "Android Phone" },
  { value: "iPhone", label: "iPhone" },
  { value: "Label Printer", label: "Label Printer" },
  { value: "Patch Cables", label: "Patch Cables" },
  { value: "Putty Installed", label: "Putty Installed" },
  { value: "Fiber Optic Toolkit", label: "Fiber Optic Toolkit" },
  { value: "Pliers, Crumping Tools", label: "Pliers, Crumping Tools" },
  { value: "External 3G/4G Device", label: "External 3G/4G Device" },
  { value: "Pendrive/USB", label: "Pendrive/USB" },
  { value: "External SSD", label: "External SSD" },
  { value: "External HDD", label: "External HDD" },
  { value: "Hard Hat", label: "Hard Hat" },
  { value: "Safety Shoes", label: "Safety Shoes" },
  { value: "Safety Jacket", label: "Safety Jacket" },
  { value: "Safety Goggles", label: "Safety Goggles" },

]

export const countryPhoneCodes = [
  "+1", "+1-242", "+1-246", "+1-268", "+1-264", "+1-284", "+1-345", "+1-441", "+1-473", "+1-649", "+1-664", "+1-670", "+1-671", "+1-758", "+1-784", "+1-787", "+1-939", "+20", "+212", "+213", "+216", "+218", "+220", "+221", "+222", "+223", "+224", "+225", "+226", "+227", "+228", "+229", "+230", "+231", "+232", "+233", "+234", "+235", "+236", "+237", "+238", "+239", "+240", "+241", "+242", "+243", "+244", "+245", "+246", "+248", "+249", "+250", "+251", "+252", "+253", "+254", "+255", "+256", "+257", "+258", "+260", "+261", "+262", "+263", "+264", "+265", "+266", "+267", "+268", "+269", "+27", "+290", "+291", "+297", "+298", "+299", "+30", "+31", "+32", "+33", "+34", "+350", "+351", "+352", "+353", "+354", "+355", "+356", "+357", "+358", "+359", "+36", "+370", "+371", "+372", "+373", "+374", "+375", "+376", "+377", "+378", "+379", "+380", "+381", "+382", "+383", "+385", "+386", "+387", "+389", "+39", "+40", "+41", "+420", "+421", "+423", "+43", "+44", "+45", "+46", "+47", "+48", "+49", "+500", "+501", "+502", "+503", "+504", "+505", "+506", "+507", "+508", "+509", "+51", "+52", "+53", "+54", "+55", "+56", "+57", "+58", "+590", "+591", "+592", "+593", "+594", "+595", "+596", "+597", "+598", "+599", "+60", "+61", "+62", "+63", "+64", "+65", "+66", "+670", "+672", "+673", "+674", "+675", "+676", "+677", "+678", "+679", "+680", "+681", "+682", "+683", "+684", "+685", "+686", "+687", "+688", "+689", "+690", "+691", "+692", "+7", "+81", "+82", "+84", "+850", "+852", "+853", "+855", "+856", "+86", "+870", "+880", "+886", "+90", "+91", "+92", "+93", "+94", "+95", "+960", "+961", "+962", "+963", "+964", "+965", "+966", "+967", "+968", "+970", "+971", "+972", "+973", "+974", "+975", "+976", "+977", "+98", "+992", "+993", "+994", "+995", "+996", "+998"
];

export const workPermitStatusOptions = [
  {
    value: 'National',
    label: 'National',
  },
  {
    value: 'Permanent Resident',
    label: 'Permanent Resident',
  },
  {
    value: 'Student Permit',
    label: 'Student Permit',
  },
  {
    value: 'Work Permit',
    label: 'Work Permit',
  },
  {
    value: 'Other',
    label: 'Other',
  },
];

export const transportOptions = [
  {
    value: 'Personal Transport',
    label: 'Personal Transport',
  },
  {
    value: 'Public Transport',
    label: 'Public Transport',
  },
];

export const availabilityOptions = [
  {
    value: 'On call',
    label: 'On call',
  },
  {
    value: 'Part time',
    label: 'Part time',
  },
  {
    value: 'Full Time',
    label: 'Full Time',
  },
];

export const accountTypeBusiness = [
  {
    value: 'Business',
    label: 'Business',
  },
  {
    value: 'Personal',
    label: 'Personal',
  },
];

export const idCardTypeOptions = [
  {
    label: "Driver License",
    value: "dl",
  }, {
    label: "Passport",
    value: "pp",
  }, {
    label: "Id Card",
    value: "id",
  }, {
    label: "Residence Permit",
    value: "rp",
  }
];

export const interviewStatusOptions = [{
  label: "Complete",
  value: "Complete",
}, {
  label: "Scheduled",
  value: "Scheduled",
}, {
  label: "Not Scheduled",
  value: "NotScheduled",
}];