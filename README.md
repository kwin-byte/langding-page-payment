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

## Deploy Railway

Repo đã có `Dockerfile` + `railway.toml` (Node 20, Next.js standalone).

### Biến môi trường (Railway → Variables)

Thêm **từng biến** (không paste cả file `.env` vào một ô). Xem mẫu đầy đủ trong [`.env.example`](.env.example).

| Biến | Bắt buộc | Ghi chú |
|------|----------|---------|
| `AUTH_USERNAME` | Có | Tên đăng nhập |
| `AUTH_PASSWORD` | Có | Mật khẩu production |
| `SESSION_TOKEN` | Có | Chuỗi ngẫu nhiên dài (cookie session) |
| `BAKONG_API_TOKEN` | Có* | Token Bakong Developer |
| `BAKONG_ACCOUNT_ID` | Có | Ví nhận, vd `ten@bkrt` |
| `BAKONG_API_URL` | Khuyến nghị | `https://api-bakong.nbc.gov.kh` |
| `BAKONG_MERCHANT_NAME` | Khuyến nghị | Tên hiển thị trên QR |
| `BAKONG_MERCHANT_CITY` | Khuyến nghị | Thành phố trên QR |
| `BAKONG_QR_EXPIRE_MINUTES` | Không | Mặc định `15` |
| `BAKONG_DEFAULT_CURRENCY` | Không | `USD` hoặc `KHR` |

\* Không có token vẫn **build được**, nhưng kiểm tra thanh toán sẽ báo `UNAVAILABLE`.

### Lỗi build thường gặp

1. **Đặt `NODE_ENV=development`** trên Railway → gỡ biến này (Railway tự set production khi chạy).
2. **Sai tên biến** — dùng `BAKONG_API_TOKEN`, không phải `BAKONG_TOKEN` (alias vẫn hỗ trợ nhưng nên thống nhất).
3. **Paste cả khối `.env` vào một variable** — mỗi dòng phải là một biến riêng.
4. Xem log chi tiết: Railway → deployment → **View logs**.

Sau khi sửa Variables, bấm **Redeploy**.

## Lưu ý

- Node.js **>= 20.9** được khuyến nghị (Next.js 15)
- Rút tiền hiện chỉ ghi nhận yêu cầu — tích hợp chuyển khoản Bakong API khi triển khai thật
- Số dư trên UI là **demo trong trình duyệt**, không lưu database
