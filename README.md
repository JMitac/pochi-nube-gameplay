# Pochi y Nube 🦆

Juego multijugador de dos patitos que atrapan comida antes de que toque el pasto. Cada partida dura 2 minutos, cada jugador entra desde su propio dispositivo (PC o celular) y hay tres modos: **cooperativo**, **versus** y **solo**.

Este repositorio es un monorepo con:

| Carpeta           | Qué es                                                              | Tecnología                                                               |
| ----------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| `apps/client`     | El juego en el navegador: menús, juego, HUD y sonido                | Vite, React 19, Tailwind CSS v4, Three.js, Tone.js, colyseus.js, Zustand |
| `apps/server`     | El servidor de salas y la simulación de la partida                  | Node.js, Colyseus 0.16, Express                                          |
| `packages/shared` | Reglas, puntos, mapas, movimiento y mensajes que usan los dos lados | TypeScript puro                                                          |

---

## Requisitos

- **Node.js v24.11.0.** El repo trae `.nvmrc` y `.node-version`.
  - Con [nvm-windows](https://github.com/coreybutler/nvm-windows): `nvm install 24.11.0` y luego `nvm use 24.11.0`
  - Con nvm (macOS/Linux) o fnm: `nvm use` / `fnm use`
- **pnpm 10.** Se activa con Corepack, que ya viene con Node:

  ```bash
  corepack enable
  corepack prepare pnpm@10.34.7 --activate
  ```

## Cómo levantar el proyecto

```bash
# 1. Instalar dependencias (desde la raíz del repo)
pnpm install

# 2. Levantar cliente y servidor juntos
pnpm dev
```

- Juego: <http://localhost:5173>
- Servidor (Colyseus + API): <http://localhost:2567> (prueba con <http://localhost:2567/api/health>)

Para levantarlos por separado, en dos terminales: `pnpm dev:server` y `pnpm dev:client`.

### Jugar con dos dispositivos en la misma red Wi-Fi

1. Corre `pnpm dev` en tu PC.
2. Averigua la IP local de la PC (`ipconfig` en Windows, por ejemplo `192.168.1.20`).
3. En el celular abre `http://192.168.1.20:5173`. El cliente se conecta solo al servidor en el puerto 2567 de esa misma IP.
4. Si Windows pregunta por el firewall, permite el acceso a Node.js en redes privadas.

Para probar solo en la PC, abre dos ventanas del navegador (una normal y otra de incógnito, así cada una tiene su propio nombre guardado).

### Modo producción

```bash
pnpm build   # compila el servidor (apps/server/dist) y el cliente (apps/client/dist)
pnpm start   # el servidor sirve también el juego compilado
```

Abre <http://localhost:2567>. Con un solo proceso y un solo puerto ya está todo: es lo más simple para Railway, Fly.io, AWS o Azure.

### Otros comandos

| Comando          | Qué hace                                          |
| ---------------- | ------------------------------------------------- |
| `pnpm typecheck` | Revisa los tipos de los tres paquetes             |
| `pnpm test`      | Corre las pruebas (Vitest) de `shared` y `server` |
| `pnpm format`    | Da formato al código con Prettier                 |

## Variables de entorno

Ninguna es obligatoria para desarrollar. Hay ejemplos en `apps/server/.env.example` y `apps/client/.env.example`.

| Variable           | Dónde    | Para qué                                                               |
| ------------------ | -------- | ---------------------------------------------------------------------- |
| `PORT`             | servidor | Puerto HTTP + WebSocket (por defecto `2567`)                           |
| `CORS_ORIGIN`      | servidor | Orígenes permitidos para la API si el cliente vive en otro dominio     |
| `CLIENT_DIST_PATH` | servidor | Carpeta del cliente compilado (por defecto `../client/dist` si existe) |
| `VITE_SERVER_URL`  | cliente  | URL del servidor si está en otro dominio que la página                 |

`pnpm start` lee `apps/server/.env` si existe.

---

## Cómo está organizado el código

```
pochi-nube/
├─ packages/shared/src
│  ├─ domain/ids.ts            Patitos, modos, mapas, comidas, fases
│  ├─ rules/                   Reglas del documento de jugabilidad (puntos, fases, habilidades, cariño)
│  ├─ world/                   Mapas, geometría y movimiento (el mismo código en cliente y servidor)
│  └─ protocol/                Mensajes cliente → servidor, eventos servidor → cliente y forma del estado
├─ apps/server/src
│  ├─ rooms/PicnicRoom.ts      La sala de Colyseus: solo conecta mensajes con el motor
│  ├─ rooms/schema/            Estado sincronizado (@colyseus/schema)
│  ├─ lobby/LobbyService.ts    Sala de espera: anfitrión, elección de patito, "listo"
│  ├─ game/MatchEngine.ts      Orquesta los sistemas en orden, un tick tras otro
│  ├─ game/systems/            Un sistema por regla: movimiento, charcos, nubes, frutas, atrapar…
│  ├─ game/abilities/          Snack compartido (Pochi) y Plan del paseo (Nube)
│  ├─ game/score/              Puntos, combos y barra de cariño
│  ├─ services/                Códigos de sala (CUAC-7K2) y directorio de salas públicas
│  └─ http/                    API: /api/rooms y /api/rooms/code/:code
└─ apps/client/src
   ├─ art/                     Escenas, patitos, frutas e íconos del diseño, como componentes React
   ├─ components/ui/           Botones, paneles, sliders… con las clases de Tailwind del diseño
   ├─ screens/                 Una carpeta por pantalla del diseño (portada, menú, crear sala…)
   ├─ game/                    Bucle del juego, capas Three.js, predicción, interpolación y HUD
   ├─ audio/                   Banda sonora en Tone.js (pistas, efectos, jingles)
   ├─ network/                 Conexión con Colyseus y la API de salas
   └─ state/                   Stores de Zustand (navegación, sala, HUD, configuración)
```

### Principios que sigue el código

- **Responsabilidad única.** Cada sistema del servidor hace una sola cosa (`PuddleSystem`, `CatchSystem`, `RainCloudSystem`…), cada pantalla está partida en componentes pequeños y cada capa de render dibuja solo lo suyo.
- **Abierto/cerrado.** Las habilidades implementan `DuckAbility` y se registran en `AbilityRegistry`: agregar una nueva no toca las demás. Los instrumentos, efectos y jingles son tablas de funciones.
- **Inversión de dependencias.** El motor de la partida no conoce Colyseus: emite eventos por `MatchEventSink`, que implementa la sala. Por eso se puede probar sin red (`MatchEngine.test.ts`).
- **Una sola fuente de verdad.** Puntos, velocidades, fases y movimiento viven en `packages/shared`. El cliente predice tu patito con la misma función `stepDuckPosition` que usa el servidor.
- Todo el código (variables, funciones, clases) está en inglés. El texto que ve el jugador está en español.

## Cómo funciona una partida

1. **Sala.** Se crea con `client.create('picnic', …)`. Las privadas no aparecen en la lista y se entra con su código (`CUAC-7K2`). Las públicas salen en _Salas públicas_. Hay 2 cupos (1 en modo solo).
2. **Sala de espera.** Cada jugador elige su patito y presiona _¡Empezar!_. Cuando todos están listos empieza la cuenta _3, 2, 1, ¡Ya!_.
3. **Juego.** El servidor es la autoridad: decide qué cae, dónde, quién lo atrapa y los puntos. Simula a 30 ticks/s y manda el estado ~20 veces por segundo.
   - Tu patito se mueve al instante (predicción en el cliente) y se corrige suavemente hacia la posición del servidor.
   - El otro patito y las frutas se dibujan 100 ms en el pasado, interpolando entre dos actualizaciones, para que se vean suaves.
4. **Resultados.** Estrellas en cooperativo y solo, ganador en versus y récord personal en solo (se guarda en el navegador). _Revancha_ vuelve a la sala de espera con la misma pareja.

### Controles

| Acción    | PC             | Celular                            |
| --------- | -------------- | ---------------------------------- |
| Moverse   | WASD o flechas | Palanca a la izquierda             |
| Saltar    | Espacio        | Botón grande                       |
| Habilidad | Q              | Botón mediano (muestra la recarga) |
| Cuac      | C              | Botoncito                          |
| Pausa     | Esc o P        | Botón de pausa                     |

La opción _Zurdo_ de Configuración invierte los lados en el celular.

## Decisiones tomadas

Algunas cosas no estaban definidas en los documentos o chocaban entre sí. Esto fue lo que se decidió:

- **Vista del juego.** El documento técnico habla de una cámara isométrica, pero el diseño de la pantalla de _Juego_ es una vista frontal 2.5D: la escena SVG de fondo, el suelo al frente y los patitos encima. Se respetó el diseño. Three.js dibuja en dos canvas transparentes las frutas, las sombras que crecen, los charcos, las nubes de lluvia y las marcas del _Plan del paseo_. Los patitos son los mismos SVG del diseño, con sus animaciones de caminar, saltar, hablar y parpadear. Las coordenadas del mundo son las mismas del lienzo de 1280×720 del diseño.
- **Multiplicadores.** El ×2 de _¡Lluvia de frutas!_ y el ×2 de _¡Juntitos!_ se suman, así que una fruta puede valer ×4. Se cambia con `STACK_MULTIPLIERS` en `packages/shared/src/rules/scoring.ts`.
- **Modo solo.** Es una sala privada de 1 jugador (no necesita otro proceso). Es el único modo donde la pausa detiene el reloj. Con dos jugadores, la pausa solo abre el menú y la partida sigue.
- **Barra de cariño.** En cooperativo es compartida; en versus y solo cada patito tiene la suya.
- **Aleteo (versus).** Saltar a menos de 90 px del rival lo empuja un poco y le roba los puntos de su última fruta.
- **Estrellas.** Cooperativo: 250, 500 y 750 puntos. Solo: 150, 300 y 450 (en `STAR_THRESHOLDS`).
- **Cuacs.** La banda sonora marca los cuacs reales como _Grabación_ (CC0 de freesound.org). Mientras tanto se generan con Tone.js. Si pones `quack-pochi.mp3` y `quack-nube.mp3` en `apps/client/public/sounds/`, se usan esos archivos.
- **Banda sonora.** Es tu `pochi-audio.js` portado a TypeScript nota por nota, con Tone.js 14.8.49, la misma versión. Hubo dos ajustes para que no se caiga dentro del juego:
  - El _transport_ ya no se detiene y reinicia en cada cambio de pantalla: solo se cambian las partes.
  - `setIntense` ya no hace una rampa de tempo al mismo valor, porque eso rompía el reloj de Tone.
- **Fuentes.** _Baloo 2_ y _Nunito_ se instalan con `@fontsource`, así el juego no depende de Google Fonts y funciona sin conexión.
- **Noche.** De 7 p. m. a 6 a. m. según la hora del jugador, como en el diseño: cielo, luna, luciérnagas y la versión de cuna de la música.
- **Pantalla.** Todas las pantallas son el lienzo de 1280×720 del diseño escalado para caber en cualquier ventana. En un celular en vertical aparece un aviso para girarlo.

## Problemas comunes

- **`pnpm` no se reconoce:** ejecuta `corepack enable` en una terminal como administrador.
- **El puerto 2567 o 5173 está ocupado:** cambia `PORT` en `apps/server/.env` o cierra el proceso que lo usa.
- **No suena nada:** los navegadores bloquean el audio hasta el primer toque o tecla. Toca la pantalla una vez.
- **El celular no se conecta:** confirma que esté en la misma red y que el firewall de Windows permita a Node.js.
