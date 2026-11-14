import asyncio
import os
import subprocess
import wave
import numpy as np
import edge_tts

OUT_MP3 = r"C:\Users\Haidar\.gemini\antigravity\scratch\haidar-ghazy-portfolio\showreel-world-intro\assets\master-intro-20s.mp3"
TMP_DIR = r"F:\Temp\hf-warp-intro-audio"
os.makedirs(TMP_DIR, exist_ok=True)

SR = 44100
DURATION = 20.0
N_SAMPLES = int(SR * DURATION)


def read_wav(path):
    with wave.open(path, "rb") as wf:
        sr = wf.getframerate()
        raw = wf.readframes(wf.getnframes())
        data = np.frombuffer(raw, dtype=np.int16).reshape(-1, wf.getnchannels())
        return sr, data.astype(np.float32) / 32768.0


def write_wav(path, sr, data_int16):
    with wave.open(path, "wb") as wf:
        wf.setnchannels(2)
        wf.setsampwidth(2)
        wf.setframerate(sr)
        wf.writeframes(data_int16.tobytes())


# Target beat windows: (name, start_s, max_end_s, text, rate, pitch)
VO_SCRIPT = [
    ("warp_s1", 0.25, 3.65, "I'm Haidar. Step into a world built from three disciplines.", "+15%", "+0Hz"),
    ("warp_s2", 4.10, 7.45, "Cinema and 3D directing—over fifty visual works.", "+15%", "+0Hz"),
    ("warp_s3", 7.95, 11.95, "AI growth: seven point nine million views and sixty percent conversion.", "+18%", "+1Hz"),
    ("warp_s4", 12.45, 16.35, "And custom AI systems cutting five-day workflows into five hours.", "+18%", "+1Hz"),
    ("warp_s5", 16.95, 19.65, "Strategy, stories, systems. Welcome in.", "+18%", "+0Hz"),
]


async def synth_vo():
    rendered = []
    prev_end = -1.0
    for name, start_t, max_end_t, text, rate, pitch in VO_SCRIPT:
        mp3_path = os.path.join(TMP_DIR, f"{name}.mp3")
        wav_path = os.path.join(TMP_DIR, f"{name}.wav")
        comm = edge_tts.Communicate(text, voice="en-US-ChristopherNeural", rate=rate, pitch=pitch)
        await comm.save(mp3_path)
        subprocess.run(
            [
                "ffmpeg", "-y", "-i", mp3_path,
                "-af", "silenceremove=start_periods=1:start_duration=0.02:start_threshold=-45dB:stop_periods=-1:stop_duration=0.08:stop_threshold=-45dB,highpass=f=85,acompressor=threshold=-16dB:ratio=3:attack=5:release=60:makeup=4dB",
                "-ar", str(SR), "-ac", "2", wav_path,
            ],
            check=True,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
        )
        _, data = read_wav(wav_path)
        dur = len(data) / SR
        end_t = start_t + dur
        print(f"[VO] {name}: start={start_t:.2f}s, dur={dur:.2f}s, end={end_t:.2f}s (limit {max_end_t:.2f}s)")
        assert start_t >= prev_end + 0.30, f"OVERLAP ERROR: {name} starts at {start_t} before prev_end+0.30 ({prev_end+0.30})"
        assert end_t <= max_end_t + 0.10, f"TOO LONG: {name} ends at {end_t:.2f}s > {max_end_t:.2f}s"
        prev_end = end_t
        rendered.append((start_t, data))
    return rendered


def make_warp_score_and_sfx():
    t = np.linspace(0, DURATION, N_SAMPLES, endpoint=False)
    left = np.zeros(N_SAMPLES, dtype=np.float32)
    right = np.zeros(N_SAMPLES, dtype=np.float32)

    # Warm Hans Zimmer / Cyber-Warp 120 BPM score (D minor -> Bb major -> G minor -> A sus4 -> D minor)
    bpm = 120.0
    beat_dur = 60.0 / bpm
    chords = [
        [73.42, 146.83, 220.00, 349.23],   # Dm (0-4s)
        [58.27, 116.54, 174.61, 293.66],   # Bb (4-8s)
        [49.00, 196.00, 293.66, 392.00],   # Gm (8-12s)
        [55.00, 220.00, 277.18, 329.63],   # A  (12-16s)
        [73.42, 146.83, 220.00, 440.00],   # Dm9 (16-20s)
    ]

    for bar in range(5):
        s_idx = int(bar * 4.0 * SR)
        e_idx = min(N_SAMPLES, int((bar + 1) * 4.0 * SR))
        bt = np.linspace(0, (e_idx - s_idx) / SR, e_idx - s_idx, endpoint=False)
        env = np.minimum(1.0, bt / 0.35) * np.minimum(1.0, (4.0 - bt) / 0.25)
        freqs = chords[bar]
        # Warm detuned atmospheric pad + gentle sub
        pad_l = np.sin(2 * np.pi * freqs[0] * bt) * 0.16
        pad_r = np.sin(2 * np.pi * freqs[0] * bt) * 0.16
        for f in freqs[1:]:
            pad_l += np.sin(2 * np.pi * f * bt) * 0.045 + np.sin(2 * np.pi * (f * 1.003) * bt) * 0.03
            pad_r += np.sin(2 * np.pi * (f * 0.997) * bt) * 0.045 + np.sin(2 * np.pi * f * bt) * 0.03
        left[s_idx:e_idx] += pad_l * env
        right[s_idx:e_idx] += pad_r * env

    # Crisp 8th-note warm trailer synth pulse & clean kick
    total_eighths = int(DURATION / (beat_dur / 2))
    for i in range(total_eighths):
        et = i * (beat_dur / 2)
        idx = int(et * SR)
        if idx >= N_SAMPLES:
            break
        chord_idx = min(4, int(et / 4.0))
        root = chords[chord_idx][0]
        arp_note = chords[chord_idx][(i % 3) + 1]

        # 8th-note subtle arpeggio pluck
        p_len = int(0.18 * SR)
        end = min(N_SAMPLES, idx + p_len)
        pt = np.linspace(0, (end - idx) / SR, end - idx, endpoint=False)
        pluck = np.sin(2 * np.pi * arp_note * pt) * np.exp(-pt * 14.0) * 0.055
        pan = 0.5 + 0.35 * np.sin(i * 0.9)
        left[idx:end] += pluck * (1.1 - pan * 0.4)
        right[idx:end] += pluck * (0.7 + pan * 0.4)

        # Clean soft cinematic kick on every beat (even eighths)
        if i % 2 == 0:
            k_len = int(0.20 * SR)
            end = min(N_SAMPLES, idx + k_len)
            kt = np.linspace(0, (end - idx) / SR, end - idx, endpoint=False)
            kf = 115.0 * np.exp(-kt * 25.0) + 45.0
            ph = 2 * np.pi * np.cumsum(kf) / SR
            kick = np.sin(ph) * np.exp(-kt * 11.0) * 0.24
            left[idx:end] += kick
            right[idx:end] += kick

    # Clean Warp Drive Jet Riser + Sub-Boom ONLY inside inter-scene transition gaps
    def add_warp_jump(jump_t, intensity=0.55):
        # Jet riser leading into jump_t (-0.45s to jump_t) + Sub impact at jump_t (+0.55s)
        idx0 = max(0, int((jump_t - 0.40) * SR))
        idx1 = min(N_SAMPLES, int((jump_t + 0.55) * SR))
        if idx1 <= idx0:
            return
        dt = np.linspace(-0.40, (idx1 - idx0) / SR - 0.40, idx1 - idx0, endpoint=False)
        # Rising pitch sweep up to t=0, falling turbine sweep after t=0
        freq = np.where(dt < 0, 140.0 + 780.0 * ((dt + 0.40) / 0.40) ** 2, 85.0 * np.exp(-dt * 8.0) + 38.0)
        ph = 2 * np.pi * np.cumsum(freq) / SR
        jet_env = np.where(dt < 0, ((dt + 0.40) / 0.40) ** 1.8, np.exp(-dt * 5.2))
        noise = np.random.uniform(-1, 1, idx1 - idx0) * np.exp(-((dt * 5.0) ** 2)) * 0.35
        warp_sfx = (np.sin(ph) * 0.65 + noise * 0.45) * jet_env * intensity
        left[idx0:idx1] += warp_sfx * 0.95
        right[idx0:idx1] += warp_sfx * 1.05

    # 4 clean Hyperspace Warp Jumps aligned with visuals AND silent VO gaps
    add_warp_jump(0.08, 0.38)
    add_warp_jump(3.80, 0.58)
    add_warp_jump(7.60, 0.58)
    add_warp_jump(12.10, 0.58)
    add_warp_jump(16.60, 0.52)

    fade_len = int(0.8 * SR)
    fade_curve = np.linspace(1.0, 0.0, fade_len)
    left[-fade_len:] *= fade_curve
    right[-fade_len:] *= fade_curve

    return np.column_stack([left, right])


async def main():
    vo_list = await synth_vo()
    score_stereo = make_warp_score_and_sfx()

    vo_track = np.zeros_like(score_stereo)
    duck_env = np.ones(N_SAMPLES, dtype=np.float32)

    for start_t, data in vo_list:
        idx = int(start_t * SR)
        if data.ndim == 1:
            data = np.column_stack([data, data])
        end = min(N_SAMPLES, idx + len(data))
        seg_len = end - idx
        vo_track[idx:end] += data[:seg_len] * 1.38
        # Smooth ducking while speaking so voiceover stays crisp and prominent
        pad_pre = max(0, idx - int(0.12 * SR))
        pad_post = min(N_SAMPLES, end + int(0.18 * SR))
        duck_env[pad_pre:pad_post] = 0.28

    kernel = np.ones(int(0.08 * SR)) / int(0.08 * SR)
    duck_smooth = np.convolve(duck_env, kernel, mode="same")

    mixed = score_stereo * duck_smooth[:, None] + vo_track
    peak = np.max(np.abs(mixed))
    if peak > 0:
        mixed = np.tanh(mixed / peak * 1.12) * 0.94

    wav_out = os.path.join(TMP_DIR, "master_warp_intro_20s.wav")
    write_wav(wav_out, SR, (mixed * 32767).astype(np.int16))
    subprocess.run(
        ["ffmpeg", "-y", "-i", wav_out, "-b:a", "192k", OUT_MP3],
        check=True,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    print("Clean Zero-Overlap 20s Warp Audio written to:", OUT_MP3)


if __name__ == "__main__":
    asyncio.run(main())
