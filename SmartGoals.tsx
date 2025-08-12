import React, { useState, useRef } from 'react';
import Card from './ui/Card';
import Input from './ui/Input';
import Button from './ui/Button';
import Textarea from './ui/Textarea';
import { View, SmartGoal } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { ChevronLeftIcon, DownloadIcon } from './ui/Icons';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface SmartGoalsProps {
    onComplete: () => void;
    setView: (view: View) => void;
}

const statusStyles = {
    'Pendiente': 'bg-gray-100 border-gray-300',
    'En Progreso': 'bg-blue-50 border-blue-300',
    'Cumplido': 'bg-green-50 border-green-400',
};

const smartCriteria: { key: keyof Omit<SmartGoal, 'id' | 'objective' | 'status'>; label: string; placeholder: string }[] = [
    { key: 'specific', label: 'S - Específico', placeholder: '¿Qué quiero lograr exactamente? Sé claro y conciso.' },
    { key: 'measurable', label: 'M - Medible', placeholder: '¿Cómo sabré que lo he logrado? Define métricas o hitos.' },
    { key: 'achievable', label: 'A - Alcanzable', placeholder: '¿Es este objetivo realista con mis recursos actuales?' },
    { key: 'relevant', label: 'R - Relevante', placeholder: '¿Por qué es importante este objetivo para mi negocio?' },
    { key: 'timeBound', label: 'T - Temporal', placeholder: '¿Para cuándo debo haberlo completado? Fija una fecha límite.' },
];

const SmartGoals: React.FC<SmartGoalsProps> = ({ onComplete, setView }) => {
    const [goals, setGoals] = useLocalStorage<SmartGoal[]>('smartGoals', []);
    const exportRef = useRef<HTMLDivElement>(null);

    const handleAddGoal = () => {
        const newGoal: SmartGoal = {
            id: crypto.randomUUID(),
            objective: 'Nuevo Objetivo (haz click para editar)',
            specific: '',
            measurable: '',
            achievable: '',
            relevant: '',
            timeBound: '',
            status: 'Pendiente',
        };
        setGoals(prev => [...prev, newGoal]);
    };

    const handleUpdateGoal = (id: string, field: keyof SmartGoal, value: string) => {
        setGoals(prev => prev.map(goal => (goal.id === id ? { ...goal, [field]: value } : goal)));
    };

    const handleRemoveGoal = (id: string) => {
        setGoals(prev => prev.filter(goal => goal.id !== id));
    };

    const handleExportPDF = () => {
        if (!exportRef.current) return;
        
        html2canvas(exportRef.current, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'px',
                format: 'a4'
            });
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('objetivos-smart.pdf');
        });
    };

    const isComplete = goals.length > 0;

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
                <h2 className="text-3xl font-bold text-primary">Generador de Objetivos SMART</h2>
                <p className="text-gray-600 max-w-3xl mx-auto mt-2">Define metas claras y alcanzables para tu negocio. Una buena planificación es el primer paso hacia el éxito.</p>
            </div>
            
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-6">
                    <Button onClick={handleAddGoal}>+ Agregar Nuevo Objetivo</Button>
                </div>
                
                <div ref={exportRef} className="p-2 space-y-4">
                    {goals.length > 0 ? goals.map(goal => (
                        <div key={goal.id} className={`p-4 rounded-lg border ${statusStyles[goal.status]}`}>
                            <div className="flex justify-between items-start mb-4">
                                <input 
                                    type="text"
                                    value={goal.objective}
                                    onChange={e => handleUpdateGoal(goal.id, 'objective', e.target.value)}
                                    className="text-xl font-bold text-primary bg-transparent border-0 border-b-2 border-transparent focus:border-primary focus:ring-0 w-full"
                                />
                                <button onClick={() => handleRemoveGoal(goal.id)} className="text-red-500 hover:text-red-700 font-bold text-xl ml-4">&times;</button>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                {smartCriteria.map(criteria => (
                                    <Textarea
                                        key={criteria.key}
                                        placeholder={criteria.placeholder}
                                        value={goal[criteria.key]}
                                        onChange={e => handleUpdateGoal(goal.id, criteria.key, e.target.value)}
                                        rows={3}
                                    />
                                ))}
                            </div>
                            <div className="mt-4">
                                <label className="text-sm font-medium text-gray-700 mr-2">Estado:</label>
                                <select 
                                    value={goal.status}
                                    onChange={e => handleUpdateGoal(goal.id, 'status', e.target.value)}
                                    className="p-1 rounded-md border-gray-300"
                                >
                                    <option>Pendiente</option>
                                    <option>En Progreso</option>
                                    <option>Cumplido</option>
                                </select>
                            </div>
                        </div>
                    )) : (
                        <div className="text-center py-10 text-gray-500">
                            <p>Aún no has definido ningún objetivo.</p>
                            <p>¡Haz click en "Agregar Nuevo Objetivo" para empezar a planificar tu éxito!</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-8 flex justify-center items-center gap-4">
                <Button onClick={onComplete} disabled={!isComplete}>
                    {isComplete ? 'Completar Módulo y Ganar Puntos' : 'Agrega tu primer objetivo para completar'}
                </Button>
                 <Button onClick={handleExportPDF} disabled={!isComplete} className="bg-primary hover:bg-primary/90">
                    <DownloadIcon className="w-5 h-5 mr-2 inline-block"/>
                    Exportar Objetivos a PDF
                </Button>
            </div>
        </Card>
    );
};

export default SmartGoals;