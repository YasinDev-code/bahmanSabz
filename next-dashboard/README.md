# Next Dashboard

داشبورد مدیریتی با Next.js (16.1.6) و React (19.2.3) که با Chakra UI v3 استایل‌دهی شده است. صفحات کلیدی شامل صفحه ورود، کاربران و محصولات بوده و احراز هویت سمت کلاینت با localStorage انجام می‌شود.

## اجرای پروژه

- پیش‌نیاز: Node.js 20.x یا جدیدتر
- نصب و اجرا:

```bash
npm install
npm run dev
```

سپس در مرورگر به آدرس http://localhost:3000 بروید.

## صفحات و مسیرها

- /: صفحه اصلی با خوش‌آمدگویی، آواتار کاربر و دکمه‌های ناوبری به کاربران و محصولات. فایل: `src/app/page.tsx`
- /login: صفحه ورود با کنترل فعال/غیرفعال بودن دکمه بر اساس پر بودن ورودی‌ها. فایل: `src/app/login/page.tsx`
- /users: دریافت لیست کاربران از DummyJSON و نمایش در جدول Chakra. فایل: `src/app/users/page.tsx`
- /products: دریافت و نمایش محصولات با جدول Chakra. فایل: `src/app/products/page.tsx`

## احراز هویت و ذخیره‌سازی

- مدیریت توکن و کاربر در `src/utils/auth.ts` با توابع SSR-safe:
    - `getAccessToken`, `setAccessToken`
    - `getUser`, `setUser`
- برای جلوگیری از خطای Hydration، چک توکن و ریدایرکت در `useEffect` انجام می‌شود.

## نکات فنی Chakra UI v3

- استفاده از `colorPalette` به‌جای `colorScheme`
- جایگزینی کامپوننت‌های قدیمی با نسخه‌های جدید (مانند Group/InputElement در ورودی‌ها)
- Provider در `src/app/layout.tsx` پیکربندی شده است.

## الگوی جدول‌ها

- جدول‌ها با `Table.Root`, `Table.Header`, `Table.Row`, `Table.Cell` پیاده‌سازی شده‌اند.
- برای موبایل از `overflowX="auto"` استفاده شده تا اسکرول افقی داخلی فعال باشد.

## توسعه

- ویرایش فایل‌ها از مسیر `src/app/...` انجام می‌شود؛ تغییرات به‌صورت Hot Reload اعمال می‌گردد.
- توصیه امنیتی: از لاگ‌کردن مستقیم توکن‌ها خودداری کنید و کلیدها را در محیط امن نگه دارید.