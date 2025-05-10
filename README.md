# Text-to-Image Generation

A sleek, responsive Next.js app that turns text prompts into AI-generated images in seconds. Features a single-image loading placeholder, dark/light theme toggle, and mobile-first design—all wrapped in Tailwind CSS with clear college branding and credits.

## 🚀 Features

- **Real-time prompt input**  
  Type your description (e.g. “A futuristic cityscape at sunset”) and hit **Generate** to see the AI result in under 10 seconds.
- **Single-image loading placeholder**  
  Clean, animated skeleton shows exactly where your image will appear.
- **Dark / Light theme toggle**  
  Switch modes on the fly; preference is saved in `localStorage`.
- **Responsive, mobile-first design**  
  Flexible layouts and utility-first styling with Tailwind CSS.
- **Branding & credits**  
  College logo in the header, “Made by” in the bottom-right, mentor attribution in the footer.
- **Accessible interactions**  
  Keyboard-friendly, focus rings on inputs, and subtle button animations.

## 💻 Tech Stack

- [Next.js](https://nextjs.org/) (App Router + Client Components)  
- [React](https://reactjs.org/)  
- [Tailwind CSS](https://tailwindcss.com/)  
- [Lucide-React](https://lucide.dev/) for SVG icons  
- Custom API route (`/api/generate`) to your AI image service  
- `localStorage` for theme persistence  
- Custom `useToast` hook for in-app notifications

## 🛠️ Installation

1. **Clone the repo**  
   ```bash
   git clone https://github.com/punit029/Text-To-Image-Generation.git
   cd Text-To-Image-Generation


2. ## 🔧 Install Dependencies
    
       npm install

## ⚙️ Configure Environment

If your project uses environment variables:

Create a .env.local file:
cp .env.local.example .env.local
Add your AI service API key and other necessary configurations inside .env.local.

## ▶️ Run Locally

     npm run dev
Then open http://localhost:3000 in your browser.

## 🔮 Future Enhancements

Prompt history with re-run capability

Style presets (e.g., Oil painting, Pixel art, Watercolor)

Download & share buttons for generated images

Drag-and-drop inpainting with user-uploaded images

## 📚 Credits

© 2025 Global Institute of Technology, Jaipur

Mentor: Mr. Manish Kumar Jha

Made by: Punit Kumar · Tushar Sharma · Vinay Kumar Jha · Justin Tirkey

