document.addEventListener('DOMContentLoaded', () => {
    const quizData = [
        // --- PREGUNTAS GENERALES ---
        {
            question: "¿Qué tipo de protocolo es EIGRP?",
            options: ["Protocolo de estado de enlace", "Protocolo de vector distancia avanzado", "Protocolo de gateway exterior", "Protocolo de capa 2"],
            correctAnswerIndex: 1,
            explanation: "Incorrecto. EIGRP es clasificado como un protocolo de vector distancia avanzado, que combina características de protocolos de vector distancia y de estado de enlace.",
            page: "5"
        },
        {
            question: "¿Qué empresa diseñó originalmente el protocolo EIGRP?",
            options: ["Juniper Networks", "IETF", "Cisco Systems", "Microsoft"],
            correctAnswerIndex: 2,
            explanation: "Incorrecto. EIGRP es un protocolo de enrutamiento dinámico diseñado por Cisco Systems.",
            page: "5"
        },
        {
            question: "A diferencia de RIP que solo usa saltos, EIGRP utiliza una:",
            options: ["Métrica basada en costo", "Métrica compuesta", "Métrica de ancho de banda simple", "Métrica de confiabilidad única"],
            correctAnswerIndex: 1,
            explanation: "Incorrecto. EIGRP considera múltiples variables para determinar la mejor ruta, lo cual se conoce como métrica compuesta.",
            page: "5"
        },
        {
            question: "Desde 2013, EIGRP se puede usar fuera del ecosistema de Cisco, aunque su uso sigue siendo mayoritario en redes de esta marca. ¿Verdadero o Falso?",
            options: ["Verdadero", "Falso"],
            correctAnswerIndex: 0,
            explanation: "Incorrecto. Es verdadero. Desde su apertura parcial en 2013, EIGRP puede usarse en entornos que no son exclusivamente de Cisco.",
            page: "5"
        },
        {
            question: "¿Para qué tipo de redes es ideal EIGRP?",
            options: ["Redes pequeñas y domésticas", "Redes de mediana a gran escala", "Únicamente redes de proveedores de servicios", "Redes con equipos de múltiples fabricantes"],
            correctAnswerIndex: 1,
            explanation: "Incorrecto. EIGRP es altamente eficiente, escalable y confiable para redes de mediana a gran escala.",
            page: "5"
        },
        // --- ALGORITMO DUAL ---
        {
            question: "¿Cuál es el algoritmo central del protocolo EIGRP?",
            options: ["Algoritmo SPF (Dijkstra)", "Algoritmo de Bellman-Ford", "Algoritmo DUAL (Diffusing Update Algorithm)", "Algoritmo de Kruskal"],
            correctAnswerIndex: 2,
            explanation: "Incorrecto. El algoritmo DUAL es el núcleo de EIGRP, garantizando una convergencia rápida y sin bucles.",
            page: "5"
        },
        {
            question: "En DUAL, ¿qué es el 'Successor'?",
            options: ["Cualquier ruta de respaldo", "La mejor ruta conocida hacia un destino", "La ruta con más saltos", "La ruta informada por el vecino más cercano"],
            correctAnswerIndex: 1,
            explanation: "Incorrecto. El 'Successor' es la mejor ruta conocida hacia un destino, es la que se instala en la tabla de enrutamiento.",
            page: "5"
        },
        {
            question: "En DUAL, la 'Feasible Distance' (FD) es:",
            options: ["La métrica informada por un vecino hacia un destino.", "La métrica total hasta el destino, medida desde el router actual.", "El número de saltos hasta el destino.", "La confiabilidad de la ruta."],
            correctAnswerIndex: 1,
            explanation: "Incorrecto. La 'Feasible Distance' (FD) es la métrica total calculada desde el router actual hasta el destino.",
            page: "5"
        },
        {
            question: "Para que una ruta califique como 'Feasible Successor', ¿qué condición debe cumplir?",
            options: ["Su Reported Distance (RD) debe ser mayor que la Feasible Distance (FD) de la ruta actual.", "Su Reported Distance (RD) debe ser menor que la Feasible Distance (FD) de la ruta actual.", "Debe tener el mismo ancho de banda que el Successor.", "Debe ser anunciada por al menos dos vecinos."],
            correctAnswerIndex: 1,
            explanation: "Incorrecto. Una ruta califica como Feasible Successor solo si su Reported Distance (RD) es menor que la Feasible Distance (FD) de la ruta actual (Successor), para garantizar una ruta libre de bucles.",
            page: "5"
        },
        {
            question: "¿Cuál es la principal ventaja de tener un 'Feasible Successor'?",
            options: ["Reduce el consumo de memoria.", "Permite balanceo de carga automáticamente.", "Si la ruta principal falla, se activa inmediatamente sin necesidad de recalcular la topología.", "Mejora la seguridad de la red."],
            correctAnswerIndex: 2,
            explanation: "Incorrecto. Gracias al Feasible Successor, si una ruta principal falla, el router puede activar esta ruta de respaldo de inmediato, minimizando el tiempo de interrupción.",
            page: "6"
        },
        {
            question: "En DUAL, la 'Reported Distance' (RD) es:",
            options: ["La métrica calculada por el propio router.", "La métrica informada por un router vecino hacia un destino.", "La suma de todos los delays de la ruta.", "El ancho de banda mínimo de la ruta."],
            correctAnswerIndex: 1,
            explanation: "Incorrecto. La 'Reported Distance' (RD) es la métrica que un router vecino anuncia o informa que tiene hacia una red de destino.",
            page: "5"
        },
        // --- TABLAS INTERNAS ---
        {
            question: "¿Qué información contiene la 'Tabla de vecinos' de EIGRP?",
            options: ["Todas las rutas conocidas en la red.", "Solo las mejores rutas hacia cada destino.", "La lista de routers EIGRP directamente conectados.", "La configuración de las interfaces."],
            correctAnswerIndex: 2,
            explanation: "Incorrecto. La Tabla de vecinos contiene una lista de los routers EIGRP que están directamente conectados y con los que se ha establecido adyacencia.",
            page: "6"
        },
        {
            question: "¿Cómo mantiene EIGRP la comunicación con sus vecinos?",
            options: ["Mediante paquetes LSA.", "Mediante paquetes Hello.", "Mediante pings constantes.", "Mediante actualizaciones completas de la tabla de enrutamiento."],
            correctAnswerIndex: 1,
            explanation: "Incorrecto. La tabla de vecinos se mantiene mediante el envío y recepción de paquetes Hello periódicos.",
            page: "6"
        },
        {
            question: "La 'Tabla de topología' en EIGRP contiene:",
            options: ["Solo la mejor ruta (Successor).", "Solo las rutas de respaldo (Feasible Successors).", "Todas las rutas conocidas, incluyendo Successors y Feasible Successors.", "Únicamente la lista de vecinos."],
            correctAnswerIndex: 2,
            explanation: "Incorrecto. La Tabla de topología almacena todas las rutas conocidas hacia cada destino, incluyendo las mejores (Successors) y las de respaldo (Feasible Successors).",
            page: "6"
        },
        {
            question: "La 'Tabla de enrutamiento' se genera a partir de la:",
            options: ["Tabla de vecinos.", "Tabla de topología.", "Configuración manual del administrador.", "Información recibida por RIP."],
            correctAnswerIndex: 1,
            explanation: "Incorrecto. La Tabla de enrutamiento, que contiene solo las mejores rutas, se genera a partir de la información procesada por DUAL en la Tabla de topología.",
            page: "6"
        },
        // --- OTRAS CARACTERÍSTICAS ---
        {
            question: "Las actualizaciones de EIGRP son:",
            options: ["Completas y periódicas.", "Parciales y no periódicas.", "Completas y no periódicas.", "Parciales y periódicas."],
            correctAnswerIndex: 1,
            explanation: "Incorrecto. EIGRP solo envía actualizaciones cuando ocurre un cambio en la topología (no periódicas) y solo envía la información sobre el cambio (parciales).",
            page: "7"
        },
        {
            question: "¿Qué dirección multicast utiliza EIGRP para enviar actualizaciones a sus vecinos?",
            options: ["224.0.0.5", "224.0.0.9", "224.0.0.10", "255.255.255.255"],
            correctAnswerIndex: 2,
            explanation: "Incorrecto. EIGRP utiliza la dirección multicast 224.0.0.10 para comunicarse eficientemente solo con otros routers EIGRP.",
            page: "7"
        },
        {
            question: "EIGRP es un protocolo 'sin clase' (classless), lo que significa que soporta:",
            options: ["Únicamente redes de Clase A, B y C.", "Solo subredes de longitud fija.", "VLSM y CIDR.", "Protocolos antiguos como IPX únicamente."],
            correctAnswerIndex: 2,
            explanation: "Incorrecto. Al ser un protocolo sin clase, EIGRP es compatible con VLSM (Máscaras de Subred de Longitud Variable) y CIDR, permitiendo un uso eficiente del direccionamiento IP.",
            page: "7"
        },
        {
            question: "¿Qué mecanismo de autenticación puede usar EIGRP para asegurar el intercambio de información?",
            options: ["WEP", "WPA2", "SSL", "MD5"],
            correctAnswerIndex: 3,
            explanation: "Incorrecto. EIGRP permite configurar autenticación mediante MD5 para asegurar que solo routers autorizados puedan formar adyacencias.",
            page: "7"
        },
        {
            question: "Comparado con protocolos de estado de enlace como OSPF, EIGRP generalmente consume:",
            options: ["Más recursos de CPU y memoria.", "Menos recursos de CPU y memoria.", "La misma cantidad de recursos.", "Recursos variables dependiendo del fabricante."],
            correctAnswerIndex: 1,
            explanation: "Incorrecto. Debido a su eficiencia en las actualizaciones y el cálculo de rutas, EIGRP tiende a consumir menos CPU y memoria.",
            page: "7"
        },
        // --- MÉTRICA COMPUESTA ---
        {
            question: "Por defecto, ¿qué dos parámetros utiliza EIGRP para calcular su métrica?",
            options: ["Load y Reliability", "Bandwidth y Delay", "MTU y Hop Count", "Delay y Load"],
            correctAnswerIndex: 1,
            explanation: "Incorrecto. Por defecto, EIGRP solo utiliza el ancho de banda (bandwidth) mínimo y la suma de retardos (delay) para calcular su métrica.",
            page: "8"
        },
        {
            question: "En la métrica de EIGRP, ¿qué representa el 'Bandwidth'?",
            options: ["El ancho de banda promedio a lo largo del trayecto.", "El ancho de banda máximo a lo largo del trayecto.", "El ancho de banda mínimo (más bajo) a lo largo del trayecto.", "La suma de todos los anchos de banda."],
            correctAnswerIndex: 2,
            explanation: "Incorrecto. El parámetro 'Bandwidth' en la fórmula de la métrica corresponde al ancho de banda más bajo de todos los enlaces en la ruta hacia el destino.",
            page: "8"
        },
        {
            question: "¿En qué unidades se mide el 'Delay' para la métrica de EIGRP?",
            options: ["Milisegundos (ms)", "Segundos (s)", "Nanosegundos (ns)", "Microsegundos (μs)"],
            correctAnswerIndex: 3,
            explanation: "Incorrecto. El 'Delay' se mide como la suma de los retardos de cada interfaz en la ruta, expresado en microsegundos.",
            page: "8"
        },
        {
            question: "Los parámetros 'Load' y 'Reliability' se utilizan en el cálculo de la métrica por defecto. ¿Verdadero o Falso?",
            options: ["Verdadero", "Falso"],
            correctAnswerIndex: 1,
            explanation: "Incorrecto. Es falso. Los parámetros 'Load' y 'Reliability' no se utilizan por defecto en el cálculo de la métrica.",
            page: "8"
        },
        {
            question: "¿Cómo puede un administrador de red hacer que EIGRP utilice 'Load' y 'Reliability' en su métrica?",
            options: ["No es posible, esos valores son solo informativos.", "Mediante la modificación de los coeficientes K.", "Aumentando el ancho de banda de la interfaz.", "Cambiando la dirección multicast."],
            correctAnswerIndex: 1,
            explanation: "Incorrecto. El uso de 'Load' y 'Reliability' se puede activar modificando manualmente los valores de los coeficientes K (K1 a K5).",
            page: "8"
        },
        {
            question: "El parámetro MTU (Unidad Máxima de Transmisión) es utilizado activamente en el cálculo de la métrica de EIGRP. ¿Verdadero o Falso?",
            options: ["Verdadero", "Falso"],
            correctAnswerIndex: 1,
            explanation: "Incorrecto. Es falso. Aunque EIGRP registra el MTU de la ruta, no lo emplea directamente en la fórmula para calcular la métrica.",
            page: "8"
        },
        {
            question: "En el ejemplo de la Tabla 3, ¿por qué la Ruta C es elegida como la mejor a pesar de tener el mayor delay?",
            options: ["Porque tiene el menor ancho de banda.", "Porque el delay no es un factor importante.", "Porque su ancho de banda es significativamente superior, lo que resulta en una métrica total más baja.", "Porque tiene menos saltos."],
            correctAnswerIndex: 2,
            explanation: "Incorrecto. La Ruta C es elegida porque su alto ancho de banda compensa su mayor delay, resultando en la métrica calculada más baja de las tres opciones.",
            page: "9"
        },
        // --- VENTAJAS Y DESVENTAJAS ---
        {
            question: "¿Cuál es una de las principales ventajas de EIGRP mencionada en el documento?",
            options: ["Es un estándar abierto de la IETF.", "Su configuración es muy compleja.", "Convergencia rápida gracias a DUAL.", "Uso elevado de ancho de banda para actualizaciones."],
            correctAnswerIndex: 2,
            explanation: "Incorrecto. Una de sus ventajas más destacadas es la convergencia rápida, que evita loops y pérdida de paquetes gracias al algoritmo DUAL.",
            page: "9"
        },
        {
            question: "El hecho de que EIGRP solo envíe actualizaciones parciales cuando hay cambios es una ventaja porque:",
            options: ["Aumenta la seguridad.", "Reduce el uso de ancho de banda.", "Simplifica el cálculo de la métrica.", "Garantiza compatibilidad con RIP."],
            correctAnswerIndex: 1,
            explanation: "Incorrecto. Esta característica reduce significativamente el consumo de ancho de banda en la red en comparación con protocolos que envían tablas completas periódicamente.",
            page: "9"
        },
        {
            question: "La facilidad de configuración de EIGRP es una ventaja, especialmente en qué tipo de entornos?",
            options: ["Redes con equipos de múltiples marcas.", "Redes muy pequeñas de menos de 3 routers.", "Redes de proveedores de servicio (ISP).", "Redes pequeñas o medianas, especialmente en entornos Cisco."],
            correctAnswerIndex: 3,
            explanation: "Incorrecto. EIGRP es considerado más sencillo de implementar que OSPF en redes de tamaño pequeño o mediano, sobre todo si se usan equipos Cisco.",
            page: "9"
        },
        {
            question: "¿Cuál es una de las principales desventajas de EIGRP?",
            options: ["Su convergencia es muy lenta.", "No soporta VLSM.", "Es un protocolo propietario (parcialmente) de Cisco.", "Utiliza una métrica muy simple."],
            correctAnswerIndex: 2,
            explanation: "Incorrecto. Su principal desventaja histórica es ser un protocolo propietario de Cisco, lo que limita la interoperabilidad en redes heterogéneas.",
            page: "10"
        },
        {
            question: "En redes muy grandes y jerárquicas, OSPF puede ofrecer mayor control y segmentación que EIGRP. ¿Verdadero o Falso?",
            options: ["Verdadero", "Falso"],
            correctAnswerIndex: 0,
            explanation: "Incorrecto. Es verdadero. Aunque EIGRP es escalable, en redes de gran tamaño, el diseño jerárquico de OSPF con áreas puede ofrecer un mayor control.",
            page: "10"
        },
        // --- COMPARACIÓN Y ANÁLISIS ---
        {
            question: "En dispositivos Cisco, ¿qué protocolo tiene una Distancia Administrativa (AD) más baja (preferida): EIGRP interno u OSPF?",
            options: ["OSPF (AD 110)", "EIGRP interno (AD 90)", "Ambos tienen la misma AD", "Depende de la configuración"],
            correctAnswerIndex: 1,
            explanation: "Incorrecto. EIGRP interno tiene una AD de 90, mientras que OSPF tiene 110. Un valor más bajo es preferido, por lo que Cisco considera a EIGRP más confiable.",
            page: "15"
        },
        {
            question: "En un entorno con equipos de múltiples marcas (multivendor), ¿qué protocolo es generalmente preferido por su interoperabilidad?",
            options: ["EIGRP", "OSPF", "RIPv1", "IGRP"],
            correctAnswerIndex: 1,
            explanation: "Incorrecto. En entornos multivendor, OSPF es preferido por su carácter de estándar abierto, lo que garantiza la compatibilidad entre equipos de diferentes fabricantes.",
            page: "19"
        },
        {
            question: "Para una red de proveedor de servicios (ISP), ¿qué protocolo se recomienda en el documento?",
            options: ["EIGRP por su simplicidad.", "OSPF por su segmentación avanzada y soporte robusto.", "RIP por su bajo consumo de recursos.", "Ninguno, se debe usar enrutamiento estático."],
            correctAnswerIndex: 1,
            explanation: "Incorrecto. Para un ISP, se recomienda OSPF debido a su segmentación avanzada, capacidad de redistribución y soporte robusto para IPv6.",
            page: "20"
        },
        // --- PACKET TRACER (CONCEPTUAL) ---
        {
            question: "En la configuración de EIGRP en un router Cisco, el comando `router eigrp 10` inicia el proceso. ¿Qué representa el número 10?",
            options: ["La métrica por defecto.", "El número de vecinos permitidos.", "El número del sistema autónomo (AS).", "La distancia administrativa."],
            correctAnswerIndex: 2,
            explanation: "Incorrecto. El número 10 en `router eigrp 10` representa el número del sistema autónomo. Todos los routers en el mismo dominio EIGRP deben tener el mismo número de AS para poder comunicarse.",
            page: "26"
        },
        {
            question: "El comando `network 192.168.0.0 0.0.0.7` en la configuración de EIGRP utiliza una wildcard mask. ¿Qué significa esta máscara?",
            options: ["Especifica que solo la IP 192.168.0.0 participará.", "Indica al router que ignore los primeros 3 bits de la dirección.", "Define el rango de direcciones IP en cuyas interfaces se activará EIGRP.", "Es un error de sintaxis, se debe usar una máscara de subred."],
            correctAnswerIndex: 2,
            explanation: "Incorrecto. La wildcard mask (0.0.0.7 en este caso) se usa para definir un rango de direcciones. Las interfaces del router con una IP dentro de ese rango habilitarán EIGRP y anunciarán esa red.",
            page: "26"
        },
        {
            question: "¿Cuál es el propósito del comando `no auto-summary` en la configuración de EIGRP?",
            options: ["Activa el resumen automático de rutas.", "Desactiva el envío de paquetes Hello.", "Evita que EIGRP resuma las redes a sus límites de clase, lo cual es necesario en redes con VLSM.", "Muestra un resumen de la configuración."],
            correctAnswerIndex: 2,
            explanation: "Incorrecto. El comando `no auto-summary` deshabilita el resumen automático de rutas a sus límites con clase, una práctica esencial en redes modernas que utilizan VLSM para evitar problemas de enrutamiento.",
            page: "26"
        },
        {
            question: "Según el documento, ¿qué mensaje aparece en la consola de un router cuando se establece una nueva adyacencia con un vecino EIGRP?",
            options: ["`NEW_NEIGHBOR_UP`", "`ADJACENCY_FORMED`", "`DUAL-5-NBRCHANGE: ... is up: new adjacency`", "`EIGRP_HELLO_RECEIVED`"],
            correctAnswerIndex: 2,
            explanation: "Incorrecto. El mensaje de log que indica una nueva adyacencia es `DUAL-5-NBRCHANGE: ... is up: new adjacency`.",
            page: "26"
        },
        {
            question: "Si dos rutas hacia un mismo destino son aprendidas, una por EIGRP y otra por OSPF, ¿cuál instalará un router Cisco en su tabla de enrutamiento por defecto?",
            options: ["La ruta aprendida por OSPF", "La ruta aprendida por EIGRP", "Ambas, para balanceo de carga", "Ninguna, generará un error de conflicto"],
            correctAnswerIndex: 1,
            explanation: "Incorrecto. Por defecto, un router Cisco instalará la ruta aprendida por EIGRP, ya que su distancia administrativa (90) es menor (más confiable) que la de OSPF (110).",
            page: "15"
        }
    ];

    const quizArea = document.getElementById('quiz-area');
    const resetButton = document.getElementById('reset-button');

    function renderQuiz() {
        quizArea.innerHTML = '';
        quizData.forEach((qData, questionIndex) => {
            const questionBlock = document.createElement('div');
            questionBlock.classList.add('question-block');
            
            const questionText = document.createElement('p');
            questionText.textContent = `${questionIndex + 1}. ${qData.question}`;
            questionBlock.appendChild(questionText);

            const optionsContainer = document.createElement('div');
            optionsContainer.classList.add('options-container');

            qData.options.forEach((option, optionIndex) => {
                const label = document.createElement('label');
                const radio = document.createElement('input');
                radio.type = 'radio';
                radio.name = `question${questionIndex}`;
                
                const optionTextSpan = document.createElement('span');
                optionTextSpan.classList.add('option-text');
                optionTextSpan.textContent = option;
                
                label.appendChild(radio);
                label.appendChild(optionTextSpan);

                radio.addEventListener('change', () => handleAnswer(questionIndex, optionIndex, questionBlock));
                optionsContainer.appendChild(label);
            });

            questionBlock.appendChild(optionsContainer);

            const explanationDiv = document.createElement('div');
            explanationDiv.classList.add('explanation');
            questionBlock.appendChild(explanationDiv);

            quizArea.appendChild(questionBlock);
        });
    }

    function handleAnswer(questionIndex, selectedOptionIndex, questionBlock) {
        const qData = quizData[questionIndex];
        const optionLabels = questionBlock.querySelectorAll('.options-container label');
        const radioButtons = questionBlock.querySelectorAll('input[type="radio"]');
        const explanationDiv = questionBlock.querySelector('.explanation');

        radioButtons.forEach(rb => rb.disabled = true);
        optionLabels.forEach(label => label.style.pointerEvents = 'none');

        optionLabels.forEach((label, index) => {
            if (index === qData.correctAnswerIndex) {
                label.classList.add('correct');
            } else {
                label.classList.add('incorrect');
            }
        });
        
        const selectedLabel = optionLabels[selectedOptionIndex];
        selectedLabel.classList.add('selected-user');

        if (selectedOptionIndex !== qData.correctAnswerIndex) {
            explanationDiv.innerHTML = `${qData.explanation} <em>(Fuente: Página ${qData.page} del documento).</em>`;
            explanationDiv.classList.add('explanation-wrong', 'visible');
        } else {
            explanationDiv.textContent = "¡Correcto!";
            explanationDiv.classList.remove('explanation-wrong');
            explanationDiv.classList.add('explanation-correct', 'visible');
        }
    }

    resetButton.addEventListener('click', () => {
        renderQuiz();
        window.scrollTo(0, 0);
    });

    renderQuiz();
});
