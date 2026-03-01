"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Volume2, RotateCcw, Trophy, BookOpen, Users, CheckCircle, XCircle, Play, Home, Award } from "lucide-react";

// ==================== BANCO DE 50 PREGUNTAS ====================
const bancoPreguntas = [
  // UNIDAD 1.1: REGÍMENES POLÍTICOS
  {
    id: 1,
    pregunta: "Un régimen político donde el poder se concentra en una autoridad central, con pluralismo limitado pero sin controlar toda la vida privada, se denomina:",
    opciones: ["Totalitarismo", "Autoritarismo", "Democracia", "Anarquía"],
    correcta: 1,
    unidad: "Regímenes Políticos"
  },
  {
    id: 2,
    pregunta: "El sistema político que ejerce control absoluto sobre TODOS los aspectos de la vida social, política y económica se llama:",
    opciones: ["Democracia participativa", "Autoritarismo", "Totalitarismo", "Monarquía"],
    correcta: 2,
    unidad: "Regímenes Políticos"
  },
  {
    id: 3,
    pregunta: "¿Cuál es una característica del culto a la personalidad en regímenes totalitarios?",
    opciones: ["Elecciones libres y competitivas", "Exaltación exagerada del líder como figura divina", "Pluralismo político", "Autonomía de los medios de comunicación"],
    correcta: 1,
    unidad: "Regímenes Políticos"
  },
  {
    id: 4,
    pregunta: "La censura en regímenes autoritarios tiene como objetivo principal:",
    opciones: ["Promover la libertad de expresión", "Controlar la información y evitar la crítica", "Fortalecer la democracia", "Crear espacios de debate público"],
    correcta: 1,
    unidad: "Regímenes Políticos"
  },
  {
    id: 5,
    pregunta: "¿Qué diferencia principal existe entre autoritarismo y totalitarismo?",
    opciones: ["El autoritarismo tolera ciertos espacios de autonomía social", "El totalitarismo permite partidos de oposición", "El autoritarismo tiene ideología más elaborada", "Ambos son sistemas democráticos"],
    correcta: 0,
    unidad: "Regímenes Políticos"
  },
  {
    id: 6,
    pregunta: "El golpe de Estado es:",
    opciones: ["Un proceso electoral democrático", "Una ruptura del orden constitucional para tomar el poder", "Una reforma constitucional", "Un mecanismo de participación ciudadana"],
    correcta: 1,
    unidad: "Regímenes Políticos"
  },
  {
    id: 7,
    pregunta: "El terrorismo de Estado incluye prácticas como:",
    opciones: ["Elecciones libres", "Desapariciones forzadas y torturas", "Respeto a los derechos humanos", "Libertad de prensa"],
    correcta: 1,
    unidad: "Regímenes Políticos"
  },
  {
    id: 8,
    pregunta: "La propaganda en regímenes totalitarios se caracteriza por:",
    opciones: ["Ser objetiva y veraz", "Simplificar mensajes y apelar emocionalmente", "Promover el pensamiento crítico", "Respetar la diversidad de opiniones"],
    correcta: 1,
    unidad: "Regímenes Políticos"
  },
  // UNIDAD 1.2: ESTADO Y DERECHOS HUMANOS
  {
    id: 9,
    pregunta: "Según Max Weber, el Estado se define como la organización que tiene:",
    opciones: ["El monopolio de la violencia legítima", "El control de la economía", "El poder de los medios", "La autoridad religiosa"],
    correcta: 0,
    unidad: "Estado y Derechos Humanos"
  },
  {
    id: 10,
    pregunta: "La soberanía popular significa que:",
    opciones: ["El poder emana del pueblo", "El gobierno es permanente", "Las leyes no pueden cambiar", "Solo el presidente decide"],
    correcta: 0,
    unidad: "Estado y Derechos Humanos"
  },
  {
    id: 11,
    pregunta: "Los tres tipos de legitimidad según Max Weber son:",
    opciones: ["Política, económica y social", "Tradicional, carismática y racional-legal", "Democrática, autoritaria y totalitaria", "Federal, departamental y municipal"],
    correcta: 1,
    unidad: "Estado y Derechos Humanos"
  },
  {
    id: 12,
    pregunta: "El Estado de derecho implica que:",
    opciones: ["Solo el gobierno está por encima de la ley", "Todos están sometidos a la ley", "Las leyes solo aplican a los ciudadanos", "No hay leyes escritas"],
    correcta: 1,
    unidad: "Estado y Derechos Humanos"
  },
  {
    id: 13,
    pregunta: "Los derechos humanos se caracterizan por ser:",
    opciones: ["Privilegios para algunos grupos", "Universales, inalienables e interdependientes", "Opcionales según el país", "Temporales y revocables"],
    correcta: 1,
    unidad: "Estado y Derechos Humanos"
  },
  {
    id: 14,
    pregunta: "La dignidad humana es:",
    opciones: ["Un derecho que se puede perder", "El valor intrínseco de toda persona", "Un privilegio del gobierno", "Una norma constitucional"],
    correcta: 1,
    unidad: "Estado y Derechos Humanos"
  },
  {
    id: 15,
    pregunta: "La acción de tutela en Colombia sirve para:",
    opciones: ["Crear nuevas leyes", "Proteger derechos fundamentales de forma rápida", "Modificar la Constitución", "Elegir al presidente"],
    correcta: 1,
    unidad: "Estado y Derechos Humanos"
  },
  {
    id: 16,
    pregunta: "El bloque de constitucionalidad en Colombia incluye:",
    opciones: ["Solo la Constitución Política", "Tratados de derechos humanos con rango constitucional", "Solo las leyes ordinarias", "Únicamente decretos presidenciales"],
    correcta: 1,
    unidad: "Estado y Derechos Humanos"
  },
  // UNIDAD 1.3: DEMOCRACIA Y GLOBALIZACIÓN
  {
    id: 17,
    pregunta: "La democracia directa se caracteriza porque:",
    opciones: ["Los ciudadanos eligen representantes", "Los ciudadanos deciden directamente sobre los asuntos públicos", "Solo vota el congreso", "El presidente toma todas las decisiones"],
    correcta: 1,
    unidad: "Democracia y Globalización"
  },
  {
    id: 18,
    pregunta: "La globalización ha generado que los Estados:",
    opciones: ["Tengan más control sobre sus economías", "Pierdan parte de su soberanía para regular", "Se fortalezcan como actores únicos", "Eliminen las fronteras completamente"],
    correcta: 1,
    unidad: "Democracia y Globalización"
  },
  {
    id: 19,
    pregunta: "El neoliberalismo promueve principalmente:",
    opciones: ["La expansión del Estado", "La desregulación de mercados y privatizaciones", "El fortalecimiento de los servicios públicos", "La protección de los trabajadores"],
    correcta: 1,
    unidad: "Democracia y Globalización"
  },
  {
    id: 20,
    pregunta: "La sociedad civil está conformada por:",
    opciones: ["Solo partidos políticos", "Organizaciones, ONG, sindicatos y movimientos sociales", "Únicamente el gobierno", "Las fuerzas militares"],
    correcta: 1,
    unidad: "Democracia y Globalización"
  },
  {
    id: 21,
    pregunta: "Los derechos económicos, sociales y culturales (DESC) incluyen:",
    opciones: ["Solo el derecho al voto", "Derechos a salud, educación, vivienda y trabajo", "Únicamente la libertad de expresión", "Solo derechos políticos"],
    correcta: 1,
    unidad: "Democracia y Globalización"
  },
  {
    id: 22,
    pregunta: "El Estado de bienestar busca:",
    opciones: ["Reducir los servicios públicos", "Garantizar condiciones mínimas de vida digna", "Eliminar la seguridad social", "Privatizar toda la educación"],
    correcta: 1,
    unidad: "Democracia y Globalización"
  },
  {
    id: 23,
    pregunta: "La gobernanza global se caracteriza por ser:",
    opciones: ["Centralizada en un solo país", "Multinivel, multiactor y fragmentada", "Controlada solo por Estados Unidos", "Una institución única mundial"],
    correcta: 1,
    unidad: "Democracia y Globalización"
  },
  {
    id: 24,
    pregunta: "La democracia deliberativa propone que las decisiones políticas provengan de:",
    opciones: ["Solo el presidente", "Procesos de diálogo y discusión entre ciudadanos", "Mandatos militares", "Decisiones unilaterales del gobierno"],
    correcta: 1,
    unidad: "Democracia y Globalización"
  },
  // UNIDAD 1.4: DEMOCRACIA EN AMÉRICA LATINA
  {
    id: 25,
    pregunta: "La democracia delegativa, según O'Donnell, se caracteriza por:",
    opciones: ["Fuerte accountability horizontal", "Presidentes que gobiernan sin restricciones institucionales", "Plena separación de poderes", "Amplia participación ciudadana"],
    correcta: 1,
    unidad: "Democracia en América Latina"
  },
  {
    id: 26,
    pregunta: "El clientelismo político afecta la democracia porque:",
    opciones: ["Fortalece la participación ciudadana", "Genera dependencia y distorsiona la representación", "Promueve la transparencia", "Mejora los servicios públicos"],
    correcta: 1,
    unidad: "Democracia en América Latina"
  },
  {
    id: 27,
    pregunta: "La calidad de la democracia se mide por:",
    opciones: ["Solo por la cantidad de elecciones", "Participación, rendición de cuentas y Estado de derecho", "Únicamente por el PIB", "La cantidad de partidos políticos"],
    correcta: 1,
    unidad: "Democracia en América Latina"
  },
  {
    id: 28,
    pregunta: "El populismo en América Latina se caracteriza por:",
    opciones: ["Fortalecer las instituciones", "Apelar directamente al pueblo contra \"la élite\"", "Respetar los controles institucionales", "Promover el diálogo multipartidista"],
    correcta: 1,
    unidad: "Democracia en América Latina"
  },
  {
    id: 29,
    pregunta: "La accountability horizontal se refiere a:",
    opciones: ["El voto de los ciudadanos", "Control entre instituciones del Estado", "Las protestas sociales", "Los medios de comunicación"],
    correcta: 1,
    unidad: "Democracia en América Latina"
  },
  {
    id: 30,
    pregunta: "Las olas de democratización según Huntington:",
    opciones: ["Son procesos únicos e irreversibles", "Son períodos históricos de transición a democracia", "Solo ocurren en Europa", "Son golpe de Estado"],
    correcta: 1,
    unidad: "Democracia en América Latina"
  },
  // ENFOQUE DIFERENCIAL Y DERECHOS
  {
    id: 31,
    pregunta: "El enfoque diferencial reconoce que ciertos grupos necesitan:",
    opciones: ["El mismo tratamiento que todos", "Protección especial por su situación de vulnerabilidad", "Menos derechos que otros", "Exclusión de las políticas públicas"],
    correcta: 1,
    unidad: "Enfoque Diferencial"
  },
  {
    id: 32,
    pregunta: "La interseccionalidad permite comprender:",
    opciones: ["Un solo tipo de discriminación", "Cómo se combinan múltiples formas de discriminación", "Que no existe discriminación", "Solo la discriminación de género"],
    correcta: 1,
    unidad: "Enfoque Diferencial"
  },
  {
    id: 33,
    pregunta: "La Ley 70 de 1993 en Colombia reconoce derechos a:",
    opciones: ["Los trabajadores", "Las comunidades afrocolombianas", "Los extranjeros", "Los empresarios"],
    correcta: 1,
    unidad: "Enfoque Diferencial"
  },
  {
    id: 34,
    pregunta: "El Convenio 169 de la OIT establece el derecho a:",
    opciones: ["La consulta previa a pueblos indígenas", "La propiedad privada", "La minería sin restricciones", "La urbanización de territorios"],
    correcta: 0,
    unidad: "Enfoque Diferencial"
  },
  {
    id: 35,
    pregunta: "Los ajustes razonables para personas con discapacidad son:",
    opciones: ["Gastos innecesarios", "Modificaciones para garantizar derechos en igualdad", "Privilegios especiales", "Tratamientos médicos"],
    correcta: 1,
    unidad: "Enfoque Diferencial"
  },
  {
    id: 36,
    pregunta: "La violencia basada en género afecta principalmente a:",
    opciones: ["Todos por igual", "Las mujeres por su condición de género", "Solo a hombres", "Únicamente a adultos mayores"],
    correcta: 1,
    unidad: "Enfoque Diferencial"
  },
  {
    id: 37,
    pregunta: "El feminicidio es:",
    opciones: ["Un homicidio común", "El asesinato de una mujer por su condición de género", "Un delito menor", "Una forma de violencia psicológica"],
    correcta: 1,
    unidad: "Enfoque Diferencial"
  },
  {
    id: 38,
    pregunta: "La identidad de género se refiere a:",
    opciones: ["El sexo biológico", "La vivencia personal del género", "La orientación sexual", "La apariencia física únicamente"],
    correcta: 1,
    unidad: "Enfoque Diferencial"
  },
  // JUSTICIA TRANSICIONAL Y MEMORIA
  {
    id: 39,
    pregunta: "La justicia transicional busca:",
    opciones: ["Olvidar el pasado", "Abordar violaciones masivas de derechos y construir paz", "Impunidad para los victimarios", "Silenciar a las víctimas"],
    correcta: 1,
    unidad: "Justicia Transicional"
  },
  {
    id: 40,
    pregunta: "La memoria histórica tiene como objetivo:",
    opciones: ["Ocultar las violaciones", "Esclarecer la verdad y reconocer a las víctimas", "Justificar la violencia", "Culpabilizar a las víctimas"],
    correcta: 1,
    unidad: "Justicia Transicional"
  },
  {
    id: 41,
    pregunta: "La Jurisdicción Especial para la Paz (JEP) en Colombia es:",
    opciones: ["Un tribunal ordinario", "Un tribunal especial para el conflicto armado", "Una corte militar", "Un organismo internacional"],
    correcta: 1,
    unidad: "Justicia Transicional"
  },
  {
    id: 42,
    pregunta: "El principio de no repetición en justicia transicional significa:",
    opciones: ["Olvidar lo ocurrido", "Garantizar que las violaciones no vuelvan a ocurrir", "Perdonar todos los crímenes", "Impedir nuevas elecciones"],
    correcta: 1,
    unidad: "Justicia Transicional"
  },
  // MIGRACIÓN Y DERECHOS
  {
    id: 43,
    pregunta: "Un refugiado es aquella persona que:",
    opciones: ["Viaja por turismo", "Huye de su país por persecución o conflicto", "Busca mejores oportunidades económicas", "Estudia en el extranjero"],
    correcta: 1,
    unidad: "Migración y Derechos"
  },
  {
    id: 44,
    pregunta: "El principio de no devolución establece que:",
    opciones: ["Se debe devolver al migrante a su país", "No se puede devolver a un refugiado donde su vida esté en peligro", "Los refugiados deben ser expulsados", "No hay protección para migrantes"],
    correcta: 1,
    unidad: "Migración y Derechos"
  },
  {
    id: 45,
    pregunta: "La trata de personas es:",
    opciones: ["Una forma de migración legal", "Un delito de lesa humanidad con fines de explotación", "Un acuerdo laboral", "Un servicio de transporte"],
    correcta: 1,
    unidad: "Migración y Derechos"
  },
  // NIÑEZ Y ADOLESCENCIA
  {
    id: 46,
    pregunta: "El interés superior del niño significa que:",
    opciones: ["Los niños deciden todo", "El bienestar del niño prevalece en las decisiones", "Los padres tienen toda la autoridad", "El gobierno decide por los niños"],
    correcta: 1,
    unidad: "Niñez y Adolescencia"
  },
  {
    id: 47,
    pregunta: "El Código de Infancia y Adolescencia en Colombia es la Ley:",
    opciones: ["Ley 100 de 1993", "Ley 1098 de 2006", "Ley 1448 de 2011", "Ley 1751 de 2015"],
    correcta: 1,
    unidad: "Niñez y Adolescencia"
  },
  {
    id: 48,
    pregunta: "La corresponsabilidad en la protección de la niñez implica:",
    opciones: ["Solo el Estado es responsable", "Estado, familia y sociedad comparten la responsabilidad", "Solo los padres son responsables", "No hay responsabilidades claras"],
    correcta: 1,
    unidad: "Niñez y Adolescencia"
  },
  // GÉNERO Y EQUIDAD
  {
    id: 49,
    pregunta: "El empoderamiento de las mujeres implica:",
    opciones: ["Dependencia de los hombres", "Fortalecimiento en posición social, económica y política", "Exclusión de espacios públicos", "Subordinación familiar"],
    correcta: 1,
    unidad: "Género y Equidad"
  },
  {
    id: 50,
    pregunta: "La brecha de género se refiere a:",
    opciones: ["La igualdad total entre hombres y mujeres", "Las disparidades entre hombres y mujeres en diversos ámbitos", "Diferencias biológicas únicamente", "Ventajas de las mujeres sobre los hombres"],
    correcta: 1,
    unidad: "Género y Equidad"
  }
];

// ==================== INTERFAZ DE RESULTADOS ====================
interface ResultadoExamen {
  nombre: string;
  fecha: string;
  aciertos: number;
  total: number;
  porcentaje: number;
  aprobado: boolean;
  tiempo: number;
}

// ==================== COMPONENTE PRINCIPAL ====================
export default function ExamenTeoriaPolitica() {
  const [pantalla, setPantalla] = useState<"inicio" | "registro" | "examen" | "resultado" | "historial">("inicio");
  const [nombreEstudiante, setNombreEstudiante] = useState("");
  const [preguntasExamen, setPreguntasExamen] = useState<typeof bancoPreguntas>([]);
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [respuestas, setRespuestas] = useState<number[]>([]);
  const [tiempoInicio, setTiempoInicio] = useState(0);
  const [historial, setHistorial] = useState<ResultadoExamen[]>([]);
  const [mostrarRetroalimentacion, setMostrarRetroalimentacion] = useState(false);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState<number | null>(null);

  // Cargar historial del localStorage
  useEffect(() => {
    const historialGuardado = localStorage.getItem("historialExamenes");
    if (historialGuardado) {
      setHistorial(JSON.parse(historialGuardado));
    }
  }, []);

  // Función para leer pregunta en voz alta
  const hablar = useCallback((texto: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(texto);
      utterance.lang = "es-CO";
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  }, []);

  // Función para mezclar array (Fisher-Yates)
  const mezclarArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Generar examen aleatorio
  const generarExamen = () => {
    const preguntasAleatorias = mezclarArray(bancoPreguntas).slice(0, 20).map(p => {
      // Crear array de índices [0, 1, 2, 3] y mezclarlos
      const indices = mezclarArray([0, 1, 2, 3]);
      // Crear nuevas opciones en el orden mezclado
      const nuevasOpciones = indices.map(i => p.opciones[i]);
      // Encontrar el nuevo índice de la respuesta correcta
      const nuevoIndiceCorrecto = indices.indexOf(p.correcta);
      
      return {
        ...p,
        opciones: nuevasOpciones,
        indiceCorrecto: nuevoIndiceCorrecto
      };
    });
    
    setPreguntasExamen(preguntasAleatorias);
    setRespuestas(new Array(20).fill(-1));
    setPreguntaActual(0);
    setTiempoInicio(Date.now());
    setMostrarRetroalimentacion(false);
    setRespuestaSeleccionada(null);
  };

  // Iniciar examen
  const iniciarExamen = () => {
    if (nombreEstudiante.trim().length >= 3) {
      generarExamen();
      setPantalla("examen");
    }
  };

  // Seleccionar respuesta
  const seleccionarRespuesta = (indice: number) => {
    const nuevasRespuestas = [...respuestas];
    nuevasRespuestas[preguntaActual] = indice;
    setRespuestas(nuevasRespuestas);
    setRespuestaSeleccionada(indice);
    setMostrarRetroalimentacion(true);
    
    // Reproducir sonido de feedback
    const esCorrecta = indice === preguntasExamen[preguntaActual].indiceCorrecto;
    hablar(esCorrecta ? "¡Correcto!" : "Incorrecto");
  };

  // Siguiente pregunta
  const siguientePregunta = () => {
    if (preguntaActual < 19) {
      setPreguntaActual(preguntaActual + 1);
      setMostrarRetroalimentacion(false);
      setRespuestaSeleccionada(null);
    } else {
      finalizarExamen();
    }
  };

  // Finalizar examen
  const finalizarExamen = () => {
    const aciertos = respuestas.filter((r, i) => r === preguntasExamen[i].indiceCorrecto).length;
    const porcentaje = (aciertos / 20) * 100;
    const tiempo = Math.round((Date.now() - tiempoInicio) / 1000);
    
    const resultado: ResultadoExamen = {
      nombre: nombreEstudiante,
      fecha: new Date().toLocaleString("es-CO"),
      aciertos,
      total: 20,
      porcentaje,
      aprobado: porcentaje >= 60,
      tiempo
    };

    const nuevoHistorial = [...historial, resultado];
    setHistorial(nuevoHistorial);
    localStorage.setItem("historialExamenes", JSON.stringify(nuevoHistorial));
    setPantalla("resultado");
  };

  // Reiniciar examen
  const reiniciarExamen = () => {
    generarExamen();
    setPantalla("examen");
  };

  // Calcular progreso
  const progreso = ((preguntaActual + 1) / 20) * 100;
  const pregunta = preguntasExamen[preguntaActual];

  // ==================== PANTALLA INICIO ====================
  if (pantalla === "inicio") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-900 via-emerald-800 to-cyan-900 relative overflow-hidden">
        {/* Imagen de fondo */}
        <div 
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{ backgroundImage: "url('/rio-bajo-cauca.png')" }}
        />
        
        {/* Decorativos */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-teal-300/20 rounded-full blur-3xl" />
        
        <div className="relative z-10 container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-teal-100 text-sm mb-6">
              <BookOpen className="w-4 h-4" />
              <span>Preparación Pruebas Saber Pro</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              Teoría Política y<br/>
              <span className="text-yellow-300">Derechos Humanos</span>
            </h1>
            
            <p className="text-xl text-teal-100 mb-2">
              Programa de Trabajo Social
            </p>
            <p className="text-lg text-yellow-200">
              📍 Zaragoza, Antioquia - Bajo Cauca
            </p>
            <p className="text-teal-200 mt-2">
              Profesor: Roger Arias
            </p>
          </div>

          {/* Tarjetas principales */}
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
            {/* Iniciar Examen */}
            <Card 
              className="bg-white/95 backdrop-blur cursor-pointer hover:scale-105 transition-all duration-300 shadow-2xl border-4 border-yellow-400"
              onClick={() => setPantalla("registro")}
            >
              <CardContent className="pt-8 pb-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Play className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Iniciar Examen</h2>
                <p className="text-gray-600">20 preguntas aleatorias</p>
                <p className="text-sm text-teal-600 mt-2">60% para aprobar</p>
              </CardContent>
            </Card>

            {/* Ver Historial */}
            <Card 
              className="bg-white/95 backdrop-blur cursor-pointer hover:scale-105 transition-all duration-300 shadow-xl border-2 border-teal-300"
              onClick={() => setPantalla("historial")}
            >
              <CardContent className="pt-8 pb-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Trophy className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Mi Historial</h2>
                <p className="text-gray-600">Ver intentos anteriores</p>
                <Badge className="mt-2 bg-teal-100 text-teal-800">
                  {historial.length} intentos
                </Badge>
              </CardContent>
            </Card>

            {/* Información */}
            <Card className="bg-white/95 backdrop-blur shadow-xl border-2 border-emerald-300">
              <CardContent className="pt-8 pb-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Características</h2>
                <ul className="text-left text-sm text-gray-600 space-y-2 px-4">
                  <li>✅ Preguntas aleatorias</li>
                  <li>✅ Intentos ilimitados</li>
                  <li>✅ Audio para cada pregunta</li>
                  <li>✅ Fuente grande y clara</li>
                  <li>✅ Resultados inmediatos</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Info adicional */}
          <div className="text-center text-white/80 text-sm">
            <p>🌊 Cultura ribereña del Bajo Cauca Antioqueño</p>
            <p className="mt-1">Minería, ríos, pesca y tradiciones afrocolombianas</p>
          </div>
        </div>
      </div>
    );
  }

  // ==================== PANTALLA REGISTRO ====================
  if (pantalla === "registro") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-900 via-emerald-800 to-cyan-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white/95 backdrop-blur shadow-2xl border-2 border-yellow-400">
          <CardHeader className="text-center pb-2">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl text-gray-800">Registro del Estudiante</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Escribe tu nombre completo:
              </label>
              <input
                type="text"
                value={nombreEstudiante}
                onChange={(e) => setNombreEstudiante(e.target.value)}
                placeholder="Ej: María García López"
                className="w-full px-4 py-4 text-xl border-2 border-teal-300 rounded-xl focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200"
              />
            </div>

            <div className="bg-teal-50 p-4 rounded-xl">
              <h3 className="font-bold text-teal-800 mb-2">📋 Instrucciones del Examen:</h3>
              <ul className="text-teal-700 space-y-1 text-sm">
                <li>• 20 preguntas aleatorias del glosario</li>
                <li>• Cada pregunta tiene 4 opciones</li>
                <li>• Necesitas 12 respuestas correctas (60%)</li>
                <li>• Puedes intentar las veces que quieras</li>
                <li>• Usa el botón 🔊 para escuchar la pregunta</li>
              </ul>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setPantalla("inicio")}
                className="flex-1 py-4 text-lg"
              >
                ← Volver
              </Button>
              <Button
                onClick={iniciarExamen}
                disabled={nombreEstudiante.trim().length < 3}
                className="flex-1 py-4 text-lg bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold disabled:opacity-50"
              >
                Comenzar →
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ==================== PANTALLA EXAMEN ====================
  if (pantalla === "examen" && pregunta) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-900 via-emerald-800 to-cyan-900 p-4">
        <div className="max-w-3xl mx-auto">
          {/* Header del examen */}
          <div className="flex items-center justify-between mb-4">
            <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-xl shadow-lg">
              <span className="text-teal-800 font-bold text-lg">
                Pregunta {preguntaActual + 1} de 20
              </span>
            </div>
            <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-xl shadow-lg">
              <span className="text-gray-700">
                👤 {nombreEstudiante}
              </span>
            </div>
          </div>

          {/* Barra de progreso */}
          <div className="mb-6">
            <Progress value={progreso} className="h-3 bg-white/30" />
            <div className="flex justify-between mt-1 text-white/80 text-sm">
              <span>Progreso</span>
              <span>{Math.round(progreso)}%</span>
            </div>
          </div>

          {/* Tarjeta de pregunta */}
          <Card className="bg-white/95 backdrop-blur shadow-2xl border-2 border-teal-300 mb-6">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <Badge className="bg-teal-100 text-teal-800 text-sm">
                  {pregunta.unidad}
                </Badge>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => hablar(pregunta.pregunta + ". " + pregunta.opciones.join(". "))}
                  className="border-2 border-yellow-400 hover:bg-yellow-50"
                >
                  <Volume2 className="w-6 h-6 text-yellow-600" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-xl md:text-2xl font-medium text-gray-800 leading-relaxed mb-6">
                {pregunta.pregunta}
              </p>

              {/* Opciones */}
              <div className="space-y-3">
                {pregunta.opciones.map((opcion, indice) => {
                  let estilo = "border-2 border-gray-200 hover:border-teal-400 hover:bg-teal-50";
                  
                  if (mostrarRetroalimentacion) {
                    if (indice === pregunta.indiceCorrecto) {
                      estilo = "border-2 border-green-500 bg-green-50";
                    } else if (indice === respuestaSeleccionada && indice !== pregunta.indiceCorrecto) {
                      estilo = "border-2 border-red-500 bg-red-50";
                    }
                  }

                  return (
                    <button
                      key={indice}
                      onClick={() => !mostrarRetroalimentacion && seleccionarRespuesta(indice)}
                      disabled={mostrarRetroalimentacion}
                      className={`w-full p-4 md:p-5 text-left text-lg md:text-xl rounded-xl transition-all duration-200 ${estilo} ${!mostrarRetroalimentacion && "cursor-pointer"}`}
                    >
                      <span className="font-bold text-teal-600 mr-3">
                        {String.fromCharCode(65 + indice)}.
                      </span>
                      {opcion}
                      {mostrarRetroalimentacion && indice === pregunta.indiceCorrecto && (
                        <CheckCircle className="inline-block ml-2 w-6 h-6 text-green-600" />
                      )}
                      {mostrarRetroalimentacion && indice === respuestaSeleccionada && indice !== pregunta.indiceCorrecto && (
                        <XCircle className="inline-block ml-2 w-6 h-6 text-red-600" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Retroalimentación */}
              {mostrarRetroalimentacion && (
                <div className={`mt-6 p-4 rounded-xl ${respuestaSeleccionada === pregunta.indiceCorrecto ? "bg-green-100 border-2 border-green-300" : "bg-orange-100 border-2 border-orange-300"}`}>
                  <p className="text-lg font-bold">
                    {respuestaSeleccionada === pregunta.indiceCorrecto ? "✅ ¡Correcto!" : "❌ Incorrecto"}
                  </p>
                  <p className="text-gray-700 mt-1">
                    Respuesta correcta: {pregunta.opciones[pregunta.indiceCorrecto]}
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter className="pt-4">
              <Button
                onClick={siguientePregunta}
                disabled={!mostrarRetroalimentacion}
                className="w-full py-5 text-xl font-bold bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white disabled:opacity-50"
              >
                {preguntaActual < 19 ? "Siguiente Pregunta →" : "Ver Resultado 🏆"}
              </Button>
            </CardFooter>
          </Card>

          {/* Indicador de respuestas */}
          <div className="flex flex-wrap gap-2 justify-center">
            {respuestas.map((r, i) => (
              <div
                key={i}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  i === preguntaActual
                    ? "bg-yellow-400 text-gray-800 ring-2 ring-yellow-200"
                    : r >= 0
                    ? preguntasExamen[i] && r === preguntasExamen[i].indiceCorrecto
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                    : "bg-white/50 text-gray-600"
                }`}
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ==================== PANTALLA RESULTADO ====================
  if (pantalla === "resultado") {
    const aciertos = respuestas.filter((r, i) => r === preguntasExamen[i].indiceCorrecto).length;
    const porcentaje = (aciertos / 20) * 100;
    const aprobado = porcentaje >= 60;
    const tiempo = Math.round((Date.now() - tiempoInicio) / 1000);
    const minutos = Math.floor(tiempo / 60);
    const segundos = tiempo % 60;

    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-900 via-emerald-800 to-cyan-900 flex items-center justify-center p-4">
        <Card className={`w-full max-w-lg bg-white/95 backdrop-blur shadow-2xl ${aprobado ? "border-4 border-green-400" : "border-4 border-orange-400"}`}>
          <CardContent className="pt-8 pb-8 text-center">
            {/* Icono grande */}
            <div className={`w-28 h-28 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl ${aprobado ? "bg-gradient-to-br from-green-400 to-emerald-600" : "bg-gradient-to-br from-orange-400 to-red-500"}`}>
              {aprobado ? (
                <Award className="w-16 h-16 text-white" />
              ) : (
                <RotateCcw className="w-16 h-16 text-white" />
              )}
            </div>

            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {aprobado ? "¡FELICITACIONES!" : "¡SIGUE INTENTANDO!"}
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              {nombreEstudiante}
            </p>

            {/* Resultado */}
            <div className="bg-gray-100 rounded-2xl p-6 mb-6">
              <div className="text-6xl font-bold mb-2" style={{ color: aprobado ? "#16a34a" : "#ea580c" }}>
                {porcentaje}%
              </div>
              <p className="text-lg text-gray-600">
                {aciertos} respuestas correctas de 20
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Tiempo: {minutos}:{segundos.toString().padStart(2, "0")}
              </p>
            </div>

            {/* Mensaje */}
            <div className={`p-4 rounded-xl mb-6 ${aprobado ? "bg-green-100" : "bg-orange-100"}`}>
              <p className={`text-lg ${aprobado ? "text-green-800" : "text-orange-800"}`}>
                {aprobado 
                  ? "🎉 Has aprobado el examen. ¡Excelente trabajo!" 
                  : "📚 Repasa el glosario y vuelve a intentarlo. ¡Tú puedes!"}
              </p>
            </div>

            {/* Botones */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setPantalla("inicio")}
                className="flex-1 py-4 text-lg"
              >
                <Home className="w-5 h-5 mr-2" />
                Inicio
              </Button>
              <Button
                onClick={reiniciarExamen}
                className={`flex-1 py-4 text-lg font-bold text-white ${aprobado ? "bg-gradient-to-r from-green-500 to-emerald-600" : "bg-gradient-to-r from-orange-500 to-red-500"}`}
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Nuevo Intento
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ==================== PANTALLA HISTORIAL ====================
  if (pantalla === "historial") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-900 via-emerald-800 to-cyan-900 p-4">
        <div className="max-w-3xl mx-auto">
          <Button
            variant="outline"
            onClick={() => setPantalla("inicio")}
            className="mb-6 bg-white/90"
          >
            ← Volver al Inicio
          </Button>

          <Card className="bg-white/95 backdrop-blur shadow-2xl">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Trophy className="w-6 h-6 text-yellow-500" />
                Historial de Intentos
              </CardTitle>
            </CardHeader>
            <CardContent>
              {historial.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Trophy className="w-16 h-16 mx-auto mb-4 opacity-30" />
                  <p className="text-xl">No hay intentos registrados</p>
                  <p className="text-sm mt-2">¡Realiza tu primer examen!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {historial.slice().reverse().map((resultado, indice) => (
                    <div
                      key={indice}
                      className={`p-4 rounded-xl border-2 ${
                        resultado.aprobado 
                          ? "border-green-300 bg-green-50" 
                          : "border-orange-300 bg-orange-50"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-bold text-lg">{resultado.nombre}</p>
                          <p className="text-sm text-gray-600">{resultado.fecha}</p>
                        </div>
                        <div className="text-right">
                          <p className={`text-2xl font-bold ${resultado.aprobado ? "text-green-600" : "text-orange-600"}`}>
                            {resultado.porcentaje}%
                          </p>
                          <p className="text-sm text-gray-600">
                            {resultado.aciertos}/20 correctas
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 flex justify-between items-center">
                        <Badge className={resultado.aprobado ? "bg-green-200 text-green-800" : "bg-orange-200 text-orange-800"}>
                          {resultado.aprobado ? "✅ Aprobado" : "❌ No aprobado"}
                        </Badge>
                        <span className="text-sm text-gray-500">
                          ⏱️ {Math.floor(resultado.tiempo / 60)}:{(resultado.tiempo % 60).toString().padStart(2, "0")}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {historial.length > 0 && (
                <Button
                  variant="destructive"
                  onClick={() => {
                    if (confirm("¿Estás seguro de borrar todo el historial?")) {
                      localStorage.removeItem("historialExamenes");
                      setHistorial([]);
                    }
                  }}
                  className="w-full mt-6"
                >
                  Borrar Historial
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return null;
}
