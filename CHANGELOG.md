# Changelog

Todas las versiones publicadas de **Pochi y Nube**.

- Formato: [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/).
- Versionado: [SemVer](https://semver.org/lang/es/) (`MAYOR.MENOR.PARCHE`).
- Cada versión tiene un tag de git (`v2.0.0`) y una imagen en GitHub Container Registry
  (`ghcr.io/jmitac/pochi-nube-game`), que es la que corre en Azure.

## [Sin publicar]

_Nada todavía._

## [2.0.0] - 2026-11-05

Imagen: `ghcr.io/jmitac/pochi-nube-game:v2`

### Agregado

- Botón de pantalla completa en la portada y junto a la pausa. En Android además fija la pantalla en horizontal.
- En iPhone, como Safari no permite pantalla completa, el botón explica cómo usar _Compartir → Agregar a pantalla de inicio_.
- El juego se puede instalar en el celular: `manifest.webmanifest`, íconos y etiquetas para iOS. Abierto desde el ícono se ve sin las barras del navegador.
- Aviso en la sala de espera cuando tu pareja ya presionó _¡Empezar!_, con un botón para empezar desde ahí mismo.

### Corregido

- La música y los efectos no sonaban en Android ni en iPhone. El audio ahora se desbloquea con el primer toque y también suena con el iPhone en modo silencio.
- El texto de los gustos de Pochi se salía de su tarjeta en la sala de espera.

## [1.0.0] - 2026-11-04

Imagen: `ghcr.io/jmitac/pochi-nube-game:latest`

### Agregado

- Juego multijugador para dos patitos: modos cooperativo, versus y solo, en partidas de 2 minutos.
- Salas públicas y privadas con código (`CUAC-XXX`), sala de espera y revancha.
- Tres fases por partida, habilidades de Pochi y Nube, combos, barra de cariño y estrellas al final.
- Banda sonora y efectos generados con Tone.js, versión de noche incluida.
- Servidor autoritativo con Colyseus y predicción de movimiento en el cliente.
- `Dockerfile` multi-etapa e infraestructura en Azure Container Apps con Terraform (`infra/`).

[Sin publicar]: https://github.com/JMitac/pochi-nube-gameplay/compare/v2.0.0...HEAD
[2.0.0]: https://github.com/JMitac/pochi-nube-gameplay/compare/v1.0.0...v2.0.0
[1.0.0]: https://github.com/JMitac/pochi-nube-gameplay/releases/tag/v1.0.0
