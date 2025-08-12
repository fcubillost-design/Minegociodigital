
import React from 'react';
import Modal from './ui/Modal';
import Button from './ui/Button';

interface OnboardingProps {
    onClose: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onClose }) => {
    return (
        <Modal title="¡Bienvenido a Gerenciando Mi Negocio!" onClose={onClose}>
            <div className="space-y-4 text-gray-700">
                <p>Esta es tu herramienta personal para llevar tu emprendimiento al siguiente nivel.</p>
                <p className="font-semibold">¿Cómo funciona?</p>
                <ul className="list-disc list-inside space-y-2">
                    <li><span className="font-bold text-primary">Completa Módulos:</span> Utiliza nuestras herramientas como el Lienzo de Negocio y la Calculadora de Punto de Equilibrio.</li>
                    <li><span className="font-bold text-accent">Gana Puntos y Medallas:</span> Al completar cada módulo, recibirás puntos y medallas que marcan tu progreso.</li>
                    <li><span className="font-bold text-secondary">Sube de Nivel:</span> Comienza como Principiante y avanza hasta convertirte en un experto.</li>
                </ul>
                <p className="text-sm bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-3 rounded-md">
                    <span className="font-bold">Importante:</span> Todos tus datos se guardan de forma segura y privada <span className="underline">directamente en este dispositivo</span>. No se envían a ningún servidor.
                </p>
                <div className="text-center pt-4">
                    <Button onClick={onClose}>¡Comenzar a Emprender!</Button>
                </div>
            </div>
        </Modal>
    );
};

export default Onboarding;
