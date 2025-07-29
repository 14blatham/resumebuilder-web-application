import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, Loader2, Check } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const PDFExport = ({ resumeData }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);
  const resumeRef = useRef(null);

  const exportToPDF = async () => {
    if (!resumeRef.current) return;

    setIsExporting(true);
    setExportSuccess(false);

    try {
      // Get the resume element
      const resumeElement = resumeRef.current;
      
      // Configure html2canvas options for better quality
      const canvas = await html2canvas(resumeElement, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: resumeElement.scrollWidth,
        height: resumeElement.scrollHeight,
        scrollX: 0,
        scrollY: 0,
        windowWidth: resumeElement.scrollWidth,
        windowHeight: resumeElement.scrollHeight
      });

      // Calculate PDF dimensions
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      // Create PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      let position = 0;

      // Add image to PDF
      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add additional pages if content is longer than one page
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Generate filename
      const fullName = `${resumeData.personal?.firstName || 'Resume'}_${resumeData.personal?.lastName || 'Builder'}`;
      const timestamp = new Date().toISOString().split('T')[0];
      const filename = `${fullName}_${timestamp}.pdf`;

      // Save the PDF
      pdf.save(filename);

      setExportSuccess(true);
      
      // Reset success state after 3 seconds
      setTimeout(() => {
        setExportSuccess(false);
      }, 3000);

    } catch (error) {
      console.error('Error exporting PDF:', error);
      alert('Failed to export PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const getFullName = () => {
    const firstName = resumeData.personal?.firstName || '';
    const lastName = resumeData.personal?.lastName || '';
    return `${firstName} ${lastName}`.trim() || 'Resume';
  };

  return (
    <>
      {/* Hidden resume element for PDF generation */}
      <div 
        ref={resumeRef}
        className="fixed top-0 left-0 w-screen h-screen bg-white z-[-1] opacity-0 pointer-events-none"
        style={{ 
          transform: 'scale(0.8)',
          transformOrigin: 'top left'
        }}
      >
        {/* Render the resume content here for PDF capture */}
        <div className="w-full h-full bg-white">
          {/* This will be populated by the ResumePreview component */}
        </div>
      </div>

      {/* Export Button */}
      <motion.button
        onClick={exportToPDF}
        disabled={isExporting}
        className={`btn-primary flex items-center space-x-2 ${
          isExporting ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        whileHover={!isExporting ? { scale: 1.05 } : {}}
        whileTap={!isExporting ? { scale: 0.95 } : {}}
      >
        {isExporting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Generating PDF...</span>
          </>
        ) : exportSuccess ? (
          <>
            <Check className="w-4 h-4" />
            <span>PDF Ready!</span>
          </>
        ) : (
          <>
            <Download className="w-4 h-4" />
            <span>Export PDF</span>
          </>
        )}
      </motion.button>

      {/* Export Info Tooltip */}
      <div className="absolute top-full right-0 mt-2 w-64 p-3 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        <div className="flex items-start space-x-2">
          <FileText className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium mb-1">Export as PDF</p>
            <p className="opacity-80">
              Download your resume as a high-quality PDF file ready for printing or sharing.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PDFExport; 