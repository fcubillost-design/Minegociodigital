
import React, { useState } from 'react';
import Modal from './ui/Modal';
import Input from './ui/Input';
import Button from './ui/Button';
import { getBusinessExplanation } from '../services/geminiService';

interface AIAssistantProps {
    onClose: () => void;
}

const popularTopics = [
    "Punto de Equilibrio",
    "Propuesta de Valor",
    "Flujo de Caja",
    "Marketing Digital",
    "Costos Fijos y Variables"
];

const AIAssistant: React.FC<AIAssistantProps> = ({ onClose }) => {
    const [topic, setTopic] = useState('');
    const [explanation, setExplanation] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleExplain = async (currentTopic: string) => {
        if (!currentTopic.trim() || isLoading) return;
        setIsLoading(true);
        setExplanation('');
        try {
            const result = await getBusinessExplanation(currentTopic);
            setExplanation(result);
        } catch (error) {
            console.error(error);
            setExplanation('Hubo un error al obtener la explicación. Por favor, intenta de nuevo.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleExplain(topic);
    };

    return (
        <Modal title="Asistente de Negocios IA" onClose={onClose}>
            <div className="space-y-4">
                <p className="text-gray-600">¿Tienes dudas sobre algún concepto de negocio? Pregúntale a nuestro asistente experto.</p>
                <form onSubmit={handleFormSubmit}>
                    <div className="flex gap-2">
                        <Input 
                            label="" 
                            placeholder="Ej: ¿Qué es un segmento de clientes?" 
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            className="flex-grow"
                        />
                        <Button type="submit" disabled={isLoading || !topic.trim()}>
                            {isLoading ? 'Pensando...' : 'Explicar'}
                        </Button>
                    </div>
                </form>
                <div className="flex flex-wrap gap-2">
                    <span className="text-sm font-semibold mr-2">Sugerencias:</span>
                    {popularTopics.map(t => (
                        <button 
                            key={t}
                            onClick={() => { setTopic(t); handleExplain(t); }}
                            className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-800 px-2 py-1 rounded-md"
                        >
                            {t}
                        </button>
                    ))}
                </div>
                {isLoading && <div className="text-center p-4">Cargando explicación...</div>}
                {explanation && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
                        <p className="whitespace-pre-wrap">{explanation}</p>
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default AIAssistant;
