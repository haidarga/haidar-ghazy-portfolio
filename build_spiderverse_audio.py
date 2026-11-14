import asyncio
import os
import subprocess
import wave
import numpy as np
import edge_tts

def read_wav(path):
    with wave.open(path, "rb") as wf:
        sr = wf.getframerate()
        n_frames = wf.getnframes()
        raw = wf.readframes(n_frames)
        data = np.frombuffer(raw, dtype=np.int16).reshape(-1, wf.getnchannels())
        return sr, data.astype(np.float32) / 32768.0

def write_wav(path, sr, data_int16):
    with wave.open(path, "wb") as wf:
        wf.setnchannels(2)
        wf.setsampwidth(2)
        wf.setframerate(sr)
        wf.writeframes(data_int16.tobytes())

OUT_DIR = r"C:\Users\Haidar\.gemini\antigravity\scratch\haidar-ghazy-portfolio\showreel-world-portrait\assets"
FINAL_DIR = r"F:\KERJAAN\PORTO\FINAL_SHOWREEL_VIDEOS"
TMP_DIR = r"F:\Temp\hf-spiderverse-audio"
os.makedirs(OUT_DIR, exist_ok=True)
os.makedirs(FINAL_DIR, exist_ok=True)
os.makedirs(TMP_DIR, exist_ok=True)

SR = 44100
DURATION = 60.0
N_SAMPLES = int(SR * DURATION)

VO_SEGMENTS = [
    (
        "vo_s1",
        0.20,
        "Three worlds, one brain. I'm Haidar—Director, Growth Strategist, and AI Systems Builder. Welcome to my universe.",
        "+28%",
        "+2Hz",
    ),
    (
        "vo_s2",
        9.15,
        "My foundation is cinema. Graduating Cum Laude in Film and Television, directing over fifty visual works, and co-founding Luminara Visual Works to turn giant buildings into projection stages.",
        "+16%",
        "+0Hz",
    ),
    (
        "vo_s3",
        21.15,
        "Then I brought storytelling to tech growth at CAK AI. Orchestrating ninety AI personas across five brands—hitting seven point nine million views for Oppo, and converting sixty percent of TikTok DMs into active members.",
        "+12%",
        "+2Hz",
    ),
    (
        "vo_s4",
        38.15,
        "To scale that impact, I built the machine. CAKETING generates two hundred scripts in three hours. CakVisual renders two thousand videos a month—slicing five days of work into five hours.",
        "+12%",
        "+1Hz",
    ),
    (
        "vo_s5",
        51.65,
        "Strategy. Stories. Systems. I'm Haidar Ghazy Arkan—let's build the next anomaly together.",
        "+18%",
        "+0Hz",
    ),
]


async def synth_vo():
    rendered = []
    for name, start_t, text, rate, pitch in VO_SEGMENTS:
        mp3_path = os.path.join(TMP_DIR, f"{name}.mp3")
        wav_path = os.path.join(TMP_DIR, f"{name}.wav")
        comm = edge_tts.Communicate(text, voice="en-US-christopherNeural", rate=rate, pitch=pitch)
        await comm.save(mp3_path)
        subprocess.run(
            [
                "ffmpeg", "-y", "-i", mp3_path,
                "-af", "silenceremove=start_periods=1:start_duration=0.02:start_threshold=-45dB,highpass=f=85,acompressor=threshold=-16dB:ratio=3.5:attack=5:release=60:makeup=4dB",
                "-ar", str(SR), "-ac", "2", wav_path
            ],
            check=True,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
        )
        sr, data = read_wav(wav_path)
        dur = len(data) / SR
        print(f"[VO] {name}: start={start_t:.2f}s, dur={dur:.2f}s, end={start_t+dur:.2f}s")
        rendered.append((start_t, data))
    return rendered


def make_spiderverse_music_and_sfx():
    t = np.linspace(0, DURATION, N_SAMPLES, endpoint=False)
    left = np.zeros(N_SAMPLES, dtype=np.float32)
    right = np.zeros(N_SAMPLES, dtype=np.float32)

    # 124 BPM Spider-Verse / Cyberpunk Breakbeat & Reese Sub-Bass
    bpm = 124.0
    beat_dur = 60.0 / bpm

    # Chord root notes (D minor -> Bb major -> G minor -> A7)
    roots = [73.42, 58.27, 49.00, 55.00]
    for i in range(int(DURATION / beat_dur)):
        bt = i * beat_dur
        idx = int(bt * SR)
        if idx >= N_SAMPLES:
            break
        bar = (i // 4) % 4
        root = roots[bar]

        # Punchy Kick on beats 0, 1.5, 2.5
        if i % 4 in (0, 2):
            k_len = int(0.24 * SR)
            end = min(N_SAMPLES, idx + k_len)
            kt = np.linspace(0, (end - idx) / SR, end - idx, endpoint=False)
            freq_env = 135.0 * np.exp(-kt * 28.0) + 46.0
            phase = 2 * np.pi * np.cumsum(freq_env) / SR
            kick = np.tanh(np.sin(phase) * 2.2) * np.exp(-kt * 10.5) * 0.42
            left[idx:end] += kick
            right[idx:end] += kick

        # Crisp Snare / Clap on beats 1 and 3
        if i % 4 in (1, 3):
            s_len = int(0.18 * SR)
            end = min(N_SAMPLES, idx + s_len)
            st = np.linspace(0, (end - idx) / SR, end - idx, endpoint=False)
            noise = np.random.uniform(-1, 1, end - idx) * np.exp(-st * 22.0)
            body = np.sin(2 * np.pi * 195.0 * st) * np.exp(-st * 28.0)
            snare = (noise * 0.7 + body * 0.4) * 0.28
            left[idx:end] += snare * 1.05
            right[idx:end] += snare * 0.95

        # 16th-note Spider-Verse Hat & Glitch Perc
        for sub in range(4):
            h_idx = idx + int(sub * (beat_dur / 4) * SR)
            if h_idx >= N_SAMPLES:
                break
            h_len = int(0.045 * SR)
            end = min(N_SAMPLES, h_idx + h_len)
            ht = np.linspace(0, (end - h_idx) / SR, end - h_idx, endpoint=False)
            hat = np.random.uniform(-1, 1, end - h_idx) * np.exp(-ht * 65.0) * (0.11 if sub % 2 == 0 else 0.06)
            left[h_idx:end] += hat * (0.8 if sub % 2 == 0 else 1.2)
            right[h_idx:end] += hat * (1.2 if sub % 2 == 0 else 0.8)

        # Distorted Cyberpunk Reese Bass per beat
        b_len = int(beat_dur * 0.92 * SR)
        end = min(N_SAMPLES, idx + b_len)
        bt_arr = np.linspace(0, (end - idx) / SR, end - idx, endpoint=False)
        saw1 = 2.0 * (bt_arr * root - np.floor(0.5 + bt_arr * root))
        saw2 = 2.0 * (bt_arr * (root * 1.008) - np.floor(0.5 + bt_arr * (root * 1.008)))
        sub_sin = np.sin(2 * np.pi * root * bt_arr)
        sidechain = 1.0 - 0.65 * np.exp(-bt_arr * 14.0)
        reese = (np.tanh((saw1 + saw2) * 1.4) * 0.14 + sub_sin * 0.24) * sidechain
        left[idx:end] += reese * 0.96
        right[idx:end] += reese * 1.04

    # Atmospheric Cyberpunk Synth Pad (D minor 9th arpeggiated shimmer)
    pad_freqs = [293.66, 349.23, 440.0, 523.25, 659.25]
    for pf in pad_freqs:
        mod = 0.5 + 0.5 * np.sin(2 * np.pi * 0.25 * t + pf)
        shimmer = np.sin(2 * np.pi * pf * t) * mod * 0.025
        left += shimmer
        right += np.roll(shimmer, 400)

    # --- SPIDER-VERSE / CYBERPUNK FOLEY & IMPACT SFX ---
    def add_sub_boom(time_sec, gain=0.65):
        idx = int(time_sec * SR)
        ln = int(0.85 * SR)
        end = min(N_SAMPLES, idx + ln)
        if end <= idx:
            return
        dt = np.linspace(0, (end - idx) / SR, end - idx, endpoint=False)
        f_env = 110.0 * np.exp(-dt * 7.0) + 34.0
        ph = 2 * np.pi * np.cumsum(f_env) / SR
        boom = np.tanh(np.sin(ph) * 2.5) * np.exp(-dt * 4.2) * gain
        left[idx:end] += boom
        right[idx:end] += boom

    def add_glitch_zap(time_sec, gain=0.35):
        idx = int(time_sec * SR)
        ln = int(0.22 * SR)
        end = min(N_SAMPLES, idx + ln)
        if end <= idx:
            return
        dt = np.linspace(0, (end - idx) / SR, end - idx, endpoint=False)
        zap = np.sin(2 * np.pi * (1800.0 - 1400.0 * dt / 0.22) * dt) * np.sign(np.sin(2 * np.pi * 55.0 * dt))
        zap = zap * np.exp(-dt * 14.0) * gain
        left[idx:end] += zap * 1.1
        right[idx:end] += zap * 0.8

    def add_whoosh(time_sec, dur=0.55, gain=0.38):
        idx = int(time_sec * SR)
        ln = int(dur * SR)
        end = min(N_SAMPLES, idx + ln)
        if end <= idx:
            return
        dt = np.linspace(0, (end - idx) / SR, end - idx, endpoint=False)
        env = np.sin(np.pi * dt / dur) ** 2
        nz = np.random.uniform(-1, 1, end - idx)
        sweep = np.sin(2 * np.pi * (220.0 + 900.0 * env) * dt)
        w = (nz * 0.55 + sweep * 0.45) * env * gain
        left[idx:end] += w * np.linspace(1.2, 0.4, end - idx)
        right[idx:end] += w * np.linspace(0.4, 1.2, end - idx)

    def add_katana_slash(time_sec, gain=0.75):
        idx = int(time_sec * SR)
        ln = int(0.65 * SR)
        end = min(N_SAMPLES, idx + ln)
        if end <= idx:
            return
        dt = np.linspace(0, (end - idx) / SR, end - idx, endpoint=False)
        # Metallic high ring + fast whip + sub impact
        ring = (np.sin(2 * np.pi * 2480.0 * dt) + 0.6 * np.sin(2 * np.pi * 3710.0 * dt)) * np.exp(-dt * 9.5)
        whip = np.random.uniform(-1, 1, end - idx) * np.exp(-((dt - 0.06) ** 2) / 0.0018) * 1.6
        sub = np.sin(2 * np.pi * (140.0 * np.exp(-dt * 12.0) + 40.0) * dt) * np.exp(-dt * 6.0)
        slash = np.tanh((ring * 0.45 + whip * 0.75 + sub * 0.9) * 1.8) * gain
        left[idx:end] += slash
        right[idx:end] += slash

    # Scene 1: Glitch snaps on 3D artifacts & camera dive at 6.8s
    for zt in [0.15, 2.5, 4.3, 6.0]:
        add_glitch_zap(zt, 0.32)
    add_whoosh(6.8, 0.75, 0.48)
    add_sub_boom(8.8, 0.62)

    # Scene 2: Stamp slams at 9.2s, 13.2s, 17.2s + transition at 20.6s
    for st_t in [9.2, 13.2, 17.2]:
        add_sub_boom(st_t, 0.50)
        add_glitch_zap(st_t + 0.05, 0.25)
    add_whoosh(20.6, 0.6, 0.45)

    # Scene 3: 3D Carousel spin + 7.9M Impact Boom at 26.6s + Comic Chat pops at 32.8, 34.0, 35.2 + 60% shatter at 36.0s
    add_whoosh(21.1, 0.5, 0.38)
    add_sub_boom(26.6, 0.75)
    add_glitch_zap(26.65, 0.40)
    for ct in [32.8, 34.0, 35.2]:
        add_glitch_zap(ct, 0.28)
    add_sub_boom(36.0, 0.60)
    add_whoosh(37.6, 0.6, 0.45)

    # Scene 4: Cyber Reactor + KATANA SLASH at 48.1s ("5 DAYS" sliced into "5 HOURS")
    add_sub_boom(38.1, 0.55)
    add_whoosh(43.5, 0.5, 0.42)
    add_katana_slash(48.1, 0.82)
    add_sub_boom(48.35, 0.78)

    # Scene 5: Final Hero Freeze-Frame Landing at 51.6s & Signoff hit at 58.2s
    add_sub_boom(51.6, 0.72)
    add_glitch_zap(51.65, 0.35)
    add_sub_boom(58.0, 0.58)

    # Fade out last 1.2s
    fade_len = int(1.2 * SR)
    fade_curve = np.linspace(1.0, 0.0, fade_len)
    left[-fade_len:] *= fade_curve
    right[-fade_len:] *= fade_curve

    return np.column_stack([left, right])


async def main():
    vo_list = await synth_vo()
    music_stereo = make_spiderverse_music_and_sfx()

    vo_track = np.zeros_like(music_stereo)
    duck_env = np.ones(N_SAMPLES, dtype=np.float32)

    for start_t, data in vo_list:
        idx = int(start_t * SR)
        if data.ndim == 1:
            data = np.column_stack([data, data])
        end = min(N_SAMPLES, idx + len(data))
        seg_len = end - idx
        vo_track[idx:end] += data[:seg_len] * 1.35
        # Duck music during VO so voiceover is crystal clear
        pad_pre = max(0, idx - int(0.15 * SR))
        pad_post = min(N_SAMPLES, end + int(0.25 * SR))
        duck_env[pad_pre:pad_post] = 0.36

    # Smooth ducking envelope
    kernel_size = int(0.08 * SR)
    kernel = np.ones(kernel_size) / kernel_size
    duck_smooth = np.convolve(duck_env, kernel, mode="same")

    # Save pure backing track
    backing_wav = os.path.join(TMP_DIR, "backing_spiderverse.wav")
    backing_norm = np.clip(music_stereo * 0.9, -0.98, 0.98)
    write_wav(backing_wav, SR, (backing_norm * 32767).astype(np.int16))
    backing_mp3 = os.path.join(FINAL_DIR, "03_Haidar_SpiderVerse_BackingTrack_60s.mp3")
    subprocess.run(["ffmpeg", "-y", "-i", backing_wav, "-b:a", "192k", backing_mp3], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    # Master mix (ducked music + crisp VO)
    mixed = music_stereo * duck_smooth[:, None] + vo_track
    peak = np.max(np.abs(mixed))
    if peak > 0:
        mixed = np.tanh(mixed / peak * 1.15) * 0.94

    master_wav = os.path.join(TMP_DIR, "master_spiderverse_60s.wav")
    write_wav(master_wav, SR, (mixed * 32767).astype(np.int16))

    out_mp3_1 = os.path.join(OUT_DIR, "master-social-60s.mp3")
    out_mp3_2 = os.path.join(FINAL_DIR, "04_Haidar_SpiderVerse_MasterAudio_VO_60s.mp3")
    for dst in (out_mp3_1, out_mp3_2):
        subprocess.run(["ffmpeg", "-y", "-i", master_wav, "-b:a", "192k", dst], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    print("Master Spider-Verse Audio successfully written to:", out_mp3_1)


if __name__ == "__main__":
    asyncio.run(main())
