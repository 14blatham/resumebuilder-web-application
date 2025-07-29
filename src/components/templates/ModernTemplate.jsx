import React from 'react';
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Calendar, MapPin as LocationIcon } from 'lucide-react';
import InlineEditor from '../ui/InlineEditor';

const ModernTemplate = ({ 
  personal, 
  experience, 
  education, 
  skills, 
  projects, 
  colors, 
  settings,
  getFullName, 
  getContactInfo, 
  formatDate,
  onInlineEdit
}) => {
  const contactInfo = getContactInfo();

  return (
    <div style={{ color: colors.text }}>
      {/* Header */}
      <div 
        className="p-8 text-white"
        style={{ backgroundColor: colors.primary }}
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">
            <InlineEditor
              value={getFullName()}
              onSave={onInlineEdit}
              field="firstName"
              section="personal"
              placeholder="Your Name"
              className="text-4xl font-bold"
            />
          </h1>
          {personal.summary && (
            <p className="text-lg opacity-90 max-w-2xl leading-relaxed">
              <InlineEditor
                value={personal.summary}
                onSave={onInlineEdit}
                field="summary"
                section="personal"
                placeholder="Professional summary..."
                className="text-lg opacity-90"
                multiline={true}
              />
            </p>
          )}
          
          {/* Contact Information */}
          {contactInfo.length > 0 && (
            <div className="flex flex-wrap gap-4 mt-6">
              {contactInfo.map((contact, index) => {
                const Icon = contact.icon;
                return (
                  <div key={index} className="flex items-center space-x-2">
                    <Icon className="w-4 h-4 opacity-80" />
                    <InlineEditor
                      value={contact.value}
                      onSave={onInlineEdit}
                      field={contact.type}
                      section="personal"
                      placeholder={contact.type}
                      className="text-sm opacity-90"
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-8">
        {/* Experience Section */}
        {experience.length > 0 && (
          <section className="mb-8">
            <h2 
              className="text-2xl font-bold mb-6 pb-2 border-b-2"
              style={{ borderColor: colors.primary }}
            >
              Professional Experience
            </h2>
            <div className="space-y-6">
              {experience.map((exp, index) => (
                <div key={exp.id || index} className="border-l-4 pl-6" style={{ borderColor: colors.primary }}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-semibold">
                        <InlineEditor
                          value={exp.position}
                          onSave={onInlineEdit}
                          field={`${index}.position`}
                          section="experience"
                          placeholder="Position"
                          className="text-xl font-semibold"
                        />
                      </h3>
                      <p className="text-lg font-medium opacity-80">
                        <InlineEditor
                          value={exp.company}
                          onSave={onInlineEdit}
                          field={`${index}.company`}
                          section="experience"
                          placeholder="Company"
                          className="text-lg font-medium opacity-80"
                        />
                      </p>
                    </div>
                    <div className="text-right text-sm opacity-70">
                      <div>{formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}</div>
                      {exp.location && <div className="flex items-center justify-end mt-1">
                        <LocationIcon className="w-3 h-3 mr-1" />
                        <InlineEditor
                          value={exp.location}
                          onSave={onInlineEdit}
                          field={`${index}.location`}
                          section="experience"
                          placeholder="Location"
                          className="text-sm opacity-70"
                        />
                      </div>}
                    </div>
                  </div>
                  {exp.description && (
                    <p className="text-gray-700 mb-3 leading-relaxed">
                      <InlineEditor
                        value={exp.description}
                        onSave={onInlineEdit}
                        field={`${index}.description`}
                        section="experience"
                        placeholder="Job description..."
                        className="text-gray-700 leading-relaxed"
                        multiline={true}
                      />
                    </p>
                  )}
                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      {exp.achievements.map((achievement, idx) => (
                        achievement.trim() && (
                          <li key={idx} className="text-sm">
                            <InlineEditor
                              value={achievement}
                              onSave={onInlineEdit}
                              field={`${index}.achievements.${idx}`}
                              section="experience"
                              placeholder="Achievement..."
                              className="text-sm"
                            />
                          </li>
                        )
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education Section */}
        {education.length > 0 && (
          <section className="mb-8">
            <h2 
              className="text-2xl font-bold mb-6 pb-2 border-b-2"
              style={{ borderColor: colors.primary }}
            >
              Education
            </h2>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <div key={edu.id || index} className="border-l-4 pl-6" style={{ borderColor: colors.primary }}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-semibold">
                        <InlineEditor
                          value={edu.degree}
                          onSave={onInlineEdit}
                          field={`${index}.degree`}
                          section="education"
                          placeholder="Degree"
                          className="text-xl font-semibold"
                        />
                      </h3>
                      <p className="text-lg font-medium opacity-80">
                        <InlineEditor
                          value={edu.institution}
                          onSave={onInlineEdit}
                          field={`${index}.institution`}
                          section="education"
                          placeholder="Institution"
                          className="text-lg font-medium opacity-80"
                        />
                      </p>
                      {edu.field && <p className="text-sm opacity-70">
                        <InlineEditor
                          value={edu.field}
                          onSave={onInlineEdit}
                          field={`${index}.field`}
                          section="education"
                          placeholder="Field of study"
                          className="text-sm opacity-70"
                        />
                      </p>}
                    </div>
                    <div className="text-right text-sm opacity-70">
                      <div>{formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}</div>
                      {edu.gpa && <div>GPA: 
                        <InlineEditor
                          value={edu.gpa}
                          onSave={onInlineEdit}
                          field={`${index}.gpa`}
                          section="education"
                          placeholder="GPA"
                          className="text-sm opacity-70"
                        />
                      </div>}
                    </div>
                  </div>
                  {edu.description && (
                    <p className="text-gray-700 leading-relaxed">
                      <InlineEditor
                        value={edu.description}
                        onSave={onInlineEdit}
                        field={`${index}.description`}
                        section="education"
                        placeholder="Education description..."
                        className="text-gray-700 leading-relaxed"
                        multiline={true}
                      />
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills Section */}
        {(skills.technical?.length > 0 || skills.soft?.length > 0 || skills.languages?.length > 0) && (
          <section className="mb-8">
            <h2 
              className="text-2xl font-bold mb-6 pb-2 border-b-2"
              style={{ borderColor: colors.primary }}
            >
              Skills
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {skills.technical?.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3" style={{ color: colors.primary }}>
                    Technical Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.technical.map((skill, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 text-sm rounded-full text-white"
                        style={{ backgroundColor: colors.primary }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {skills.soft?.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3" style={{ color: colors.primary }}>
                    Soft Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.soft.map((skill, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 text-sm rounded-full text-white"
                        style={{ backgroundColor: colors.secondary }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {skills.languages?.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3" style={{ color: colors.primary }}>
                    Languages
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.languages.map((language, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 text-sm rounded-full text-white"
                        style={{ backgroundColor: colors.accent }}
                      >
                        {language}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Projects Section */}
        {projects.length > 0 && (
          <section className="mb-8">
            <h2 
              className="text-2xl font-bold mb-6 pb-2 border-b-2"
              style={{ borderColor: colors.primary }}
            >
              Projects
            </h2>
            <div className="space-y-6">
              {projects.map((project, index) => (
                <div key={project.id || index} className="border-l-4 pl-6" style={{ borderColor: colors.primary }}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-semibold">{project.name || 'Project Name'}</h3>
                      {project.technologies?.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {project.technologies.map((tech, idx) => (
                            <span 
                              key={idx}
                              className="px-2 py-1 text-xs rounded-full text-white"
                              style={{ backgroundColor: colors.secondary }}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="text-right text-sm opacity-70">
                      <div>{formatDate(project.startDate)} - {project.current ? 'Present' : formatDate(project.endDate)}</div>
                    </div>
                  </div>
                  {project.description && (
                    <p className="text-gray-700 leading-relaxed">{project.description}</p>
                  )}
                  {(project.link || project.github) && (
                    <div className="flex gap-4 mt-3">
                      {project.link && (
                        <a 
                          href={project.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm flex items-center space-x-1"
                          style={{ color: colors.primary }}
                        >
                          <Globe className="w-3 h-3" />
                          <span>Live Demo</span>
                        </a>
                      )}
                      {project.github && (
                        <a 
                          href={project.github} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm flex items-center space-x-1"
                          style={{ color: colors.primary }}
                        >
                          <Github className="w-3 h-3" />
                          <span>GitHub</span>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ModernTemplate; 