import React, { useState, useRef } from 'react';
import Card from './ui/Card';
import Input from './ui/Input';
import Button from './ui/Button';
import { View, InventoryItem } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { ChevronLeftIcon, DownloadIcon } from './ui/Icons';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface InventoryProps {
    onComplete: () => void;
    setView: (view: View) => void;
}

const Inventory: React.FC<InventoryProps> = ({ onComplete, setView }) => {
    const [items, setItems] = useLocalStorage<InventoryItem[]>('inventoryItems', []);
    const [newItem, setNewItem] = useState({ name: '', quantity: '', threshold: '' });
    const exportRef = useRef<HTMLDivElement>(null);
    
    const handleAddItem = (e: React.FormEvent) => {
        e.preventDefault();
        if (newItem.name && newItem.quantity) {
            setItems(prev => [
                ...prev,
                { 
                    id: crypto.randomUUID(), 
                    name: newItem.name,
                    quantity: parseInt(newItem.quantity) || 0,
                    threshold: parseInt(newItem.threshold) || 0,
                }
            ]);
            setNewItem({ name: '', quantity: '', threshold: '' });
        }
    };

    const handleUpdateItem = (id: string, field: keyof Omit<InventoryItem, 'id'>, value: string) => {
        setItems(prev => prev.map(item => 
            item.id === id ? { ...item, [field]: field === 'name' ? value : parseInt(value) || 0 } : item
        ));
    };

    const handleRemoveItem = (id: string) => {
        setItems(prev => prev.filter(item => item.id !== id));
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
            pdf.save('reporte-inventario.pdf');
        });
    };

    const isComplete = items.length > 0;

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
                <h2 className="text-3xl font-bold text-primary">Gestión de Inventario</h2>
                <p className="text-gray-600 max-w-3xl mx-auto mt-2">Lleva un control de tus productos o materias primas. Define umbrales de stock bajo para saber cuándo reponer.</p>
            </div>

            <div className="max-w-4xl mx-auto">
                <form onSubmit={handleAddItem} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end bg-gray-50 p-4 rounded-lg mb-6">
                    <Input label="Nombre del Producto" placeholder="Ej: Mermelada de Fresa" value={newItem.name} onChange={e => setNewItem(p => ({...p, name: e.target.value}))} />
                    <Input label="Cantidad Actual" type="number" placeholder="Ej: 50" value={newItem.quantity} onChange={e => setNewItem(p => ({...p, quantity: e.target.value}))} />
                    <Input label="Umbral Stock Bajo" type="number" placeholder="Ej: 10" value={newItem.threshold} onChange={e => setNewItem(p => ({...p, threshold: e.target.value}))} />
                    <Button type="submit" className="w-full">Agregar Producto</Button>
                </form>

                <div ref={exportRef} className="p-2">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Producto</th>
                                    <th scope="col" className="px-6 py-3">Cantidad Actual</th>
                                    <th scope="col" className="px-6 py-3">Umbral Stock Bajo</th>
                                    <th scope="col" className="px-6 py-3 sr-only">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.length > 0 ? items.map(item => {
                                    const isLowStock = item.quantity <= item.threshold;
                                    return (
                                        <tr key={item.id} className={`bg-white border-b ${isLowStock ? 'bg-red-50' : ''}`}>
                                            <td className="px-6 py-4 font-medium text-gray-900">
                                                <input type="text" value={item.name} onChange={e => handleUpdateItem(item.id, 'name', e.target.value)} className="w-full bg-transparent p-1 -m-1 rounded focus:ring-1 focus:ring-primary focus:bg-white"/>
                                            </td>
                                            <td className="px-6 py-4">
                                                <input type="number" value={item.quantity} onChange={e => handleUpdateItem(item.id, 'quantity', e.target.value)} className={`w-24 bg-transparent p-1 -m-1 rounded focus:ring-1 focus:ring-primary focus:bg-white ${isLowStock ? 'font-bold text-red-600' : ''}`} />
                                            </td>
                                            <td className="px-6 py-4">
                                                <input type="number" value={item.threshold} onChange={e => handleUpdateItem(item.id, 'threshold', e.target.value)} className="w-24 bg-transparent p-1 -m-1 rounded focus:ring-1 focus:ring-primary focus:bg-white" />
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button onClick={() => handleRemoveItem(item.id)} className="font-medium text-red-600 hover:underline">Eliminar</button>
                                            </td>
                                        </tr>
                                    );
                                }) : (
                                    <tr>
                                        <td colSpan={4} className="text-center py-8 text-gray-500">Aún no has agregado productos a tu inventario.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="mt-8 flex justify-center items-center gap-4">
                <Button onClick={onComplete} disabled={!isComplete}>
                    {isComplete ? 'Completar Módulo y Ganar Puntos' : 'Agrega tu primer producto para completar'}
                </Button>
                 <Button onClick={handleExportPDF} disabled={!isComplete} className="bg-primary hover:bg-primary/90">
                    <DownloadIcon className="w-5 h-5 mr-2 inline-block"/>
                    Exportar Inventario a PDF
                </Button>
            </div>
        </Card>
    );
};

export default Inventory;