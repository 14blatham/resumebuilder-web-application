import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Plus, Lightbulb, Languages, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import Input from './ui/input';
import { Badge, BadgeGroup } from './ui/badge';

const SkillsForm = ({ data, onUpdate }) => {
  const [newSkill, setNewSkill] = useState('');
  const [activeCategory, setActiveCategory] = useState('technical');
  
  const skills = data || {
    technical: [],
    soft: [],
    languages: [],
    certifications: []
  };

  const categories = [
    {
      id: 'technical',
      name: 'Technical Skills',
      icon: Zap,
      description: 'Programming languages, tools, and technologies',
      placeholder: 'e.g., React, Python, AWS'
    },
    {
      id: 'soft',
      name: 'Soft Skills',
      icon: Lightbulb,
      description: 'Interpersonal and professional skills',
      placeholder: 'e.g., Leadership, Communication'
    },
    {
      id: 'languages',
      name: 'Languages',
      icon: Languages,
      description: 'Spoken and written languages',
      placeholder: 'e.g., English, Spanish, French'
    },
    {
      id: 'certifications',
      name: 'Certifications',
      icon: Award,
      description: 'Professional certifications and licenses',
      placeholder: 'e.g., AWS Certified, PMP'
    }
  ];

  const addSkill = (category) => {
    const skill = newSkill.trim();
    if (!skill) return;

    const updatedSkills = {
      ...skills,
      [category]: [...(skills[category] || []), skill]
    };
    onUpdate(updatedSkills);
    setNewSkill('');
  };

  const removeSkill = (category, skillIndex) => {
    const updatedSkills = {
      ...skills,
      [category]: skills[category].filter((_, index) => index !== skillIndex)
    };
    onUpdate(updatedSkills);
  };

  const handleKeyPress = (e, category) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill(category);
    }
  };

  const getCurrentCategory = () => categories.find(cat => cat.id === activeCategory);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Skills & Certifications</h2>
        <p className="text-white/70">Showcase your professional skills and qualifications</p>
      </div>

      {/* Category Tabs */}
      <div className="glass-effect rounded-xl p-2">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;
            
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive ? 'tab-active' : 'tab-inactive'
                }`}
              >
                <div className="flex flex-col items-center space-y-1">
                  <Icon className="w-4 h-4" />
                  <span className="text-xs">{category.name}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Category Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                {(() => {
                  const Icon = getCurrentCategory().icon;
                  return <Icon className="w-5 h-5" />;
                })()}
                <span>{getCurrentCategory().name}</span>
              </CardTitle>
              <p className="text-white/70 text-sm">{getCurrentCategory().description}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Add Skill Input */}
              <div className="flex space-x-3">
                <div className="flex-1">
                  <Input
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e, activeCategory)}
                    placeholder={getCurrentCategory().placeholder}
                    label="Add Skill"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    onClick={() => addSkill(activeCategory)}
                    disabled={!newSkill.trim()}
                    className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add</span>
                  </button>
                </div>
              </div>

              {/* Skills Display */}
              {skills[activeCategory] && skills[activeCategory].length > 0 ? (
                <div>
                  <h4 className="text-white font-medium mb-3">Your {getCurrentCategory().name}</h4>
                  <BadgeGroup>
                    <AnimatePresence>
                      {skills[activeCategory].map((skill, index) => (
                        <motion.div
                          key={`${skill}-${index}`}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Badge
                            variant={activeCategory === 'technical' ? 'primary' : 
                                   activeCategory === 'soft' ? 'secondary' : 
                                   activeCategory === 'languages' ? 'success' : 'warning'}
                            removable
                            onRemove={() => removeSkill(activeCategory, index)}
                          >
                            {skill}
                          </Badge>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </BadgeGroup>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    {(() => {
                      const Icon = getCurrentCategory().icon;
                      return <Icon className="w-8 h-8 text-white/50" />;
                    })()}
                  </div>
                  <p className="text-white/60 text-sm">
                    No {getCurrentCategory().name.toLowerCase()} added yet
                  </p>
                  <p className="text-white/40 text-xs mt-1">
                    Start adding your skills above
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Skills Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-effect rounded-xl p-4"
      >
        <h3 className="text-white font-semibold mb-3">Skills Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <div key={category.id} className="text-center">
              <div className="text-2xl font-bold text-white mb-1">
                {skills[category.id]?.length || 0}
              </div>
              <div className="text-white/60 text-xs">{category.name}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-effect rounded-xl p-4"
      >
        <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
          <Lightbulb className="w-4 h-4" />
          <span>Skills Tips</span>
        </h3>
        <ul className="text-white/70 text-sm space-y-1">
          <li>• Focus on skills relevant to your target job</li>
          <li>• Include both technical and soft skills</li>
          <li>• Be specific (e.g., "React" instead of "JavaScript frameworks")</li>
          <li>• List languages you can speak, read, or write</li>
          <li>• Include relevant certifications and licenses</li>
        </ul>
      </motion.div>
    </motion.div>
  );
};

export default SkillsForm; 