# Docs Request

Danh sách markdown cần có để Claude làm việc tốt trên project Control.
Quy ước: file ngắn (lý tưởng < 60 dòng), chỉ ghi điều luôn đúng, trỏ `file:line` thay vì dán code. Thêm file mới vào mục **Documentation** của `CLAUDE.md` kèm điều kiện đọc.

## Đã có
| File | Nội dung |
|---|---|
| `.claude/rule/architecture.md` | Cấu trúc folder, page anatomy, chỗ đặt state/animation |
| `.claude/rule/DESIGN.MD` | Token, component, motion, do/don't |

## MUST

### 1. `product.md`
- **Why:** `DESIGN.MD` nói app *trông* thế nào, không nói app *chạy* thế nào. Thiếu file này, mỗi lần sửa logic Claude phải đoán và dễ phá hành vi đã chốt.
- **What:**
  - Flow từng màn (quick-log đi đâu, scan thêm vào bữa nào, tạo/sửa buổi tập).
  - Luật nghiệp vụ: tick set → rest timer 2:00; calo/macro cộng từ nhật ký; ngày đã qua phải bấm "Sửa" mới tick; cân nặng 30–200 kg, 1 chữ số thập phân.
  - Đánh dấu mục nào suy từ prototype và chưa được xác nhận.
- **Đọc khi:** thêm/sửa tính năng hoặc logic của bất kỳ màn nào.

### 2. `data.md`
- **Why:** Dữ liệu hiện chỉ nằm trong bộ nhớ và neo vào ngày mẫu cố định. Bước tiếp theo (lưu thật, backend) cần một nguồn sự thật để không lệch hướng.
- **What:**
  - Các type chính (`src/types`) và ai giữ state nào (Tracker, Training, Preferences).
  - Quy ước ngày mẫu `15/08/2026` trong `src/lib/date.ts` và khi nào thay bằng ngày thật.
  - Kế hoạch lưu local-first (Dexie), schema dự kiến, và điểm sẽ đổi khi nối backend.
- **Đọc khi:** đụng tới state, type, lưu trữ, hoặc nối API.

### 3. `development.md`
- **Why:** Lệnh và quy trình kiểm tra đang nằm tạm trong `architecture.md`. Tách ra để chỉ nạp khi cần build/test, và để "xong việc" có định nghĩa rõ.
- **What:**
  - Lệnh: dev, typecheck, lint, build, preview; cách đổi port khi 5173 bận.
  - Definition of done: typecheck + lint sạch, xem màn trên trình duyệt ở light/dark và VI/EN.
  - Cách test PWA: dev đã bật PWA, cài app, xoá service worker khi đổi manifest/icon.
- **Đọc khi:** build/chạy lỗi, hoặc trước khi báo hoàn thành.

## GOOD TO HAVE

### 4. `troubleshooting.md`
- **Why:** Các lỗi đã gặp lặp lại được; ghi lại giúp khỏi debug lần hai.
- **What:** mỗi lỗi 2–3 dòng (triệu chứng → nguyên nhân → cách sửa). Đã biết: `color` global đè Tailwind; tên file có `(…)` cần quote; port 5173 bị chiếm; service worker giữ bản cũ.
- **Đọc khi:** gặp lỗi lạ sau khi đã xác định đúng phần liên quan. Chỉ thêm khi có lỗi mới.

### 5. `i18n.md`
- **Why:** Chữ hai ngôn ngữ đang viết inline `t('vi','en')`; khi số màn tăng cần quy ước thống nhất (giọng văn, thuật ngữ, số/ngày).
- **What:** giọng văn VI/EN, bảng thuật ngữ (set, volume, macro, "Tập"/"Train"), định dạng số và ngày, khi nào nên tách khỏi inline.
- **Đọc khi:** thêm hoặc đổi copy.

### 6. `motion.md`
- **Why:** Animation nằm rải ở `index.css` và nhiều component; spec gốc (`MOTION.md` trong design) đã bị dời đi. Cần một chỗ ghi cái gì chạy ở đâu.
- **What:** bảng animation → class → component dùng; đường cong; quy tắc chỉ animate `transform`/`opacity`; xử lý `prefers-reduced-motion`.
- **Đọc khi:** thêm/sửa chuyển động.

### 7. `pwa.md`
- **Why:** Cấu hình PWA (manifest, service worker, icon, nút cài) liên quan nhiều file; sửa sai dễ làm app giữ cache cũ hoặc mất khả năng cài.
- **What:** vị trí cấu hình, cách sinh icon, chiến lược cache, hành vi nút cài theo nền tảng (Chrome / iOS), cách phát hành bản mới.
- **Đọc khi:** đổi manifest, icon, cache, hoặc deploy.

### 8. `testing.md`
- **Why:** Chưa có test nào. Khi logic (timer, tính macro, ghi set) lớn lên cần quy ước từ đầu.
- **What:** công cụ chọn (vd. Vitest + Testing Library), cái gì đáng test (hook và hàm thuần trước), cách chạy.
- **Đọc khi:** thêm test hoặc sửa logic có rủi ro hồi quy.

### 9. `decisions.md`
- **Why:** Ghi lý do các quyết định khó đoán từ code (vì sao tính Sets/Volume từ set đã tick, vì sao ngày mẫu cố định, vì sao scan giả lập) để không bị "sửa lại cho đúng" nhầm.
- **What:** mỗi quyết định: bối cảnh → chọn gì → vì sao → khi nào xem lại.
- **Đọc khi:** định đổi một hành vi trông như "bất thường".

## Thứ tự đề xuất
`product.md` → `data.md` → `development.md`, sau đó thêm các file GOOD TO HAVE khi nhu cầu xuất hiện.
