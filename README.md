# pdfcevir

**Free, 100% client-side PDF toolkit — no server, no uploads, no accounts.**

🔗 Live: [pdfcevir.vercel.app](https://pdfcevir.vercel.app)

Most free PDF tools upload your file to a server, process it there, and send back the result. pdfcevir does everything **in your browser** — your files never leave your device.

## Features

11 tools, all running locally via [pdf-lib](https://pdf-lib.js.org/) and [pdf.js](https://mozilla.github.io/pdf.js/):

- 📄 Image (JPG/PNG) → PDF
- 🗜️ PDF compression (3 quality levels)
- 📝 PDF → editable Word (.docx) text extraction
- 🔗 Merge PDFs
- ✂️ Split PDFs
- 🔄 Reorder / delete pages
- ↻ Rotate pages
- #️⃣ Add page numbers
- 🖼️ PDF → image (PNG/JPG)
- 💧 Add watermark
- 📱 HEIC → PDF/JPG (for iPhone photos)

## Why

- **Privacy first** — nothing is ever uploaded, not even briefly
- **No limits** — no file size caps, no usage quotas, no sign-up
- **Works offline** — installable as a PWA once loaded
- **Minimal stack** — plain HTML/CSS/JS, no framework, no build step

## Tech stack

- `pdf-lib` — creating/modifying PDFs (merge, split, rotate, watermark, page numbers)
- `pdf.js` — rendering and extracting content (PDF → image, PDF → Word text)
- `heic2any` — converting iPhone HEIC photos
- Hosted on Vercel

## Contributing

Issues and PRs are welcome. This project intentionally avoids frameworks and build tooling to stay lightweight and easy to audit — please keep contributions in the same spirit.

## License

MIT — see [LICENSE](LICENSE)
