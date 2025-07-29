# Resume Builder Web Application

A modern, responsive resume builder built with React, TailwindCSS, and Framer Motion. Create professional resumes with multiple templates and export them as PDFs.

## 🚀 Features

- **Multiple Templates**: Choose from Modern, Classic, and Creative designs
- **Real-time Preview**: See changes instantly as you build your resume
- **PDF Export**: Download your resume as a high-quality PDF
- **Color Customization**: Customize colors to match your style
- **Profile Picture Upload**: Add your photo to your resume
- **Local Storage**: Your data is automatically saved
- **Responsive Design**: Works perfectly on all devices
- **Modern UI**: Beautiful glass morphism design with smooth animations

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations
- **html2canvas & jsPDF** - PDF generation
- **Lucide React** - Beautiful icons

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/14blatham/resumebuilder-web-application.git
   cd resumebuilder-web-application
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🏗️ Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                 # Reusable UI components
│   │   ├── input.jsx
│   │   ├── textarea.jsx
│   │   ├── card.jsx
│   │   ├── badge.jsx
│   │   └── ...
│   ├── templates/          # Resume templates
│   │   ├── ModernTemplate.jsx
│   │   ├── ClassicTemplate.jsx
│   │   └── CreativeTemplate.jsx
│   ├── PersonalInfoForm.jsx
│   ├── ExperienceForm.jsx
│   ├── EducationForm.jsx
│   ├── SkillsForm.jsx
│   ├── TemplateSelector.jsx
│   ├── ColorSchemeSelector.jsx
│   ├── ResumePreview.jsx
│   └── PDFExport.jsx
├── hooks/
│   └── useResumeData.js    # State management hook
├── App.jsx                 # Main application component
├── main.jsx               # Application entry point
└── index.css              # Global styles
```

## 🎨 Templates

### Modern Template
- Clean, minimalist design
- Bold typography
- Professional color schemes
- Perfect for tech and creative industries

### Classic Template
- Traditional resume format
- Centered layout
- Timeless appeal
- Ideal for traditional industries

### Creative Template
- Two-column layout
- Colored sidebar
- Visual elements
- Great for designers and marketers

## 🎯 Usage

1. **Personal Information**: Fill in your basic details and upload a profile picture
2. **Experience**: Add your work history with achievements
3. **Education**: Include your academic background
4. **Skills**: Add technical, soft skills, languages, and certifications
5. **Template Selection**: Choose your preferred design
6. **Color Customization**: Adjust colors to match your style
7. **Preview**: Review your resume in real-time
8. **Export**: Download as PDF when ready

## 🔧 Customization

### Adding New Templates
1. Create a new template component in `src/components/templates/`
2. Add it to the template selector
3. Update the resume preview component

### Customizing Colors
- Modify the color schemes in `ColorSchemeSelector.jsx`
- Update the default colors in `useResumeData.js`

### Styling
- Global styles are in `src/index.css`
- Component-specific styles use TailwindCSS classes
- Custom animations are defined in `tailwind.config.js`

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones
- All modern browsers

## 🚀 Deployment

### Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy!

### Vercel
1. Import your GitHub repository
2. Vercel will automatically detect it's a Vite project
3. Deploy with default settings

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [TailwindCSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Lucide React](https://lucide.dev/) for beautiful icons
- [Vite](https://vitejs.dev/) for the fast build tool

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

Built with ❤️ by [Oliver Latham](https://github.com/14blatham) 