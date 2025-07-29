import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Settings, Eye, Edit3 } from 'lucide-react';
import useResumeData from './hooks/useResumeData';
import PersonalInfoForm from './components/PersonalInfoForm';
import ExperienceForm from './components/ExperienceForm';
import EducationForm from './components/EducationForm';
import SkillsForm from './components/SkillsForm';
import TemplateSelector from './components/TemplateSelector';
import ColorSchemeSelector from './components/ColorSchemeSelector';
import ResumePreview from './components/ResumePreview';
import PDFExport from './components/PDFExport';

function App() {
  const { resumeData, updateResumeData } = useResumeData();
  const [activeTab, setActiveTab] = useState('personal');
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: '👤' },
    { id: 'experience', label: 'Experience', icon: '💼' },
    { id: 'education', label: 'Education', icon: '🎓' },
    { id: 'skills', label: 'Skills', icon: '⚡' },
    { id: 'template', label: 'Template', icon: '🎨' },
    { id: 'colors', label: 'Colors', icon: '🎨' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal':
        return <PersonalInfoForm data={resumeData.personal} onUpdate={(data) => updateResumeData('personal', data)} />;
      case 'experience':
        return <ExperienceForm data={resumeData.experience} onUpdate={(data) => updateResumeData('experience', data)} />;
      case 'education':
        return <EducationForm data={resumeData.education} onUpdate={(data) => updateResumeData('education', data)} />;
      case 'skills':
        return <SkillsForm data={resumeData.skills} onUpdate={(data) => updateResumeData('skills', data)} />;
      case 'template':
        return <TemplateSelector data={resumeData.template} onUpdate={(data) => updateResumeData('template', data)} />;
      case 'colors':
        return <ColorSchemeSelector data={resumeData.colors} onUpdate={(data) => updateResumeData('colors', data)} />;
      default:
        return <PersonalInfoForm data={resumeData.personal} onUpdate={(data) => updateResumeData('personal', data)} />;
    }
  };

  return (
    <div className="min-h-screen gradient-bg">
      {/* Header */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-effect border-b border-white/20"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Edit3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Resume Builder</h1>
                <p className="text-white/70 text-sm">Create your professional resume</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsPreviewMode(!isPreviewMode)}
                className="btn-secondary flex items-center space-x-2"
              >
                {isPreviewMode ? <Edit3 className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                <span>{isPreviewMode ? 'Edit' : 'Preview'}</span>
              </button>
              
              <PDFExport resumeData={resumeData} />
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Editor Panel */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Tab Navigation */}
            <div className="glass-effect rounded-xl p-2">
              <div className="grid grid-cols-3 md:grid-cols-6 gap-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      activeTab === tab.id ? 'tab-active' : 'tab-inactive'
                    }`}
                  >
                    <div className="flex flex-col items-center space-y-1">
                      <span className="text-lg">{tab.icon}</span>
                      <span className="text-xs">{tab.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="glass-effect rounded-xl p-6"
            >
              {renderTabContent()}
            </motion.div>
          </motion.div>

          {/* Preview Panel */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="relative"
          >
            <div className="sticky top-8">
              <div className="glass-effect rounded-xl p-4 mb-4">
                <h3 className="text-white font-semibold mb-2">Live Preview</h3>
                <p className="text-white/70 text-sm">See your resume as you build it</p>
              </div>
              
              <div className="resume-shadow rounded-xl overflow-hidden">
                <ResumePreview data={resumeData} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="glass-effect border-t border-white/20 mt-16"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <p className="text-white/70 text-sm">
              © 2024 Resume Builder. Built with React & TailwindCSS
            </p>
            <div className="flex items-center space-x-4 text-white/70 text-sm">
              <span>Made with ❤️</span>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}

export default App; 