# 🦄 Lights UI

A web-based pixel art painter for the Pimoroni Unicorn HAT 8x8 RGB LED Matrix.

**Live Demo:** [lights-ui.vercel.app](https://lights-ui.vercel.app/)

![Unicorn HAT Painter](https://img.shields.io/badge/Raspberry_Pi-LED_Controller-C51A4A?style=for-the-badge&logo=raspberrypi)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss)

---

## 🎯 What is this?

Paint an 8×8 pixel grid in your browser, hit submit, and I will see your colors light up on a real LED matrix connected to a Raspberry Pi at my home! :)

### Features

- 🎨 **Interactive 8x8 Grid** – Click or drag to paint pixels
- 🌈 **Color Picker** – 10 preset colors + custom color picker + RGB sliders
- 🔆 **Brightness Control** – Adjust LED brightness from 0-100%
- 🖌️ **Fill Tool** – Fill entire grid with the selected color
- 🗑️ **Clear** – Reset the grid to black
- 📡 **Live Connection Status** – See if the Raspberry Pi is reachable

---

## 🔌 How It Works

```
┌─────────────────┐         HTTP POST          ┌─────────────────────┐
│                 │  ──────────────────────▶   │                     │
│   lights-ui     │      /grid endpoint        │  lights-raspberry   │
│   (Vercel)      │                            │   (Raspberry Pi)    │
│                 │  ◀──────────────────────   │                     │
└─────────────────┘        JSON response       └──────────┬──────────┘
                                                          │
                                                          │ GPIO / SPI
                                                          ▼
                                               ┌─────────────────────┐
                                               │   Pimoroni Unicorn  │
                                               │   HAT (8x8 LEDs)    │
                                               └─────────────────────┘
```

1. **You** paint colors on the 8x8 grid in the browser
2. **lights-ui** sends the grid data as JSON to my Raspberry Pi
3. **[lights-raspberry](https://github.com/rdzcn/lights-raspberry)** receives the data via REST API
4. **Unicorn HAT** lights up with your pixel art!

---

## 🔗 Related

- **[lights-raspberry](https://github.com/rdzcn/lights-raspberry)** – The Python backend that runs on the Raspberry Pi and controls the Unicorn HAT


---

## 📄 License

MIT



