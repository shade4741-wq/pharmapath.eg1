// State Management
let currentRole = 'pharmacist';
let appliedJobIds = [];

// Initial Data
let jobsData = [
    {
        id: 1,
        title: 'صيدلي مجتمعي (شفت مسائي)',
        company: 'صيدليات الطرشوبي - فرع المنصورة',
        category: 'Community',
        location: 'المنصورة',
        salary: '6,500 - 8,000 ج.م',
        shift: 'مسائي (8 ساعات)',
        experience: '0 - 2 سنة',
        desc: 'مطلوب صيدلي/ة للإشراف على صرف الأدوية وتقديم استشارات الـ OTC للعملاء استخدام برنامج فارما سوفت.',
        posted: 'منذ ساعتين'
    },
    {
        id: 2,
        title: 'Medical Representative (دعاية طبية)',
        company: 'Hikma Pharmaceuticals',
        category: 'Medical Rep',
        location: 'القاهرة',
        salary: '12,000 - 15,000 ج.م + كارت بنزين',
        shift: 'دوام كامل',
        experience: 'حديث تخرج إلى سنة',
        desc: 'تغطية مستشفيات وعيادات القاهرة لخط أدوية القلب والأوعية الدموية. اشترط إجادة الإنجليزية والمظهر الاحترافي.',
        posted: 'منذ يوم واحد'
    },
    {
        id: 3,
        title: 'صيدلي إكلينيكي (Clinical Pharmacist)',
        company: 'مستشفى الشفاء التخصصي',
        category: 'Clinical',
        location: 'الإسكندرية',
        salary: '9,000 - 11,000 ج.م',
        shift: 'صباحي',
        experience: 'سنة مع دبلومة إكلينيكية',
        desc: 'مراجعة جرعات المرضى بالرعاية المركزة والتفاعل مع الفريق الطبي لضمان بروتوكول العلاج الآمن.',
        posted: 'منذ 3 أيام'
    }
];

let applicantsData = [
    { name: 'د. أحمد محمود', job: 'صيدلي مجتمعي (شفت مسائي)', exp: 'دفعة 2023 - جامعة المنصورة', status: 'Under Review' },
    { name: 'د. سارة خليل', job: 'Medical Representative', exp: 'دفعة 2024 - جامعة القاهرة', status: 'Shortlisted' }
];

let candidatesData = [
    { name: 'د. شادي أحمد', title: 'صيدلي مجتمعي خبرة', location: 'المنصورة', exp: 'سنتين خبرة - برامج Pharmasoft & Dawaya', uni: 'جامعة المنصورة 2024' },
    { name: 'د. مريم حسين', title: 'صيدلية إكلينيكية / تغذية وريدية', location: 'القاهرة', exp: 'حاصلة على دبلومة الصيدلة الإكلينيكية', uni: 'جامعة عين شمس 2023' }
];

// Path Explorer Data
const careerPathsData = {
    community: {
        title: 'الصيدلة المجتمعية (Community Pharmacy)',
        icon: 'fa-store',
        desc: 'الواجهة الأولى للرعاية الصحية والتعامل المباشر مع المرضى وصرف العلاج.',
        skills: ['استشارات OTC', 'التواصل مع المرضى', 'إدارة المخزون والبرمجيات (Pharmasoft)', 'قياس الضغط والسكر'],
        courses: ['كورس الـ OTC الشامل', 'مهارات البيع والصيدلة المجتمعية'],
        salary: '5,000 - 9,000 ج.م شهرياً (حسب المحافظة وساعات الشفت)'
    },
    hospital: {
        title: 'صيدلة المستشفيات (Hospital Pharmacy)',
        icon: 'fa-hospital',
        desc: 'العمل داخل الأقسام الداخلية للمستشفيات، تحضير المحاليل، وإدارة مخازن الأدوية الرئيسية.',
        skills: ['معرفة تفاعلات الأدوية للداخلين', 'إدارة المخزون الدوائي', 'تجهيز المحاليل الوريدية المعقمة'],
        courses: ['دورة إدارة صيدليات المستشفيات', 'بروتوكولات الأمان الدوائي'],
        salary: '6,500 - 11,000 ج.م شهرياً'
    },
    clinical: {
        title: 'الصيدلة الإكلينيكية (Clinical Pharmacy)',
        icon: 'fa-stethoscope',
        desc: 'المشاركة الفعالة مع الأطباء في الرعاية المركزة وأقسام الأورام لضبط الجرعات العلاجية.',
        skills: ['حساب الجرعات المعقدة (TDM)', 'تقييم التحاليل الطبية', 'متابعة التداخلات الدوائية الخطرة'],
        courses: ['البورد الأمريكي (BCPS)', 'دبلومة الصيدلة الإكلينيكية المعتمدة'],
        salary: '9,000 - 18,000+ ج.م شهرياً'
    },
    medrep: {
        title: 'الدعاية الطبية (Medical Representative)',
        icon: 'fa-briefcase',
        desc: 'تمثيل شركات الأدوية المحلية والدولية والتواصل مع الأطباء للتسويق العلمي للمستحضرات.',
        skills: ['مهارات التفاوض والإقناع', 'العرض العلمي (Scientific Selling)', 'اللغة الإنجليزية الممتازة'],
        courses: ['Medical Rep Training Program', 'Advanced Communication Skills'],
        salary: '10,000 - 25,000+ ج.م + العمولات والبدلات'
    },
    remote: {
        title: 'الصيدلة أونلاين وعن بُعد (Remote Pharmacy)',
        icon: 'fa-laptop-code',
        desc: 'الاستشارات الدوائية أونلاين، كتابة المحتوى الطبي، وتدقيق قواعد البيانات الدوائية.',
        skills: ['كتابة المحتوى الطبي (Medical Writing)', 'المعلوماتية الدوائية', 'الاستشارات الطبية عبر تطبيقات Telehealth'],
        courses: ['كورس Medical Copywriting', 'أساسيات الصيدلة الرقمية'],
        salary: '400$- 1,200$ شهرياً (في حالة العمل مع شركات خارجية)'
    }
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    renderJobs();
    showPathDetail('community');
    updateCV();
    renderApplications();
    renderEmployerApplicants();
    renderCandidates();
});

// Switch Main Role (Pharmacist / Employer)
function toggleMainRole() {
    if (currentRole === 'pharmacist') {
        switchMainRole('employer');
    } else {
        switchMainRole('pharmacist');
    }
}

function switchMainRole(role) {
    currentRole = role;
    const roleBtnText = document.getElementById('role-btn-text');
    const pNav = document.getElementById('pharmacist-nav');
    const eNav = document.getElementById('employer-nav');

    if (role === 'employer') {
        roleBtnText.innerText = 'التحويل لحساب الصيدلي';
        pNav.classList.add('hidden');
        eNav.classList.remove('hidden');
        eNav.classList.add('flex');
        switchTab('emp-dashboard');
    } else {
        roleBtnText.innerText = 'حساب الشركات والصيدليات';
        eNav.classList.add('hidden');
        pNav.classList.remove('hidden');
        pNav.classList.add('flex');
        switchTab('jobs');
    }
}

// Tab Switching
function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.nav-btn, .emp-nav-btn').forEach(btn => {
        btn.classList.remove('text-teal-400', 'font-bold');
        btn.classList.add('text-slate-300');
    });

    const targetContent = document.getElementById(`tab-${tabId}`);
    if (targetContent) targetContent.classList.add('active');

    const activeBtn = document.querySelector(`[data-tab="${tabId}"]`);
    if (activeBtn) {
        activeBtn.classList.remove('text-slate-300');
        activeBtn.classList.add('text-teal-400', 'font-bold');
    }
}

// Render Job Cards
function renderJobs(filteredList = jobsData) {
    const container = document.getElementById('job-list-container');
    container.innerHTML = '';

    if (filteredList.length === 0) {
        container.innerHTML = `<div class="bg-white p-8 rounded-2xl text-center text-slate-500 border">لا توجد وظائف مطابقة للبحث حالياً.</div>`;
        return;
    }

    filteredList.forEach(job => {
        const isApplied = appliedJobIds.includes(job.id);
        const card = document.createElement('div');
        card.className = "bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition space-y-3";
        card.innerHTML = `
            <div class="flex justify-between items-start">
                <div>
                    <span class="text-[10px] bg-teal-50 text-teal-700 border border-teal-200 font-bold px-2 py-0.5 rounded-md">${job.category}</span>
                    <h3 class="font-extrabold text-slate-900 text-base mt-1">${job.title}</h3>
                    <p class="text-xs text-slate-600 font-medium">${job.company}</p>
                </div>
                <span class="text-[11px] text-slate-400">${job.posted}</span>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl">
                <div><i class="fa-solid fa-location-dot text-teal-600 ml-1"></i>${job.location}</div>
                <div><i class="fa-solid fa-money-bill-wave text-teal-600 ml-1"></i>${job.salary}</div>
                <div><i class="fa-solid fa-clock text-teal-600 ml-1"></i>${job.shift}</div>
            </div>

            <p class="text-xs text-slate-500 leading-relaxed">${job.desc}</p>

            <div class="flex justify-between items-center pt-2 border-t">
                <span class="text-[11px] text-slate-400">الخبرة: ${job.experience}</span>
                <button onclick="applyJob(${job.id})" ${isApplied ? 'disabled' : ''} class="${isApplied ? 'bg-slate-300 text-slate-600 cursor-not-allowed' : 'bg-teal-500 hover:bg-teal-400 text-slate-900 shadow-md shadow-teal-500/20'} font-bold px-4 py-2 rounded-xl text-xs transition">
                    ${isApplied ? 'تم التقديم <i class="fa-solid fa-check mr-1"></i>' : 'تقديم الآن'}
                </button>
            </div>
        `;
        container.appendChild(card);
    });
}

// Apply for Job
function applyJob(jobId) {
    if (!appliedJobIds.includes(jobId)) {
        appliedJobIds.push(jobId);
        const job = jobsData.find(j => j.id === jobId);
        if (job) {
            applicantsData.push({
                name: 'د. شادي أحمد (أنت)',
                job: job.title,
                exp: 'حديث تخرج - جامعة المنصورة',
                status: 'Applied'
            });
        }
        document.getElementById('app-badge').innerText = appliedJobIds.length;
        document.getElementById('app-badge').classList.remove('hidden');
        renderJobs();
        renderApplications();
        renderEmployerApplicants();
        alert('تم تقديم طلبك بنجاح!');
    }
}

// Filter Jobs
function filterJobs() {
    const titleVal = document.getElementById('search-title').value.toLowerCase();
    const locVal = document.getElementById('search-location').value;

    const filtered = jobsData.filter(job => {
        const matchesTitle = job.title.toLowerCase().includes(titleVal) || job.desc.toLowerCase().includes(titleVal);
        const matchesLoc = locVal === '' || job.location.includes(locVal);
        return matchesTitle && matchesLoc;
    });
    renderJobs(filtered);
}

function filterCategory(cat) {
    if (cat === 'all') {
        renderJobs(jobsData);
    } else {
        const filtered = jobsData.filter(j => j.category === cat);
        renderJobs(filtered);
    }
}

// Show Career Path Details
function showPathDetail(pathKey) {
    const data = careerPathsData[pathKey];
    const container = document.getElementById('path-detail-container');
    
    document.querySelectorAll('.path-btn').forEach(btn => btn.classList.remove('border-teal-500', 'bg-teal-50'));
    const activeBtn = document.querySelector(`[data-path="${pathKey}"]`);
    if(activeBtn) activeBtn.classList.add('border-teal-500', 'bg-teal-50');

    container.innerHTML = `
        <div class="flex items-center space-x-3 space-x-reverse border-b pb-4">
            <div class="w-12 h-12 bg-teal-500/10 text-teal-600 rounded-2xl flex items-center justify-center text-2xl">
                <i class="fa-solid ${data.icon}"></i>
            </div>
            <div>
                <h3 class="text-xl font-bold text-slate-900">${data.title}</h3>
                <p class="text-xs text-slate-500">${data.desc}</p>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div class="bg-slate-50 p-4 rounded-xl border">
                <h4 class="font-bold text-slate-800 mb-2 text-sm text-teal-700">المهارات والقدرات المطلوبة:</h4>
                <ul class="list-disc list-inside space-y-1 text-slate-600">
                    ${data.skills.map(s => `<li>${s}</li>`).join('')}
                </ul>
            </div>
            <div class="bg-slate-50 p-4 rounded-xl border">
                <h4 class="font-bold text-slate-800 mb-2 text-sm text-teal-700">الدورات والشهادات الموصى بها:</h4>
                <ul class="list-disc list-inside space-y-1 text-slate-600">
                    ${data.courses.map(c => `<li>${c}</li>`).join('')}
                </ul>
            </div>
        </div>

        <div class="bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-xs flex justify-between items-center">
            <span class="font-bold text-emerald-900">متوسط الراتب المتوقع في السوق:</span>
            <span class="font-extrabold text-emerald-700 text-sm">${data.salary}</span>
        </div>
    `;
}

// Live CV Builder Update
function updateCV() {
    document.getElementById('pv-name').innerText = document.getElementById('cv-name').value || 'الاسم الكامل';
    document.getElementById('pv-title').innerText = document.getElementById('cv-title').value || 'المسمى الوظيفي';
    document.getElementById('pv-email').innerText = document.getElementById('cv-email').value || 'الإيميل';
    document.getElementById('pv-phone').innerText = document.getElementById('cv-phone').value || 'رقم الهاتف';
    document.getElementById('pv-city').innerText = document.getElementById('cv-city').value || 'المافظة';
    document.getElementById('pv-uni').innerText = document.getElementById('cv-uni').value || 'الجامعة والدفعة';
    document.getElementById('pv-summary').innerText = document.getElementById('cv-summary').value || 'نبذة عنك...';
    document.getElementById('pv-software').innerText = document.getElementById('cv-software').value || 'البرامج...';

    const skillsArr = document.getElementById('cv-skills').value.split(',');
    const tagsContainer = document.getElementById('pv-skills-tags');
    tagsContainer.innerHTML = '';
    skillsArr.forEach(s => {
        if (s.trim()) {
            tagsContainer.innerHTML += `<span class="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px] font-semibold">${s.trim()}</span>`;
        }
    });
}

// Render Applications Table
function renderApplications() {
    const tbody = document.getElementById('applications-table-body');
    tbody.innerHTML = '';

    if (applicantsData.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="p-4 text-center text-slate-400">لم تقم بالتقديم على أي وظيفة بعد.</td></tr>`;
        return;
    }

    applicantsData.forEach(app => {
        let badgeClass = 'bg-amber-100 text-amber-800';
        let statusText = 'قيد المراجعة';
        if (app.status === 'Shortlisted') { badgeClass = 'bg-emerald-100 text-emerald-800'; statusText = 'تم اختيارك للمقابلة'; }

        tbody.innerHTML += `
            <tr class="hover:bg-slate-50">
                <td class="p-4 font-bold text-slate-900">${app.job}</td>
                <td class="p-4 text-slate-600">مؤسسة طبية</td>
                <td class="p-4 text-slate-600">المنصورة / القاهرة</td>
                <td class="p-4 text-slate-400">اليوم</td>
                <td class="p-4"><span class="px-2 py-1 rounded-full text-[10px] font-bold ${badgeClass}">${statusText}</span></td>
            </tr>
        `;
    });
}

// Employer Actions & Post Job
function handlePostJob(e) {
    e.preventDefault();
    const newJob = {
        id: jobsData.length + 1,
        title: document.getElementById('post-title').value,
        company: document.getElementById('post-company').value,
        category: document.getElementById('post-category').value,
        location: document.getElementById('post-location').value,
        salary: document.getElementById('post-salary').value,
        shift: document.getElementById('post-shift').value,
        experience: document.getElementById('post-exp').value,
        desc: document.getElementById('post-desc').value,
        posted: 'الآن'
    };

    jobsData.unshift(newJob);
    document.getElementById('stat-active-jobs').innerText = jobsData.length;
    renderJobs();
    alert('تم نشر الوظيفة بنجاح وستظهر فوراً للصيادلة!');
    switchTab('emp-dashboard');
}

function renderEmployerApplicants() {
    const tbody = document.getElementById('employer-applicants-tbody');
    tbody.innerHTML = '';
    document.getElementById('stat-applicants').innerText = applicantsData.length;

    applicantsData.forEach((app, idx) => {
        tbody.innerHTML += `
            <tr>
                <td class="p-3 font-bold">${app.name}</td>
                <td class="p-3 text-slate-600">${app.job}</td>
                <td class="p-3 text-slate-500">${app.exp}</td>
                <td class="p-3">
                    <select onchange="updateApplicantStatus(${idx}, this.value)" class="border rounded p-1 text-[11px]">
                        <option value="Applied" ${app.status === 'Applied' ? 'selected' : ''}>جديد</option>
                        <option value="Under Review" ${app.status === 'Under Review' ? 'selected' : ''}>قيد المراجعة</option>
                        <option value="Shortlisted" ${app.status === 'Shortlisted' ? 'selected' : ''}>تحديد مقابلة</option>
                    </select>
                </td>
            </tr>
        `;
    });
}

function updateApplicantStatus(idx, newStatus) {
    applicantsData[idx].status = newStatus;
    renderApplications();
}

function renderCandidates() {
    const grid = document.getElementById('candidates-grid');
    grid.innerHTML = '';
    candidatesData.forEach(c => {
        grid.innerHTML += `
            <div class="bg-white p-5 rounded-2xl border space-y-2">
                <div class="flex justify-between items-start">
                    <div>
                        <h4 class="font-bold text-slate-900 text-sm">${c.name}</h4>
                        <p class="text-xs text-teal-600 font-semibold">${c.title}</p>
                    </div>
                    <span class="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded"><i class="fa-solid fa-location-dot ml-1"></i>${c.location}</span>
                </div>
                <p class="text-xs text-slate-500">${c.exp}</p>
                <p class="text-[11px] text-slate-400">${c.uni}</p>
                <button onclick="alert('تم إرسال طلب تواصل للصيدلي!')" class="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 rounded-xl text-xs transition mt-2">
                    تواصل مع الصيدلي
                </button>
            </div>
        `;
    });
}