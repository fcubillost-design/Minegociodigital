import React, { useState, useMemo, useRef } from 'react';
import Card from './ui/Card';
import Input from './ui/Input';
import Button from './ui/Button';
import { View } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { ChevronLeftIcon, DownloadIcon } from './ui/Icons';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface ContributionMarginCalculatorProps {
    onComplete: () => void;
    setView: (view: View) => void;
}

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(value);
};

const ContributionMarginCalculator: React.FC<ContributionMarginCalculatorProps> = ({ onComplete, setView }) => {
    const [pricePerUnit, setPricePerUnit] = useLocalStorage('cm_pricePerUnit', '');
    const [variableCostPerUnit, setVariableCostPerUnit] = useLocalStorage('cm_variableCostPerUnit', '');
    const exportRef = useRef<HTMLDivElement>(null);

    const ppu = parseFloat(pricePerUnit);
    const vcu = parseFloat(variableCostPerUnit);

    const { marginValue, marginPercentage } = useMemo(() => {
        if (ppu > 0 && vcu >= 0 && ppu > vcu) {
            const margin = ppu - vcu;
            const percentage = (margin / ppu) * 100;
            return { marginValue: margin, marginPercentage: percentage };
        }
        return { marginValue: null, marginPercentage: null };
    }, [ppu, vcu]);

    const handleExportPDF = () => {
        if (!exportRef.current) return;
        
        html2canvas(exportRef.current, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'px',
                format: [canvas.width, canvas.height]
            });
            pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
            pdf.save('margen-de-contribucion.pdf');
        });
    };

    const isComplete = marginValue !== null;

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
                <h2 className="text-3xl font-bold text-primary">Calculadora de Margen de Contribución</h2>
                <p className="text-gray-600 max-w-3xl mx-auto mt-2">Descubre cuánto dinero te queda de cada venta para cubrir tus costos fijos y generar ganancias.</p>
            </div>
            
            <div ref={exportRef} className="p-4 max-w-2xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <Input label="Precio de Venta por Unidad ($)" type="number" placeholder="Ej: 10000" value={pricePerUnit} onChange={e => setPricePerUnit(e.target.value)} />
                    <Input label="Costo Variable por Unidad ($)" type="number" placeholder="Ej: 4000" value={variableCostPerUnit} onChange={e => setVariableCostPerUnit(e.target.value)} />
                </div>

                {isComplete && marginValue !== null && marginPercentage !== null && (
                    <div className="text-center bg-blue-50 p-6 rounded-lg mb-8 space-y-4">
                        <div>
                            <h3 className="text-lg font-semibold">Margen de Contribución por Unidad</h3>
                            <p className="text-4xl font-bold text-primary my-2">{formatCurrency(marginValue)}</p>
                            <p className="text-gray-600">Por cada producto que vendes, te quedan {formatCurrency(marginValue)} para pagar costos fijos.</p>
                        </div>
                        <div className="border-t pt-4">
                             <h3 className="text-lg font-semibold">Porcentaje de Margen de Contribución</h3>
                            <p className="text-4xl font-bold text-primary my-2">{marginPercentage.toFixed(2)}%</p>
                            <p className="text-gray-600">El {marginPercentage.toFixed(2)}% de tu precio de venta se destina a cubrir costos fijos y generar ganancias.</p>
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-8 flex justify-center items-center gap-4">
                <Button onClick={onComplete} disabled={!isComplete}>
                    {isComplete ? 'Completar Módulo y Ganar Puntos' : 'Ingresa valores válidos para calcular'}
                </Button>
                 <Button onClick={handleExportPDF} disabled={!isComplete} className="bg-primary hover:bg-primary/90">
                    <DownloadIcon className="w-5 h-5 mr-2 inline-block"/>
                    Exportar a PDF
                </Button>
            </div>
        </Card>
    );
};

export default ContributionMarginCalculator;