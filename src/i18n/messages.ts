import type { Locale } from "./locales";

export type MessageKey =
  | "header.nav.currency"
  | "header.nav.depositWithdraw"
  | "header.logout"
  | "header.loggingOut"
  | "login.badge"
  | "login.titleDeposit"
  | "login.titleQr"
  | "login.subtitle"
  | "login.heading"
  | "login.username"
  | "login.password"
  | "login.submit"
  | "login.submitting"
  | "login.demo"
  | "login.errorFailed"
  | "login.errorConnection"
  | "dashboard.titleYour"
  | "dashboard.titleWallet"
  | "dashboard.subtitle"
  | "dashboard.tabDeposit"
  | "dashboard.tabWithdraw"
  | "account.label"
  | "account.balance"
  | "deposit.amount"
  | "deposit.currency"
  | "deposit.generate"
  | "deposit.generating"
  | "deposit.errorCreate"
  | "deposit.errorQr"
  | "deposit.errorCheck"
  | "deposit.errorConnection"
  | "deposit.scanTitle"
  | "deposit.billNumber"
  | "deposit.scanHint"
  | "deposit.receive"
  | "deposit.expires"
  | "deposit.minutes"
  | "deposit.checkPayment"
  | "deposit.checking"
  | "deposit.status"
  | "deposit.statusPaid"
  | "deposit.statusUnavailable"
  | "deposit.statusPending"
  | "withdraw.amount"
  | "withdraw.available"
  | "withdraw.selectBank"
  | "withdraw.bankPlaceholder"
  | "withdraw.account"
  | "withdraw.accountPlaceholder"
  | "withdraw.submit"
  | "withdraw.processing"
  | "withdraw.errorSelectBank"
  | "withdraw.errorInsufficient"
  | "withdraw.errorFailed"
  | "withdraw.errorConnection"
  | "withdraw.demoNote"
  | "sideNav.intro"
  | "sideNav.wallet";

export type Messages = Record<MessageKey, string>;

const vi: Messages = {
  "header.nav.currency": "USD - KHR - KHQR",
  "header.nav.depositWithdraw": "Nạp / Rút",
  "header.logout": "Đăng xuất",
  "header.loggingOut": "...",
  "login.badge": "KHQR · Cambodia",
  "login.titleDeposit": "NẠP TIỀN ",
  "login.titleQr": "BẰNG QR",
  "login.subtitle":
    "Ví thanh toán thế hệ mới — quét mã KHQR qua app ngân hàng, nạp và rút nhanh chóng với giao diện cyber hiện đại.",
  "login.heading": "Đăng nhập",
  "login.username": "Tên đăng nhập",
  "login.password": "Mật khẩu",
  "login.submit": "Vào ví",
  "login.submitting": "Đang đăng nhập...",
  "login.demo": "Demo: admin / admin123",
  "login.errorFailed": "Đăng nhập thất bại",
  "login.errorConnection": "Không thể kết nối máy chủ",
  "dashboard.titleYour": "Ví tiền ",
  "dashboard.titleWallet": "của bạn",
  "dashboard.subtitle": "Nạp tiền qua mã QR KHQR hoặc rút về tài khoản bất kỳ.",
  "dashboard.tabDeposit": "Nạp tiền",
  "dashboard.tabWithdraw": "Rút tiền",
  "account.label": "Tài khoản",
  "account.balance": "Số dư ví",
  "deposit.amount": "Số tiền nạp",
  "deposit.currency": "Loại tiền",
  "deposit.generate": "Tạo mã QR Bakong",
  "deposit.generating": "Đang tạo QR...",
  "deposit.errorCreate": "Tạo QR thất bại",
  "deposit.errorQr": "Không thể tạo mã QR",
  "deposit.errorCheck": "Lỗi kiểm tra",
  "deposit.errorConnection": "Lỗi kết nối",
  "deposit.scanTitle": "Quét mã để nạp",
  "deposit.billNumber": "Mã HĐ:",
  "deposit.scanHint": "Quét bằng app ngân hàng hỗ trợ Bakong/KHQR.",
  "deposit.receive": "Nhận:",
  "deposit.expires": "Hết hạn sau",
  "deposit.minutes": "phút",
  "deposit.checkPayment": "Kiểm tra thanh toán",
  "deposit.checking": "Đang kiểm tra...",
  "deposit.status": "Trạng thái:",
  "deposit.statusPaid": " — Số dư đã cập nhật!",
  "deposit.statusUnavailable": "Dịch vụ kiểm tra chưa khả dụng",
  "deposit.statusPending": "Chưa thanh toán",
  "withdraw.amount": "Số tiền rút (USD)",
  "withdraw.available": "Số dư khả dụng:",
  "withdraw.selectBank": "Chọn ngân hàng",
  "withdraw.bankPlaceholder": "-- Chọn ngân hàng --",
  "withdraw.account": "Tài khoản ngân hàng nhận",
  "withdraw.accountPlaceholder": "Tài khoản ngân hàng nhận",
  "withdraw.submit": "Gửi yêu cầu rút",
  "withdraw.processing": "Đang xử lý...",
  "withdraw.errorSelectBank": "Vui lòng chọn ngân hàng",
  "withdraw.errorInsufficient": "Số dư không đủ",
  "withdraw.errorFailed": "Rút tiền thất bại",
  "withdraw.errorConnection": "Không thể gửi yêu cầu",
  "withdraw.demoNote": "Chế độ demo — cần API chuyển khoản thật cho production.",
  "sideNav.intro": "INTRO",
  "sideNav.wallet": "WALLET",
};

const en: Messages = {
  "header.nav.currency": "USD - KHR - KHQR",
  "header.nav.depositWithdraw": "Deposit / Withdraw",
  "header.logout": "Log out",
  "header.loggingOut": "...",
  "login.badge": "KHQR · Cambodia",
  "login.titleDeposit": "DEPOSIT ",
  "login.titleQr": "WITH QR",
  "login.subtitle":
    "Next-gen payment wallet — scan KHQR with your banking app for fast deposits and withdrawals in a modern cyber UI.",
  "login.heading": "Sign in",
  "login.username": "Username",
  "login.password": "Password",
  "login.submit": "Open wallet",
  "login.submitting": "Signing in...",
  "login.demo": "Demo: admin / admin123",
  "login.errorFailed": "Sign in failed",
  "login.errorConnection": "Cannot reach server",
  "dashboard.titleYour": "Your ",
  "dashboard.titleWallet": "wallet",
  "dashboard.subtitle": "Deposit via KHQR code or withdraw to any bank account.",
  "dashboard.tabDeposit": "Deposit",
  "dashboard.tabWithdraw": "Withdraw",
  "account.label": "Account",
  "account.balance": "Wallet balance",
  "deposit.amount": "Deposit amount",
  "deposit.currency": "Currency",
  "deposit.generate": "Generate Bakong QR",
  "deposit.generating": "Creating QR...",
  "deposit.errorCreate": "Failed to create QR",
  "deposit.errorQr": "Cannot create QR code",
  "deposit.errorCheck": "Check failed",
  "deposit.errorConnection": "Connection error",
  "deposit.scanTitle": "Scan to deposit",
  "deposit.billNumber": "Bill #:",
  "deposit.scanHint": "Scan with a bank app that supports Bakong/KHQR.",
  "deposit.receive": "Receive:",
  "deposit.expires": "Expires in",
  "deposit.minutes": "minutes",
  "deposit.checkPayment": "Check payment",
  "deposit.checking": "Checking...",
  "deposit.status": "Status:",
  "deposit.statusPaid": " — Balance updated!",
  "deposit.statusUnavailable": "Payment check unavailable",
  "deposit.statusPending": "Not paid yet",
  "withdraw.amount": "Withdraw amount (USD)",
  "withdraw.available": "Available balance:",
  "withdraw.selectBank": "Select bank",
  "withdraw.bankPlaceholder": "-- Select bank --",
  "withdraw.account": "Recipient bank account",
  "withdraw.accountPlaceholder": "Recipient bank account",
  "withdraw.submit": "Submit withdrawal",
  "withdraw.processing": "Processing...",
  "withdraw.errorSelectBank": "Please select a bank",
  "withdraw.errorInsufficient": "Insufficient balance",
  "withdraw.errorFailed": "Withdrawal failed",
  "withdraw.errorConnection": "Cannot send request",
  "withdraw.demoNote": "Demo mode — real transfer API required for production.",
  "sideNav.intro": "INTRO",
  "sideNav.wallet": "WALLET",
};

const km: Messages = {
  "header.nav.currency": "USD - KHR - KHQR",
  "header.nav.depositWithdraw": "ដាក់ប្រាក់ / ដកប្រាក់",
  "header.logout": "ចាកចេញ",
  "header.loggingOut": "...",
  "login.badge": "KHQR · Cambodia",
  "login.titleDeposit": "ដាក់ប្រាក់ ",
  "login.titleQr": "តាម QR",
  "login.subtitle":
    "កាបូបបង់ប្រាក់ថ្មី — ស្កេន KHQR តាមកម្មវិធីធនាគារ ដាក់ និងដកប្រាក់រហ័ស ជាមួយចំណុចប្រទាក់ cyber ទំនើប។",
  "login.heading": "ចូលប្រើ",
  "login.username": "ឈ្មោះអ្នកប្រើ",
  "login.password": "ពាក្យសម្ងាត់",
  "login.submit": "ចូលកាបូប",
  "login.submitting": "កំពុងចូល...",
  "login.demo": "Demo: admin / admin123",
  "login.errorFailed": "ចូលប្រើមិនបានជោគជ័យ",
  "login.errorConnection": "មិនអាចភ្ជាប់ម៉ាស៊ីនមេ",
  "dashboard.titleYour": "កាបូប ",
  "dashboard.titleWallet": "របស់អ្នក",
  "dashboard.subtitle": "ដាក់ប្រាក់តាម QR KHQR ឬដកទៅគណនីធនាគារណាមួយ។",
  "dashboard.tabDeposit": "ដាក់ប្រាក់",
  "dashboard.tabWithdraw": "ដកប្រាក់",
  "account.label": "គណនី",
  "account.balance": "សមតុល្យកាបូប",
  "deposit.amount": "ចំនួនដាក់",
  "deposit.currency": "រូបិយប័ណ្ណ",
  "deposit.generate": "បង្កើត QR Bakong",
  "deposit.generating": "កំពុងបង្កើត QR...",
  "deposit.errorCreate": "បង្កើត QR មិនបាន",
  "deposit.errorQr": "មិនអាចបង្កើត QR",
  "deposit.errorCheck": "ពិនិត្យមិនបាន",
  "deposit.errorConnection": "កំហុសភ្ជាប់",
  "deposit.scanTitle": "ស្កេនដើម្បីដាក់",
  "deposit.billNumber": "លេខវិក្កយបត្រ:",
  "deposit.scanHint": "ស្កេនដោយកម្មវិធីធនាគារដែលគាំទ្រ Bakong/KHQR។",
  "deposit.receive": "ទទួល:",
  "deposit.expires": "ផុតកំណត់ក្នុង",
  "deposit.minutes": "នាទី",
  "deposit.checkPayment": "ពិនិត្យការទូទាត់",
  "deposit.checking": "កំពុងពិនិត្យ...",
  "deposit.status": "ស្ថានភាព:",
  "deposit.statusPaid": " — សមតុល្យបានធ្វើបច្ចុប្បន្នភាព!",
  "deposit.statusUnavailable": "សេវាពិនិត្យមិនទាន់មាន",
  "deposit.statusPending": "មិនទាន់បង់",
  "withdraw.amount": "ចំនួនដក (USD)",
  "withdraw.available": "សមតុល្យអាចប្រើ:",
  "withdraw.selectBank": "ជ្រើសរើសធនាគារ",
  "withdraw.bankPlaceholder": "-- ជ្រើសរើសធនាគារ --",
  "withdraw.account": "គណនីធនាគារទទួល",
  "withdraw.accountPlaceholder": "គណនីធនាគារទទួល",
  "withdraw.submit": "ផ្ញើសំណើដក",
  "withdraw.processing": "កំពុងដំណើរការ...",
  "withdraw.errorSelectBank": "សូមជ្រើសរើសធនាគារ",
  "withdraw.errorInsufficient": "សមតុល្យមិនគ្រប់គ្រាន់",
  "withdraw.errorFailed": "ដកប្រាក់មិនបាន",
  "withdraw.errorConnection": "មិនអាចផ្ញើសំណើ",
  "withdraw.demoNote": "របៀប demo — ត្រូវការ API ផ្ទេរប្រាក់ពិតសម្រាប់ production។",
  "sideNav.intro": "INTRO",
  "sideNav.wallet": "WALLET",
};

export const messages: Record<Locale, Messages> = { vi, en, km };

export function translate(locale: Locale, key: MessageKey): string {
  return messages[locale][key];
}

/** Map API payment status codes to localized labels */
export function paymentStatusLabel(locale: Locale, status: string): string {
  if (status === "PAID") return "PAID";
  if (status === "UNAVAILABLE") return translate(locale, "deposit.statusUnavailable");
  if (status === "PENDING" || status === "UNPAID") {
    return translate(locale, "deposit.statusPending");
  }
  return status;
}
