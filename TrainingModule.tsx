import React, { useState, useMemo, useEffect } from 'react';
import { trainingModules, TrainingModuleData, TrainingSection } from '../data/trainingContent';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { View } from '../types';
import Card from './ui/Card';
import Button from './ui/Button';
import { ChevronLeftIcon } from './ui/Icons';

interface TrainingModuleProps {
    onComplete: () => void;
    setView: (view: View) => void;
}

const TrainingModule: React.FC<TrainingModuleProps> = ({ onComplete, setView }) => {
    const [activeModuleId, setActiveModuleId] = useState<string>(trainingModules[0].id);
    const [activeSectionId, setActiveSectionId] = useState<string>(trainingModules[0].sections[0].id);
    const [readSections, setReadSections] = useLocalStorage<string[]>('readTrainingSections', []);

    const totalSections = useMemo(() => trainingModules.reduce((acc, module) => acc + module.sections.length, 0), []);
    const progressPercentage = useMemo(() => (readSections.length / totalSections) * 100, [readSections, totalSections]);

    const activeModule = trainingModules.find(m => m.id === activeModuleId) || trainingModules[0];
    const activeSection = activeModule.sections.find(s => s.id === activeSectionId) || activeModule.sections[0];

    const handleMarkAsRead = (sectionId: string) => {
        if (!readSections.includes(sectionId)) {
            setReadSections(prev => [...prev, sectionId]);
        }
    };
    
    useEffect(() => {
        const isCompleted = readSections.length === totalSections && totalSections > 0;
        if (isCompleted) {
            onComplete();
        }
    }, [readSections, totalSections, onComplete]);

    const isCurrentSectionRead = readSections.includes(activeSection.id);

    return (
        <Card className="relative">
            <button 
                onClick={() => setView(View.Dashboard)} 
                className="absolute top-6 left-6 flex items-center text-sm font-semibold text-primary hover:text-secondary z-10"
                aria-label="Volver al Dashboard"
            >
                <ChevronLeftIcon className="w-5 h-5 mr-1"/>
                Volver
            </button>

            <div className="text-center mb-6 pt-8">
                <h2 className="text-3xl font-bold text-primary">Manual Interactivo del Emprendedor</h2>
                <p className="text-gray-600 max-w-3xl mx-auto mt-2">Lee cada sección y marca tu progreso. ¡Completa el 100% para ganar puntos!</p>
            </div>

            <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                    <span className="font-bold">Progreso Total</span>
                    <span>{readSections.length} de {totalSections} secciones</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                    <div className="bg-green-500 h-4 rounded-full transition-all duration-500" style={{ width: `${progressPercentage}%` }}></div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                <aside className="w-full md:w-1/4">
                    <h3 className="text-lg font-bold mb-3">Módulos</h3>
                    <nav className="space-y-4">
                        {trainingModules.map(module => (
                            <div key={module.id}>
                                <h4 className="font-semibold text-primary cursor-pointer" onClick={() => setActiveModuleId(module.id)}>{module.title}</h4>
                                {activeModuleId === module.id && (
                                    <ul className="mt-2 space-y-1 pl-4 border-l-2 border-gray-200">
                                        {module.sections.map(section => {
                                            const isRead = readSections.includes(section.id);
                                            return (
                                                <li key={section.id}>
                                                    <button 
                                                        onClick={() => setActiveSectionId(section.id)}
                                                        className={`text-left w-full text-sm ${activeSectionId === section.id ? 'font-bold' : ''} ${isRead ? 'text-green-600' : 'text-gray-700'}`}
                                                    >
                                                        {isRead ? '✓ ' : ''}{section.title}
                                                    </button>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </nav>
                </aside>

                <article className="w-full md:w-3/4">
                    <div className="p-6 border rounded-lg bg-white h-full">
                        <h3 className="text-2xl font-bold mb-4">{activeSection.title}</h3>
                        <div 
                           className="max-w-none text-gray-800 space-y-4"
                           dangerouslySetInnerHTML={{ __html: activeSection.content }}
                        />
                         <div className="mt-6 text-right">
                            <Button onClick={() => handleMarkAsRead(activeSection.id)} disabled={isCurrentSectionRead}>
                                {isCurrentSectionRead ? '✓ Leído' : 'Marcar como leído'}
                            </Button>
                        </div>
                    </div>
                </article>
            </div>
        </Card>
    )
}

export default TrainingModule;