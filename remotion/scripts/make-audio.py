"""Procedural soundtrack + SFX for the Flect demo (28s @ 48kHz)."""
import numpy as np
from scipy.io import wavfile
from scipy.signal import butter, sosfilt

SR = 48000
DUR = 28.0
N = int(SR * DUR)
t = np.arange(N) / SR

def env(n, a, d, s, r, hold):
    """ADSR env in samples."""
    a, d, r, hold = int(a*SR), int(d*SR), int(r*SR), int(hold*SR)
    e = np.zeros(n)
    i = 0
    e[i:i+a] = np.linspace(0, 1, a); i += a
    e[i:i+d] = np.linspace(1, s, d); i += d
    e[i:i+hold] = s; i += hold
    e[i:i+r] = np.linspace(s, 0, r); i += r
    return e[:n]

def lowpass(x, fc, order=2):
    sos = butter(order, fc / (SR/2), output="sos")
    return sosfilt(sos, x)

def place(buf, sig, at, gain=1.0):
    i = int(at * SR)
    j = min(N, i + len(sig))
    buf[i:j] += sig[: j - i] * gain

def note(freq, dur, wave="tri", a=0.01, d=0.1, s=0.7, r=0.3, detune=0.0):
    n = int(dur * SR)
    tt = np.arange(n) / SR
    f = freq * (1 + detune)
    if wave == "sine":
        w = np.sin(2*np.pi*f*tt)
    elif wave == "tri":
        w = 2*np.abs(2*((tt*f) % 1) - 1) - 1
    elif wave == "saw":
        w = 2*((tt*f) % 1) - 1
    else:
        w = np.sign(np.sin(2*np.pi*f*tt))
    return w * env(n, a, d, s, r, max(0, dur - a - d - r))

# ---------- Music ----------
music = np.zeros(N)
A = 440.0
def hz(semi): return A * 2 ** (semi / 12)
# chord roots (semitones from A4): Am F C G Dm F C
CHORDS = [
    (0, [0, 3, 7]),       # Am
    (4, [-4, 0, 3]),      # F
    (8, [-9, -5, -2]),    # C
    (12, [-2, 2, 5]),     # G
    (14, [-7, -4, 0]),    # Dm (tension for refusal)
    (17, [-4, 0, 3]),     # F
    (20, [-9, -5, -2]),   # C
    (24, [0, 3, 7]),      # Am → resolve
]
for idx, (start, semis) in enumerate(CHORDS):
    end = CHORDS[idx+1][0] if idx + 1 < len(CHORDS) else DUR
    dur = end - start + 0.6
    for k, s in enumerate(semis):
        f = hz(s - 12)  # pad an octave below
        pad = note(f, dur, "tri", a=0.6, d=0.5, s=0.8, r=0.8) * 0.16
        pad += note(f, dur, "sine", a=0.6, d=0.5, s=0.8, r=0.8, detune=0.003) * 0.12
        place(music, lowpass(pad, 900), start)
    # sub bass on beats (120bpm) from 4s
    beat = 0.5
    b = start
    while b < end:
        if b >= 3.9:
            bass = note(hz(semis[0] - 36), 0.42, "sine", a=0.005, d=0.15, s=0.5, r=0.15)
            place(music, bass, b, 0.5)
        b += beat
    # plucky arpeggio 8ths from 4s, brighter over time, muted during refusal (14–17)
    b = start
    arp = [semis[0], semis[1], semis[2], semis[1] + 12]
    k = 0
    while b < end:
        if b >= 4.0 and not (14.0 <= b < 16.6):
            f = hz(arp[k % 4])
            g = 0.12 + 0.08 * min(1, (b - 4) / 20)
            pl = note(f, 0.25, "tri", a=0.003, d=0.12, s=0.2, r=0.1)
            place(music, lowpass(pl, 2600), b, g)
        b += 0.25
        k += 1
# soft hi-hat ticks on off-beats, 8s → 25s
rng = np.random.default_rng(7)
b = 8.25
while b < 25:
    hat = rng.normal(0, 1, int(0.05*SR)) * env(int(0.05*SR), 0.001, 0.03, 0.1, 0.015, 0)
    hat = sosfilt(butter(4, [6000/(SR/2), 14000/(SR/2)], btype="band", output="sos"), hat)
    place(music, hat, b, 0.08)
    b += 0.5
# global music envelope: quiet intro, full from 4s, dip at refusal moment, fade out end
menv = np.ones(N)
menv *= np.interp(t, [0, 3.8, 4.4, 14.8, 15.2, 16.6, 17.2, 26.5, 28], [0.55, 0.6, 1, 1, 0.55, 0.55, 1, 1, 0.0])
music *= menv

# ---------- SFX ----------
sfx = np.zeros(N)

def pop(freq=900, dur=0.08):
    n = int(dur*SR); tt = np.arange(n)/SR
    f = freq * np.exp(-tt*30)
    return np.sin(2*np.pi*np.cumsum(f)/SR) * env(n, 0.001, dur*0.4, 0.2, dur*0.5, 0)

def click(dur=0.04):
    n = int(dur*SR)
    x = rng.normal(0, 1, n) * env(n, 0.0005, 0.01, 0.15, 0.02, 0)
    return lowpass(x, 3500)

def whoosh(dur=0.35, up=True):
    n = int(dur*SR)
    x = rng.normal(0, 1, n)
    fc = np.linspace(300, 4000, n) if up else np.linspace(4000, 300, n)
    out = np.zeros(n); step = 1024
    for i in range(0, n, step):
        out[i:i+step] = lowpass(x[i:i+step], float(fc[min(i, n-1)]))
    return out * env(n, dur*0.4, 0.05, 0.9, dur*0.5, 0)

def chime(freqs, dur=0.9):
    out = np.zeros(int(dur*SR))
    for i, f in enumerate(freqs):
        out += note(f, dur - i*0.05, "sine", a=0.003, d=0.3, s=0.3, r=0.4)[: len(out) - int(i*0.06*SR)].__mul__(0.6) if False else 0
        place(out, note(f, dur - i*0.06, "sine", a=0.003, d=0.3, s=0.3, r=0.4) * 0.6, i*0.06)
    return out

def buzz(dur=0.45):
    n = int(dur*SR); tt = np.arange(n)/SR
    f = 110 * np.exp(-tt*2)
    x = np.sign(np.sin(2*np.pi*np.cumsum(f)/SR)) * 0.5 + np.sin(2*np.pi*55*tt)
    return lowpass(x, 500) * env(n, 0.002, 0.15, 0.4, 0.25, 0)

def notif():
    n = int(0.6*SR)
    out = np.zeros(n)
    place(out, note(hz(15), 0.35, "sine", a=0.002, d=0.15, s=0.3, r=0.15), 0.0, 0.7)
    place(out, note(hz(22), 0.4, "sine", a=0.002, d=0.2, s=0.3, r=0.15), 0.11, 0.7)
    return out

# S1 — word ticks (very soft) for both lines
def words(start, count):
    for i in range(count):
        place(sfx, click(0.03), start + i*2/30, 0.16)
words(8/30, 9)
place(sfx, whoosh(0.5), 53/30 - 0.25, 0.25)
words(53/30, 7)

# S2 — rows slide + toggles
for i in range(3):
    s = 4.0 + (30 + i*15)/30
    place(sfx, whoosh(0.25), s - 0.12, 0.2)
    place(sfx, pop(1200, 0.07), s + 6/30, 0.6)

# S3 — card + approval
place(sfx, whoosh(0.5), 9.0 + 14/30 - 0.2, 0.3)
place(sfx, pop(600, 0.09), 9.0 + 52/30, 0.35)
place(sfx, chime([hz(3), hz(10), hz(15)]), 9.0 + 58/30, 0.8)

# S4 — refusal (the key moment)
place(sfx, whoosh(0.3, up=False), 14.0 + 26/30 - 0.15, 0.3)
place(sfx, buzz(), 14.0 + 34/30, 0.9)
place(sfx, whoosh(0.3), 14.0 + 50/30 - 0.1, 0.3)
place(sfx, notif(), 14.0 + 50/30 + 0.1, 0.9)

# S5 — counters roll + bars
for i in range(14):
    place(sfx, click(0.025), 20.0 + 22/30 + i*0.064, 0.1 + 0.08*(i/14))
for i in range(8):
    place(sfx, pop(700 + i*90, 0.06), 20.0 + (58 + i*2.5)/30, 0.4)

# S6 — logo draw swell + CTA pop
place(sfx, whoosh(0.7), 25.0 + 4/30 - 0.2, 0.35)
place(sfx, chime([hz(0), hz(7), hz(12)], 1.4), 25.0 + 20/30, 0.6)
place(sfx, pop(900, 0.1), 25.0 + 40/30, 0.5)

# ---------- Mix ----------
mix = music * 0.9 + sfx * 0.9
mix = np.tanh(mix * 1.1)
mix *= 0.85 / max(1e-6, np.abs(mix).max())
stereo = np.stack([mix, mix], axis=1)
wavfile.write("/tmp/flect-audio.wav", SR, (stereo * 32767).astype(np.int16))
print("audio ok", mix.shape[0] / SR, "s")
