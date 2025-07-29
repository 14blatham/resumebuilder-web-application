import React from 'react';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

const ClassicTemplate = ({ 
  personal, 
  experience, 
  education, 
  skills, 
  projects, 
  colors, 
  getFullName, 
  getContactInfo, 
  formatDate 
}) => {
  const contactInfo = getContactInfo();

  return (
    <div className="font-serif max-w-4xl mx-auto p-8" style={{ color: colors.text }}>
      {/* Header */}
      <header className="text-center mb-8">
        <h1 
          className="text-4xl font-bold mb-4"
          style={{ color: colors.primary }}
        >
          {getFullName()}
        </h1>
        
        {/* Contact Information */}
        {contactInfo.length > 0 && (
          <div className="flex flex-wrap justify-center gap-6 mb-6">
            {contactInfo.map((contact, index) => {
              const Icon = contact.icon;
              return (
                <div key={index} className="flex items-center space-x-2">
                  <Icon className="w-4 h-4" style={{ color: colors.primary }} />
                  <span className="text-sm">{contact.value}</span>
                </div>
              );
            })}
          </div>
        )}
        
        {/* Summary */}
        {personal.summary && (
          <div className="border-t-2 border-b-2 py-4" style={{ borderColor: colors.primary }}>
            <p className="text-lg leading-relaxed max-w-3xl mx-auto">
              {personal.summary}
            </p>
          </div>
        )}
      </header>

      {/* Content */}
      <div className="space-y-8">
        {/* Experience Section */}
        {experience.length > 0 && (
          <section>
            <h2 
              className="text-2xl font-bold text-center mb-6 pb-2 border-b-2"
              style={{ borderColor: colors.primary }}
            >
              PROFESSIONAL EXPERIENCE
            </h2>
            <div className="space-y-6">
              {experience.map((exp, index) => (
                <div key={exp.id || index} className="text-center">
                  <div className="mb-3">
                    <h3 className="text-xl font-bold">{exp.position || 'Position'}</h3>
                    <p className="text-lg font-semibold" style={{ color: colors.primary }}>
                      {exp.company || 'Company'}
                    </p>
                    <p className="text-sm opacity-70">
                      {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                      {exp.location && ` • ${exp.location}`}
                    </p>
                  </div>
                  
                  {exp.description && (
                    <p className="text-gray-700 mb-3 leading-relaxed max-w-3xl mx-auto">
                      {exp.description}
                    </p>
                  )}
                  
                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul className="list-disc list-inside space-y-1 text-gray-700 max-w-2xl mx-auto text-left">
                      {exp.achievements.map((achievement, idx) => (
                        achievement.trim() && (
                          <li key={idx} className="text-sm">{achievement}</li>
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
          <section>
            <h2 
              className="text-2xl font-bold text-center mb-6 pb-2 border-b-2"
              style={{ borderColor: colors.primary }}
            >
              EDUCATION
            </h2>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <div key={edu.id || index} className="text-center">
                  <div className="mb-3">
                    <h3 className="text-xl font-bold">{edu.degree || 'Degree'}</h3>
                    <p className="text-lg font-semibold" style={{ color: colors.primary }}>
                      {edu.institution || 'Institution'}
                    </p>
                    {edu.field && <p className="text-sm opacity-70">{edu.field}</p>}
                    <p className="text-sm opacity-70">
                      {formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}
                      {edu.gpa && ` • GPA: ${edu.gpa}`}
                    </p>
                  </div>
                  
                  {edu.description && (
                    <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto">
                      {edu.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills Section */}
        {(skills.technical?.length > 0 || skills.soft?.length > 0 || skills.languages?.length > 0) && (
          <section>
            <h2 
              className="text-2xl font-bold text-center mb-6 pb-2 border-b-2"
              style={{ borderColor: colors.primary }}
            >
              SKILLS
            </h2>
            <div className="max-w-3xl mx-auto">
              {skills.technical?.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-center mb-3" style={{ color: colors.primary }}>
                    Technical Skills
                  </h3>
                  <div className="flex flex-wrap justify-center gap-3">
                    {skills.technical.map((skill, index) => (
                      <span 
                        key={index}
                        className="px-4 py-2 text-sm border-2 rounded-full"
                        style={{ 
                          borderColor: colors.primary,
                          color: colors.primary
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {skills.soft?.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-center mb-3" style={{ color: colors.primary }}>
                    Soft Skills
                  </h3>
                  <div className="flex flex-wrap justify-center gap-3">
                    {skills.soft.map((skill, index) => (
                      <span 
                        key={index}
                        className="px-4 py-2 text-sm border-2 rounded-full"
                        style={{ 
                          borderColor: colors.secondary,
                          color: colors.secondary
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {skills.languages?.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-center mb-3" style={{ color: colors.primary }}>
                    Languages
                  </h3>
                  <div className="flex flex-wrap justify-center gap-3">
                    {skills.languages.map((language, index) => (
                      <span 
                        key={index}
                        className="px-4 py-2 text-sm border-2 rounded-full"
                        style={{ 
                          borderColor: colors.accent,
                          color: colors.accent
                        }}
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
          <section>
            <h2 
              className="text-2xl font-bold text-center mb-6 pb-2 border-b-2"
              style={{ borderColor: colors.primary }}
            >
              PROJECTS
            </h2>
            <div className="space-y-6">
              {projects.map((project, index) => (
                <div key={project.id || index} className="text-center">
                  <div className="mb-3">
                    <h3 className="text-xl font-bold">{project.name || 'Project Name'}</h3>
                    <p className="text-sm opacity-70">
                      {formatDate(project.startDate)} - {project.current ? 'Present' : formatDate(project.endDate)}
                    </p>
                  </div>
                  
                  {project.description && (
                    <p className="text-gray-700 mb-3 leading-relaxed max-w-3xl mx-auto">
                      {project.description}
                    </p>
                  )}
                  
                  {project.technologies?.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-2 mb-3">
                      {project.technologies.map((tech, idx) => (
                        <span 
                          key={idx}
                          className="px-2 py-1 text-xs border rounded-full"
                          style={{ 
                            borderColor: colors.secondary,
                            color: colors.secondary
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {(project.link || project.github) && (
                    <div className="flex justify-center gap-4">
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

export default ClassicTemplate; 