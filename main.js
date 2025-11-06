// NOTE: This URL is for demonstration purposes. Replace it with your actual Google Apps Script deployment URL.
const APP_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxAByNBETpNMrDMKjMFBT9G0Ha486gdvouqQ1RIL_9P-znG4KCn0VTLO0kIb7U836QWIg/exec';

const mainFormDiv = document.getElementById('mainForm');
const dashboardDiv = document.getElementById('dashboard');
const studentForm = document.getElementById('studentForm');
const messageBox = document.getElementById('messageBox');
const submitBtn = document.getElementById('submitBtn');
const studentNameInput = document.getElementById('studentName');
const studentEmailInput = document.getElementById('studentEmail');
const latitudeInput = document.getElementById('latitude');
const longitudeInput = document.getElementById('longitude');
const userEmailDisplay = document.getElementById('userEmailDisplay');
const appContainer = document.getElementById('appContainer');

const homeLeaveContent = document.getElementById('home-leave-content');
const entryLeaveContent = document.getElementById('entry-leave-content');
const homeLeaveForm = document.getElementById('home-leave-form');
const entryLeaveForm = document.getElementById('entry-leave-form');
const tabHome = document.getElementById('tab-home');
const tabEntry = document.getElementById('tab-entry');
const logoutBtn = document.getElementById('logoutBtn');

const studentNameDropdownHome = document.getElementById('student-name-dropdown-home');
const collegeHomeInput = document.getElementById('college-home');
const leaveDateHomeInput = document.getElementById('leave-date-home');
const returnDateHomeInput = document.getElementById('return-date-home');
const reasonHomeInput = document.getElementById('reason-home');
const noRecordsMessageHome = document.getElementById('no-records-message-home');
const homeLeaveSubmitBtn = document.getElementById('home-leave-submit-btn');
let homeLeaveRecords = [];

const studentNameDropdownEntry = document.getElementById('student-name-dropdown-entry');
const collegeEntryInput = document.getElementById('college-entry');
const leaveDateEntryInput = document.getElementById('leave-date-entry');
const returnDateEntryInput = document.getElementById('return-date-entry');
const reasonEntryInput = document.getElementById('reason-entry');
const noRecordsMessageEntry = document.getElementById('no-records-message-entry');
const entryLeaveSubmitBtn = document.getElementById('entry-leave-submit-btn');
let entryLeaveRecords = [];
let currentStudentEmail = '';
let currentStudentName = '';

// Custom Alert elements
const welcomeAlert = document.getElementById('welcomeAlert');
const closeWelcomeAlertBtn = document.getElementById('closeWelcomeAlert');
const successAlert = document.getElementById('successAlert');
const closeSuccessAlertBtn = document.getElementById('closeSuccessAlert');

// --- កូដសម្រាប់បង្កើត Custom Search Dropdown ---

const studentNameInputForSearch = document.getElementById('studentName');
const customDropdownSearch = document.getElementById('customDropdown');

// បញ្ជីឈ្មោះសិស្សសរុបសម្រាប់ស្វែងរក
const searchNameList = [
    'គឺន ដាវ៉ាន់', 'ឃឹម កុសល', 'ធាង សំណាង', 'នេត ផល្លី', 'ភាព ស៊ូអ៊ីន', 'លាង វេហា', 'សាក់ ស៊ីណេ', 'សាត វិសាល', 'សឹង សុភីន', 'សឿន សីហា', 'ស្រៀង ស្រីនុច', 'ហៀក ស្រីឡែន',
    'ហំ សំរេច', 'អួន សុជាតិ', 'គង កំសត់', 'ណុប សាវ៉ន', 'ស៊ីន ម៉ានាថ', 'ជេត សែនសំណាង', 'ដាំ សៀវវិន', 'ថន ប៊ុនថេព', 'ផេង សុវណ្ណ', 'ម៉ាក ភាព', 'វិត រតនា', 'វុធ វត្តនៈ',
    'ស៊ន នាត', 'ស៊ឿន ចាន់រឿន', 'សឿន ចាន់រ៉ាន', 'អេន ស្រីម៉ី', 'អុន ដែន', 'កាំប្រាង សុខា', 'កី ប្រេម', 'កូប ម៉ាន់ស្រី', 'ក្រិល ចិនហ៊ើ', 'ក្លាន ផន់', 'ខន សុខសោភា', 'ខុម ដារីកា',
    'ខុម សុផាន់ណា', 'គង់ រស្មី', 'គិល បូហៃ', 'គឹម ហុន', 'ឃាង ឃីម', 'ឃឹម សុខឃីម', 'ឃូន ផ្លយ', 'ឃ្លីម រុងង៉ាម', 'ចាន់ គឹមហ៊ាន់', 'ចូច សៅណយ', 'ឆេង ដាលីន', 'ជ័យ សុផា',
    'ញ៉ក់ ធីតា', 'ញ៉ាន បញ្ញា', 'ញ៉ឹប សុលីដា', 'ញ៉ែន បើង', 'ណន លក្ខណា', 'ណន វន្ដណេត', 'ណែម ឌីណេ', 'តិត ស្រីអូន', 'ថាន វិច្ចរ៉ា', 'ថាន់ ប៊ុនរ៉ាត់', 'ថូក ម៉ៅ', 'ថេង លីមអាន',
    'ទីង សៀង', 'ធា គឹមផុង', 'ធាក ពុធទ្រា', 'ធឿន ចន្ធី', 'ធឿម ចន្ធី', 'នឹម មីនា', 'នូត ស៊ូគិម', 'នូស៊ឹមលន់ មិថុនា', 'ប៉ាក់ ស្រីនីន', 'ប៉ាន់ សុជាតា', 'ប៊ិត សម្បូរ', 'ផុន ស្រីហម',
    'ផេន ស្រីភ័ស', 'ផ្លង់ តុង', 'ពុត ចាន់', 'ព្រៀម ស្រីពៅ', 'ម៉ាប់ ស្រីរើន', 'ម៉ាប់ អ៊ូម៉ី', 'ម៉ុក យួន', 'ម៉េង ហ័ន', 'ម៉េត ស្រីរ៉ុង', 'យន់ ដាវ៉ាន់', 'យ៉ុង គីមស្រ៊ុន', 'យ៉េត ស្រីមុំ', 'យ៉ែម ដេវន្ត',
    'យឿន គារុន', 'យឿន សុចាន់', 'រចំ ប៉ែត់', 'រដ្ឋា សូនីតា', 'រម៉ាស់ សានសុភី', 'រ៉ាន់ ភារិត', 'រ៉ឹម សុធារ៉ា', 'រ៉ុន រាជនី', 'រឿន សុផៃ', 'រឿន ស្រីនី', 'លាង ស្រីពៅ', 'លាស់ ណាសៀត',
    'លីន ធីណារិទ្ធិ', 'លួស សុខណែត', 'លឿន ស្រីនួន', 'វង់ ម៉ាលី', 'វណ្ណ ឆវី', 'វ៉ន ស្រីលាក់', 'វ៉ាន់ សារ៉ាន់', 'វិន សុខះ', 'វី វុតថិន', 'វីន ចុងប៊ីន', 'វែន ញ៉ញ់', 'វ័ន្ត ឆវី', 'សយ សារ៉ាត់',
    'សរ សីឡਾ', 'សល់ តៀម', 'សល់ អុប', 'ស៊ីម សំណាង', 'សា សាលី', 'សារ រួន', 'សារុត ស្ដើង', 'សឹង ភុត', 'សុក រក្សា', 'សុខន សុខុន', 'សូត្រ ស្រីមួយ', 'សួន សែន', 'សែម ស្រីលីស',
    'ស្រី ផល្លី', 'សំ សីហា', 'ហន ជីវន', 'ហ៊ី សំរី', 'ហ៊ីម វ៉ាន់', 'ហ៊ីម សាណាវី', 'ហាវ សុភាលីន', 'ហួ ឆានុន', 'ហួយ ប៊ុនធឿន', 'ហឿ ស្រីកែវ', 'ហឿន ណារីន', 'ឡាយ សារ៉ន', 'អ៊ុក សៀវម៉ី',
    'អាង ភីណា', 'អូ រីតា', 'អួន លីតា', 'អឿ សុខខៀន', 'អឿង កាទ្រី', 'អែម រក្សា', 'កាន់ លីនអើ', 'កេង ម៉ាទីន', 'ភឿក ស៊ឹមដួងលីមល', 'ខេង ស្រីឡែន', 'ឆូយ ចាន់', 'ឆេង សុភា',
    'ឌឹម លក្ខិណា', 'តង ចន្ថា', 'តាក់ តាន', 'ថន ប្រុសតូច', 'នី ស្រីពេជ្រ', 'ផ្លង សុភី', 'ពៅ សុណាំ', 'មឿន ចន្នី', 'យឿង រតនា', 'វុទ្ធ សុទុម', 'ស៊ាត វណ្ណា', 'សារិទ្ធ គង្គា', 'សុខ មករា',
    'សុផា នីរ៉ា', 'ស្រី សុវិជ័យ', 'ហៀង ភីលីប', 'ឡូ ប៊ុនឡុង', 'កាំង ប៊ុនឆៃ', 'កែវ ពុទ្ធារ័ត្ន', 'ក្លាន ផែន', 'ក្លាន លូត', 'ក្លាន ស្នាក', 'ក្វាវ មេសា', 'ខង សុភីម', 'ខូយ ស្រីនី', 'ខ្លូត សុភ័ក្រ',
    'គង់ បារាំង', 'គង់ ស៊ាត', 'គីម ស្រីពៅ', 'គឹម ប៉ុច', 'គឹម សុខឌីន', 'ឃន ព្រំដែន', 'ឃិន រេន', 'ឃុន រត្នណ្ណៈ', 'ឃុន ពិសី', 'ឃួន សេងលាប', 'ងួន វណ្ណៈ', 'ចក់ គង្គា', 'ចង់ ធុង',
    'ចយ ស្រីម៉ៅ', 'ចាន់ ឆៃយ៉ា', 'ចាន់ នីតិ', 'ចាន់ សើន', 'ឆយ យានស៊ឺ', 'ឆាយ ឧត្ដម', 'ឆើត ម៉ៅ', 'ឆែម លីណា', 'ឆៃ សោភា', 'ជឹម វ៉ាន់ណែត', 'ជឿ រតនី', 'ឈន សុវណ្ណៈ', 'ឈឹម ម៉ាលីន',
    'ឈួន សុខលាង', 'ឈួន ឧត្ដមវឌ្ឍនា', 'ឈឿត ណារិទ្ធ', 'ញ៉ នេត', 'ដួង សុភី', 'ឌី ចាន់ធូ', 'ឌុច តុងហៀន', 'ណាន់ ឃៀ', 'ណុប ចម', 'ណូក ស្រីលិញ', 'ណែម វីរះ', 'ណៃ និត', 'ណំ ឡៃហៀង',
    'តី វ៉ៃ', 'តឿន ស្រីនាង', 'តេង ស្រីអូន', 'ថន រស្មី', 'ថា ចាន់ធី', 'ថាន ស៊ីណា', 'ថេង ថុនា', 'ថៃ ផាណេត', 'នាង ណាន់', 'នាង រ៉ាវី', 'នាង សំរិទ្ធិ', 'និត វណ្ណនី', 'នី ណែត', 'នឹង កក្កដា',
    'នឿន ស្រីនាង', 'នៀម ស្រីនិត', 'នេតនិប សុវណ្ណារ័ត្ន', 'ប៉ាត ឈាងអ៊ី', 'ប៉ី ថាវរី', 'ប៉ុន សីហា', 'ប៉ៃ វុត្ថារដ្ឋា', 'ប៊ន ចន្ថា', 'បាវ ចាន់ណា', 'ផល ភាស់', 'ផាត ផល្លី', 'ផាន់សាវុធ ផាន់សុវត្ត',
    'ផៃ ពៅ', 'ផ្លយ រ៉េត', 'ពឹម ឡេងហុង', 'ពៅ បញ្ញា', 'ពៅ ពីន', 'ពៅ រដ្ឋា', 'ព្រំ សុភ័ក្រ', 'ភុក ផាន់ណា', 'ភួង ច័ន្ទផាត់ត្រា', 'ម៉ន ឌឹក', 'ម៉ឹង មិ', 'ម៉ុក សម្បត្តិ', 'ម៉ៃ សម្ផស្ស', 'ម៉ោញ សុផានីត',
    'ម៉ៅ រស្មី', 'ម៉ៅ ស្រីឃៀម', 'មិ សាវៀន', 'មឿន ចិត្ត្រា', 'មៀច ស្រីមុំ', 'យន់ ប៊ុនកែវ', 'យ៉ុន ទូច', 'យ៉ុន ស៊ីមីដា', 'យ៉េង ពុទ្ធិដា', 'យ៉េង ថាវី', 'យ៉ែម ដេវីត', 'យ៉ែម ស៊ីនួន', 'យឿម សុឈៀត',
    'រចំ បរវែន', 'រតនា គង់ឈុន', 'រម៉ាស់ ខឿន', 'រម៉ាស់ រើ', 'រ៉េន គឹមរ៉ុង', 'រ៉ែម សុនិច្ច', 'រាត់ រួន', 'រាម ឬទ្ធី', 'រួន បុលិមុន្នី', 'រឿង ប៊ុនហេង', 'រឿន លីម៉ា', 'រឿន សៀនហុង', 'រឿន ស្រីនិច្ច',
    'រឿន ស្រីណែត', 'លន ដាវីត', 'លន់ សុវណ្ណារដ្ឋ', 'លី ភីឡាន់', 'លី វីន', 'លួន ណាវី', 'លឿត ដារ៉ា', 'លៀប បុប្ផា', 'វង់ សុខភ័ក្ត', 'វ៉ា ម៉ានី', 'វ៉ាង មីនា', 'វ៉ាយ ប៉ីន', 'វ៉េន ស្រីលាក់', 'វាសនា រក្សា',
    'វិ ថុន', 'វិន ចាន់សុជាតិ', 'វុធ វត្តនា', 'សម្បត្តិ សុខមាន', 'សយ គឹមសុដានី', 'សយ ឡុង', 'សល់ លិច', 'ស៊ង វិសាល', 'ស៊ត មួយឆេង', 'ស៊ិន ចាន់ថ្លា', 'ស៊ឹម សុម៉ានីកា', 'ស៊ឺន សុវណ្ណដារ៉ា',
section-two-of-two
    'ស៊ុម យូអ៊ី', 'សាន ដាវីតណុល', 'សាន ហ៊ីម', 'សារឿន សេរីវឌ្ឍន៍', 'សុខ ម៉េង', 'សុខ សុវណ្ណរិទ្ធ', 'សុស សូវីណាន់', 'សួង វីរ:', 'សួស បញ្ញា', 'សឿន វិសាល', 'សៀ ណារ៉ាក់', 'សេង គឹមណាន់',
    'សេង សុភាដាវិឌ', 'សេវ ឆ្វាត់', 'សេវ វ៉ារិន', 'សេវ ហៀល', 'សៃ វឌ្ឍនា', 'សៃ ស្រីតូច', 'សៅ បញ្ញា', 'សៅ រ៉ាម៉ន', 'ស្រេង សុភា', 'សំ ប្រោន', 'ហ៊ីម លីហួរ', 'ហាំ ផល', 'ហាំ ពិទូ', 'ហូរ កែវ',
    'ហួត ធានីន', 'ហឿង ជុងយាន', 'ហៀន សុខពិសី', 'ហៀម កាមុត', 'ហេង ម៉េងលី', 'ហេង មិនូ', 'ឡឹម សុភ័ណ្ឌ', 'ឡូត ចននី', 'ឡេង សុវឌ្ឍនៈ', 'ឡោក ឆាណុន', 'ឡោន ចាន់រ៉ី', 'ឡៅ បញ្ញា',
    'អ៊ាត អឿន', 'អ៊ុក ថាវ', 'អ៊ុន សុខេណារីម', 'អ៊ូច ផល្លី', 'អ៊ួន ផល្លីន', 'អ៊ែល វណ្ណី', 'អាង ស៊ីនិន', 'អុន តួហៀ', 'អុល សម្ផស្ស', 'អៀង បញ្ញា', 'ប៉ា្លង តួ', 'លី ពិសី', 'វ៉ាន វិយុទ្ធិពរ',
    'ស៊ន ស៊ីវន', 'សាក់ ស៊ីអេង', 'ខេង តាំងលី', 'ឃីម សុខៃ', 'ឆន ពៅ', 'ជួង សាវិន', 'ដា វួចឈី', 'ដួង ចាន់លីដា', 'ដួង ណារាជ', 'ដោក ផាត់ណា', 'ឌុំ ឃ្លី', 'ទូច ផាន់នី', 'នី សុខនន់',
    'នួន មករា', 'នៅ ស្រីនួន', 'ប៉ាត់ សុគុណ', 'ប៊ន ស៊ីធាន', 'បឿន ស្រីនុច', 'ផន ផូ', 'ផា សុភ័ក្រ', 'ព្រហ៊ីម ណាវីរ៉ោះ', 'ភន់ ភាលី', 'ម៉ាន លីយ៉ុងចេ', 'យ៉េន ស៊ីណែត', 'យុត ហុងលី',
    'យឿន វណ្ណៈ', 'រាជ ពៅ', 'រួន វណ្ណី', 'រំដោះ ពូមៀ', 'លាង ច័ន្ទរីម', 'លាង សីហា', 'លិក ខាំរ៉ាន', 'វង្ស សូដាវុឌ្ឍី', 'វឿង ឡៃអេង', 'សល់ សំអុល', 'សាន់ លីសៀ', 'សារឿង ភក្តី',
    'សែម សុខលីហ្សា', 'ស្វាយ ភារុន', 'ហង់ ស៊ីនាត', 'ហ៊ន អ៊ីហាំង', 'ហឹន ចាន់ថៃ', 'កែត ស៊ីចាន់', 'គុន ស្រីលិ', 'ឃឿន ស៊ង់', 'ជា នីកា', 'ជេត សូលីនដា', 'ឈិត គារ៍អាន', 'ណើយ ខាំសៀង',
    'តី តែន', 'ថូន ស្រីរ័ត្ន', 'ធា វិជ្ជះរ៉ា', 'នី ប៉ុច', 'នុត ជឿន', 'ពីន សុខែម៉ារី', 'ម៉ៅ ណាវី', 'មុន្នី វុទ្ធីវីហ្សា', 'យ៉ុត ឈុនអុីម', 'យុន ស្រីអេង', 'យូសុះ ហ្វារ៉ិន', 'រចំ ចាន់ដា', 'លី កុសល់',
    'វ៉ាត ចំរុង', 'សុង ច័ន្ទបុស្បា', 'សឿន ឌី', 'សៀន គឹមស៊ឺ', 'ហ៊ាង ស៊ីន', 'ហេរ ធឿត', 'ឡាញ់ លីម', 'ឡេង វ៉ានលៃ', 'អ៊ួង ស្រីនាដ', 'អូន វាសនា', 'អឿន ស្ងឿន', 'ជេត បុប្ផា', 'ផាត ស្រីល័ក្ខ',
    'ផាន ឆយ', 'រិន សុខឡេង', 'រ័ត្ន គឹមជូលី', 'សឿង សីហា', 'ហ៊ុំ ចរិយា', 'អ្វីន ញើក', 'កុក ស៊ីណែត', 'ខា ស្រីល័ក្ខ', 'ខាត់ សុឃួន', 'ខេន សុឃី', 'ខ្លូត សុឃា', 'គាន់ វណ្ណ', 'គិន ពេជ្រពណ្ណរាយ',
    'ឃាង ដាលីន', 'ចាន់ ស៊ីណាត', 'ដន ច្រាំ', 'ដា ឌីណា', 'ដូន ស្រីណែត', 'ឌី ធីដា', 'ឌឿន ស្រីនីត', 'តី រ៉ានី', 'ថន តុលា', 'ទី ភីង', 'ទុំ វិចិត្រ', 'ទោម ថៀង', 'នាង ឆឹង', 'នុត វន្នី',
    'ប៉ាន់ រោច', 'ប្រាក់ ណារីន', 'ផុន សុភិន', 'ផួង សុឃីម', 'ពៅ មេសា', 'ព្រឹន ចែហួយ', 'ភា ណាង', 'ម៉ៅ រ៉ាម៉េត', 'មឿន និមល', 'យ៉ក តារា', 'យឺន វណ្ណៈ', 'រ៉ុម ចិត្ត្រា', 'រិទ្ធ សុខលី',
    'លាវ ស៊ីដា', 'វ៉ន សីហា', 'វ៉ាត នៅ', 'វិន វណ្ណែត', 'វុធ លីហ្សា', 'វឿន ពុទ្ធថុល', 'សាញ់ ម៉ាណែត', 'សឹម សុណា', 'សុខ តុលា', 'សើន ខ្នាត', 'សៀង សួន', 'សេក ពេជ្រ', 'សេង សុផា',
    'សែន នីសារ', 'សែន ស៊ីណា', 'ហ៊ុន អ៊ីយូ', 'ហាស់ ភាព', 'អាត ពិសី', 'អូ នុត', 'អឿន ជីវ័ន្ត', 'ស៊ុន ស្រីនិច', 'សៀន រីយ៉ា', 'ហួរ គឹមជីង', 'កុសល សូម៉ារី', 'ខោយ សុខុម', 'ឃុន សម្បូរ',
    'ជា សេងវ័រ', 'ទន់ ប្រុស', 'ធៀន វិឈៀន', 'បាត សុភា', 'ផាន ភក្ដី', 'ភាព សុផល', 'ម៉ៅ មៃ', 'ម៉ៅ វុត្ថា', 'រចំ រតនា', 'រ៉ុង សំរ៉ស់', 'រិន ដាវី', 'រុន វិច្ឆិកា', 'លី ផល្លា', 'វត្តណា ប៊ូនសុផាន់',
    'វ៉ាន រូហ្សា', 'វុន ជ័យ', 'ស៊ន សុលីន', 'ស៊ីម ឆៃណា', 'ស៊ឹម លី', 'ស៊ុំ សាមាន', 'សិទ្ធ សុភាល័ក្ខ', 'អុន ម៉េងហៀង', 'អេង ស្រីអាំ', 'គួយ ស្រីទីន', 'ឆុង រក្សា', 'ជិន សុខរី', 'ញ៉ែម ពុទ្រា',
    'តាភូ ស្រីនិច', 'ថា ឌីណា', 'ទីន រក្សា', 'បៃ សុភូ', 'ផន រចនា', 'ម៉ោញ សូនីតា', 'វ៉ាន សំណាង', 'សុខ ចេន', 'សែម សុភ័ក្តី', 'ស្មើ សាវីន', 'ហួត ធីម', 'ឡុំ កនីកា', 'អ៊ុន ខាវីត',
    'កាន់ថៃ សាពែង', 'កឺញ សុភាស់', 'កែវ ទាន់', 'ក្លាន យុំ', 'ខ្លិម ធីណា', 'គន សុខគា', 'ឃឿន ស្រីម៉ី', 'ចន់ អូឡៃ', 'ចាន់ ម៉ាន់', 'ចាន់ វិសិដ្ឋ', 'ចុត ធូន', 'ច្រញ រុញ', 'ឆន វិឆ័យ',
    'ឆាយ សៀវយុត', 'ជន ចាន់ម៉ី', 'ជ្រុន សុខលី', 'ញ៉ាន សុខលីន', 'ញៀន ញ៉ាន', 'ដុង លក្ខិណា', 'ដៀប ចាន់លីកា', 'ដេត សុខមី', 'ដែន វីសែត', 'ឌីន សាវរី', 'ណាត់ រ៉េន', 'ណាន ជូ',
    'ណាម រស្មី', 'ណៃ ស៊ីដេ', 'តៃ មន្នី', 'ត្រាំ សុហ៊ិប', 'ថេង ប៉ស', 'ទី សោភាន់', 'ទីង រិទ្ធ', 'ទ្រី សុភា', 'ទ្រើន លាននី', 'ធី សុខខៀវ', 'ធឿន សុភឿន', 'នាង ស្រីលក្ខណ៍', 'នួន ឈី',
    'ប៊ុនលាភ ថានី្ន', 'បាន សុខន', 'ប្រុស ទាល', 'ប្លេវ លីវ', 'ផន បញ្ញា', 'ផាន់ ម៉េន', 'ផុង ផាន់ណាថាត់', 'ផេង សុផៃ', 'ផែន ផល្លី', 'ផៃ ឧស្សាហ៍', 'ពេជ្រ ម៉ាលីន', 'ព្រិ ផាន់ណា',
image-two.png
    'ម៉ាង ទូច', 'ម៉ាន សំអឿន', 'ម៉ាន់ ហៀន', 'ម៉ុន ស៊ីថេប', 'ម៉ូត ស្រីនុន', 'ម៉ៅ អ៉ីនត្រាចក្រ', 'មុន្នីរុន សាវ៉ាន់នឿន', 'យឹម យាន', 'រចំ ពាជ', 'រម៉ាស់ ឃុំ', 'រស់ សុស៊ីន', 'រ៉េម រ័តនា',
    'រិន ជីអ៊ុន', 'រីន ឡៃហ៊ន់', 'រឿន ចាន់ម្នី', 'រឿន សុខណា', 'លឹប ប្រុស', 'លុច ស្រីល័ក្ខ', 'វ៉ន សៃហ្វា', 'វ៉ាហេត អាល់ខុទ្រី', 'វិន វណ្ណេត', 'វី សម្ផស្ស', 'វិរៈ ធី', 'វុត ដា', 'សល់ ចាន់អន',
    'សល់ ឡូល', 'សល់ សាអែម', 'ស៊ាន ពិសី', 'ស៊ុន មករា', 'ស៊ួន សេរីសុវត្ត', 'សាង រ៉ាយុត', 'សាន សុផាន', 'សារីក មួយគា', 'សុទ្ធ សោភា', 'សុន តុន', 'សឿន សុគន្ធា', 'សេង បូទី',
    'សេម មូលិកា', 'សេវ សិត', 'ស្រ៊ាន វិរៈ', 'សំបូរ សម្បត្តិ', 'ហូ ណាវី', 'ហូ ស្រីនាង', 'ហួច ផានិត', 'ហឿង សៀងហៃ', 'ហឿន ស្រីម៉ី', 'ហៀត ហ្វាទីម៉ះ', 'ហេង ស៊ីវម៉េង', 'ហោ ស្រីនី',
    'ឡាង លី', 'ឡាំប៉ន ចាមួស', 'អ៊ិន វណ្ណេត', 'អាត ខាំត្រាត', 'អឿន វង្ស', 'ខេង គុយឡាង', 'ខេង គុយលាង', 'សេង ពីន', 'គ្រី សៀកមួយ', 'ជាតិ ស្រីនាត', 'ញ៉ន ចន្ធូ', 'ឌិន ស្រីនូ',
    'ឌីណា ឌឿន', 'ឌៀ កាស៊ី', 'ធា និមល', 'និល ប៊ុនចេក', 'នូ ស៊ីណាក់', 'ប៉ាវ រិនគឹមស្រៀ', 'ផល បរមី', 'ផូង ច័ន្ទ', 'ពិន ចាន់ត្រា', 'ម៉ៃ យន្តឆៃយ៉ា', 'យូរ សៀវនិច្ច', 'រួត រ៉ាស៊ី',
    'លឹម ដារ៉ាផាត់តយ៉ា', 'លឿង កញ្ចនា', 'លឿង បូផា', 'វណ្ណា ពុទ្ធនា', 'វន ស្រីអែម', 'វីរៈ ចន្រ្ទា', 'វែង ចរិយ៉ា', 'ស ប៊ុននី', 'ស៊ន់ សិរីបញ្ញា', 'ស៊ិន កញ្ញា', 'ស៊ីនឿន ស៊ីនេត',
    'សាយ សុកាយ', 'សារ៉ាន់ ព្រីដា', 'សុខ គឹមតី', 'សុខ ដារ៉ា', 'សុខា រីសា', 'ហ៊ែល ផានី', 'ហំ តាំងហេង', 'ឡេង ដារី', 'ម៉ាឡៃ ចាន់នារីនាថ', 'អែម សុភី', 'គង់ ដាលីន', 'គាវី ភារី',
    'គុណ បួឡៃ', 'ឃាន ដេដ', 'ចាន់ រស្មី', 'ចាន់ រិទ្ធិធ្យា', 'ជេរ យ៉ង់', 'ឈីម សីហា', 'ឈឿន សុផៃ', 'ដឹប ដន', 'ដុង រដ្ឋា', 'តេង ចាន់និត', 'ថន ធា', 'ទូច ធារ៉ា', 'ទៀប វ៉ា',
    'ទោង សៀងហៃ', 'ធល ចន្ទចរិយា', 'ធី សូវីត', 'ធុច ចំរើន', 'ធុល នេត្រសក្កដា', 'នឿន ធារ៉ា', 'នឿន សុណា', 'បាន ស្រីល័ក្ខ', 'ផន ចាន់រ៉ា', 'ផាន វិច្ឆិកា', 'ផៃ សុខណាត',
    'ភន ភាព', 'ភន សម្ផស្ស', 'ភិន សុភី', 'មាច វណ្ណៈ', 'យ៉ាង ជីង', 'យិម ណាគ្រី', 'យឹម សុភាក់', 'រ៉ា វីណា', 'រ៉ែន យ៉ិន', 'រិន រត់', 'លឹម សុខហេង', 'លៀម វណ្ណី', 'ស៊ន សុជាតិ',
    'ស៊ិន វត្ដី', 'ស៊ិន សុគន្ធ', 'សូគី ធីវាន់យ៉ុន', 'ស្លែ យន្ត', 'ហ៊ុប កញ្ញា', 'ហួន ផារ៉ុម', 'ឡូញ ចន្ធូ', 'ឡែន លឺ', 'ឧដន កន្និដ្ឋា', 'អឿម លីហើ', 'ពីន រិទ្ធី', 'ព្រឹន ដុល្លា', 'គង់ ស្រីលីន',
    'ឃ្លឿន យុត', 'ចន មិនា', 'ណាត រក្សា', 'ណុយ ណូរីត', 'ថែន ធៀប', 'ថែម វ៉ាត់', 'ថៃ កវី', 'ថោង ធីតា', 'ទត គឹមស៊ីថា', 'នី ស៊ីណា', 'បូរ មករា', 'ប្រុក ជីអ៊ុន', 'ផ្យល់ ដុង',
    'ព្រេម ប្រាំង', 'ម៉ៅ សុផាន់ណា', 'យុត សុខឡាង', 'យូ សុធារ៉ា', 'យ័ន្ត វ៉ាយុ', 'ពុត វិសាល', 'រម៉ាម សុង', 'រិន សុថាត់', 'រឹម រ័ត្ន', 'លី មេសា', 'ស៊ឺ ប៊ុនស៊ីង', 'ស៊ឺន គឹមសាន',
    'សាមួន សារីម', 'សារ៉ន សុធាសំរឹទ្ធិការ្យ', 'សុខ ដឹប', 'សុភ័ណ្ឌ នីតា', 'សៀ ប៉ូរ៉ា', 'សំណាង គង់', 'ហាយ សុខ', 'ហូន ស្រីសរ', 'ហួរ ផេងអាង', 'ហឿន ហៈនីម៉ា', 'កុំ សុផាន់នី',
    'ខន រស្មី', 'ង៉ុន ម៉ាឡា', 'ជុំ ខាំតាន់', 'ថាក់ ប៊ុនមី', 'ធឿន ប្រវ៉ាត់', 'ប៊ី ដានី', 'ម៉ៅ ប៊ុនហាច', 'សន ដារ៉ា', 'ស៊ូរ ជីអ៊ុន', 'ស្ដី រ៉ាកខែល', 'សំរិត ពិសិត', 'ហាយ រដ្ឋា', 'ឡុង អាង',
    'ឡូត ស៊ីណាយ', 'ខឿន តុលា', 'គង់ ស្រីពេជ្រ', 'គី វុទ្ធី', 'ឃន់ វ៉ាឃីម', 'ឃា សៃយ៉ា', 'ចាន់ ម៉ាណែត', 'ឆន វិឆ័យ', 'ជាតិ លីសា', 'ជួន ស្រីពៅ', 'ជឿម ចាន់ធូ', 'ឈន សួង', 'ឈឹម រស្មី',
    'ឈួន ស្រស់', 'ញ៉ន សុភ័ក្រ្ត', 'ណាត ស័កដា', 'ថន បូផា', 'ថេន ណេង', 'ប៊ី ធារី', 'បឿន ដានីន', 'ប្រាក់ ណារី', 'ប្រេង យ៉ូង', 'ផន ស្រីនាង', 'ផល់ ចន្ទនីសា', 'ភេ ហាក់', 'ម៉ន សាម៉ាយ',
    'មី សុលី', 'មុត តុលា', 'យ៉ក ក្រីនះ', 'យ៉ា លីដា', 'យ៉េ ឡៃហ័ង', 'យឿង កញ្ញា', 'យឿន មករា', 'រស់ រ៉ុង', 'រ៉ន មួយ', 'រ៉ន សុភាព', 'រ៉ាន រុន', 'រិះ វ៉ាគូ', 'រឿន ស្រីនៀត', 'លិក ប៊ុនលាប',
    'លី នូភឿង', 'លៀង សារ៉ា', 'វ៉ាន់ ពិសី', 'សុីង ឡេអុីង', 'ស៊ុក ប៊ុននី', 'ស៊ុយ សីហា', 'សាន សុផានិត', 'សឹង មករា', 'សុខ ចន្ថា', 'សុខ ធុកា', 'សុង ធឿន', 'សឿង ដាវណ្ណ', 'សឿម ពិស៊ិត',
    'សៀន សុវណ្ណ', 'សេង វឿន', 'សៅ ច័ន្ទធា', 'សំបូរ លីសា', 'ហៀង នារតី', 'ហែ សីហាក់', 'អ៊ី ចាន់ថុល', 'អ៉ឹង សេងហាក់', 'គន់ ប៊ុនលាប', 'ថន នីដាយុត', 'ប៉ិន ស្រីថៃ', 'សាត ថាវរី',
    'សួង សុខចំរើន', 'ឡេង ស្រីឡែន', 'រឿង ឧត្តម', 'ឯម សីង', 'ឃួន ពីន', 'ប៉ិន សំបូរ', 'រ៉ុង យ៉ា', 'សៀត បញ្ញា', 'សួ សំណាង', 'ឈុន ពិសី', 'តុង ជីវ័ន', 'ខោយ សុខខន', 'ស៊ុំ ចន្ទដារ៉ា', 'កុក ស្រីនាង', 'ណាល់ លីដਾ', 'ឈឹម សុវណ្ណរ៉ា', 'មាស សំរេច', 'សុង សុភ័ក្រ', 'យឿន សាវិន', 'ប៊ុត ជ័យជុំនៈ', 'សន សៀង', 'គឹម សុជីតា', 'មេង សីហា', 'ឆៃ សារី', 'ដឿប សណ្ដោស', 'ឆុន សានីយ៉ាឆដា', 'វ៉ារី សុខវី', 'សួន ចាន់ធូ', 'ភៀន រ៉ាន់', 'សាត តាំងអុី', 'ភឿន កេសី', 'យ៉ រចនា', 'ជាន ពិសី', 'ប៉ុន ឃាន', 'សេម លីសា', 'រឿន អେមមី', 'ឆោម ប៊ុនហេង', 'លឹម គារ៉ា', 'យឺន រស្មី', 'វន ប៊ុនសេង', 'គង់ រស្មី', 'វ៉េត សីហាក់', 'អាង ផាន់នីន', 'ផាត ស្រីកែវ', 'ណាង ស្រីនាង', 'សុខ ផាន់នី', 'ណូក ប៉ិញលី', 'ឡម លីហួ', 'ស៊ីង ឡេអ៊ី', 'យ៉ុន សុគុណ', 'រិត ស្រីអឺ', 'នឹម ណាត់', 'វន ស្រីភាក់', 'ចេក ម្លិះ', 'ឃីន ចំរើន', 'សាន សាត់ណាក់', 'យ៉ាន លីន', 'ត្រក ពុំ', 'រាន ស្រីតន់', 'ជុំ សៅវ័ន', 'ជេត ម៉យ', 'អឿម ស្រីលឿស', 'រឿន ចិត្ត', 'រ៉េន ភារុណ', 'ខុម រក្សា', 'សាន ចន្រ្ទា', 'ឡំ លីសា', 'ធីម ចន្ធី', 'ទិត ដាឡែន', 'រ៉ន ណារី', 'រ៉ុម បុប្ផា', 'យឿន ចន្ធី', 'ញឹម ដាលី', 'ភាស់ សុភាព', 'សៀន ស៊ីវន', 'ស៊ឹម ស៊ីម៉ា', 'ថាត់ តុលា', 'ជុំ សាម័យ', 'ញឿន ផារី', 'ក្រូច សុខា', 'ឆាន ស្រីល័ក្ខ', 'លូត និយ', 'ថៃ សុភ័ន', 'ណូ វ៉ាន់ណា', 'ហួរ ម៉េងហួត', 'វុន វីត', 'គៀន សំណាង', 'ចេក ម៉ាឡា', 'ប៊ុតឌី នីម៉ុន', 'ខេង ឡង់ឌី', 'ប៊ន រដ្ឋធានី', 'សាន ហេងលី', 'ទត សុខារ៉ាហ្វា', 'ឌីម សុធារី', 'ប្រុស ចាន់រដ្ឋ', 'ឈិន ឆាន', 'ប៉ក់ ចាន់', 'ហោ វល័ក្ខ', 'នួម ចិត្រា', 'ហ៊ុយ ឌីអ័ង', 'សេងយាន ដាវ៉ាត់', 'ភ្លឿត សីហា', 'ជា លុច', 'វឿន ធារ៉ា', 'ទូច កែវរស្មី', 'ហេង រស្មី', 'ហ៊ាល ពិសី', 'ម៉ន ស្រីម៉ាច', 'ង៉ែត សុីនប៊ី', 'ខុំ សុជាតិ', 'អ៊ុន សាអែម', 'ម៉ន រក្សា', 'ណាក់ វ៉ាន់នីត', 'ឌុល លីហួរ', 'មិន ចាន់សុផាន់', 'សែត ស្រីនិច', 'យូ ហឹល', 'សុខ សម្បត្តិ', 'នី កានុន', 'សាង ដាលីន', 'សេង សុខសាន', 'ទួន សុភីន', 'ម៉ែន សុខលីន', 'លេង ផានី', 'ម៉ៅ សៅផន', 'ឡូត ឆៃលាង', 'សាន ភារោធ', 'ធី ចិត', 'ចំរុង ចំរើន', 'ម៉ាករ៉ៃ សារ៉ាត់', 'ហ៊ីម ភក្ដី', 'សាន ស្រីនិត', 'កង ម៉ាន្នី', 'ស្រង ស្រីល័ក្ខ', 'ញ៉ាន សាត', 'សួន តុម', 'វឿន ឆវិន', 'ពិនណាល់ ចាន់និ', 'ហ្វូង ប៊ុនឆៀង', 'ម៉ៅ ប៊ុនណា', 'កង ម៉ាសាវាន់', 'ហៀង ជីងជីង', 'សូ នីតា', 'ខឹម ស្រីពណ៌', 'ជន់ ស្រីសា', 'រី សុខសម្បត្តិ', 'លាន សីហា', 'វ៉ាន់ ស្រីឡែន', 'ដឿន ស្រីដាំ', 'រិន ណារ៉ាត់', 'អុល សំណាង', 'ឈៀវ អ៊ីឈៀង', 'ផង់ សុផន', 'អ៊ីន សុខនាង', 'ប៊ន វុតធីម', 'ចេម វ៉ាលី', 'ធឿន ចាន់ករុណាពេជ្រ', 'ថំាង រាត្រី', 'ហេង សុផានី', 'សៃ នាង', 'ហេង បណ្ណារី', 'វ័យ សីហាក់', 'ផាត ដាលីន', 'ហែ ស្រីពេជ្រ', 'រ៉េន ដារ៉ូ', 'ម៉ន មនីត', 'ទឹម រតនា', 'ឡា រដ្ឋា', 'មិន រតនៈ', 'ខុន លីតា', 'ហៀក សុម៉ាឡៃ', 'សៅ ស្រីណាក់', 'អោក ឡៃអេង', 'ណាន ឌីណា', 'ឡាត់ សារៀប', 'មិន ចាន់សាបា', 'ធូ លីដា', 'រត្ន មួយគីម', 'រត្ន ចាន់ឌី', 'លឿម ស្រីលាក់', 'សន សៅលី', 'រឿន រំដួល', 'ហង្ស ជូលីយ៉ា', 'ទត ឌីណា', 'សត្ថា ស្រីភួង', 'ហាន់ សុភ័ក្ត', 'នី ឌីណា', 'វាន់ កង', 'វន កុសល', 'ឌី ទិវា', 'យ៉ន លីកា', 'រៀម ស្រីណែត', 'ចិន លីម', 'កួន ឡែម', 'ជួន សុខន', 'ហ៊ាង សុផាត', 'វុន សុភា', 'ហ៊ា លីហ៊រ', 'លី កាស្សា', 'ផៃ សុផាន', 'ដា រ៉ាវីត', 'យ៉ង សោភា', 'ប៉ែន សុភ័ក្ត្រ', 'លើម វណ្ណៈ', 'ឈរ លីញអឺ', 'ឡន់ លីម', 'ប៉ែន សាយ័ន', 'ឡាត់ ប្រិក', 'ទេព ដួងច័ន្ទវឌ្ឍនា', 'ចាន់ ស្រីមុំ', 'អែម ចន្រ្ទា', 'ស៊ឹម សៀងអ៊ី', 'កាន់ ទំពា', 'សេង សោភា', 'នើន ស្រីនិត', 'ឈិន ជ្រួយ', 'ដយ មន្នី', 'ញ សេវ៉ា', 'ក្លុប សៀវលិន', 'វ៉េង ដាវី', 'អុន សុវណ្ណរ៉ា', 'ហុន សាក់', 'ធីន សុកហៀង', 'សួង រតនា', 'ណាំង សុខជា', 'ធឿង ណាធី', 'ចយ ស្រីឡាន់', 'កើន សូសុខហេង', 'លន រិទ្ធធីរ៉ាន់', 'សយ សៀងហៃ', 'ដន ជីវ័ន', 'រាំង រ៉ា', 'ហ៊ាល សុខយ៉ត', 'ឈន គឹមឈីង', 'ដឿង សំណាង', 'ឌុល សុខគា', 'យា សារក្ស', 'មោង សុណា', 'លឹង ប៊ុនហាង', 'ធុយ សំណាង', 'ធីន ធៀប', 'នឿ តឿ', 'ថេន សេងហេង', 'ស៊ុម ចាន់ថន', 'នី ស្រីដា', 'ម៉េង សុខា', 'ព្រឿន ខួច', 'អ៊ុំ គឹមឆាយ', 'លឹម សុផាត', 'ម៉ម សិលា', 'សន សារិត', 'យ៉ុង សុវណ្ណារី', 'យី ដាលីន', 'ហ៊ាន នីហ្សា', 'មាន សំអាត', 'សំណាង ស្រីផាត់', 'អ៊ូច សារ៉ាតនី', 'រិទ្ធ ញ៉ុង', 'ស៊ិន ភារុណ', 'ឌឿ រ៉ុន', 'ឡាយ អេមីល', 'ខឿន​ រតនៈវិមាន', 'សាន សម្បត្ដិ', 'ម៉ាត់ នីតា', 'ដៀរ ស្រីរ័ត្ន', 'តច កាយូ', 'ម៉ៅ សុធីម', 'យ៉េ លីសា', 'សោម សុខគា', 'បេន ចន្ថា', 'សាវុត សម្ភស្ស', 'រឹម ប៊ុនឆៃ', 'សេវ ស៊ីវន់', 'ភ័ណ្ឌ ម៉េងហុង', 'ហ៊ីន ជីអ៊័ង', 'ប៊ុន ស៊ីណា', 'ស្រេង វាសនា', 'លាង សំអាត', 'មូសារ ម៉ាហ៊ៀត', 'ភួង សុខលីដਾ', 'ថន ចំរើន', 'អ៊ិន ស្រីនោ', 'គិត អ៊ីហៀង', 'ភាគ ផាន់ណា', 'គិង​ ឡាន់', 'ឡឹ កញ្ញា', 'ឡឹ ចង', 'លែង ថង', 'ពាង​ សុណាល់', 'កែវ សុចាន់', 'លន់ ស្រីជីង', 'ឃី សុខឃំាង', 'វ៊ិប់ សុខធារ៉ា', 'ហោ សុខមាន', 'វណ្ណា វិជ្ជរ៉ា', 'សៅ ភ័ត្រា', 'ស៊ូ សុទ្ធា', 'រឿន ស៊ីណយ', 'សូត គឹមស្រេង', 'ណាក់ ស្រីណុច', 'លី ជូអ៊ី', 'តុង ឆន្នៈ', 'ខ្លង ចាប់ហេង', 'ពេជ្រ ផាន់នី', 'ភាន សុឡែន', 'អឿន សុខនី', 'ណាម ស្រីលាក់', 'ជួន វេហា', 'ឡាត់ ឈិនផ្លូច', 'ហ៊ុំ បូរិន', 'ហេង វាសនា', 'ស ណារ៉ាក់', 'កេង វុទ្ធី', 'នី ច័ន្ទតារា', 'តី​ ចាន់​ណុច', 'ប៊ុន សុម៉ាលីតា', 'កុយ សៅរី', 'យឿន សុភីម', 'រុំ ចាន់រ៉ាត់', 'ហ៊ាន សានីន', 'ណាប់ សុទ្ធានិត', 'ផា ត្រាឡូ', 'រួន សំនាង', 'តី ចាន់ភីន', 'សូនី ស្រីនិច', 'វឿង សុភារិត', 'លាត លក្ខិណា', 'ដារ៉ា រតនា', 'សល់ សុខគា', 'សែន សុម៉ាវត្តី', 'ហេម គាថៃ', 'រិះ ស្រីអូន', 'ផល្លា ផល្លី', 'ម៉ែន លីដា', 'ឆេង សុផាន់នី', 'ខុន សុម៉ាលិក', 'ខុន សុម៉ាលិកា', 'អន ធីអៀង', 'សយ អាឈី', 'លីម ប៉ូលី', 'សូរ គីវ', 'ទង់ វាស្នា', 'សាមុត សោភ័ណ្ណ', 'អោត បូរិន', 'ភឿន ផារីកា', 'វិបុល សន្យា', 'រ៉ន ចាន់', 'សុំ សុខវិសាល', 'វង្ស សុខលី', 'សេរី ចាន់តី', 'អំ សំអន', 'ហុង សុមនា', 'ឆោម តាំងអ៊ី', 'ញឹម សុខនី', 'ឡន វិតី', 'និត ស៊ីណា', 'មាន ណារី', 'លាម ចន្ថា', 'វ៉ាញ សារុំ', 'កិ សំណួរ', 'កិ ផា', 'កែវ ពីប៉ាក់', 'យ៉ុន ភារុន', 'យ៉ាន់ អ៊ីនប៉ាន់', 'ប៊ន សេងលី', 'ឆាន ឆយី', 'ហ៊ាវ រក្សា', 'សុខ ម៉ី', 'រ៉ៃ ប៊ុនរ៉ាម', 'ឡេះ រ៉ហ្វាត', 'ញ៉ែប ដុល្លា', 'ឃុត វាន់នុត', 'ចាន់ សុផាត', 'ឆាន សុភា', 'ឡូញ ស្រីម៉ៃ', 'ធឿន សំណាង', 'ធី ជិនណា', 'ងួន ដាវីឌ', 'ចាន់ ស្រីណែត', 'ផាន់ ផាន់សមុទ្រ', 'គា គន្ធា', 'គិត អ៊ីហ័រ', 'ណាន់ វិច្ចិកា', 'សាវុត វារ៉ាត់', 'ណាន់ មករា', 'ហេង វាសនា', 'សុត ណាល់', 'សុត ស្រីប៉', 'ឌី ណារី', 'ដារ៉ា ចាន្រ្ទា', 'កឿន សុគារ', 'វ៉ោន វល័ក្ខ', 'សាន់ រក្សា', 'ញន់ ស្រីនិច', 'មាស ចាន់ថូ', 'ឆាន់ ឧត្តម', 'ជន សុជាតិ', 'សាយ គឹមស៊ាន', 'ខៀវនី ចាន់ពេជ្រ', 'ផាត់ សុផាន់', 'អ៊ីម ចេនអ៊ី', 'ប៉ិច វុទ្ធីដាលីន', 'ជ្រា គាងម៉េង', 'ថន ឡីអ៊ី', 'ថន ចាន់ថា', 'លឿន សំណាង', 'រុន  កញ្ញា', 'ណូ វ៉ាន់ណៃ', 'ទីង ស្តែង', 'ឡោះ អានីតា', 'ម៉ាន ហានីស្សា', 'វ៉ា នីតា', 'សាមុត សុផល', 'ពឿន ច័ន្ទមករា', 'អ៊ិន ស្រីនិច', 'វឿង ចិត្រា', 'ឆៃ ដាឡែន', 'ឈួន មករា', 'គង់ ម៉េងហុង', 'អ៊ុន មិនា', 'ងិន សៀវឡាង', 'វឿន ម៉ាណារី', 'សួន ឆុន', 'សុះ ស្រឡេះ', 'ឆន រតនា', 'កុល ចាន់ណា', 'ឆន លីមិញ', 'សោ  សុវណ្ណថេរ៉ាយុ', 'ច្រន ចាន់ណាវី', 'ធី រត្តនា', 'តឹក ចង្រិត', 'ឡាយ កែវ', 'ឡេន កែវ', 'ខេម ស្រីរ័ត្ន', 'ជុំ វណ្ណឆៃ', 'ខាត់ ម៉ាណែត', 'តឹង សោភា', 'អាន លាភហេង', 'អ៊ន ផារី', 'មេង សៀវអ៊ី', 'ក្រូច សារ៉ុម', 'ខាវ សុនីត', 'ហ្យឹ ណៀក', 'ពុធ ឆៃយ៉ា', 'រ៉ាត់ សុផាន់ណែត', 'ទួន លីតាក់', 'នូ សុផានុត', 'ថង ដេវ៊ីត', 'អាត ម៉េងហ៊ួរ'
];

/**
 * Function នេះសម្រាប់ត្រង (filter) និងបង្ហាញឈ្មោះនៅក្នុង dropdown
 * @param {string} searchTerm - អក្សរដែលអ្នកប្រើប្រាស់បានវាយ
 */
function updateSearchDropdown(searchTerm) {
    // សម្អាតលទ្ធផលចាស់ៗចេញពី dropdown
    customDropdownSearch.innerHTML = '';

    // ប្រសិនបើប្រអប់ស្វែងរកនៅទំនេរ, លាក់ dropdown ហើយចេញពី function
    if (!searchTerm) {
        customDropdownSearch.style.display = 'none';
        return;
    }

    // ត្រងបញ្ជីឈ្មោះ ដោយមិនប្រកាន់តួអក្សរតូចឬធំ
    const filteredNames = searchNameList.filter(name =>
        name.toUpperCase().includes(searchTerm.toUpperCase())
    );

    // ប្រសិនបើមានឈ្មោះដែលត្រូវគ្នា, បង្កើត div ហើយបង្ហាញ dropdown
    if (filteredNames.length > 0) {
        filteredNames.forEach(name => {
            // បង្កើត div ថ្មីសម្រាប់ដាក់ឈ្មោះនីមួយៗ
            const itemDiv = document.createElement('div');
            itemDiv.textContent = name; // បញ្ចូលឈ្មោះទៅក្នុង div

            // បន្ថែម Event Listener ពេលអ្នកប្រើប្រាស់ចុចលើឈ្មោះ
            itemDiv.addEventListener('click', () => {
                studentNameInputForSearch.value = name; // បញ្ចូលឈ្មោះដែលបានជ្រើសរើសទៅក្នុងប្រអប់ input
                customDropdownSearch.style.display = 'none'; // លាក់ dropdown វិញ
            });

            // បញ្ចូល div ឈ្មោះទៅក្នុង dropdown container
            customDropdownSearch.appendChild(itemDiv);
        });
        customDropdownSearch.style.display = 'block'; // បង្ហាញ dropdown
    } else {
        // ប្រសិនបើគ្មានឈ្មោះដែលត្រូវគ្នា, លាក់ dropdown
        customDropdownSearch.style.display = 'none';
    }
}

// ចាំស្តាប់ Event 'keyup' នៅពេលអ្នកប្រើប្រាស់វាយអក្សរក្នុងប្រអប់ស្វែងរក
studentNameInputForSearch.addEventListener('keyup', (event) => {
    updateSearchDropdown(event.target.value);
});

// ចាំស្តាប់ Event 'focus' ដើម្បីបង្ហាញ dropdown ពេលចុចលើប្រអប់ input
studentNameInputForSearch.addEventListener('focus', (event) => {
    updateSearchDropdown(event.target.value);
});

// លាក់ dropdown ប្រសិនបើអ្នកប្រើប្រាស់ចុចកន្លែងផ្សេងក្រៅពីប្រអប់ស្វែងរក
document.addEventListener('click', (event) => {
    if (!studentNameInputForSearch.contains(event.target) && !customDropdownSearch.contains(event.target)) {
        customDropdownSearch.style.display = 'none';
    }
});

/**
 * Displays a message in the message box.
 * @param {string} message The message to display.
 * @param {boolean} isSuccess Determines if the message is a success or error.
*/
function showMessage(message, isSuccess = false) {
    messageBox.innerHTML = message;
    messageBox.classList.remove('message-success', 'message-error');
    if (isSuccess) {
        messageBox.classList.add('message-success');
    } else {
        messageBox.classList.add('message-error');
    }
}

/**
 * Enables the login form fields and button.
 */
function enableForm() {
    submitBtn.disabled = false;
    studentNameInput.disabled = false;
    studentEmailInput.disabled = false;
}

/**
 * Disables the login form fields and button.
 */
function disableForm() {
    submitBtn.disabled = true;
    studentNameInput.disabled = true;
    studentEmailInput.disabled = true;
}

/**
 * Shows the correct form based on the selected tab and populates the dropdown.
 * @param {string} formId The ID of the form to show ('home-leave' or 'entry-leave').
*/
function showForm(formId) {
    homeLeaveContent.classList.add('hidden');
    entryLeaveContent.classList.add('hidden');

    tabHome.classList.remove('active');
    tabEntry.classList.remove('active');

    if (formId === 'home-leave') {
        tabHome.classList.add('active');
        homeLeaveContent.classList.remove('hidden');
        populateHomeLeaveDropdown();
    } else if (formId === 'entry-leave') {
        tabEntry.classList.add('active');
        entryLeaveContent.classList.remove('hidden');
        populateEntryLeaveDropdown();
    }
}

/**
 * Checks the user's location and enables the login form if they are within the allowed radius.
 */
function checkLocationAndEnableForm() {
    disableForm();
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                latitudeInput.value = position.coords.latitude;
                longitudeInput.value = position.coords.longitude;

                fetch(APP_SCRIPT_URL + '?action=checkLocation&lat=' + latitudeInput.value + '&lon=' + longitudeInput.value)
                    .then(response => response.json())
                    .then(result => {
                        if (result.inLocation) {
                            showMessage("ទីតាំងត្រឹមត្រូវ អ្នកអាចបំពេញទិន្នន័យបានហើយ", true);
                            enableForm();
                        } else {
                            showMessage(`អ្នកមិនស្ថិតនៅជិតទីតាំងដែលបានកំណត់ទេ`, false);
                        }
                    })
                    .catch(error => {
                        console.error("Location verification error:", error);
                        showMessage("មានបញ្ហាក្នុងការពិនិត្យទីតាំង", false);
                    });
  _message 8/9_
            },
            function (error) {
                console.error("Geolocation Error:", error.message);
                if (error.code === error.PERMISSION_DENIED) {
  A-B test:
                  showMessage("អ្នកបានបដិសេធមិនអនុញ្ញាតឱ្យចូលប្រើទីតាំង", false);
                } else {
                    showMessage("កំពុងពិនិត្យទីតាំងរបស់អ្នក...", false);
                }
            }
        );
    } else {
        showMessage("Browser របស់អ្នកមិនគាំទ្រ Geolocation ទេ", false);
    }
}

/**
 * Fetches student records from the server-side script based on the student's name.
 * @param {string} studentName The name of the student.
 * @param {string} studentEmail The email of the student.
 * @returns {Promise<object>} An object containing homeLeave and entryLeave records.
*/
async function fetchStudentRecords(studentName, studentEmail) {
    try {
        const response = await fetch(`${APP_SCRIPT_URL}?action=getStudentRecords&studentName=${encodeURIComponent(studentName)}&studentEmail=${encodeURIComponent(studentEmail)}`);
        const result = await response.json();

        if (result.status === 'success') {
            return result.data;
        } else {
            console.error("Failed to fetch student records:", result.message);
            return { homeLeave: [], entryLeave: [] };
        }
    } catch (error) {
        console.error("Error fetching student records:", error);
        return { homeLeave: [], entryLeave: [] };
    }
}

/**
 * Populates the dropdown and form fields for the "ច្បាប់ទៅផ្ទះ" tab.
 */
function populateHomeLeaveDropdown() {
    if (homeLeaveRecords.length > 0) {
        homeLeaveForm.classList.remove('hidden');
        noRecordsMessageHome.classList.add('hidden');

        studentNameDropdownHome.innerHTML = '<option value="" disabled selected>ជ្រើសរើសឈ្មោះនិស្សិត</option>';
        homeLeaveRecords.forEach((record, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = record.name;
            studentNameDropdownHome.appendChild(option);
        });

        collegeHomeInput.value = '';
        leaveDateHomeInput.value = '';
        reasonHomeInput.value = '';
        returnDateHomeInput.value = '';
        studentNameDropdownHome.disabled = false;
        homeLeaveSubmitBtn.disabled = true;
    } else {
        homeLeaveForm.classList.add('hidden');
        noRecordsMessageHome.classList.remove('hidden');
        studentNameDropdownHome.disabled = true;
        homeLeaveSubmitBtn.disabled = true;
    }
}

/**
 * Populates the dropdown and form fields for the "ច្បាប់ចេញចូល" tab.
 */
function populateEntryLeaveDropdown() {
    if (entryLeaveRecords.length > 0) {
        entryLeaveForm.classList.remove('hidden');
        noRecordsMessageEntry.classList.add('hidden');

        studentNameDropdownEntry.innerHTML = '<option value="" disabled selected>ជ្រើសរើសឈ្មោះនិស្សិត</option>';
        entryLeaveRecords.forEach((record, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = record.name;
            studentNameDropdownEntry.appendChild(option);
        });

        collegeEntryInput.value = '';
        leaveDateEntryInput.value = '';
        reasonEntryInput.value = '';
        returnDateEntryInput.value = '';
        studentNameDropdownEntry.disabled = false;
        entryLeaveSubmitBtn.disabled = true;
    } else {
        entryLeaveForm.classList.add('hidden');
        noRecordsMessageEntry.classList.remove('hidden');
        studentNameDropdownEntry.disabled = true;
        entryLeaveSubmitBtn.disabled = true;
    }
}

/**
A-B test:
 * Submits a return date for a specific leave record.
 * @param {string} sheetName The name of the Google Sheet tab.
 * @param {number} rowIndex The row index of the record to update.
 * @param {string} studentName The name of the student.
 * @param {string} studentEmail The email of the student.
 * @param {string} returnDate The return date provided by the user, or the current date.
 */
async function submitReturnDate(sheetName, rowIndex, studentName, studentEmail, returnDate) {
    try {
        const formData = new FormData();
        formData.append('action', 'submitReturnDate');
        formData.append('sheetName', sheetName);
        formData.append('rowIndex', rowIndex);
        formData.append('studentName', studentName);
        formData.append('studentEmail', studentEmail);
        formData.append('returnDate', returnDate);

        const response = await fetch(APP_SCRIPT_URL, {
            method: 'POST',
  t_message 8/9_
            body: formData
        });

        const result = await response.json();

        if (result.status === 'success') {
            // Show the custom success alert
            successAlert.classList.add('visible');
            // Automatically close the success alert after 10 seconds
            setTimeout(() => {
                successAlert.classList.remove('visible');
            }, 10000);

            // Re-fetch data and update dashboard
            const studentRecords = await fetchStudentRecords(studentName, studentEmail);
model_text_0_9
            homeLeaveRecords = studentRecords.homeLeave;
            entryLeaveRecords = studentRecords.entryLeave;

            // Show the correct form again to reflect the updated data
Show next 15 lines.
