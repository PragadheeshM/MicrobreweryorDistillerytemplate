/* ============================================================
   Copper & Cask — Main JavaScript
   Microbrewery & Distillery Premium Template
   ============================================================ */

/* Theme initialization — runs immediately to prevent flash */
(function () {
  var saved = localStorage.getItem('cc-theme');
  if (saved) document.documentElement.setAttribute('data-theme', saved);
})();

(function () {
  'use strict';

  // ── Sticky Navbar ─────────────────────────────────────────
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
    // Trigger on load in case page is already scrolled
    if (window.scrollY > 50) navbar.classList.add('scrolled');
  }

  // ── Mobile Menu Toggle ────────────────────────────────────
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      const icon = mobileMenuBtn.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
      }
    });
  }
  // ── Dashboard Sidebar Toggle ─────────────────────────────
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const sidebar = document.querySelector('.dashboard-sidebar');

  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      sidebar.classList.toggle('open');
      const icon = sidebarToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
      }
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
      if (window.innerWidth < 1024 && sidebar.classList.contains('open') && !sidebar.contains(e.target) && e.target !== sidebarToggle) {
        sidebar.classList.remove('open');
        const icon = sidebarToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-times');
        }
      }
    });
  }
  // ── Mobile Dropdown Toggles ───────────────────────────────
  document.querySelectorAll('.mobile-dropdown-trigger').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      trigger.classList.toggle('open');
      const submenu = trigger.nextElementSibling;
      if (submenu) submenu.classList.toggle('open');
    });
  });

  // ── Desktop Dropdown (Click support for touch devices) ────
  document.querySelectorAll('.nav-dropdown').forEach((dropdown) => {
    const trigger = dropdown.querySelector('.nav-link');
    if (trigger) {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        // Close other dropdowns
        document.querySelectorAll('.nav-dropdown').forEach((d) => {
          if (d !== dropdown) d.classList.remove('open');
        });
        dropdown.classList.toggle('open');
      });
    }
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-dropdown')) {
      document.querySelectorAll('.nav-dropdown').forEach((d) => d.classList.remove('open'));
    }
  });

  // ── Scroll Reveal (IntersectionObserver) ──────────────────
  const revealElements = document.querySelectorAll('.fade-in, .slide-up, .slide-left, .slide-right, .scale-in, .stagger-children');

  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  }

  // ── Number Counter Animation ──────────────────────────────
  const counters = document.querySelectorAll('[data-counter]');

  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((el) => counterObserver.observe(el));
  }

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-counter'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const prefix = el.getAttribute('data-prefix') || '';
    const duration = 2000;
    const start = performance.now();

    function step(currentTime) {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out quad
      const eased = 1 - (1 - progress) * (1 - progress);
      const current = Math.floor(eased * target);

      el.textContent = prefix + current.toLocaleString() + suffix;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = prefix + target.toLocaleString() + suffix;
      }
    }

    requestAnimationFrame(step);
  }

  // ── Toast Notification System ─────────────────────────────
  window.showToast = function (type, title, message) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      document.body.appendChild(container);
    }

    const icons = {
      success: 'fa-circle-check',
      error: 'fa-circle-xmark',
      info: 'fa-circle-info',
    };

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <i class="fas ${icons[type] || icons.info} toast-icon"></i>
      <div class="toast-body">
        <div class="toast-title">${title}</div>
        <div class="toast-message">${message}</div>
      </div>
      <button class="toast-close" onclick="this.closest('.toast').remove()">
        <i class="fas fa-times"></i>
      </button>
    `;

    container.appendChild(toast);

    // Auto-remove after 3.5s
    setTimeout(() => {
      toast.classList.add('removing');
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  };

  // ── RTL / LTR Toggle ─────────────────────────────────────
  const rtlToggle = document.getElementById('rtl-toggle');
  const rtlToggleMobile = document.getElementById('rtl-toggle-mobile');

  function toggleRTL() {
    const html = document.documentElement;
    const isRTL = html.getAttribute('dir') === 'rtl';
    html.setAttribute('dir', isRTL ? 'ltr' : 'rtl');
  }

  if (rtlToggle) rtlToggle.addEventListener('click', toggleRTL);
  if (rtlToggleMobile) rtlToggleMobile.addEventListener('click', toggleRTL);

  // ── Dark / Light Mode Toggle ─────────────────────────────
  function getTheme() {
    return document.documentElement.getAttribute('data-theme') || 'light';
  }

  function toggleTheme() {
    var isDark = getTheme() === 'dark';
    var newTheme = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('cc-theme', newTheme);
    updateThemeIcons(newTheme === 'dark');
  }

  function updateThemeIcons(isDark) {
    document.querySelectorAll('.theme-icon').forEach(function (icon) {
      icon.className = 'fas ' + (isDark ? 'fa-sun' : 'fa-moon') + ' theme-icon';
    });
  }

  // Dynamically create and insert a theme toggle button next to a reference element
  function createThemeBtn(refEl, id, extraClass) {
    var btn = document.createElement('button');
    btn.id = id;
    btn.className = refEl.className; // Mirror the RTL button styling
    btn.title = 'Toggle Dark / Light Mode';
    var ic = getTheme() === 'dark' ? 'fa-sun' : 'fa-moon';
    btn.innerHTML = '<i class="fas ' + ic + ' theme-icon' + (extraClass ? ' ' + extraClass : '') + '"></i>';
    btn.addEventListener('click', toggleTheme);
    refEl.parentElement.insertBefore(btn, refEl);
    return btn;
  }

  // Attach listeners to any HARDCODED theme buttons
  const existingThemeBtn = document.getElementById('theme-toggle');
  if (existingThemeBtn) existingThemeBtn.addEventListener('click', toggleTheme);
  
  const existingThemeBtnMobile = document.getElementById('theme-toggle-mobile');
  if (existingThemeBtnMobile) existingThemeBtnMobile.addEventListener('click', toggleTheme);

  // Insert desktop theme toggle dynamically IF it doesn't already exist
  if (rtlToggle && !document.getElementById('theme-toggle')) {
    createThemeBtn(rtlToggle, 'theme-toggle', '');
  }

  // Insert mobile theme toggle dynamically IF it doesn't already exist
  if (rtlToggleMobile && !document.getElementById('theme-toggle-mobile')) {
    createThemeBtn(rtlToggleMobile, 'theme-toggle-mobile', 'text-sm');
  }

  // Floating toggle for pages without navbar / RTL toggle (404, coming-soon)
  if (!document.getElementById('theme-toggle')) {
    var fb = document.createElement('button');
    fb.id = 'theme-toggle';
    fb.className = 'fixed top-4 right-4 z-[60] w-11 h-11 rounded-xl flex items-center justify-center transition-all shadow-lg cursor-pointer backdrop-blur-md border';
    
    function updateFloatingBtnStyle(isDark) {
      if (isDark) {
        fb.classList.remove('bg-white', 'border-gray-200', 'text-primary');
        fb.classList.add('bg-white/15', 'border-white/10', 'text-white/70');
      } else {
        fb.classList.remove('bg-white/15', 'border-white/10', 'text-white/70');
        fb.classList.add('bg-white', 'border-gray-200', 'text-primary');
      }
    }
    
    fb.title = 'Toggle Dark / Light Mode';
    var fIcon = getTheme() === 'dark' ? 'fa-sun' : 'fa-moon';
    fb.innerHTML = '<i class="fas ' + fIcon + ' theme-icon"></i>';
    fb.addEventListener('click', toggleTheme);
    document.body.appendChild(fb);
    
    // Initial style
    updateFloatingBtnStyle(getTheme() === 'dark');
    
    // Listen for theme changes to update floating button
    const observer = new MutationObserver(() => updateFloatingBtnStyle(getTheme() === 'dark'));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  }

  // Sync icons on load (in case theme was pre-set)
  updateThemeIcons(getTheme() === 'dark');



  // ── Accordion / FAQ ───────────────────────────────────────
  document.querySelectorAll('.accordion-trigger').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.accordion-item');
      const isActive = item.classList.contains('active');

      // Close all siblings
      item.parentElement.querySelectorAll('.accordion-item').forEach((sibling) => {
        sibling.classList.remove('active');
      });

      // Toggle current
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // ── Mock Form Submission ──────────────────────────────────
  document.querySelectorAll('[data-mock-form]').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn ? btn.innerHTML : '';

      if (btn) {
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        btn.disabled = true;
      }

      setTimeout(() => {
        showToast('success', 'Submitted!', 'Your message has been received. We\'ll get back to you shortly.');
        form.reset();
        if (btn) {
          btn.innerHTML = originalText;
          btn.disabled = false;
        }
      }, 1500);
    });
  });

  // Auth forms
  document.querySelectorAll('[data-auth-form]').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn ? btn.innerHTML : '';
      const formType = form.getAttribute('data-auth-form');

      if (btn) {
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        btn.disabled = true;
      }

      setTimeout(() => {
        if (formType === 'login') {
          showToast('success', 'Welcome Back!', 'Login successful. Redirecting…');
        } else {
          showToast('success', 'Account Created!', 'Registration successful. Please check your email.');
        }
        form.reset();
        if (btn) {
          btn.innerHTML = originalText;
          btn.disabled = false;
        }
      }, 1500);
    });
  });

  // ── Countdown Timer (Coming Soon Page) ────────────────────
  const countdownEl = document.getElementById('countdown');
  if (countdownEl) {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 30); // 30 days from now

    function updateCountdown() {
      const now = new Date();
      const diff = targetDate - now;

      if (diff <= 0) {
        countdownEl.innerHTML = '<p class="text-2xl font-bold text-accent">We are live!</p>';
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      const daysEl = document.getElementById('cd-days');
      const hoursEl = document.getElementById('cd-hours');
      const minutesEl = document.getElementById('cd-minutes');
      const secondsEl = document.getElementById('cd-seconds');

      if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
      if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
      if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
      if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  // ── Gallery / Portfolio Filter ────────────────────────────
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-grid-item');

  if (filterBtns.length > 0 && galleryItems.length > 0) {
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        // Update active state
        filterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        galleryItems.forEach((item) => {
          if (filter === 'all' || item.getAttribute('data-category') === filter) {
            item.style.display = '';
            item.style.opacity = '0';
            item.style.transform = 'scale(0.9)';
            setTimeout(() => {
              item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 50);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.9)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 400);
          }
        });
      });
    });
  }

  // ── Parallax Shapes (subtle on mouse move) ────────────────
  const heroSection = document.querySelector('.hero-section');
  if (heroSection) {
    const shapes = heroSection.querySelectorAll('.parallax-shape');
    if (shapes.length > 0) {
      heroSection.addEventListener('mousemove', (e) => {
        const rect = heroSection.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        shapes.forEach((shape, i) => {
          const speed = (i + 1) * 15;
          shape.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
      });
    }
  }

  // ── Chart.js Initialization Helpers ───────────────────────
  // These will be called inline on dashboard pages

  window.initDoughnutChart = function (canvasId, labels, data, colors) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const textColor = isDark ? 'rgba(255, 255, 255, 0.7)' : '#666';

    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: colors,
            borderWidth: 0,
            hoverOffset: 8,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 20,
              usePointStyle: true,
              color: textColor,
              font: { family: 'Inter', size: 13 },
            },
          },
        },
      },
    });
  };

  window.initBarChart = function (canvasId, labels, data, color) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const textColor = isDark ? 'rgba(255, 255, 255, 0.7)' : '#666';
    const gridColor = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0,0,0,0.05)';

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Revenue ($)',
            data: data,
            backgroundColor: color || '#c17817',
            borderRadius: 8,
            borderSkipped: false,
            categoryPercentage: 0.8,
            barPercentage: 0.9,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: gridColor },
            ticks: { 
              color: textColor,
              font: { family: 'Inter', size: 11 } 
            },
          },
          x: {
            grid: { display: false },
            ticks: { 
              color: textColor,
              font: { family: 'Inter', size: 11 } 
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  };

  window.initPieChart = function (canvasId, labels, data, colors) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const textColor = isDark ? 'rgba(255, 255, 255, 0.7)' : '#666';

    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: colors,
            borderWidth: 2,
            borderColor: isDark ? '#1a1a2e' : '#fff',
            hoverOffset: 10,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 16,
              usePointStyle: true,
              color: textColor,
              font: { family: 'Inter', size: 13 },
            },
          },
        },
      },
    });
  };

  // ── Smooth Scroll for Anchor Links ────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        // Close mobile menu if open
        if (mobileMenu && mobileMenu.classList.contains('open')) {
          mobileMenu.classList.remove('open');
          const icon = mobileMenuBtn ? mobileMenuBtn.querySelector('i') : null;
          if (icon) {
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
          }
        }
      }
    });
  });

  // ── Active Nav Link Highlight ─────────────────────────────
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link, .mobile-link').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });

  // Dropdown links
  document.querySelectorAll('.dropdown-menu a, .mobile-sub-menu a').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.style.color = 'var(--color-accent)';
      // Also mark parent trigger as active
      const parent = link.closest('.nav-dropdown');
      if (parent) {
        const parentLink = parent.querySelector('.nav-link');
        if (parentLink) parentLink.classList.add('active');
      }
    }
  });
})();
