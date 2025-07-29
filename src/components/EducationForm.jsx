import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Plus, Trash2, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import Input from './ui/input';
import Textarea from './ui/textarea';

const EducationForm = ({ data, onUpdate }) => {
  const education = data || [];

  const addEducation = () => {
    const newEducation = {
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
    };
    onUpdate([...education, newEducation]);
  };

  const updateEducation = (id, field, value) => {
    const updatedEducation = education.map(edu =>
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    onUpdate(updatedEducation);
  };

  const removeEducation = (id) => {
    const filteredEducation = education.filter(edu => edu.id !== id);
    onUpdate(filteredEducation);
  };

  const handleCurrentChange = (id, checked) => {
    updateEducation(id, 'current', checked);
    if (checked) {
      updateEducation(id, 'endDate', '');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Education</h2>
        <p className="text-white/70">Add your academic background and qualifications</p>
      </div>

      {/* Education List */}
      <AnimatePresence>
        {education.map((edu, index) => (
          <motion.div
            key={edu.id}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="glass-effect">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <GraduationCap className="w-5 h-5" />
                    <span>Education #{index + 1}</span>
                  </CardTitle>
                  <button
                    onClick={() => removeEducation(edu.id)}
                    className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                    title="Remove education"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Institution and Degree */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Institution"
                    value={edu.institution || ''}
                    onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                    placeholder="University of Example"
                    required
                  />
                  <Input
                    label="Degree"
                    value={edu.degree || ''}
                    onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                    placeholder="Bachelor of Science"
                    required
                  />
                </div>

                {/* Field of Study and Location */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Field of Study"
                    value={edu.field || ''}
                    onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                    placeholder="Computer Science"
                  />
                  <Input
                    label="Location"
                    value={edu.location || ''}
                    onChange={(e) => updateEducation(edu.id, 'location', e.target.value)}
                    placeholder="City, State/Country"
                  />
                </div>

                {/* Dates */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    label="Start Date"
                    type="date"
                    value={edu.startDate || ''}
                    onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                    required
                  />
                  <Input
                    label="End Date"
                    type="date"
                    value={edu.endDate || ''}
                    onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                    disabled={edu.current}
                    required={!edu.current}
                  />
                  <div className="flex items-center space-x-2 pt-6">
                    <input
                      type="checkbox"
                      id={`current-${edu.id}`}
                      checked={edu.current || false}
                      onChange={(e) => handleCurrentChange(edu.id, e.target.checked)}
                      className="w-4 h-4 text-blue-600 bg-white/20 border-white/30 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <label htmlFor={`current-${edu.id}`} className="text-sm text-white/90">
                      Currently studying here
                    </label>
                  </div>
                </div>

                {/* GPA */}
                <Input
                  label="GPA (Optional)"
                  value={edu.gpa || ''}
                  onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                  placeholder="3.8/4.0"
                  helperText="Include your GPA if it's 3.0 or higher"
                />

                {/* Description */}
                <Textarea
                  label="Description"
                  value={edu.description || ''}
                  onChange={(e) => updateEducation(edu.id, 'description', e.target.value)}
                  placeholder="Describe your academic achievements, relevant coursework, honors, or activities..."
                  rows={3}
                  helperText="Optional: Include honors, relevant coursework, or academic achievements"
                />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Add Education Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <button
          onClick={addEducation}
          className="w-full p-6 border-2 border-dashed border-white/30 rounded-xl hover:border-white/50 hover:bg-white/5 transition-all duration-200 group"
        >
          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors">
              <Plus className="w-6 h-6 text-white/70 group-hover:text-white" />
            </div>
            <div className="text-center">
              <p className="text-white font-medium">Add Education</p>
              <p className="text-white/60 text-sm">Add another degree or certification</p>
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
          <span>Education Tips</span>
        </h3>
        <ul className="text-white/70 text-sm space-y-1">
          <li>• List your most recent education first</li>
          <li>• Include relevant coursework for recent graduates</li>
          <li>• Add honors, awards, or academic achievements</li>
          <li>• Use the "Currently studying" checkbox for ongoing education</li>
        </ul>
      </motion.div>
    </motion.div>
  );
};

export default EducationForm; 