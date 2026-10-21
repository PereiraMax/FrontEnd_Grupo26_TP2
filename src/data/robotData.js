// Catálogo y reglas del configurador de robot (portado de js/robot-config.js del TP1)
export const RC_DATA = {
  motor: {
    cc: { label: "Motor de corriente continua", info: "6-12V · gira en ambos sentidos invirtiendo polaridad." },
    servo: { label: "Servomotor", info: "4.8-6V · se posiciona por señal PWM, no por polaridad." },
    paso: { label: "Motor paso a paso", info: "5-12V · avanza en pasos secuenciando bobinas." },
  },
  sensor: {
    ultrasonico: { label: "Sensor ultrasónico (HC-SR04)", info: "Digital · usa 2 pines (trigger/echo) para medir distancia." },
    retroreflexivo: { label: "Sensor retroreflexivo", info: "Digital · detecta objetos por reflexión de luz infrarroja." },
    cny70: { label: "Sensor CNY70 de piso", info: "Analógico/digital · detecta líneas o cambios de superficie." },
    brujula: { label: "Brújula / giróscopo", info: "I2C · entrega orientación e inercia por bus de datos." },
  },
  driver: {
    l298: { label: "Driver L298", info: "Puente H doble · soporta motores DC o un paso a paso bipolar.", motoresOk: ["cc", "paso"] },
    rele: { label: "Módulo de relé", info: "Conmutación on/off · no controla velocidad ni sentido por sí solo.", motoresOk: ["cc"] },
    l293: { label: "Driver L293", info: "Puente H doble en formato DIP, menor corriente que el L298.", motoresOk: ["cc", "paso"] },
    "shield-l293": { label: "Shield L293", info: "Puente H doble en formato shield, se monta sobre la placa.", motoresOk: ["cc", "paso"], requiereShield: true },
  },
  control: {
    uno: { label: "Arduino Uno", analogicas: 6, soportaShield: true, logica: "5V" },
    nano: { label: "Arduino Nano", analogicas: 8, soportaShield: false, logica: "5V" },
    mega: { label: "Arduino Mega", analogicas: 16, soportaShield: true, logica: "5V" },
    nodemcu: { label: "NodeMCU (ESP8266)", analogicas: 1, soportaShield: false, logica: "3.3V" },
  },
};

export const GRUPOS = [
  { key: "motor", titulo: "Motor" },
  { key: "sensor", titulo: "Sensor" },
  { key: "driver", titulo: "Driver de control" },
  { key: "control", titulo: "Placa de control" },
];

const CHIP_LABELS = {
  cc: "Corriente continua", servo: "Servomotor", paso: "Motor paso a paso",
  ultrasonico: "Ultrasónico", retroreflexivo: "Retroreflexivo", cny70: "CNY70 (piso)", brujula: "Brújula / giróscopo",
  l298: "L298", rele: "Relé", l293: "L293", "shield-l293": "Shield L293",
  uno: "Arduino Uno", nano: "Arduino Nano", mega: "Arduino Mega", nodemcu: "NodeMCU",
};
export const chipLabel = (v) => CHIP_LABELS[v];

export function evaluarBuild(sel) {
  const mensajes = [];
  const motor = RC_DATA.motor[sel.motor];
  const sensor = RC_DATA.sensor[sel.sensor];
  const driver = RC_DATA.driver[sel.driver];
  const control = RC_DATA.control[sel.control];

  if (sel.motor === "servo") {
    mensajes.push({ nivel: "warn", texto: `El servomotor no necesita un driver de potencia: se controla directo con una señal PWM de la placa. Podés omitir el ${driver.label}.` });
  } else if (!driver.motoresOk.includes(sel.motor)) {
    mensajes.push({ nivel: "error", texto: `${driver.label} no puede manejar un ${motor.label.toLowerCase()}. Un relé simple solo enciende/apaga y no secuencia bobinas ni invierte giro.` });
  } else {
    mensajes.push({ nivel: "ok", texto: `${driver.label} es compatible con ${motor.label.toLowerCase()}.` });
  }

  if (driver.requiereShield && !control.soportaShield) {
    mensajes.push({ nivel: "error", texto: `El ${driver.label} se monta físicamente sobre el header de Arduino Uno/Mega; no entra en ${control.label}. Usá el L298 o L293 sueltos, conectados por cable.` });
  }
  if (control.logica === "3.3V" && ["l298", "l293", "shield-l293"].includes(sel.driver)) {
    mensajes.push({ nivel: "warn", texto: `${control.label} trabaja a lógica 3.3V y el ${driver.label} espera 5V en sus entradas. Vas a necesitar un conversor de nivel entre ambos.` });
  }
  if (sel.sensor === "cny70" && control.analogicas <= 1) {
    mensajes.push({ nivel: "warn", texto: `${control.label} tiene una sola entrada analógica disponible; si sumás otro sensor analógico vas a tener conflicto de pines.` });
  } else {
    mensajes.push({ nivel: "ok", texto: `${sensor.label} es compatible con ${control.label}.` });
  }
  if (sel.motor === "cc" || sel.motor === "paso") {
    mensajes.push({ nivel: "info", texto: `Usá una fuente externa para alimentar el ${motor.label.toLowerCase()}; no lo alimentes desde el 5V de la placa.` });
  } else {
    mensajes.push({ nivel: "info", texto: "Un servo chico (tipo SG90) puede alimentarse desde el 5V de la placa; servos más grandes necesitan fuente aparte." });
  }
  return mensajes;
}

export function calcularVeredicto(mensajes) {
  if (mensajes.some((m) => m.nivel === "error")) return { clase: "error", texto: "CONFLICTO DE HARDWARE DETECTADO" };
  if (mensajes.some((m) => m.nivel === "warn")) return { clase: "warn", texto: "BUILD VIABLE CON ADVERTENCIAS" };
  return { clase: "ok", texto: "COMPILACIÓN EXITOSA" };
}
