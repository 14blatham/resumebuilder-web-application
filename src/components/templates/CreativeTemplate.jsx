import React from 'react';
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Calendar, MapPin as LocationIcon } from 'lucide-react';

const CreativeTemplate = ({ 
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
    <div className="font-sans flex min-h-screen" style={{ color: colors.text }}>
      {/* Sidebar */}
      <div 
        className="w-1/3 p-8 text-white"
        style={{ backgroundColor: colors.primary }}
      >
        {/* Profile Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{getFullName()}</h1>
          {personal.summary && (
            <p className="text-sm leading-relaxed opacity-90">
              {personal.summary}
            </p>
          )}
        </div>

        {/* Contact Information */}
        {contactInfo.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4 border-b border-white/20 pb-2">Contact</h2>
            <div className="space-y-3">
              {contactInfo.map((contact, index) => {
                const Icon = contact.icon;
                return (
                  <div key={index} className="flex items-center space-x-3">
                    <Icon className="w-4 h-4 opacity-80" />
                    <span className="text-sm opacity-90">{contact.value}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Skills Section */}
        {(skills.technical?.length > 0 || skills.soft?.length > 0 || skills.languages?.length > 0) && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4 border-b border-white/20 pb-2">Skills</h2>
            
            {skills.technical?.length > 0 && (
              <div className="mb-4">
                <h3 className="text-sm font-semibold mb-2 opacity-90">Technical</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.technical.map((skill, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 text-xs rounded-full bg-white/20"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {skills.soft?.length > 0 && (
              <div className="mb-4">
                <h3 className="text-sm font-semibold mb-2 opacity-90">Soft Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.soft.map((skill, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 text-xs rounded-full bg-white/20"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {skills.languages?.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold mb-2 opacity-90">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.languages.map((language, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 text-xs rounded-full bg-white/20"
                    >
                      {language}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Education Section */}
        {education.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-4 border-b border-white/20 pb-2">Education</h2>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div key={edu.id || index}>
                  <h3 className="text-sm font-semibold">{edu.degree || 'Degree'}</h3>
                  <p className="text-xs opacity-80 mb-1">{edu.institution || 'Institution'}</p>
                  {edu.field && <p className="text-xs opacity-70 mb-1">{edu.field}</p>}
                  <p className="text-xs opacity-70">
                    {formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}
                    {edu.gpa && ` • GPA: ${edu.gpa}`}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="w-2/3 p-8">
        {/* Experience Section */}
        {experience.length > 0 && (
          <section className="mb-8">
            <h2 
              className="text-2xl font-bold mb-6 pb-2 border-b-2"
              style={{ borderColor: colors.primary }}
            >
              Experience
            </h2>
            <div className="space-y-6">
              {experience.map((exp, index) => (
                <div key={exp.id || index} className="relative">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-semibold">{exp.position || 'Position'}</h3>
                      <p className="text-lg font-medium" style={{ color: colors.primary }}>
                        {exp.company || 'Company'}
                      </p>
                    </div>
                    <div className="text-right text-sm opacity-70">
                      <div>{formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}</div>
                      {exp.location && <div className="flex items-center justify-end mt-1">
                        <LocationIcon className="w-3 h-3 mr-1" />
                        {exp.location}
                      </div>}
                    </div>
                  </div>
                  
                  {exp.description && (
                    <p className="text-gray-700 mb-3 leading-relaxed">{exp.description}</p>
                  )}
                  
                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
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

        {/* Projects Section */}
        {projects.length > 0 && (
          <section className="mb-8">
            <h2 
              className="text-2xl font-bold mb-6 pb-2 border-b-2"
              style={{ borderColor: colors.primary }}
            >
              Projects
            </h2>
            <div className="grid grid-cols-1 gap-6">
              {projects.map((project, index) => (
                <div key={project.id || index} className="border rounded-lg p-4" style={{ borderColor: colors.primary + '20' }}>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-semibold">{project.name || 'Project Name'}</h3>
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
                    <p className="text-gray-700 mb-3 leading-relaxed">{project.description}</p>
                  )}
                  
                  {(project.link || project.github) && (
                    <div className="flex gap-4">
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

        {/* Additional Sections can be added here */}
        {skills.certifications?.length > 0 && (
          <section>
            <h2 
              className="text-2xl font-bold mb-6 pb-2 border-b-2"
              style={{ borderColor: colors.primary }}
            >
              Certifications
            </h2>
            <div className="space-y-3">
              {skills.certifications.map((cert, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="font-medium">{cert}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default CreativeTemplate; 