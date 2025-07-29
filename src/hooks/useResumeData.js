import { useState, useEffect, useCallback } from 'react';

// Default resume data structure
const defaultResumeData = {
  personal: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    github: '',
    summary: '',
    profilePicture: null
  },
  experience: [
    {
      id: Date.now(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      achievements: ['']
    }
  ],
  education: [
    {
      id: Date.now(),
      institution: '',
      degree: '',
      field: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      gpa: '',
      description: ''
    }
  ],
  skills: {
    technical: [],
    soft: [],
    languages: [],
    certifications: []
  },
  projects: [
    {
      id: Date.now(),
      name: '',
      description: '',
      technologies: [],
      link: '',
      github: '',
      startDate: '',
      endDate: '',
      current: false
    }
  ],
  template: {
    name: 'modern',
    layout: 'single-column'
  },
  colors: {
    primary: '#3B82F6',
    secondary: '#1F2937',
    accent: '#10B981',
    background: '#FFFFFF',
    text: '#1F2937'
  },
            settings: {
            fontSize: 'medium',
            fontFamily: 'Arial, sans-serif',
            spacing: 'normal',
            showProfilePicture: true,
            showIcons: true
          }
};

// LocalStorage key
const STORAGE_KEY = 'resume-builder-data';

// Helper function to get data from localStorage
const getStoredData = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Merge with default data to ensure all fields exist
      return mergeWithDefaults(parsed);
    }
  } catch (error) {
    console.error('Error loading data from localStorage:', error);
  }
  return defaultResumeData;
};

// Helper function to merge stored data with defaults
const mergeWithDefaults = (storedData) => {
  const merged = { ...defaultResumeData };
  
  // Deep merge function
  const deepMerge = (target, source) => {
    for (const key in source) {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        target[key] = target[key] || {};
        deepMerge(target[key], source[key]);
      } else {
        target[key] = source[key];
      }
    }
  };
  
  deepMerge(merged, storedData);
  return merged;
};

// Helper function to save data to localStorage
const saveToStorage = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving data to localStorage:', error);
  }
};

const useResumeData = () => {
  const [resumeData, setResumeData] = useState(getStoredData);
  const [isLoading, setIsLoading] = useState(true);
  const [lastSaved, setLastSaved] = useState(null);

  // Initialize data on mount
  useEffect(() => {
    setIsLoading(false);
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (!isLoading) {
      saveToStorage(resumeData);
      setLastSaved(new Date());
    }
  }, [resumeData, isLoading]);

  // Update specific section of resume data
  const updateResumeData = useCallback((section, data) => {
    setResumeData(prev => ({
      ...prev,
      [section]: data
    }));
  }, []);

  // Update nested section (e.g., personal.firstName)
  const updateNestedData = useCallback((section, subsection, data) => {
    setResumeData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subsection]: data
      }
    }));
  }, []);

  // Add new item to array sections (experience, education, projects)
  const addItem = useCallback((section, item = null) => {
    setResumeData(prev => ({
      ...prev,
      [section]: [
        ...prev[section],
        item || { id: Date.now() }
      ]
    }));
  }, []);

  // Update specific item in array sections
  const updateItem = useCallback((section, id, data) => {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].map(item =>
        item.id === id ? { ...item, ...data } : item
      )
    }));
  }, []);

  // Remove item from array sections
  const removeItem = useCallback((section, id) => {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].filter(item => item.id !== id)
    }));
  }, []);

  // Add skill to skills section
  const addSkill = useCallback((category, skill) => {
    if (!skill.trim()) return;
    
    setResumeData(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        [category]: [...prev.skills[category], skill.trim()]
      }
    }));
  }, []);

  // Remove skill from skills section
  const removeSkill = useCallback((category, skillIndex) => {
    setResumeData(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        [category]: prev.skills[category].filter((_, index) => index !== skillIndex)
      }
    }));
  }, []);

  // Add achievement to experience
  const addAchievement = useCallback((experienceId) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp =>
        exp.id === experienceId
          ? { ...exp, achievements: [...exp.achievements, ''] }
          : exp
      )
    }));
  }, []);

  // Update achievement
  const updateAchievement = useCallback((experienceId, achievementIndex, value) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp =>
        exp.id === experienceId
          ? {
              ...exp,
              achievements: exp.achievements.map((achievement, index) =>
                index === achievementIndex ? value : achievement
              )
            }
          : exp
      )
    }));
  }, []);

  // Remove achievement
  const removeAchievement = useCallback((experienceId, achievementIndex) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp =>
        exp.id === experienceId
          ? {
              ...exp,
              achievements: exp.achievements.filter((_, index) => index !== achievementIndex)
            }
          : exp
      )
    }));
  }, []);

  // Reset all data to defaults
  const resetData = useCallback(() => {
    setResumeData(defaultResumeData);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  // Export data as JSON
  const exportData = useCallback(() => {
    const dataStr = JSON.stringify(resumeData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `resume-data-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }, [resumeData]);

  // Import data from JSON
  const importData = useCallback((jsonData) => {
    try {
      const parsed = JSON.parse(jsonData);
      const merged = mergeWithDefaults(parsed);
      setResumeData(merged);
      return { success: true };
    } catch (error) {
      console.error('Error importing data:', error);
      return { success: false, error: 'Invalid JSON format' };
    }
  }, []);

  // Get data statistics
  const getStats = useCallback(() => {
    return {
      experienceCount: resumeData.experience.length,
      educationCount: resumeData.education.length,
      projectCount: resumeData.projects.length,
      totalSkills: Object.values(resumeData.skills).flat().length,
      completionPercentage: calculateCompletionPercentage(resumeData)
    };
  }, [resumeData]);

  // Calculate completion percentage
  const calculateCompletionPercentage = (data) => {
    const sections = [
      { name: 'personal', weight: 0.2 },
      { name: 'experience', weight: 0.3 },
      { name: 'education', weight: 0.2 },
      { name: 'skills', weight: 0.15 },
      { name: 'projects', weight: 0.15 }
    ];

    let totalPercentage = 0;

    sections.forEach(section => {
      const sectionData = data[section.name];
      let sectionPercentage = 0;

      switch (section.name) {
        case 'personal':
          const personalFields = ['firstName', 'lastName', 'email', 'summary'];
          const filledPersonal = personalFields.filter(field => 
            sectionData[field] && sectionData[field].trim() !== ''
          ).length;
          sectionPercentage = (filledPersonal / personalFields.length) * 100;
          break;

        case 'experience':
          if (sectionData.length === 0) {
            sectionPercentage = 0;
          } else {
            const experienceFields = ['company', 'position', 'description'];
            const totalFields = sectionData.length * experienceFields.length;
            let filledFields = 0;
            
            sectionData.forEach(exp => {
              experienceFields.forEach(field => {
                if (exp[field] && exp[field].trim() !== '') {
                  filledFields++;
                }
              });
            });
            
            sectionPercentage = (filledFields / totalFields) * 100;
          }
          break;

        case 'education':
          if (sectionData.length === 0) {
            sectionPercentage = 0;
          } else {
            const educationFields = ['institution', 'degree', 'field'];
            const totalFields = sectionData.length * educationFields.length;
            let filledFields = 0;
            
            sectionData.forEach(edu => {
              educationFields.forEach(field => {
                if (edu[field] && edu[field].trim() !== '') {
                  filledFields++;
                }
              });
            });
            
            sectionPercentage = (filledFields / totalFields) * 100;
          }
          break;

        case 'skills':
          const totalSkills = Object.values(sectionData).flat().length;
          sectionPercentage = Math.min(totalSkills * 10, 100); // 10% per skill, max 100%
          break;

        case 'projects':
          if (sectionData.length === 0) {
            sectionPercentage = 0;
          } else {
            const projectFields = ['name', 'description'];
            const totalFields = sectionData.length * projectFields.length;
            let filledFields = 0;
            
            sectionData.forEach(project => {
              projectFields.forEach(field => {
                if (project[field] && project[field].trim() !== '') {
                  filledFields++;
                }
              });
            });
            
            sectionPercentage = (filledFields / totalFields) * 100;
          }
          break;
      }

      totalPercentage += sectionPercentage * section.weight;
    });

    return Math.round(totalPercentage);
  };

  return {
    resumeData,
    isLoading,
    lastSaved,
    updateResumeData,
    updateNestedData,
    addItem,
    updateItem,
    removeItem,
    addSkill,
    removeSkill,
    addAchievement,
    updateAchievement,
    removeAchievement,
    resetData,
    exportData,
    importData,
    getStats
  };
};

export default useResumeData; 