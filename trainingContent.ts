export interface TrainingSection {
  id: string;
  title: string;
  content: string;
}

export interface TrainingModuleData {
  id: string;
  title: string;
  sections: TrainingSection[];
}

export const trainingModules: TrainingModuleData[] = [
  {
    id: "m1",
    title: "Módulo 1: Formaliza tu Idea",
    sections: [
      {
        id: "m1s1",
        title: "1. Mitos vs. Realidad de la Formalización",
        content: `
          <p class="mb-6 text-gray-600">Dar el paso de la idea a un negocio formal es la decisión más importante para un microempresario. Te protege, te da seriedad y te abre las puertas a un ecosistema de crecimiento que hoy te estás perdiendo.</p>
          <p class="text-gray-700 mb-4">Muchos microempresarios no se formalizan por miedo o desinformación. Aclaremos los puntos clave:</p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                  <p class="font-bold text-red-800">MITO: "Voy a pagar muchísimos impuestos y no me va a quedar nada."</p>
                  <p class="mt-2 text-sm text-gray-700"><strong>REALIDAD:</strong> En Chile, los regímenes tributarios para Pymes (como el Pro Pyme) están diseñados para que pagues impuestos sobre tus <strong>ganancias reales</strong>, no sobre tus ventas totales. Si un mes no tienes ganancias, no pagas impuesto a la renta. Además, el IVA que pagas por tus compras (insumos, mercadería) se descuenta del IVA que cobras por tus ventas, por lo que solo pagas la diferencia.</p>
              </div>
              <div class="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                  <p class="font-bold text-green-800">MITO: "Es un trámite muy caro y complicado, necesito un abogado."</p>
                  <p class="mt-2 text-sm text-gray-700"><strong>REALIDAD:</strong> Gracias a la plataforma "Tu Empresa en un Día", constituir una empresa hoy es <strong>gratis</strong>. El costo de la firma electrónica es bajo (aprox. $1.000 - $2.000) y el proceso está diseñado para que cualquier persona pueda hacerlo sin necesidad de un abogado. Los costos iniciales más relevantes son la patente municipal, que depende de cada comuna.</p>
              </div>
          </div>`
      },
      {
        id: "m1s2",
        title: "2. Tu Primera Gran Decisión: El Vehículo Legal",
        content: `<p class="text-gray-700 mb-2">¿Cómo te presentarás al mundo? Esta elección define cómo te proteges.</p>
          <div class="bg-gray-100 p-4 rounded-lg mb-2">
              <p class="font-bold">Opción A: Persona Natural con Giro (Inicio de Actividades con tu RUT)</p>
              <p class="text-sm text-gray-700"><strong>Ideal para:</strong> Probar una idea de negocio con mínima burocracia. Es el paso más simple. <strong>¡ALERTA MÁXIMA!</strong> Con esta opción, <strong>no hay separación entre tu patrimonio personal y el del negocio</strong>. Si adquieres una deuda con el negocio, podrían embargarte tu casa o tu auto personal para pagarla. Es un riesgo muy alto.</p>
          </div>
           <div class="bg-gray-100 p-4 rounded-lg mb-2">
              <p class="font-bold">Opción B: Empresa Individual de Responsabilidad Limitada (E.I.R.L.)</p>
              <p class="text-sm text-gray-700"><strong>Ideal para:</strong> Quienes emprenden solos y quieren la protección fundamental. Creas un RUT de empresa distinto al tuyo. <strong>Ventaja principal:</strong> Tu patrimonio personal queda 100% protegido. <strong>Desventaja:</strong> No puedes sumar socios en el futuro.</p>
          </div>
          <div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <p class="font-bold text-blue-800">Opción C (Recomendada): Sociedad por Acciones (SpA)</p>
              <p class="text-sm text-gray-700"><strong>Ideal para:</strong> La gran mayoría de microempresarios. Es la más flexible. Puedes empezar solo/a y, si el día de mañana quieres sumar un socio (un familiar, un amigo), simplemente le vendes acciones. <strong>Protege tu patrimonio igual que una EIRL</strong> y te da la flexibilidad para crecer. Es la opción más estratégica a largo plazo.</p>
          </div>`
      },
      {
        id: "m1s3",
        title: "3. El Proceso Paso a Paso (Sin Perderse)",
        content: `<ol class="list-decimal list-inside space-y-3 text-gray-700">
            <li><strong>Constituir la Empresa (Costo: $0 en el portal):</strong> Entra a <a href="https://www.registrodeempresasysociedades.cl" target="_blank" class="text-blue-600 hover:underline">Tu Empresa en un Día</a> con tu Clave Única. Elige "Constituir Sociedad" y selecciona SpA. El formulario te guiará. En "Objeto Social", sé amplio: describe todo lo que podrías llegar a hacer (ej: "la producción, comercialización y distribución de alimentos de todo tipo, así como la realización de eventos y la prestación de servicios de catering...").</li>
            <li><strong>Obtener el RUT e Iniciar Actividades (Costo: $0):</strong> Al terminar el paso anterior, el sistema te dará un RUT de empresa. Inmediatamente, ve a <a href="https://www.sii.cl" target="_blank" class="text-blue-600 hover:underline">sii.cl</a> -> Servicios Online -> RUT e Inicio de actividades -> Iniciar Actividades. Ingresa con el RUT de la empresa que acabas de crear.</li>
            <li><strong>Elegir Régimen Tributario:</strong> Durante el Inicio de Actividades, el SII te pedirá elegir un régimen. Para microempresarios, la opción más común y recomendada es el <strong>Régimen Pro Pyme Transparente</strong>. Con este régimen, la empresa no paga impuesto de primera categoría; las ganancias pasan directamente a los dueños y tú pagas el impuesto global complementario en tu declaración anual (si tus ingresos totales superan el tramo exento, que en 2024 es sobre ~$11 millones anuales).</li>
            <li><strong>Verificar Actividad y Domicilio (Costo: $0):</strong> El SII te pedirá acreditar tu domicilio. Si usas tu casa, necesitarás una autorización notarial del dueño o el contrato de arriendo. Este paso es crucial para poder emitir facturas.</li>
            <li><strong>Obtener la Patente Municipal (Costo: Variable):</strong> Con todo lo anterior listo, ve a la municipalidad de tu comuna. Te pedirán los documentos de la empresa y del SII. El costo de la patente es un porcentaje sobre el capital inicial que declaraste y se paga semestralmente. Este es tu "permiso para funcionar".</li>
        </ol>`
      },
      {
          id: "m1s4",
          title: "4. Ejemplo Práctico Real",
          content: `<div class="p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700">
                <p class="font-bold">Ejemplo Práctico Real</p>
                <p>Ana vende mermeladas caseras. Al principio, lo hacía informalmente. Un café le quiso hacer un pedido grande, pero le exigía factura. Ana decidió formalizarse. Creó "Delicias del Sur SpA" en Tu Empresa en un Día (costo $0). Inició actividades en el SII bajo el régimen Pro Pyme Transparente. Con su RUT de empresa, pudo abrir una Cuenta Emprendedor en el banco y contratar una máquina de Transbank. Ahora puede venderle al café, a otras tiendas y aceptar pagos con tarjeta en ferias, lo que duplicó sus ventas en 3 meses.</p>
            </div>`
      }
    ]
  },
  {
    id: "m2",
    title: "Módulo 2: Gestiona tu Negocio",
    sections: [
        {
            id: "m2s1",
            title: "1. Finanzas Clave: Más Allá de Sumar y Restar",
            content: `<p class="mb-6 text-gray-600">Tener un buen producto es solo el comienzo. La gestión es el motor que hace que tu negocio avance, crezca y sea rentable de verdad.</p>
            <ul class="list-disc list-inside space-y-2 text-gray-700">
                <li><strong>Flujo de Caja vs. Utilidad:</strong> ¡No son lo mismo! La <strong>utilidad</strong> es lo que te queda después de restar todos los costos a tus ventas (ganancia en el papel). El <strong>flujo de caja</strong> es el dinero real que entra y sale de tu cuenta. Puedes tener mucha utilidad pero no tener dinero para pagar sueldos si tus clientes te pagan a 60 días. ¡El flujo de caja es el oxígeno de tu negocio!</li>
                <li><strong>Costos Fijos vs. Variables:</strong> Entender esta diferencia es crucial. Los <strong>fijos</strong> los pagas sí o sí (arriendo, sueldos base, internet). Los <strong>variables</strong> dependen directamente de tu producción (materias primas, comisiones por venta).</li>
                <li><strong>El poder de un presupuesto simple:</strong> Proyecta tus ingresos y gastos para los próximos 3 meses. Esto te obliga a pensar en el futuro y te ayuda a tomar decisiones informadas, como saber si puedes contratar a alguien o comprar una nueva máquina.</li>
            </ul>`
        },
        {
            id: "m2s2",
            title: "2. El Arte de Poner Precios Rentables",
            content: `<p class="text-gray-700 mb-2">Fijar un precio no es adivinar. Es una decisión estratégica.</p>
            <ol class="list-decimal list-inside space-y-3 text-gray-700">
                <li><strong>Calcula tu Margen de Contribución:</strong> Es la clave. Se calcula así: <strong>Precio de Venta - Costo Variable Unitario</strong>. Este monto es lo que te queda de cada venta para cubrir tus costos fijos y generar utilidad. Si tu margen es bajo, necesitarás vender un volumen altísimo para ser rentable.</li>
                <li><strong>Define tu Posicionamiento:</strong> ¿Quieres ser el más barato, el de mejor calidad, el más rápido, el más exclusivo? Tu precio debe comunicar esa propuesta de valor. Un producto premium no puede tener un precio de liquidación.</li>
                <li><strong>Analiza el Valor Percibido:</strong> ¿Cuánto está dispuesto a pagar tu cliente por la solución que ofreces? A veces, un buen empaque, una historia potente o un excelente servicio post-venta permiten cobrar más que la competencia.</li>
            </ol>`
        },
        {
            id: "m2s3",
            title: "3. Marketing Inteligente para Microempresas",
            content: `<ul class="list-disc list-inside space-y-2 text-gray-700">
                <li><strong>Crea un Calendario de Contenidos:</strong> No publiques al azar. Planifica tu semana: Lunes de tips, Miércoles de mostrar el proceso, Viernes de promoción. Esto te ahorra tiempo y te hace ver más profesional.</li>
                <li><strong>La Regla del 80/20:</strong> El 80% de tu contenido debe aportar valor (educar, entretener, inspirar) y solo el 20% debe ser venta directa. La gente sigue a marcas que le aportan, no a catálogos de productos.</li>
                <li><strong>Colaboraciones estratégicas (Co-Marketing):</strong> Busca negocios que se dirijan a tu mismo cliente pero que no sean tu competencia. ¿Vendes café? Alíate con una pastelería del barrio para una promoción conjunta. Ambos ganan visibilidad.</li>
            </ul>`
        }
    ]
  },
  {
    id: "m3",
    title: "Módulo 3: Innovación y Sostenibilidad",
    sections: [
        {
            id: "m3s1",
            title: "1. Innovación Práctica: El Modelo Lean Startup",
            content: `<p class="mb-6 text-gray-600">Innovar es encontrar mejores formas de hacer las cosas. La sostenibilidad es asegurar que tu negocio pueda perdurar en el tiempo, generando un impacto positivo.</p>
            <p class="text-gray-700 mb-2">En vez de pasar meses desarrollando un producto perfecto, la innovación ágil se basa en el ciclo <strong>Crear -> Medir -> Aprender</strong>.</p>
            <ul class="list-disc list-inside space-y-2 text-gray-700">
                <li><strong>Producto Mínimo Viable (PMV):</strong> Crea la versión más simple posible de tu producto que solucione el problema principal de tu cliente. ¿Quieres lanzar una línea de 10 sabores de mermelada? Empieza con los 2 más populares.</li>
                <li><strong>Mide la respuesta:</strong> Lanza tu PMV a un grupo pequeño de clientes y mide su reacción. ¿Les gusta? ¿Qué cambiarían? ¿Pagarían por él?</li>
                <li><strong>Aprende y Pivota:</strong> Con esa información real, mejora tu producto o, si es necesario, "pivota" (cambia de dirección) antes de haber gastado todos tus recursos.</li>
            </ul>`
        },
        {
            id: "m3s2",
            title: "2. Sostenibilidad como Estrategia de Negocio",
            content: `<p class="text-gray-700 mb-2">El "triple impacto" (económico, social y ambiental) no es solo filantropía, es una ventaja competitiva.</p>
            <ul class="list-disc list-inside space-y-2 text-gray-700">
                <li><strong>Impacto Social Medible:</strong> Define métricas claras. Ej: "Comprar el 30% de nuestros insumos a proveedores de nuestra misma comuna" o "Contratar a 2 personas de la OMIL local".</li>
                <li><strong>Impacto Ambiental Inteligente:</strong> A menudo, ser ecológico también ahorra dinero. Reducir el embalaje disminuye costos, usar ampolletas LED baja la cuenta de la luz. Comunica estos esfuerzos a tus clientes.</li>
                <li><strong>Gobernanza y Transparencia:</strong> Ser sostenible también significa ser un negocio justo. Paga a tus proveedores a tiempo, ten contratos claros, sé transparente con tus clientes sobre tus ingredientes o procesos.</li>
            </ul>`
        },
        {
            id: "m3s3",
            title: "3. Kit de Herramientas Digitales Esenciales",
            content: `<ul class="list-disc list-inside space-y-2 text-gray-700">
                <li><strong>Diseño y Contenido:</strong> Usa <strong>Canva</strong> para crear gráficas profesionales para redes sociales sin ser diseñador.</li>
                <li><strong>Comunicación con Clientes:</strong> <strong>WhatsApp Business</strong> te permite crear un perfil de empresa, respuestas automáticas y catálogos de productos.</li>
                <li><strong>Ventas y Pagos:</strong> Herramientas como <strong>SumUp</strong> o <strong>Compraquí</strong> te permiten aceptar pagos con tarjeta de forma fácil y económica.</li>
             </ul>`
        }
    ]
  },
  {
    id: "m4",
    title: "Módulo 4: Liderazgo y Equipo",
    sections: [
        {
            id: "m4s1",
            title: "1. Autoliderazgo: El Activo más Importante",
            content: `<p class="mb-6 text-gray-600">Tu negocio crecerá hasta donde crezcas tú como líder. Liderar es influir, guiar y tomar decisiones, incluso cuando el único miembro del equipo eres tú.</p>
            <p class="text-gray-700 mb-2">Antes de liderar a otros, debes saber liderarte a ti mismo.</p>
            <ul class="list-disc list-inside space-y-2 text-gray-700">
                <li><strong>Gestión del Tiempo y Foco:</strong> Usa técnicas como el <strong>Time Blocking</strong> (asigna bloques de tiempo en tu calendario para tareas específicas) o la <strong>Técnica Pomodoro</strong> (trabaja en bloques de 25 minutos con descansos de 5) para evitar la procrastinación.</li>
                <li><strong>Mentalidad de Crecimiento:</strong> Entiende que tus habilidades no son fijas. Cada error es una oportunidad de aprendizaje. En lugar de decir "no soy bueno para las finanzas", di "necesito aprender más sobre finanzas".</li>
                <li><strong>Inteligencia Emocional:</strong> Reconoce tus emociones y no dejes que controlen tus decisiones. El estrés es normal, pero un líder sabe cuándo dar un paso atrás, respirar y tomar decisiones con la cabeza fría.</li>
            </ul>`
        },
        {
            id: "m4s2",
            title: "2. Construyendo tu Primer Equipo (Incluso de a dos)",
            content: `<ul class="list-disc list-inside space-y-2 text-gray-700">
                <li><strong>Delegar Tareas, no Responsabilidades:</strong> Delegar no es "deshacerse" de un problema. Es asignar una tarea clara, dar las herramientas necesarias y establecer un plazo. La responsabilidad final sigue siendo tuya.</li>
                <li><strong>Define Roles Claros:</strong> Incluso si es un familiar que te ayuda los fines de semana, define qué se espera de cada uno. "Tú te encargas de preparar los paquetes y yo de contactar a los clientes". La claridad evita conflictos.</li>
                <li><strong>El Feedback es un Regalo:</strong> Crea una cultura donde se pueda hablar abiertamente de lo que funciona y lo que no. Agradece cuando alguien te da una crítica constructiva.</li>
            </ul>`
        },
        {
            id: "m4s3",
            title: "3. El Poder Estratégico de las Redes",
            content: `<ul class="list-disc list-inside space-y-2 text-gray-700">
                <li><strong>Networking con Propósito:</strong> No se trata de coleccionar tarjetas. Cuando vayas a una feria o evento, ponte una meta: "Hoy quiero conocer a dos posibles proveedores y a un emprendedor que haga algo complementario a lo mío".</li>
                <li><strong>Cómo Pedir Ayuda a un Mentor:</strong> Sé específico y respetuoso de su tiempo. En lugar de "¿Me puedes ayudar con mi negocio?", prueba con "Admiro cómo manejas tus redes sociales. ¿Tendrías 15 minutos para darme un consejo sobre cómo mejorar mi perfil de Instagram?".</li>
                <li><strong>Construye tu Comunidad:</strong> Participa activamente en grupos de emprendedores de tu comuna o rubro. Ofrece ayuda antes de pedirla. Compartir tu conocimiento es la forma más rápida de construir una red sólida.</li>
            </ul>`
        }
    ]
  }
];
