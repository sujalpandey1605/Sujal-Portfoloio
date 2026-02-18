import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { X, ExternalLink, ZoomIn } from 'lucide-react';

const ProjectModal = ({ project, isOpen, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  if (!project) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0a0e27]/95 backdrop-blur-xl border-2 border-cyan-500/30 shadow-2xl shadow-cyan-500/20 text-white">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/50 transition-all group z-50"
        >
          <X className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
        </button>

        {/* Header */}
        <DialogHeader className="space-y-4 pr-12">
          <DialogTitle className="text-3xl font-bold text-white">
            {project.title}
          </DialogTitle>
          <p className="text-gray-300 text-lg leading-relaxed">
            {project.fullDescription || project.description}
          </p>
        </DialogHeader>

        {/* Tech Stack Badges */}
        <div className="flex flex-wrap gap-2 py-4">
          {project.tech.map((tech, idx) => (
            <Badge
              key={idx}
              className="bg-cyan-500/10 text-cyan-400 border-cyan-500/30 px-3 py-1 text-sm font-medium hover:bg-cyan-500/20 transition-colors"
            >
              {tech}
            </Badge>
          ))}
        </div>

        {/* Image Gallery */}
        <div className="space-y-4 mt-6">
          {/* Main Preview Image */}
          <div className="relative group overflow-hidden rounded-lg border-2 border-white/10 hover:border-cyan-500/50 transition-all">
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e27]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-cyan-500/20 backdrop-blur-sm flex items-center justify-center">
                <ZoomIn className="h-6 w-6 text-cyan-400" />
              </div>
            </div>
            <img
              src={project.gallery[selectedImage]}
              alt={`${project.title} preview ${selectedImage + 1}`}
              className="w-full h-[400px] object-cover transition-all duration-500 group-hover:scale-105"
            />
          </div>

          {/* Thumbnail Gallery */}
          <div className="grid grid-cols-3 gap-4">
            {project.gallery.map((image, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`relative overflow-hidden rounded-lg border-2 transition-all duration-300 group ${
                  selectedImage === idx
                    ? 'border-cyan-500 shadow-lg shadow-cyan-500/30 scale-105'
                    : 'border-white/10 hover:border-cyan-500/50 hover:scale-105'
                }`}
              >
                <img
                  src={image}
                  alt={`${project.title} thumbnail ${idx + 1}`}
                  className="w-full h-24 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                {selectedImage === idx && (
                  <div className="absolute inset-0 bg-cyan-500/20 backdrop-blur-[1px]"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        {project.demoLink && project.demoLink !== '#' && (
          <div className="flex gap-4 pt-6 border-t border-white/10">
            <Button
              onClick={() => window.open(project.demoLink, '_blank')}
              className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all"
            >
              <ExternalLink className="mr-2 h-5 w-5" />
              View Live Demo
            </Button>
          </div>
        )}

        {/* Project Details */}
        {project.features && project.features.length > 0 && (
          <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
            <h4 className="text-lg font-semibold text-white mb-3">Key Features</h4>
            <ul className="space-y-2">
              {project.features.map((feature, idx) => (
                <li key={idx} className="flex items-start text-gray-300">
                  <span className="text-cyan-400 mr-2">•</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;