import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, User, Mail, Phone, MapPin, Globe, Linkedin, Github, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import Input from './ui/input';
import Textarea from './ui/textarea';

const PersonalInfoForm = ({ data, onUpdate }) => {
  const [profileImage, setProfileImage] = useState(data?.profilePicture || null);
  const [imageError, setImageError] = useState('');
  const fileInputRef = useRef(null);

  const handleInputChange = (field, value) => {
    onUpdate({
      ...data,
      [field]: value
    });
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setImageError('File size must be less than 5MB');
      return;
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      setImageError('Please select a valid image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageData = e.target.result;
      setProfileImage(imageData);
      setImageError('');
      handleInputChange('profilePicture', imageData);
    };
    reader.readAsDataURL(file);
  };

  const removeProfileImage = () => {
    setProfileImage(null);
    setImageError('');
    handleInputChange('profilePicture', null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Personal Information</h2>
        <p className="text-white/70">Tell us about yourself and how to reach you</p>
      </div>

      {/* Profile Picture Section */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="w-5 h-5" />
            <span>Profile Picture</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-6">
            {/* Profile Image Preview */}
            <div className="relative">
              {profileImage ? (
                <div className="relative">
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover border-2 border-white/20"
                  />
                  <button
                    onClick={removeProfileImage}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                  >
                    <X className="w-3 h-3 text-white" />
                  </button>
                </div>
              ) : (
                <div className="w-24 h-24 rounded-full bg-white/10 border-2 border-dashed border-white/30 flex items-center justify-center">
                  <User className="w-8 h-8 text-white/50" />
                </div>
              )}
            </div>

            {/* Upload Controls */}
            <div className="flex-1">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              
              <div className="space-y-3">
                <button
                  onClick={triggerFileUpload}
                  className="btn-secondary flex items-center space-x-2"
                >
                  <Upload className="w-4 h-4" />
                  <span>{profileImage ? 'Change Photo' : 'Upload Photo'}</span>
                </button>
                
                {imageError && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm"
                  >
                    {imageError}
                  </motion.p>
                )}
                
                <p className="text-white/60 text-xs">
                  Recommended: Square image, max 5MB. JPG, PNG, or GIF.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Basic Information */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="w-5 h-5" />
            <span>Basic Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="First Name"
              value={data?.firstName || ''}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              placeholder="Enter your first name"
              required
            />
            <Input
              label="Last Name"
              value={data?.lastName || ''}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              placeholder="Enter your last name"
              required
            />
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mail className="w-5 h-5" />
            <span>Contact Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Email Address"
              type="email"
              value={data?.email || ''}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="your.email@example.com"
              required
            />
            <Input
              label="Phone Number"
              type="tel"
              value={data?.phone || ''}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="+1 (555) 123-4567"
            />
          </div>
          
          <Input
            label="Location"
            value={data?.location || ''}
            onChange={(e) => handleInputChange('location', e.target.value)}
            placeholder="City, State/Province, Country"
          />
        </CardContent>
      </Card>

      {/* Online Presence */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="w-5 h-5" />
            <span>Online Presence</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            label="Personal Website"
            value={data?.website || ''}
            onChange={(e) => handleInputChange('website', e.target.value)}
            placeholder="https://yourwebsite.com"
            helperText="Optional: Your portfolio or personal website"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="LinkedIn Profile"
              value={data?.linkedin || ''}
              onChange={(e) => handleInputChange('linkedin', e.target.value)}
              placeholder="https://linkedin.com/in/yourprofile"
              helperText="Your LinkedIn profile URL"
            />
            <Input
              label="GitHub Profile"
              value={data?.github || ''}
              onChange={(e) => handleInputChange('github', e.target.value)}
              placeholder="https://github.com/yourusername"
              helperText="Your GitHub profile URL"
            />
          </div>
        </CardContent>
      </Card>

      {/* Professional Summary */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="w-5 h-5" />
            <span>Professional Summary</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            label="Summary"
            value={data?.summary || ''}
            onChange={(e) => handleInputChange('summary', e.target.value)}
            placeholder="Write a compelling professional summary that highlights your key strengths, experience, and career objectives..."
            rows={6}
            helperText="This is often the first thing employers read. Make it count! (2-4 sentences recommended)"
          />
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PersonalInfoForm; 