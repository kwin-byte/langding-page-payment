# Landing Payment

Ứng dụng landing page **Next.js + Tailwind** với đăng nhập, trang ví chính (nạp / rút tiền) và tạo mã **Bakong KHQR** qua thư viện [`bakong-khqr`](https://www.npmjs.com/package/bakong-khqr).

## Tính năng

- **Đăng nhập** → chuyển tới `/dashboard`
- **Nạp tiền**: nhập số tiền, tạo QR KHQR (USD/KHR), quét bằng app ngân hàng Bakong
- **Kiểm tra thanh toán**: tự động poll mỗi 8s nếu có `BAKONG_TOKEN`
- **Rút tiền**: form demo (cần API ngân hàng thật cho production)

## Cài đặt

```bash
npm install
cp .env.local.example .env.local
# Chỉnh BAKONG_ACCOUNT, merchant name, token...
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000)

**Đăng nhập mặc định:** `admin` / `admin123` (đổi trong `.env.local`)

## Cấu hình Bakong

1. Đăng ký [Bakong Developer](https://developer.bakong.nbc.gov.kh/) lấy token
2. Điền `.env.local` (xem `.env.local.example`):
   - `BAKONG_API_TOKEN` — token developer Bakong
   - `BAKONG_ACCOUNT_ID` — ví nhận tiền (vd: `ten@bkrt`)
   - `BAKONG_API_URL` — base API (`https://api-bakong.nbc.gov.kh`)
   - `BAKONG_MERCHANT_NAME`, `BAKONG_MERCHANT_CITY`
   - `BAKONG_QR_EXPIRE_MINUTES`, `BAKONG_DEFAULT_CURRENCY`

## Cấu trúc

```
src/
  app/
    login/          # Trang đăng nhập
    dashboard/      # Nạp / rút tiền
    api/
      auth/         # login, logout
      khqr/         # deposit QR, check payment
      wallet/       # withdraw (demo)
  components/
  lib/
    auth.ts
    khqr.ts
```

## Lưu ý

- Node.js **>= 20.9** được khuyến nghị (Next.js 16)
- Rút tiền hiện chỉ ghi nhận yêu cầu — tích hợp chuyển khoản Bakong API khi triển khai thật
- Số dư trên UI là **demo trong trình duyệt**, không lưu database
