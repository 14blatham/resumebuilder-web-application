import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Calendar } from 'lucide-react';
import ModernTemplate from './templates/ModernTemplate';
import ClassicTemplate from './templates/ClassicTemplate';
import CreativeTemplate from './templates/CreativeTemplate';

const ResumePreview = ({ data }) => {
  const {
    personal = {},
    experience = [],
    education = [],
    skills = {},
    projects = [],
    template = { name: 'modern' },
    colors = {
      primary: '#3B82F6',
      secondary: '#1F2937',
      accent: '#10B981',
      background: '#FFFFFF',
      text: '#1F2937'
    }
  } = data || {};

  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
  };

  // Helper function to get full name
  const getFullName = () => {
    const firstName = personal.firstName || '';
    const lastName = personal.lastName || '';
    return `${firstName} ${lastName}`.trim() || 'Your Name';
  };

  // Helper function to get contact info
  const getContactInfo = () => {
    const contacts = [];
    
    if (personal.email) {
      contacts.push({
        icon: Mail,
        value: personal.email,
        type: 'email'
      });
    }
    
    if (personal.phone) {
      contacts.push({
        icon: Phone,
        value: personal.phone,
        type: 'phone'
      });
    }
    
    if (personal.location) {
      contacts.push({
        icon: MapPin,
        value: personal.location,
        type: 'location'
      });
    }
    
    if (personal.website) {
      contacts.push({
        icon: Globe,
        value: personal.website,
        type: 'website'
      });
    }
    
    if (personal.linkedin) {
      contacts.push({
        icon: Linkedin,
        value: personal.linkedin,
        type: 'linkedin'
      });
    }
    
    if (personal.github) {
      contacts.push({
        icon: Github,
        value: personal.github,
        type: 'github'
      });
    }
    
    return contacts;
  };

  // Render template based on selection
  const renderTemplate = () => {
    const templateProps = {
      personal,
      experience,
      education,
      skills,
      projects,
      colors,
      getFullName,
      getContactInfo,
      formatDate
    };

    switch (template.name) {
      case 'modern':
        return <ModernTemplate {...templateProps} />;
      case 'classic':
        return <ClassicTemplate {...templateProps} />;
      case 'creative':
        return <CreativeTemplate {...templateProps} />;
      default:
        return <ModernTemplate {...templateProps} />;
    }
  };

  // Check if there's enough data to show a meaningful preview
  const hasMinimalData = () => {
    return personal.firstName || personal.lastName || personal.email || personal.summary;
  };

  if (!hasMinimalData()) {
    return (
      <div 
        className="w-full h-full min-h-[800px] bg-white rounded-lg shadow-lg flex items-center justify-center"
        style={{ backgroundColor: colors.background }}
      >
        <div className="text-center p-8">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-600 mb-2">
            Resume Preview
          </h3>
          <p className="text-gray-500 text-sm max-w-xs">
            Start filling in your information to see a live preview of your resume here
          </p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <div 
        className="w-full bg-white rounded-lg shadow-lg overflow-hidden"
        style={{ 
          backgroundColor: colors.background,
          color: colors.text
        }}
      >
        {renderTemplate()}
      </div>
      
      {/* Preview Footer */}
      <div className="mt-4 text-center">
        <p className="text-white/60 text-xs">
          This is how your resume will look when exported
        </p>
      </div>
    </motion.div>
  );
};

export default ResumePreview; 