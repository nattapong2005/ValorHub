"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";

export default function AgentGrid({ agents }: { agents: any[] }) {
  const [selectedAgent, setSelectedAgent] = useState<any | null>(null);

  // function to close modal on escape key or clicking outside
  const closeModal = () => setSelectedAgent(null);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (selectedAgent) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [selectedAgent]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 md:gap-x-8 gap-y-10 md:gap-y-16">
        {agents.map((agent: any) => (
          <div
            key={agent.uuid}
            className="group cursor-pointer animate-in fade-in zoom-in-95 duration-500"
            onClick={() => setSelectedAgent(agent)}
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-white/5 border border-white/10 group-hover:border-accent/50 transition-all duration-500">
              <Image
                src={agent.fullPortrait || agent.displayIcon}
                alt={agent.displayName}
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

              <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6">
                <span className="text-[10px] md:text-xs font-bold tracking-widest text-accent uppercase flex items-center gap-2">
                  {agent.role?.displayIcon && (
                    <Image src={agent.role.displayIcon} alt={agent.role.displayName} width={14} height={14} className="invert md:w-4 md:h-4" />
                  )}
                  {agent.role?.displayName}
                </span>
                <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-none mt-1 group-hover:translate-x-2 transition-transform">{agent.displayName}</h3>
              </div>
            </div>

            <div className="mt-4 md:mt-6 flex gap-2 md:gap-3 overflow-x-auto pb-2 no-scrollbar">
              {agent.abilities.map((ability: any) => (
                ability.displayIcon && (
                  <div key={ability.slot} className="w-7 h-7 md:w-8 md:h-8 shrink-0 relative p-1 md:p-1.5 bg-white/5 border border-white/10 group-hover:border-accent/30 transition-colors" title={ability.displayName}>
                    <Image
                      src={ability.displayIcon}
                      alt={ability.displayName}
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                )
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Modal Overlay */}
      {selectedAgent && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 md:p-10"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-background/90 backdrop-blur-md transition-opacity"
            onClick={closeModal}
          />

          {/* Modal Content */}
          <div className="relative w-full max-w-6xl max-h-[90vh] bg-zinc-950 border border-white/10 shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-300">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-[70] p-2 bg-black/50 hover:bg-accent text-white rounded-full transition-colors backdrop-blur-md border border-white/10"
            >
              <X size={20} className="md:w-6 md:h-6" />
            </button>

            {/* Left side: Image */}
            <div className="w-full md:w-2/5 relative min-h-[250px] md:min-h-full bg-zinc-900 overflow-hidden flex items-center justify-center border-b md:border-b-0 md:border-r border-white/10">
              {selectedAgent.background && (
                <div className="absolute inset-0 opacity-20">
                  <Image
                    src={selectedAgent.background}
                    alt="background"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="relative w-full h-[120%] -mt-[10%] drop-shadow-2xl animate-in slide-in-from-left-8 duration-700">
                <Image
                  src={selectedAgent.fullPortrait || selectedAgent.displayIcon}
                  alt={selectedAgent.displayName}
                  fill
                  className="object-contain object-bottom md:object-center"
                />
              </div>
            </div>

            {/* Right side: Details */}
            <div className="w-full md:w-3/5 p-5 md:p-10 overflow-y-auto custom-scrollbar bg-gradient-to-br from-zinc-950 to-zinc-900">
              <div className="flex items-center gap-4 mb-2">
                {selectedAgent.role?.displayIcon && (
                  <div className="w-8 h-8 md:w-10 md:h-10 relative bg-zinc-800 p-2 rounded-sm border border-white/10">
                    <Image
                      src={selectedAgent.role.displayIcon}
                      alt={selectedAgent.role.displayName}
                      fill
                      className="p-1.5 md:p-2 invert"
                    />
                  </div>
                )}
                <div>
                  <h4 className="text-accent uppercase tracking-widest text-[10px] md:text-xs font-bold">{selectedAgent.role?.displayName}</h4>
                  <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none">{selectedAgent.displayName}</h2>
                </div>
              </div>

              <p className="text-foreground/70 text-base md:text-lg mt-4 md:mt-6 leading-relaxed font-light">
                {selectedAgent.description}
              </p>

              <div className="mt-8 md:mt-12">
                <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight mb-4 md:mb-6 flex items-center before:content-[''] before:w-6 md:before:w-8 before:h-1 before:bg-accent before:mr-3 md:before:mr-4">ความสามารถ</h3>
                <div className="grid grid-cols-1 gap-4 md:gap-6">
                  {selectedAgent.abilities.map((ability: any) => (
                    <div key={ability.slot} className="bg-white/5 border border-white/10 p-4 md:p-5 hover:bg-white/10 transition-colors group/ability">
                      <div className="flex items-start gap-4 md:gap-5">
                        <div className="w-12 h-12 md:w-14 md:h-14 shrink-0 relative p-2 md:p-3 bg-zinc-900 border border-white/10 group-hover/ability:border-accent/50 transition-colors">
                          {ability.displayIcon ? (
                            <Image
                              src={ability.displayIcon}
                              alt={ability.displayName}
                              fill
                              className="object-contain p-1.5 md:p-2"
                            />
                          ) : (
                            <div className="w-full h-full bg-white/20" />
                          )}
                        </div>
                        <div>
                          <h4 className="text-lg md:text-xl font-bold uppercase group-hover/ability:text-accent transition-colors">{ability.displayName}</h4>
                          <span className="text-[10px] md:text-xs text-accent tracking-widest uppercase mb-2 md:mb-3 block font-bold">Slot: {ability.slot === "Passive" ? "ติดตัว" : ability.slot}</span>
                          <p className="text-foreground/60 text-xs md:text-sm leading-relaxed font-light">
                            {ability.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
