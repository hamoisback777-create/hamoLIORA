# موقع الويب الجديد (docs/)

أضفت نسخة ثابتة من الموقع داخل مجلد `docs/` لعرض واجهة موقع احترافية وخلفية متحركة. الملفات المضافة:

- docs/index.html — الصفحة الرئيسية (RTL بالعربية)
- docs/styles.css — أنماط التصميم
- docs/script.js — رسوميات الخلفية (Canvas) ومعالجة بسيطة للنموذج

كيفية العرض:

1. عرض محليًا:
   - افتح الطرفية في مجلد المشروع
   - شغّل خادم بسيط: `npx http-server docs` أو `python -m http.server --directory docs 8000`
   - افتح http://localhost:8080 أو http://localhost:8000

2. على GitHub Pages:
   - اذهب إلى Settings → Pages في مستودع GitHub
   - اختر Source = "Deploy from a branch" → Branch = `main` → Folder = `/docs`
   - احفظ وستصبح الصفحة متاحة عادةً على: `https://hamoisback777-create.github.io/hamoLIORA/`

ملاحظات مستقبلية:
- لو تريد ربطها بباك اند (دفع، إدارة منتجات، تسجيل دخول) أقدر أضيف API endpoints أو أوجهك لبناء REST/GraphQL.
- أستطيع تحويلها إلى قالب React/Vue/Next.js لو تفضل SPA قابلة للتوسع.
