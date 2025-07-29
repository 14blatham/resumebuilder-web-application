import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Plus, Trash2, Calendar, MapPin, Plus as AddIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import Input from './ui/input';
import Textarea from './ui/textarea';

const ExperienceForm = ({ data, onUpdate }) => {
  const experience = data || [];

  const addExperience = () => {
    const newExperience = {
      id: Date.now(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      achievements: ['']
    };
    onUpdate([...experience, newExperience]);
  };

  const updateExperience = (id, field, value) => {
    const updatedExperience = experience.map(exp =>
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    onUpdate(updatedExperience);
  };

  const removeExperience = (id) => {
    const filteredExperience = experience.filter(exp => exp.id !== id);
    onUpdate(filteredExperience);
  };

  const handleCurrentChange = (id, checked) => {
    updateExperience(id, 'current', checked);
    if (checked) {
      updateExperience(id, 'endDate', '');
    }
  };

  const addAchievement = (experienceId) => {
    const updatedExperience = experience.map(exp =>
      exp.id === experienceId
        ? { ...exp, achievements: [...exp.achievements, ''] }
        : exp
    );
    onUpdate(updatedExperience);
  };

  const updateAchievement = (experienceId, achievementIndex, value) => {
    const updatedExperience = experience.map(exp =>
      exp.id === experienceId
        ? {
            ...exp,
            achievements: exp.achievements.map((achievement, index) =>
              index === achievementIndex ? value : achievement
            )
          }
        : exp
    );
    onUpdate(updatedExperience);
  };

  const removeAchievement = (experienceId, achievementIndex) => {
    const updatedExperience = experience.map(exp =>
      exp.id === experienceId
        ? {
            ...exp,
            achievements: exp.achievements.filter((_, index) => index !== achievementIndex)
          }
        : exp
    );
    onUpdate(updatedExperience);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Work Experience</h2>
        <p className="text-white/70">Detail your professional work history and achievements</p>
      </div>

      {/* Experience List */}
      <AnimatePresence>
        {experience.map((exp, index) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="glass-effect">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Briefcase className="w-5 h-5" />
                    <span>Experience #{index + 1}</span>
                  </CardTitle>
                  <button
                    onClick={() => removeExperience(exp.id)}
                    className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                    title="Remove experience"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Company and Position */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Company"
                    value={exp.company || ''}
                    onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                    placeholder="Company Name"
                    required
                  />
                  <Input
                    label="Position"
                    value={exp.position || ''}
                    onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                    placeholder="Job Title"
                    required
                  />
                </div>

                {/* Location */}
                <Input
                  label="Location"
                  value={exp.location || ''}
                  onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                  placeholder="City, State/Country"
                />

                {/* Dates */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    label="Start Date"
                    type="date"
                    value={exp.startDate || ''}
                    onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                    required
                  />
                  <Input
                    label="End Date"
                    type="date"
                    value={exp.endDate || ''}
                    onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                    disabled={exp.current}
                    required={!exp.current}
                  />
                  <div className="flex items-center space-x-2 pt-6">
                    <input
                      type="checkbox"
                      id={`current-${exp.id}`}
                      checked={exp.current || false}
                      onChange={(e) => handleCurrentChange(exp.id, e.target.checked)}
                      className="w-4 h-4 text-blue-600 bg-white/20 border-white/30 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <label htmlFor={`current-${exp.id}`} className="text-sm text-white/90">
                      Currently working here
                    </label>
                  </div>
                </div>

                {/* Job Description */}
                <Textarea
                  label="Job Description"
                  value={exp.description || ''}
                  onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                  placeholder="Describe your role, responsibilities, and key contributions..."
                  rows={3}
                  helperText="Provide a brief overview of your role and responsibilities"
                />

                {/* Achievements */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-white/90">Key Achievements</label>
                    <button
                      onClick={() => addAchievement(exp.id)}
                      className="btn-secondary flex items-center space-x-1 text-xs"
                    >
                      <AddIcon className="w-3 h-3" />
                      <span>Add Achievement</span>
                    </button>
                  </div>
                  
                  <AnimatePresence>
                    {exp.achievements.map((achievement, achievementIndex) => (
                      <motion.div
                        key={achievementIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.2 }}
                        className="flex space-x-2"
                      >
                        <div className="flex-1">
                          <Input
                            value={achievement}
                            onChange={(e) => updateAchievement(exp.id, achievementIndex, e.target.value)}
                            placeholder={`Achievement ${achievementIndex + 1}...`}
                            className="text-sm"
                          />
                        </div>
                        {exp.achievements.length > 1 && (
                          <button
                            onClick={() => removeAchievement(exp.id, achievementIndex)}
                            className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                            title="Remove achievement"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  
                  {exp.achievements.length === 0 && (
                    <div className="text-center py-4 text-white/50 text-sm">
                      No achievements added yet. Click "Add Achievement" to get started.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Add Experience Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <button
          onClick={addExperience}
          className="w-full p-6 border-2 border-dashed border-white/30 rounded-xl hover:border-white/50 hover:bg-white/5 transition-all duration-200 group"
        >
          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors">
              <Plus className="w-6 h-6 text-white/70 group-hover:text-white" />
            </div>
            <div className="text-center">
              <p className="text-white font-medium">Add Experience</p>
              <p className="text-white/60 text-sm">Add another job or position</p>
            </div>
          </div>
        </button>
      </motion.div>

      {/* Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-effect rounded-xl p-4"
      >
        <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
          <Calendar className="w-4 h-4" />
          <span>Experience Tips</span>
        </h3>
        <ul className="text-white/70 text-sm space-y-1">
          <li>• List your most recent experience first</li>
          <li>• Use action verbs to describe your achievements</li>
          <li>• Quantify your accomplishments when possible (e.g., "Increased sales by 25%")</li>
          <li>• Focus on relevant experience for your target role</li>
          <li>• Use the "Currently working" checkbox for your current job</li>
        </ul>
      </motion.div>
    </motion.div>
  );
};

export default ExperienceForm; 