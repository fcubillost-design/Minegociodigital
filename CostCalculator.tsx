import React, { useState, useMemo, useRef } from 'react';
import Card from './ui/Card';
import Input from './ui/Input';
import Button from './ui/Button';
import { View, CostItem } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { ChevronLeftIcon, DownloadIcon } from './ui/Icons';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface CostCalculatorProps {
    onComplete: () => void;
    setView: (view: View) => void;
}

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(value);
};

const CostCalculator: React.FC<CostCalculatorProps> = ({ onComplete, setView }) => {
    const [fixedCosts, setFixedCosts] = useLocalStorage<CostItem[]>('fixedCosts', [{ id: crypto.randomUUID(), name: 'Arriendo', amount: 0 }]);
    const [variableCosts, setVariableCosts] = useLocalStorage<CostItem[]>('variableCosts', [{ id: crypto.randomUUID(), name: 'Materia Prima', amount: 0 }]);
    const [unitsProduced, setUnitsProduced] = useLocalStorage('unitsProduced', '');
    const exportRef = useRef<HTMLDivElement>(null);

    const handleAddItem = (type: 'fixed' | 'variable') => {
        const newItem: CostItem = { id: crypto.randomUUID(), name: '', amount: 0 };
        if (type === 'fixed') {
            setFixedCosts(prev => [...prev, newItem]);
        } else {
            setVariableCosts(prev => [...prev, newItem]);
        }
    };

    const handleUpdateItem = (type: 'fixed' | 'variable', id: string, field: 'name' | 'amount', value: string) => {
        const list = type === 'fixed' ? fixedCosts : variableCosts;
        const setList = type === 'fixed' ? setFixedCosts : setVariableCosts;
        
        const newList = list.map(item => {
            if (item.id === id) {
                return { ...item, [field]: field === 'amount' ? parseFloat(value) || 0 : value };
            }
            return item;
        });
        setList(newList);
    };

    const handleRemoveItem = (type: 'fixed' | 'variable', id: string) => {
        if (type === 'fixed') {
            setFixedCosts(prev => prev.filter(item => item.id !== id));
        } else {
            setVariableCosts(prev => prev.filter(item => item.id !== id));
        }
    };

    const totalFixedCosts = useMemo(() => fixedCosts.reduce((sum, item) => sum + item.amount, 0), [fixedCosts]);
    const totalVariableCosts = useMemo(() => variableCosts.reduce((sum, item) => sum + item.amount, 0), [variableCosts]);
    const grandTotal = totalFixedCosts + totalVariableCosts;
    
    const units = parseFloat(unitsProduced);
    const variableCostPerUnit = useMemo(() => {
        if(totalVariableCosts > 0 && units > 0) {
            return totalVariableCosts / units;
        }
        return null;
    }, [totalVariableCosts, units]);

    const isComplete = fixedCosts.length > 0 && variableCosts.length > 0 && fixedCosts.some(c => c.amount > 0) && variableCosts.some(c => c.amount > 0);

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
            pdf.save('calculo-de-costos.pdf');
        });
    };

    const renderCostList = (type: 'fixed' | 'variable') => {
        const list = type === 'fixed' ? fixedCosts : variableCosts;
        const title = type === 'fixed' ? 'Costos Fijos' : 'Costos Variables';
        const description = type === 'fixed' ? 'No cambian sin importar cuánto produzcas o vendas.' : 'Varían según tu nivel de producción o ventas.';
        const total = type === 'fixed' ? totalFixedCosts : totalVariableCosts;

        return (
            <div className="bg-gray-50 p-4 rounded-lg border">
                <h3 className="text-xl font-bold text-primary">{title}</h3>
                <p className="text-sm text-gray-500 mb-4">{description}</p>
                <div className="space-y-2">
                    {list.map((item, index) => (
                        <div key={item.id} className="flex gap-2 items-center">
                            <input
                                type="text"
                                placeholder="Descripción del costo"
                                value={item.name}
                                onChange={(e) => handleUpdateItem(type, item.id, 'name', e.target.value)}
                                className="w-full px-2 py-1 border border-gray-300 rounded-md"
                            />
                            <input
                                type="number"
                                placeholder="Monto"
                                value={item.amount || ''}
                                onChange={(e) => handleUpdateItem(type, item.id, 'amount', e.target.value)}
                                className="w-40 px-2 py-1 border border-gray-300 rounded-md"
                            />
                            <button onClick={() => handleRemoveItem(type, item.id)} className="text-red-500 hover:text-red-700 font-bold text-xl">&times;</button>
                        </div>
                    ))}
                </div>
                <Button onClick={() => handleAddItem(type)} className="text-sm mt-4 !py-1 !px-3 bg-gray-200 !text-gray-800 hover:!bg-gray-300">+ Agregar Fila</Button>
                <div className="text-right font-bold text-lg mt-4 pt-2 border-t">
                    Total {title}: {formatCurrency(total)}
                </div>
            </div>
        );
    };

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
                <h2 className="text-3xl font-bold text-primary">Calculadora de Costos</h2>
                <p className="text-gray-600 max-w-3xl mx-auto mt-2">Diferencia y suma tus costos fijos y variables para entender mejor la estructura financiera de tu negocio.</p>
            </div>
            
            <div ref={exportRef} className="p-4">
                <div className="grid md:grid-cols-2 gap-8">
                    {renderCostList('fixed')}
                    {renderCostList('variable')}
                </div>

                <div className="mt-8 bg-gray-50 p-4 rounded-lg border">
                    <h3 className="text-xl font-bold text-primary">Costo Variable por Unidad</h3>
                    <p className="text-sm text-gray-500 mb-4">Ingresa el total de unidades que produjiste con los costos variables listados arriba.</p>
                    <div className="flex items-center gap-4">
                        <Input label="Unidades Producidas" type="number" placeholder="Ej: 100" value={unitsProduced} onChange={e => setUnitsProduced(e.target.value)} />
                        {variableCostPerUnit !== null && (
                            <div className="mt-5 text-center">
                                <p className="font-semibold">Costo por Unidad:</p>
                                <p className="font-bold text-lg text-primary">{formatCurrency(variableCostPerUnit)}</p>
                            </div>
                        )}
                    </div>
                     <p className="text-xs text-gray-500 mt-2">Este valor es el que debes usar como "Costo Variable por Unidad" en la calculadora de Margen de Contribución.</p>
                </div>

                <div className="mt-8 text-center bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold">Costo Total de Operación</h3>
                    <p className="text-4xl font-bold text-primary my-2">{formatCurrency(grandTotal)}</p>
                    <p className="text-gray-600">Este es el monto total que necesitas para operar tu negocio en un período.</p>
                </div>
            </div>

            <div className="mt-8 flex justify-center items-center gap-4">
                <Button onClick={onComplete} disabled={!isComplete}>
                    {isComplete ? 'Completar Módulo y Ganar Puntos' : 'Ingresa al menos un costo fijo y uno variable'}
                </Button>
                <Button onClick={handleExportPDF} disabled={!isComplete} className="bg-primary hover:bg-primary/90">
                    <DownloadIcon className="w-5 h-5 mr-2 inline-block"/>
                    Exportar a PDF
                </Button>
            </div>
        </Card>
    );
};

export default CostCalculator;