import React, { useRef, useMemo } from 'react';
import Card from './ui/Card';
import Button from './ui/Button';
import Input from './ui/Input';
import Textarea from './ui/Textarea';
import { View, MonthlyReportData } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { DownloadIcon, ChevronLeftIcon } from './ui/Icons';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface MonthlyReportProps {
  onComplete: () => void;
  setView: (view: View) => void;
}

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(value);
};

const MonthlyReport: React.FC<MonthlyReportProps> = ({ onComplete, setView }) => {
  const [data, setData] = useLocalStorage<MonthlyReportData>('monthlyReportData', {
    month: '',
    totalSales: 0,
    totalExpenses: 0,
    newCustomers: 0,
    achievements: '',
    challenges: '',
    goalsForNextMonth: '',
  });
  const personalReportRef = useRef<HTMLDivElement>(null);
  const dlcReportRef = useRef<HTMLDivElement>(null);

  const profit = useMemo(() => data.totalSales - data.totalExpenses, [data.totalSales, data.totalExpenses]);

  const handleChange = (field: keyof MonthlyReportData, value: string | number) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const handleExport = (type: 'personal' | 'dlc') => {
    const element = type === 'personal' ? personalReportRef.current : dlcReportRef.current;
    const filename = type === 'personal' ? 'reporte-mensual-personal.pdf' : 'reporte-mensual-desafio.pdf';
    
    if (!element) return;

    // We make it visible just for rendering, then hide it again.
    element.style.display = 'block';
    
    html2canvas(element, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'px',
            format: 'a4'
        });
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(filename);
        element.style.display = 'none'; // Hide it back
    });
  };

  const isComplete = data.month.trim() !== '' && data.totalSales > 0;

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
        <h2 className="text-3xl font-bold text-primary">Reporte Mensual de Resultados</h2>
        <p className="text-gray-600 max-w-3xl mx-auto mt-2">Completa este reporte al final de cada mes para seguir tu progreso, identificar mejoras y planificar el futuro.</p>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Mes y Año del Reporte" placeholder="Ej: Julio 2024" value={data.month} onChange={e => handleChange('month', e.target.value)} />
            <Input label="Nuevos Clientes Conseguidos" type="number" value={data.newCustomers || ''} onChange={e => handleChange('newCustomers', parseInt(e.target.value) || 0)} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 border rounded-lg">
            <Input label="Total Ventas ($)" type="number" value={data.totalSales || ''} onChange={e => handleChange('totalSales', parseInt(e.target.value) || 0)} />
            <Input label="Total Gastos ($)" type="number" value={data.totalExpenses || ''} onChange={e => handleChange('totalExpenses', parseInt(e.target.value) || 0)} />
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ganancia / Pérdida</label>
                <div className={`w-full px-3 py-2 rounded-md ${profit >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {formatCurrency(profit)}
                </div>
            </div>
        </div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Logros del Mes</label>
                <Textarea placeholder="Ej: Logré vender en una nueva feria, mejoré el empaque de mi producto..." value={data.achievements} onChange={e => handleChange('achievements', e.target.value)} />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Desafíos del Mes</label>
                <Textarea placeholder="Ej: Tuve problemas con un proveedor, un cliente quedó insatisfecho..." value={data.challenges} onChange={e => handleChange('challenges', e.target.value)} />
            </div>
         </div>
         <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Metas para el Próximo Mes</label>
            <Textarea placeholder="Ej: Contactar a 3 nuevas tiendas, reducir el costo de materia prima, publicar 5 veces en redes sociales..." value={data.goalsForNextMonth} onChange={e => handleChange('goalsForNextMonth', e.target.value)} />
         </div>

      </div>

      <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
        <Button onClick={onComplete} disabled={!isComplete}>
          {isComplete ? 'Completar y Ganar Puntos' : 'Ingresa Mes y Ventas para completar'}
        </Button>
        <Button onClick={() => handleExport('personal')} disabled={!isComplete} className="bg-primary hover:bg-primary/90">
            <DownloadIcon className="w-5 h-5 mr-2 inline-block"/>
            Descargar mi Reporte PDF
        </Button>
        <div className="text-center">
            <Button onClick={() => handleExport('dlc')} disabled={!isComplete} className="bg-gray-600 hover:bg-gray-700">
                <DownloadIcon className="w-5 h-5 mr-2 inline-block"/>
                Generar PDF para Desafío
            </Button>
            <p className="text-xs text-gray-500 mt-1">(Opcional, para seguimiento)</p>
        </div>
      </div>

       {/* Hidden elements for PDF generation */}
       <div style={{ display: 'none' }}>
            <div ref={personalReportRef} className="p-10 font-sans" style={{ width: '800px'}}>
                <h1 className="text-3xl font-bold text-primary mb-2">Reporte Mensual de Resultados</h1>
                <h2 className="text-xl font-semibold mb-6">{data.month}</h2>
                <div className="grid grid-cols-3 gap-6 mb-6 text-center">
                    <div className="p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm text-gray-600">Total Ventas</p>
                        <p className="text-2xl font-bold">{formatCurrency(data.totalSales)}</p>
                    </div>
                    <div className="p-4 bg-red-50 rounded-lg">
                        <p className="text-sm text-gray-600">Total Gastos</p>
                        <p className="text-2xl font-bold">{formatCurrency(data.totalExpenses)}</p>
                    </div>
                    <div className={`p-4 rounded-lg ${profit >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
                        <p className="text-sm text-gray-600">Ganancia / Pérdida</p>
                        <p className="text-2xl font-bold">{formatCurrency(profit)}</p>
                    </div>
                </div>
                 <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Nuevos Clientes Conseguidos este Mes</p>
                    <p className="text-2xl font-bold">{data.newCustomers}</p>
                </div>
                <div className="space-y-6">
                    <div><h3 className="text-lg font-semibold border-b pb-1 mb-2">Logros del Mes</h3><p className="whitespace-pre-wrap">{data.achievements}</p></div>
                    <div><h3 className="text-lg font-semibold border-b pb-1 mb-2">Desafíos del Mes</h3><p className="whitespace-pre-wrap">{data.challenges}</p></div>
                    <div><h3 className="text-lg font-semibold border-b pb-1 mb-2">Metas para el Próximo Mes</h3><p className="whitespace-pre-wrap">{data.goalsForNextMonth}</p></div>
                </div>
            </div>

             <div ref={dlcReportRef} className="p-10 font-sans" style={{ width: '800px'}}>
                <div className="flex justify-between items-center border-b pb-4 mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-primary">Reporte de Seguimiento para Desafío Levantemos Chile</h1>
                        <p className="text-sm">Generado voluntariamente por el emprendedor</p>
                    </div>
                    <p className="text-lg font-semibold">{data.month}</p>
                </div>
                <div className="grid grid-cols-2 gap-6 mb-6">
                    <div className="p-4 bg-gray-100 rounded-lg">
                        <p className="font-semibold">Ventas del Mes:</p>
                        <p className="text-xl">{formatCurrency(data.totalSales)}</p>
                    </div>
                     <div className="p-4 bg-gray-100 rounded-lg">
                        <p className="font-semibold">Ganancia / Pérdida:</p>
                        <p className="text-xl">{formatCurrency(profit)}</p>
                    </div>
                     <div className="p-4 bg-gray-100 rounded-lg">
                        <p className="font-semibold">Nuevos Clientes:</p>
                        <p className="text-xl">{data.newCustomers}</p>
                    </div>
                </div>
                 <div className="space-y-6">
                    <div><h3 className="text-lg font-semibold border-b pb-1 mb-2">Principal Logro del Mes:</h3><p className="whitespace-pre-wrap text-sm">{data.achievements}</p></div>
                    <div><h3 className="text-lg font-semibold border-b pb-1 mb-2">Principal Desafío Enfrentado:</h3><p className="whitespace-pre-wrap text-sm">{data.challenges}</p></div>
                </div>
                <div className="mt-8 text-center text-xs text-gray-500">
                    <p>Este documento es una herramienta para medir impacto y levantar alertas tempranas. ¡Gracias por compartir tu progreso!</p>
                </div>
            </div>
       </div>
    </Card>
  );
};

export default MonthlyReport;