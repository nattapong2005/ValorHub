"use client";

import { useState, useMemo } from 'react';
import AgentGrid from "@/components/AgentGrid";

export default function AgentsClient({ agents }: { agents: any[] }) {
  const [selectedRole, setSelectedRole] = useState('All');

  const roles = useMemo(() => {
    const allRoles = agents.map(agent => agent.role?.displayName).filter(Boolean);
    return ['All', ...Array.from(new Set(allRoles))];
  }, [agents]);

  const filteredAgents = useMemo(() => {
    if (selectedRole === 'All') {
      return agents;
    }
    return agents.filter(agent => agent.role?.displayName === selectedRole);
  }, [agents, selectedRole]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
      <div className="mb-10 md:mb-20 space-y-4">
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-accent">เอเจนท์</h1>
        <p className="text-foreground/50 max-w-xl text-sm md:text-base leading-relaxed">
          ค้นหาเอเจนท์ที่ตรงกับสไตล์การเล่นของคุณ ตัวละครแต่ละตัวมีความสามารถและบทบาทที่เป็นเอกลักษณ์
        </p>
      </div>

      <div className="flex gap-2 mb-8 md:mb-12 overflow-x-auto pb-4 no-scrollbar -mx-2 px-2">
        {roles.map(role => (
          <button
            key={role}
            onClick={() => setSelectedRole(role)}
            className={`px-4 py-2 text-xs md:text-sm font-bold uppercase tracking-widest transition-all shrink-0 border ${
              selectedRole === role
                ? 'bg-accent text-white border-accent'
                : 'bg-white/5 text-foreground/50 border-white/10 hover:border-white/20'
            }`}
          >
            {role === 'All' ? 'ทั้งหมด' : role}
          </button>
        ))}
      </div>

      <AgentGrid agents={filteredAgents} />
    </div>
  );
}
