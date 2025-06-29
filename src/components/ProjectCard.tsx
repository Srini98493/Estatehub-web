import React from 'react';
import { MoreVertical } from 'lucide-react';

const projects = [
  {
    name: 'Website Redesign',
    progress: 75,
    status: 'In Progress',
    color: 'bg-blue-600',
  },
  {
    name: 'Mobile App',
    progress: 90,
    status: 'Review',
    color: 'bg-purple-600',
  },
  {
    name: 'Marketing Campaign',
    progress: 45,
    status: 'In Progress',
    color: 'bg-yellow-500',
  },
];

function ProjectCard() {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Active Projects</h2>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreVertical className="h-5 w-5" />
        </button>
      </div>
      <div className="space-y-6">
        {projects.map((project, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900">{project.name}</span>
              <span className="text-sm text-gray-500">{project.progress}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full ${project.color} rounded-full`}
                style={{ width: `${project.progress}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Progress</span>
              <span className="font-medium text-gray-700">{project.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectCard;