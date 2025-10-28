// تشغيل المعاينة عند أي تغيير
function runCurrentPreview() {
  const section = document.querySelector('.section.active');
  if (!section) return;

  let html = '', css = '', js = '';

  // جلب الكود من التبويب النشط
  const activeTab = section.querySelector('.tab-content.active textarea');
  if (!activeTab) return;

  // تحديد نوع القسم
  if (section.id === 'html') {
    html = activeTab.value;
  } else if (section.id === 'css') {
    css = `<style>${activeTab.value}</style>`;
    html = `<div class="box">مربع</div><div class="container"><div class="card">بطاقة 1</div><div class="card">بطاقة 2</div></div>`;
  } else if (section.id === 'js') {
    js = `<script>${activeTab.value}<\/script>`;
    html = `<h1>صفحة تجريبية</h1><p>اكتب كود JS أعلاه.</p>`;
  }

  const full = `<!DOCTYPE html><html><head>${css}</head><body>${html}${js}</body></html>`;
  const iframe = section.querySelector('iframe');
  iframe.srcdoc = full;
}

// تبديل الأقسام
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.section).classList.add('active');
    runCurrentPreview();
  });
});

// تبديل التبويبات داخل القسم
document.querySelectorAll('.tabs').forEach(tabContainer => {
  tabContainer.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      tabContainer.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      tabContainer.parentElement.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(btn.dataset.tab).classList.add('active');
      runCurrentPreview();
    });
  });
});

// تحديث فوري عند الكتابة
document.querySelectorAll('textarea').forEach(ta => {
  ta.addEventListener('input', runCurrentPreview);
});

// تشغيل أولي
runCurrentPreview();