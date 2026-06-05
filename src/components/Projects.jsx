import React from 'react';
import { useReveal } from '../hooks/useReveal';
import { useTilt } from '../hooks/useTilt';

const projectsData = [
  { badge: "Foundation", name: "Apex Hub", loc: "New York" },
  { badge: "Tower", name: "Zenith Spire", loc: "Dubai" },
  { badge: "Skyline", name: "Lumina Grid", loc: "Tokyo" }
];

const ProjectCard = ({ project }) => {
  const tilt = useTilt(8);
  return (
    <div 
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      style={{ position:'relative', transformStyle:'preserve-3d' }}
      className="reveal project-card relative rounded-2xl overflow-hidden border border-cyan-glow/20 bg-navy-900/80 p-0 flex flex-col justify-end aspect-[3/4] cursor-none shadow-[0_0_30px_rgba(0,0,0,0.5)] hover:border-cyan-glow/60 transition-all duration-300"
    >
      <div className="tilt-shine" style={{
        position:'absolute', inset:0, zIndex:1, pointerEvents:'none'
      }}/>
      {/* CSS Art Background */}
      <div className="section-bg absolute inset-0 z-0">
        <div className="city-lights"></div>
      </div>
      
      {/* Overlay shadow */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-900/95 via-navy-900/40 to-transparent z-10" />

      {/* Project Content */}
      <div className="project-content relative z-20 p-8">
        <div className="project-badge inline-block border border-cyan-glow text-cyan-glow text-xs px-3 py-1 rounded-full uppercase tracking-wider mb-3 bg-cyan-glow/10">
          {project.badge}
        </div>
        <h3 className="text-2xl font-display font-bold text-white tracking-tight uppercase">
          {project.name}
        </h3>
        <p className="text-gray-400 text-sm mt-1 flex items-center gap-1">
          <span>📍</span> {project.loc}
        </p>
      </div>

      {/* Hover sweep overlay */}
      <div 
        className="project-hover absolute inset-0 bg-cyan-glow flex flex-col items-center justify-center text-navy-900 font-sans font-bold text-xl uppercase tracking-wider z-30 opacity-0 hover:opacity-95 transition-opacity duration-300 pointer-events-none"
      >
        <span>View Project</span>
        <span className="text-2xl mt-2">&rarr;</span>
      </div>
    </div>
  );
};

const Projects = () => {
  const revealRef = useReveal();

  return (
    <section 
      ref={revealRef}
      id="projects" 
      style={{
        position: 'relative',
        zIndex: 1,
        background: 'rgba(5,13,24,0.97)'
      }}
      className="relative py-32 min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="container px-6 mx-auto relative z-20">
        
        {/* Section Header */}
        <div className="reveal text-center mb-16 max-w-2xl mx-auto">
          <h2 className="font-sans font-bold text-4xl md:text-5xl text-white tracking-wide uppercase">
            Featured Projects
          </h2>
          <div className="h-[2px] w-20 bg-gradient-to-r from-cyan-glow to-transparent mx-auto mt-4 mb-6 shadow-[0_0_10px_rgba(0,212,255,0.5)]" />
          <p className="text-gray-400 font-sans text-lg">
            Explore our architectural milestones and structural designs engineered to redefine modern skylines.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {projectsData.map((project, idx) => (
            <ProjectCard key={idx} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
