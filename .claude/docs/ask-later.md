# Ask later

Câu hỏi chưa phải nghiệp vụ — hỏi khi viết `data.md` / `development.md` hoặc khi cần triển khai. Mỗi mục có đề xuất mặc định (nếu chưa xác nhận thì dùng mặc định và ghi "chưa xác nhận").

## Dữ liệu và hạ tầng (cho `data.md`)
| # | Câu hỏi | Đề xuất mặc định |
|---|---|---|
| 15 | ✅ **Chốt:** backend NestJS (`Control-backend`) + **PostgreSQL**; Dexie làm kho cục bộ phía client. ORM: **TypeORM** | — |
| 16 | ✅ **Chốt:** offline-first, ghi vào Dexie trước rồi đồng bộ nền; xung đột: bản ghi mới hơn (`updatedAt`) thắng | — |
| 17 | ✅ **Chốt:** xuất JSON + CSV, nhập JSON (kiểm tra phiên bản schema trước khi ghi) | — |
| 18 | ✅ **Chốt:** onboarding hồ sơ (giới tính, tuổi, chiều cao, cân nặng, mức vận động, mục tiêu → TDEE + chọn preset macro) rồi vào app với màn trống có hướng dẫn nhẹ | — |

## Phát triển và phát hành (cho `development.md`)
| # | Câu hỏi | Đề xuất mặc định |
|---|---|---|
| 19 | ✅ **Chốt:** deploy lên **VPS / hosting riêng** (không dùng PaaS). PWA cần HTTPS — tự cấu hình chứng chỉ (Let's Encrypt) | — |
| 20 | ✅ **Chốt:** chỉ Vitest (hàm thuần + hook). Chưa làm Playwright | — |
| 21 | ✅ **Chốt:** chỉ commit khi người dùng yêu cầu; giữ nhánh `feat/...` | — |
| 22 | ✅ **Chốt:** cả hai, kiểm iPhone (Safari) trước | — |

## Đã chốt thêm (ngoài danh sách gốc)
- **Đăng nhập:** email + mật khẩu và Google; JWT access + refresh token (cookie httpOnly); khôi phục mật khẩu qua email.

## Còn mở
- Chi tiết VPS: hệ điều hành, reverse proxy (Nginx/Caddy), chạy BE bằng Docker hay PM2, Postgres cài trên VPS hay dịch vụ riêng, domain, backup — hỏi khi viết `development.md`.
