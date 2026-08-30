/**
 * BOA Mobile Banking & Loan Campaign Application Logic
 * Modernized UI/UX with smooth screening transitions, inline validation, and responsiveness
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. HERO CAROUSEL AUTO-SLIDER & CONTROLS
  // ==========================================
  const slides = document.querySelectorAll('.slide-item');
  const dots = document.querySelectorAll('.slider-dot');
  let currentSlideIndex = 0;
  let slideInterval = null;

  function goToSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    currentSlideIndex = index;
    if (currentSlideIndex >= slides.length) currentSlideIndex = 0;
    if (currentSlideIndex < 0) currentSlideIndex = slides.length - 1;

    slides[currentSlideIndex].classList.add('active');
    dots[currentSlideIndex].classList.add('active');
  }

  function startAutoSlide() {
    stopAutoSlide();
    slideInterval = setInterval(() => {
      goToSlide(currentSlideIndex + 1);
    }, 5500);
  }

  function stopAutoSlide() {
    if (slideInterval) clearInterval(slideInterval);
  }

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      goToSlide(idx);
      startAutoSlide();
    });
  });

  const heroSection = document.getElementById('hero');
  if (heroSection) {
    heroSection.addEventListener('mouseenter', stopAutoSlide);
    heroSection.addEventListener('mouseleave', startAutoSlide);
  }

  startAutoSlide();

  // ==========================================
  // 2. NAVBAR SCROLL EFFECT
  // ==========================================
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // ==========================================
  // 3. INLINE ERROR VALIDATION HELPERS
  // ==========================================
  function showError(controlId, errId, message) {
    const el = document.getElementById(controlId);
    const errEl = document.getElementById(errId);
    if (el) el.classList.add('has-error');
    if (errEl) {
      errEl.textContent = message;
      errEl.classList.add('visible');
    }
  }

  function clearError(controlId, errId) {
    const el = document.getElementById(controlId);
    const errEl = document.getElementById(errId);
    if (el) el.classList.remove('has-error');
    if (errEl) {
      errEl.textContent = '';
      errEl.classList.remove('visible');
    }
  }

  function clearFormErrors(formId) {
    const form = document.getElementById(formId);
    if (!form) return;
    form.querySelectorAll('.has-error').forEach(el => el.classList.remove('has-error'));
    form.querySelectorAll('.error-msg').forEach(el => {
      el.textContent = '';
      el.classList.remove('visible');
    });
  }

  // Input Real-Time Validation Clear
  const errorMap = [
    { inputId: 'new-fullname', errId: 'err-new-fullname' },
    { inputId: 'new-mobile', errId: 'err-new-mobile' },
    { inputId: 'new-national-id', errId: 'err-new-national-id' },
    { inputId: 'area-trigger', errId: 'err-new-branch-area' },
    { inputId: 'branch-trigger', errId: 'err-new-branch-name' },
    { inputId: 'new-gender', errId: 'err-new-gender' },
    { inputId: 'new-email', errId: 'err-new-email' },
    { inputId: 'exist-fullname', errId: 'err-exist-fullname' },
    { inputId: 'exist-account', errId: 'err-exist-account' },
    { inputId: 'exist-mobile', errId: 'err-exist-mobile' },
    { inputId: 'city-trigger', errId: 'err-exist-city' },
    { inputId: 'exist-branch-trigger', errId: 'err-exist-branch' },
    { inputId: 'exist-gender', errId: 'err-exist-gender' },
    { inputId: 'exist-email', errId: 'err-exist-email' }
  ];

  errorMap.forEach(item => {
    const el = document.getElementById(item.inputId);
    if (el) {
      el.addEventListener('input', () => clearError(item.inputId, item.errId));
      el.addEventListener('change', () => clearError(item.inputId, item.errId));
    }
  });

  // ==========================================
  // 4. DYNAMIC SINGLE-CARD SCREENING WIZARD & TRANSITIONS
  // ==========================================
  const q1Container = document.getElementById('screening-q1');
  const q1YesBtn = document.getElementById('q1-yes');
  const q1NoBtn = document.getElementById('q1-no');

  const q2Container = document.getElementById('screening-q2');
  const q2YesBtn = document.getElementById('q2-yes');
  const q2NoBtn = document.getElementById('q2-no');

  const formHeaderTitle = document.getElementById('form-header-title');
  const breadcrumbBar = document.getElementById('screening-breadcrumb');
  const btnChangeSelection = document.getElementById('btn-change-selection');
  const btnChangeSelectionInfo = document.getElementById('btn-change-selection-info');

  const newCustomerForm = document.getElementById('new-customer-form');
  const existingCustomerForm = document.getElementById('existing-customer-form');
  const existingUserInfo = document.getElementById('existing-user-info');

  function transitionCard(fromEl, toEl, displayType = 'block') {
    if (!fromEl || !toEl) return;
    fromEl.classList.add('fade-out');
    setTimeout(() => {
      fromEl.style.display = 'none';
      fromEl.classList.remove('fade-out');

      toEl.style.display = displayType;
      toEl.classList.add('fade-in');
      setTimeout(() => toEl.classList.remove('fade-in'), 400);

      toEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 250);
  }

  function resetToInitialScreening() {
    clearFormErrors('new-customer-form');
    clearFormErrors('existing-customer-form');

    // Reset steps
    const newS1 = document.getElementById('new-form-step-1');
    const newS2 = document.getElementById('new-form-step-2');
    const existS1 = document.getElementById('exist-form-step-1');
    const existS2 = document.getElementById('exist-form-step-2');

    if (newS1) newS1.style.display = 'block';
    if (newS2) newS2.style.display = 'none';
    if (existS1) existS1.style.display = 'block';
    if (existS2) existS2.style.display = 'none';

    if (breadcrumbBar) breadcrumbBar.style.display = 'none';
    if (newCustomerForm) newCustomerForm.style.display = 'none';
    if (existingCustomerForm) existingCustomerForm.style.display = 'none';
    if (existingUserInfo) existingUserInfo.style.display = 'none';
    if (q2Container) q2Container.style.display = 'none';

    if (formHeaderTitle) formHeaderTitle.style.display = 'block';

    if (q1Container) {
      q1Container.style.display = 'block';
      q1Container.classList.add('fade-in');
      setTimeout(() => q1Container.classList.remove('fade-in'), 400);
      q1Container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    if (q1YesBtn) q1YesBtn.classList.remove('selected');
    if (q1NoBtn) q1NoBtn.classList.remove('selected');
    if (q2YesBtn) q2YesBtn.classList.remove('selected');
    if (q2NoBtn) q2NoBtn.classList.remove('selected');
  }

  // Question 1: "Do you have a BOA account?" -> NO (New Customer Form)
  if (q1NoBtn) {
    q1NoBtn.addEventListener('click', () => {
      clearFormErrors('new-customer-form');
      transitionCard(q1Container, newCustomerForm, 'block');
      if (breadcrumbBar) breadcrumbBar.style.display = 'none';
      if (formHeaderTitle) formHeaderTitle.style.display = 'none';
    });
  }

  // Question 1: "Do you have a BOA account?" -> YES -> Transition to Question 2
  if (q1YesBtn) {
    q1YesBtn.addEventListener('click', () => {
      transitionCard(q1Container, q2Container, 'block');
      if (breadcrumbBar) breadcrumbBar.style.display = 'none';
      if (formHeaderTitle) formHeaderTitle.style.display = 'block';
    });
  }

  // Question 2: "Do you use BOA Mobile Banking?" -> YES -> Informational Card
  if (q2YesBtn) {
    q2YesBtn.addEventListener('click', () => {
      transitionCard(q2Container, existingUserInfo, 'block');
      if (breadcrumbBar) breadcrumbBar.style.display = 'none';
      if (formHeaderTitle) formHeaderTitle.style.display = 'none';
    });
  }

  // Question 2: "Do you use BOA Mobile Banking?" -> NO -> Existing Customer MB Registration Form
  if (q2NoBtn) {
    q2NoBtn.addEventListener('click', () => {
      clearFormErrors('existing-customer-form');
      transitionCard(q2Container, existingCustomerForm, 'block');
      if (breadcrumbBar) breadcrumbBar.style.display = 'none';
      if (formHeaderTitle) formHeaderTitle.style.display = 'none';
    });
  }

  // Delegated Change Selection Click Handler (Resets back to Question 1)
  document.addEventListener('click', (e) => {
    const changeBtn = e.target.closest('.btn-change-selection');
    if (changeBtn) {
      e.preventDefault();
      resetToInitialScreening();
    }
  });

  // ==========================================
  // 5. NATIONAL ID 16-DIGIT REAL-TIME COUNTER
  // ==========================================
  const nationalIdInput = document.getElementById('new-national-id');
  const nationalIdCounter = document.getElementById('national-id-counter');

  if (nationalIdInput && nationalIdCounter) {
    nationalIdInput.addEventListener('input', (e) => {
      let val = e.target.value.replace(/\D/g, ''); // Numeric only
      if (val.length > 16) val = val.substring(0, 16);
      e.target.value = val;

      const len = val.length;
      nationalIdCounter.textContent = `${len} / 16 digits`;

      if (len === 16) {
        nationalIdCounter.classList.add('valid');
        clearError('new-national-id', 'err-new-national-id');
      } else {
        nationalIdCounter.classList.remove('valid');
      }
    });
  }

  // ==========================================
  // 6. SEARCHABLE CUSTOM DROPDOWN COMPONENT
  // ==========================================
  function setupSearchableDropdown(config) {
    const trigger = document.getElementById(config.triggerId);
    const menu = document.getElementById(config.menuId);
    const searchInput = document.getElementById(config.searchInputId);
    const optionsList = document.getElementById(config.optionsListId);
    const selectedText = document.getElementById(config.selectedTextId);
    const hiddenInput = document.getElementById(config.hiddenInputId);
    const errId = config.errId;

    if (!trigger || !menu) return;

    // Toggle dropdown menu
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      document.querySelectorAll('.dropdown-menu').forEach(m => {
        if (m !== menu) m.classList.remove('open');
      });
      menu.classList.toggle('open');
      if (menu.classList.contains('open')) {
        searchInput.focus();
      }
    });

    // Prevent click inside search input from closing menu
    searchInput.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    // Real-time filter items
    searchInput.addEventListener('input', () => {
      const term = searchInput.value.toLowerCase();
      const items = optionsList.querySelectorAll('.dropdown-option-item');
      items.forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(term) ? 'block' : 'none';
      });
    });

    // Option selection
    optionsList.addEventListener('click', (e) => {
      const item = e.target.closest('.dropdown-option-item');
      if (!item) return;
      const val = item.getAttribute('data-value');
      selectedText.textContent = val;
      hiddenInput.value = val;
      menu.classList.remove('open');
      clearError(config.triggerId, errId);
    });
  }

  // Initialize Searchable Dropdowns
  setupSearchableDropdown({
    triggerId: 'area-trigger',
    menuId: 'area-menu',
    searchInputId: 'area-search-input',
    optionsListId: 'area-options-list',
    selectedTextId: 'area-selected-text',
    hiddenInputId: 'new-branch-area',
    errId: 'err-new-branch-area'
  });

  setupSearchableDropdown({
    triggerId: 'branch-trigger',
    menuId: 'branch-menu',
    searchInputId: 'branch-search-input',
    optionsListId: 'branch-options-list',
    selectedTextId: 'branch-selected-text',
    hiddenInputId: 'new-branch-name',
    errId: 'err-new-branch-name'
  });

  setupSearchableDropdown({
    triggerId: 'city-trigger',
    menuId: 'city-menu',
    searchInputId: 'city-search-input',
    optionsListId: 'city-options-list',
    selectedTextId: 'city-selected-text',
    hiddenInputId: 'exist-city',
    errId: 'err-exist-city'
  });

  setupSearchableDropdown({
    triggerId: 'exist-branch-trigger',
    menuId: 'exist-branch-menu',
    searchInputId: 'exist-branch-search-input',
    optionsListId: 'exist-branch-options-list',
    selectedTextId: 'exist-branch-selected-text',
    hiddenInputId: 'exist-branch',
    errId: 'err-exist-branch'
  });

  // Close dropdowns on click outside
  document.addEventListener('click', () => {
    document.querySelectorAll('.dropdown-menu').forEach(m => m.classList.remove('open'));
  });

  // ==========================================
  // 7. DYNAMIC EMAIL MANDATORY VALIDATION LOGIC
  // ==========================================
  const chkEmailNew = document.getElementById('chk-email');
  const inputEmailNew = document.getElementById('new-email');
  const badgeEmailNew = document.getElementById('email-req-badge');

  if (chkEmailNew && inputEmailNew) {
    chkEmailNew.addEventListener('change', () => {
      if (chkEmailNew.checked) {
        badgeEmailNew.textContent = '(Mandatory — Email selected)';
        badgeEmailNew.style.color = 'var(--boa-gold-dark)';
        badgeEmailNew.style.fontWeight = '700';
      } else {
        badgeEmailNew.textContent = '(Optional)';
        badgeEmailNew.style.color = 'var(--text-muted)';
        badgeEmailNew.style.fontWeight = '400';
        clearError('new-email', 'err-new-email');
      }
    });
  }

  const chkEmailExist = document.getElementById('exist-chk-email');
  const inputEmailExist = document.getElementById('exist-email');
  const badgeEmailExist = document.getElementById('exist-email-req-badge');

  if (chkEmailExist && inputEmailExist) {
    chkEmailExist.addEventListener('change', () => {
      if (chkEmailExist.checked) {
        badgeEmailExist.textContent = '(Mandatory — Email selected)';
        badgeEmailExist.style.color = 'var(--boa-gold-dark)';
        badgeEmailExist.style.fontWeight = '700';
      } else {
        badgeEmailExist.textContent = '(Optional)';
        badgeEmailExist.style.color = 'var(--text-muted)';
        badgeEmailExist.style.fontWeight = '400';
        clearError('exist-email', 'err-exist-email');
      }
    });
  }

  // Dynamic CRM Mobile Banking Input Status
  const chkNeedMb = document.getElementById('chk-need-mb');
  const crmMbInput = document.getElementById('crm-mb-input');
  if (chkNeedMb && crmMbInput) {
    chkNeedMb.addEventListener('change', () => {
      if (chkNeedMb.checked) {
        crmMbInput.value = 'Mobile Banking (Requested)';
        crmMbInput.style.opacity = '1';
      } else {
        crmMbInput.value = 'Mobile Banking (Optional)';
        crmMbInput.style.opacity = '0.65';
      }
    });
  }

  // Validation helper regex
  const mobileRegex = /^(\+251|0)?[97]\d{8}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // ==========================================
  // 8. FORM STEP 1 -> STEP 2 VALIDATION & STEPPER
  // ==========================================
  const newStep1 = document.getElementById('new-form-step-1');
  const newStep2 = document.getElementById('new-form-step-2');
  const btnNewNext = document.getElementById('btn-new-step1-next');
  const btnNewPrev = document.getElementById('btn-new-step2-prev');

  if (btnNewNext) {
    btnNewNext.addEventListener('click', () => {
      let isValid = true;

      const fullName = document.getElementById('new-fullname').value.trim();
      if (!fullName || fullName.length < 2) {
        showError('new-fullname', 'err-new-fullname', 'Please enter your full name');
        isValid = false;
      } else {
        clearError('new-fullname', 'err-new-fullname');
      }

      const mobile = document.getElementById('new-mobile').value.trim();
      if (!mobile || !mobileRegex.test(mobile)) {
        showError('new-mobile', 'err-new-mobile', 'Enter a valid mobile number (e.g. 0911111111 or +251911111111)');
        isValid = false;
      } else {
        clearError('new-mobile', 'err-new-mobile');
      }

      const natId = document.getElementById('new-national-id').value.trim();
      if (!natId || natId.length !== 16 || !/^\d{16}$/.test(natId)) {
        showError('new-national-id', 'err-new-national-id', 'National ID FCN must be exactly 16 numeric digits');
        isValid = false;
      } else {
        clearError('new-national-id', 'err-new-national-id');
      }

      const area = document.getElementById('new-branch-area').value;
      if (!area) {
        showError('area-trigger', 'err-new-branch-area', 'Please select a nearby branch area');
        isValid = false;
      } else {
        clearError('area-trigger', 'err-new-branch-area');
      }

      const branch = document.getElementById('new-branch-name').value;
      if (!branch) {
        showError('branch-trigger', 'err-new-branch-name', 'Please select a branch name');
        isValid = false;
      } else {
        clearError('branch-trigger', 'err-new-branch-name');
      }

      if (isValid && newStep1 && newStep2) {
        newStep1.style.display = 'none';
        newStep2.style.display = 'block';
        newStep2.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }

  if (btnNewPrev) {
    btnNewPrev.addEventListener('click', () => {
      if (newStep1 && newStep2) {
        newStep2.style.display = 'none';
        newStep1.style.display = 'block';
        newStep1.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }

  // Existing Customer Step Navigation & Validation
  const existStep1 = document.getElementById('exist-form-step-1');
  const existStep2 = document.getElementById('exist-form-step-2');
  const btnExistNext = document.getElementById('btn-exist-step1-next');
  const btnExistPrev = document.getElementById('btn-exist-step2-prev');

  if (btnExistNext) {
    btnExistNext.addEventListener('click', () => {
      let isValid = true;

      const fullName = document.getElementById('exist-fullname').value.trim();
      if (!fullName || fullName.length < 2) {
        showError('exist-fullname', 'err-exist-fullname', 'Please enter your full name');
        isValid = false;
      } else {
        clearError('exist-fullname', 'err-exist-fullname');
      }

      const account = document.getElementById('exist-account').value.trim();
      if (!account || account.length < 8) {
        showError('exist-account', 'err-exist-account', 'Please enter a valid BOA account number');
        isValid = false;
      } else {
        clearError('exist-account', 'err-exist-account');
      }

      const mobile = document.getElementById('exist-mobile').value.trim();
      if (!mobile || !mobileRegex.test(mobile)) {
        showError('exist-mobile', 'err-exist-mobile', 'Enter a valid mobile number (e.g. 0911111111 or +251911111111)');
        isValid = false;
      } else {
        clearError('exist-mobile', 'err-exist-mobile');
      }

      const city = document.getElementById('exist-city').value;
      if (!city) {
        showError('city-trigger', 'err-exist-city', 'Please select your city');
        isValid = false;
      } else {
        clearError('city-trigger', 'err-exist-city');
      }

      const branch = document.getElementById('exist-branch').value;
      if (!branch) {
        showError('exist-branch-trigger', 'err-exist-branch', 'Please select your branch name');
        isValid = false;
      } else {
        clearError('exist-branch-trigger', 'err-exist-branch');
      }

      if (isValid && existStep1 && existStep2) {
        existStep1.style.display = 'none';
        existStep2.style.display = 'block';
        existStep2.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }

  if (btnExistPrev) {
    btnExistPrev.addEventListener('click', () => {
      if (existStep1 && existStep2) {
        existStep2.style.display = 'none';
        existStep1.style.display = 'block';
        existStep1.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }

  // ==========================================
  // 9. FORM SUBMISSION VALIDATION & SUCCESS MODAL
  // ==========================================
  const modalOverlay = document.getElementById('success-modal');
  const btnCloseModal = document.getElementById('btn-close-modal');
  const modalRefCode = document.getElementById('modal-ref-code');

  if (newCustomerForm) {
    newCustomerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Validate Gender
      const gender = document.getElementById('new-gender').value;
      if (!gender) {
        showError('new-gender', 'err-new-gender', 'Please select gender');
        isValid = false;
      } else {
        clearError('new-gender', 'err-new-gender');
      }

      // Validate Communication Channel
      const commChannels = document.querySelectorAll('input[name="comm_channel"]:checked');
      if (commChannels.length === 0) {
        showError('', 'err-new-comm-channel', 'Please select at least one communication channel');
        isValid = false;
      } else {
        clearError('', 'err-new-comm-channel');
      }

      // Validate Email if checked
      if (chkEmailNew && chkEmailNew.checked) {
        const emailVal = inputEmailNew.value.trim();
        if (!emailVal || !emailRegex.test(emailVal)) {
          showError('new-email', 'err-new-email', 'Please enter a valid email address');
          isValid = false;
        } else {
          clearError('new-email', 'err-new-email');
        }
      }

      if (!isValid) return;

      if (modalRefCode) {
        const randomCode = '#BOA-' + Math.floor(100000 + Math.random() * 900000);
        modalRefCode.textContent = randomCode;
      }
      if (modalOverlay) {
        modalOverlay.classList.add('active');
      }
    });
  }

  if (existingCustomerForm) {
    existingCustomerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Validate Gender
      const gender = document.getElementById('exist-gender').value;
      if (!gender) {
        showError('exist-gender', 'err-exist-gender', 'Please select gender');
        isValid = false;
      } else {
        clearError('exist-gender', 'err-exist-gender');
      }

      // Validate Communication Channel
      const commChannels = document.querySelectorAll('input[name="exist_comm_channel"]:checked');
      if (commChannels.length === 0) {
        showError('', 'err-exist-comm-channel', 'Please select at least one communication channel');
        isValid = false;
      } else {
        clearError('', 'err-exist-comm-channel');
      }

      // Validate Email if checked
      if (chkEmailExist && chkEmailExist.checked) {
        const emailVal = inputEmailExist.value.trim();
        if (!emailVal || !emailRegex.test(emailVal)) {
          showError('exist-email', 'err-exist-email', 'Please enter a valid email address');
          isValid = false;
        } else {
          clearError('exist-email', 'err-exist-email');
        }
      }

      if (!isValid) return;

      if (modalRefCode) {
        const randomCode = '#BOA-' + Math.floor(100000 + Math.random() * 900000);
        modalRefCode.textContent = randomCode;
      }
      if (modalOverlay) {
        modalOverlay.classList.add('active');
      }
    });
  }

  if (btnCloseModal) {
    btnCloseModal.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
      resetToInitialScreening();
    });
  }
});
