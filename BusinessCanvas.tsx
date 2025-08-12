import React, { useRef } from 'react';
import Card from './ui/Card';
import Button from './ui/Button';
import Textarea from './ui/Textarea';
import { BusinessCanvasData, View } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { DownloadIcon, ChevronLeftIcon } from './ui/Icons';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface BusinessCanvasProps {
  onComplete: () => void;
  setView: (view: View) => void;
}

const canvasSections: { id: keyof BusinessCanvasData; title: string; placeholder: string }[] = [
  { id: 'keyPartners', title: 'Socios Clave', placeholder: '¿Quiénes son tus socios y proveedores clave?' },
  { id: 'keyActivities', title: 'Actividades Clave', placeholder: '¿Qué actividades clave requiere tu propuesta de valor?' },
  { id: 'valueProposition', title: 'Propuesta de Valor', placeholder: '¿Qué valor entregas a tus clientes? ¿Qué problema solucionas?' },
  { id: 'customerRelationships', title: 'Relación con Clientes', placeholder: '¿Qué tipo de relación esperas con tus clientes?' },
  { id: 'customerSegments', title: 'Segmentos de Clientes', placeholder: '¿Para quién estás creando valor? ¿Quiénes son tus clientes más importantes?' },
  { id: 'keyResources', title: 'Recursos Clave', placeholder: '¿Qué recursos clave requiere tu propuesta de valor?' },
  { id: 'channels', title: 'Canales', placeholder: '¿A través de qué canales quieres llegar a tus clientes?' },
  { id: 'costStructure', title: 'Estructura de Costos', placeholder: '¿Cuáles son los costos más importantes en tu modelo de negocio?' },
  { id: 'revenueStreams', title: 'Fuentes de Ingresos', placeholder: '¿Por qué valor están dispuestos a pagar tus clientes?' },
];

const BusinessCanvas: React.FC<BusinessCanvasProps> = ({ onComplete, setView }) => {
  const [data, setData] = useLocalStorage<BusinessCanvasData>('businessCanvasData', {
    keyPartners: '',
    keyActivities: '',
    valueProposition: '',
    customerRelationships: '',
    customerSegments: '',
    keyResources: '',
    channels: '',
    costStructure: '',
    revenueStreams: '',
  });
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleChange = (field: keyof BusinessCanvasData, value: string) => {
    setData(prev => ({ ...prev, [field]: value }));
  };
  
  const handleExportPDF = () => {
    if (!canvasRef.current) return;
    
    html2canvas(canvasRef.current, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'px',
            format: [canvas.width, canvas.height]
        });
        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
        pdf.save('lienzo-modelo-de-negocio.pdf');
    });
  };

  const isComplete = Object.values(data).every(value => value.trim() !== '');

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
        <h2 className="text-3xl font-bold text-primary">Lienzo de Modelo de Negocio</h2>
        <p className="text-gray-600 max-w-3xl mx-auto mt-2">Completa cada sección para visualizar tu modelo de negocio. Guarda tu progreso para ganar puntos.</p>
      </div>

      <div ref={canvasRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-white p-4">
        {canvasSections.map(section => (
          <div key={section.id} className="flex flex-col border border-gray-200 p-3 rounded-md">
            <h3 className="font-bold mb-2 text-primary">{section.title}</h3>
            <Textarea
              placeholder={section.placeholder}
              value={data[section.id]}
              onChange={(e) => handleChange(section.id, e.target.value)}
              className="flex-grow bg-light"
            />
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-center items-center gap-4">
        <Button onClick={onComplete} disabled={!isComplete}>
          {isComplete ? 'Completar Módulo y Ganar Puntos' : 'Completa todas las secciones para finalizar'}
        </Button>
         <Button onClick={handleExportPDF} className="bg-primary hover:bg-primary/90">
            <DownloadIcon className="w-5 h-5 mr-2 inline-block"/>
            Exportar a PDF
        </Button>
      </div>
    </Card>
  );
};

export default BusinessCanvas;