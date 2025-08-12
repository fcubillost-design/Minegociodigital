import React, { useState, useMemo, useRef } from 'react';
import Card from './ui/Card';
import Input from './ui/Input';
import Button from './ui/Button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DownloadIcon, ChevronLeftIcon } from './ui/Icons';
import { View } from '../types';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


interface BreakEvenCalculatorProps {
    onComplete: () => void;
    setView: (view: View) => void;
}

const BreakEvenCalculator: React.FC<BreakEvenCalculatorProps> = ({ onComplete, setView }) => {
    const [fixedCosts, setFixedCosts] = useState('');
    const [pricePerUnit, setPricePerUnit] = useState('');
    const [variableCostPerUnit, setVariableCostPerUnit] = useState('');
    const exportRef = useRef<HTMLDivElement>(null);

    const fc = parseFloat(fixedCosts);
    const ppu = parseFloat(pricePerUnit);
    const vcu = parseFloat(variableCostPerUnit);

    const breakEvenPoint = useMemo(() => {
        if (fc > 0 && ppu > 0 && vcu >= 0 && ppu > vcu) {
            return fc / (ppu - vcu);
        }
        return null;
    }, [fc, ppu, vcu]);

    const chartData = useMemo(() => {
        if (!breakEvenPoint) return [];
        const data = [];
        const maxUnits = Math.ceil(breakEvenPoint * 2);
        const step = Math.ceil(maxUnits / 10) || 1;
        for (let i = 0; i <= maxUnits; i += step) {
            data.push({
                units: i,
                revenue: i * ppu,
                totalCosts: fc + i * vcu,
            });
        }
         if (data.findIndex(d => d.units === Math.ceil(breakEvenPoint)) === -1) {
            data.push({
                units: Math.ceil(breakEvenPoint),
                revenue: Math.ceil(breakEvenPoint) * ppu,
                totalCosts: fc + Math.ceil(breakEvenPoint) * vcu,
            });
            data.sort((a,b) => a.units - b.units);
        }
        return data;
    }, [breakEvenPoint, ppu, vcu, fc]);

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
            pdf.save('punto-de-equilibrio.pdf');
        });
    };

    const isComplete = breakEvenPoint !== null && breakEvenPoint > 0;

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
                <h2 className="text-3xl font-bold text-primary">Calculadora de Punto de Equilibrio</h2>
                <p className="text-gray-600 max-w-3xl mx-auto mt-2">Ingresa tus costos y precio de venta para descubrir cuántas unidades necesitas vender para cubrir tus gastos.</p>
            </div>
            
            <div ref={exportRef} className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Input label="Costos Fijos Totales ($)" type="number" placeholder="Ej: 500000" value={fixedCosts} onChange={e => setFixedCosts(e.target.value)} />
                    <Input label="Precio de Venta por Unidad ($)" type="number" placeholder="Ej: 2000" value={pricePerUnit} onChange={e => setPricePerUnit(e.target.value)} />
                    <Input label="Costo Variable por Unidad ($)" type="number" placeholder="Ej: 1000" value={variableCostPerUnit} onChange={e => setVariableCostPerUnit(e.target.value)} />
                </div>

                {breakEvenPoint !== null && (
                    <div className="text-center bg-blue-50 p-6 rounded-lg mb-8">
                        <h3 className="text-lg font-semibold">Tu Punto de Equilibrio es:</h3>
                        <p className="text-4xl font-bold text-primary my-2">{Math.ceil(breakEvenPoint)} unidades</p>
                        <p className="text-gray-600">Necesitas vender {Math.ceil(breakEvenPoint)} unidades para cubrir todos tus costos. A partir de la unidad {Math.ceil(breakEvenPoint) + 1}, ¡comienzas a ganar dinero!</p>
                    </div>
                )}
                {isComplete && chartData.length > 0 && (
                    <div className="h-96 w-full mt-8">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartData} margin={{ top: 20, right: 30, left: 30, bottom: 30 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="units" label={{ value: 'Unidades Vendidas', position: 'insideBottom', offset: -15 }} />
                                <YAxis tickFormatter={(value) => `$${value.toLocaleString('es-CL')}`} label={{ value: 'Monto ($)', angle: -90, position: 'insideLeft', offset: -20 }} />
                                <Tooltip formatter={(value: number) => new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(value)} />
                                <Legend />
                                <Line type="monotone" dataKey="revenue" name="Ingresos" stroke="#22c55e" strokeWidth={2} dot={false}/>
                                <Line type="monotone" dataKey="totalCosts" name="Costos Totales" stroke="#ef4444" strokeWidth={2} dot={false}/>
                            </LineChart>
                        </ResponsiveContainer>
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

export default BreakEvenCalculator;