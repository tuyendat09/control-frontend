# Ask later

Câu hỏi chưa phải nghiệp vụ — hỏi khi viết `data.md` / `development.md` hoặc khi cần triển khai. Mỗi mục có đề xuất mặc định (nếu chưa xác nhận thì dùng mặc định và ghi "chưa xác nhận").

## Dữ liệu và hạ tầng (cho `data.md`)
| # | Câu hỏi | Đề xuất mặc định |
|---|---|---|
| 15 | Lưu trữ: Dexie (máy) / localStorage / backend? Nếu backend: đã có API chưa, stack nào? | Backend + cache offline bằng Dexie |
| 16 | Đồng bộ nhiều thiết bị? Xung đột giải quyết thế nào? | Có; bản ghi mới hơn thắng (theo `updatedAt`) |
| 17 | Xuất/nhập: có nhập lại JSON, xuất CSV không? | Xuất JSON + CSV, nhập JSON |
| 18 | Người dùng mới thấy màn trống hay dữ liệu mẫu? | Màn trống + hướng dẫn nhẹ |

## Phát triển và phát hành (cho `development.md`)
| # | Câu hỏi | Đề xuất mặc định |
|---|---|---|
| 19 | Deploy ở đâu (Vercel / Netlify / server riêng)? PWA cần HTTPS | Vercel |
| 20 | Test: thêm Vitest (hàm thuần, hook) và Playwright (luồng chính)? "Xong việc" ngoài `tsc` + `lint` + xem trình duyệt còn gì? | Có cả hai; Vitest trước |
| 21 | Git: Claude được tạo commit/PR không? Giữ nhánh `feat/...`? | Claude chỉ commit khi được yêu cầu; giữ `feat/...` |
| 22 | Thiết bị chính: iPhone (Safari) hay Android (Chrome)? | Cả hai, kiểm iPhone trước |
