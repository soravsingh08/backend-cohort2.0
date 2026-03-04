import React, { useContext, useEffect, useRef, useState, useCallback } from 'react';
import { SongContext } from '../../song.context';
import './Player.css';

const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
};

const SPEED_OPTIONS = [0.5, 0.75, 1, 1.25, 1.5, 2];

const Player = () => {
    const { song } = useContext(SongContext);

    const audioRef = useRef(null);
    const progressRef = useRef(null);
    const animFrameRef = useRef(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.8);
    const [isMuted, setIsMuted] = useState(false);
    const [playbackSpeed, setPlaybackSpeed] = useState(1);
    const [showSpeedMenu, setShowSpeedMenu] = useState(false);
    const [isLooping, setIsLooping] = useState(false);
    const [isShuffled, setIsShuffled] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [showVolume, setShowVolume] = useState(false);

    // Reset player when song changes
    useEffect(() => {
        if (!audioRef.current || !song?.url) return;
        setCurrentTime(0);
        setDuration(0);
        setIsPlaying(false);
        audioRef.current.load();
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => { });
    }, [song?.url]);

    // Sync volume & speed
    useEffect(() => {
        if (!audioRef.current) return;
        audioRef.current.volume = isMuted ? 0 : volume;
    }, [volume, isMuted]);

    useEffect(() => {
        if (!audioRef.current) return;
        audioRef.current.playbackRate = playbackSpeed;
    }, [playbackSpeed]);

    useEffect(() => {
        if (!audioRef.current) return;
        audioRef.current.loop = isLooping;
    }, [isLooping]);

    const updateProgress = useCallback(() => {
        if (audioRef.current && !isDragging) {
            setCurrentTime(audioRef.current.currentTime);
        }
        animFrameRef.current = requestAnimationFrame(updateProgress);
    }, [isDragging]);

    useEffect(() => {
        animFrameRef.current = requestAnimationFrame(updateProgress);
        return () => cancelAnimationFrame(animFrameRef.current);
    }, [updateProgress]);

    const handleLoadedMetadata = () => {
        setDuration(audioRef.current.duration);
    };

    const handlePlayPause = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play();
            setIsPlaying(true);
        }
    };

    const handleEnded = () => setIsPlaying(false);

    const handleSeek = (e) => {
        const rect = progressRef.current.getBoundingClientRect();
        const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        const newTime = ratio * duration;
        audioRef.current.currentTime = newTime;
        setCurrentTime(newTime);
    };

    const handleProgressMouseDown = (e) => {
        setIsDragging(true);
        handleSeek(e);
        const onMove = (ev) => handleSeek(ev);
        const onUp = () => {
            setIsDragging(false);
            document.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseup', onUp);
        };
        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onUp);
    };

    const handleSkipForward = () => {
        if (!audioRef.current) return;
        audioRef.current.currentTime = Math.min(audioRef.current.currentTime + 10, duration);
    };

    const handleSkipBackward = () => {
        if (!audioRef.current) return;
        audioRef.current.currentTime = Math.max(audioRef.current.currentTime - 10, 0);
    };

    const handleSpeedSelect = (speed) => {
        setPlaybackSpeed(speed);
        setShowSpeedMenu(false);
    };

    const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

    const moodColors = {
        happy: '#1DB954',
        sad: '#5B8DEF',
        angry: '#EF5B5B',
        fearful: '#A259FF',
        disgusted: '#F5A623',
        surprised: '#FF6B6B',
        neutral: '#1DB954',
    };
    const accentColor = moodColors[song?.mood?.toLowerCase()] || '#1DB954';

    if (!song) return null;

    return (
        <div className="player-wrapper">
            <audio
                ref={audioRef}
                src={song.url}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={handleEnded}
                preload="metadata"
            />

            {/* Glowing background blob based on mood */}
            <div className="player-glow" style={{ '--accent': accentColor }} />

            <div className="player-container">

                {/* Song Info */}
                <div className="player-song-info">
                    <div className="player-album-art-wrap">
                        <img
                            src={song.posterUrl}
                            alt={song.title}
                            className={`player-album-art ${isPlaying ? 'spinning' : ''}`}
                        />
                        <div className="player-album-ring" style={{ '--accent': accentColor }} />
                    </div>
                    <div className="player-meta">
                        <span className="player-mood-badge" style={{ background: accentColor }}>
                            {song.mood}
                        </span>
                        <h3 className="player-title">{song.title}</h3>
                        <p className="player-artist">Moodify</p>
                    </div>
                    <button
                        className={`player-like-btn ${isLiked ? 'liked' : ''}`}
                        onClick={() => setIsLiked(l => !l)}
                        title="Like"
                    >
                        <svg viewBox="0 0 24 24" fill={isLiked ? accentColor : 'none'} stroke={isLiked ? accentColor : 'currentColor'} strokeWidth="2">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                    </button>
                </div>

                {/* Progress Bar */}
                <div className="player-progress-section">
                    <span className="player-time">{formatTime(currentTime)}</span>
                    <div
                        className="player-progress-track"
                        ref={progressRef}
                        onMouseDown={handleProgressMouseDown}
                    >
                        <div className="player-progress-bg" />
                        <div
                            className="player-progress-fill"
                            style={{ width: `${progressPercent}%`, background: accentColor }}
                        />
                        <div
                            className="player-progress-thumb"
                            style={{ left: `${progressPercent}%`, background: accentColor }}
                        />
                    </div>
                    <span className="player-time">{formatTime(duration)}</span>
                </div>

                {/* Controls */}
                <div className="player-controls">

                    {/* Shuffle */}
                    <button
                        className={`player-ctrl-btn secondary ${isShuffled ? 'active' : ''}`}
                        onClick={() => setIsShuffled(s => !s)}
                        title="Shuffle"
                        style={isShuffled ? { color: accentColor } : {}}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="16 3 21 3 21 8" />
                            <line x1="4" y1="20" x2="21" y2="3" />
                            <polyline points="21 16 21 21 16 21" />
                            <line x1="15" y1="15" x2="21" y2="21" />
                        </svg>
                    </button>

                    {/* Skip Backward 10s */}
                    <button
                        className="player-ctrl-btn secondary"
                        onClick={handleSkipBackward}
                        title="Rewind 10s"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11 17l-5-5 5-5" />
                            <path d="M18 17l-5-5 5-5" />
                        </svg>
                        <span className="skip-label">10</span>
                    </button>

                    {/* Play / Pause */}
                    <button
                        className="player-ctrl-btn play"
                        onClick={handlePlayPause}
                        style={{ background: accentColor, boxShadow: `0 0 24px ${accentColor}55` }}
                        title={isPlaying ? 'Pause' : 'Play'}
                    >
                        {isPlaying ? (
                            <svg viewBox="0 0 24 24" fill="white" stroke="none">
                                <rect x="6" y="4" width="4" height="16" rx="1" />
                                <rect x="14" y="4" width="4" height="16" rx="1" />
                            </svg>
                        ) : (
                            <svg viewBox="0 0 24 24" fill="white" stroke="none">
                                <polygon points="5,3 19,12 5,21" />
                            </svg>
                        )}
                    </button>

                    {/* Skip Forward 10s */}
                    <button
                        className="player-ctrl-btn secondary"
                        onClick={handleSkipForward}
                        title="Forward 10s"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M13 17l5-5-5-5" />
                            <path d="M6 17l5-5-5-5" />
                        </svg>
                        <span className="skip-label">10</span>
                    </button>

                    {/* Loop */}
                    <button
                        className={`player-ctrl-btn secondary ${isLooping ? 'active' : ''}`}
                        onClick={() => setIsLooping(l => !l)}
                        title="Loop"
                        style={isLooping ? { color: accentColor } : {}}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="17 1 21 5 17 9" />
                            <path d="M3 11V9a4 4 0 0 1 4-4h14" />
                            <polyline points="7 23 3 19 7 15" />
                            <path d="M21 13v2a4 4 0 0 1-4 4H3" />
                        </svg>
                    </button>

                </div>

                {/* Bottom toolbar: Volume + Speed */}
                <div className="player-toolbar">

                    {/* Volume */}
                    <div
                        className="player-volume-wrap"
                        onMouseEnter={() => setShowVolume(true)}
                        onMouseLeave={() => setShowVolume(false)}
                    >
                        <button
                            className="player-ctrl-btn secondary"
                            onClick={() => setIsMuted(m => !m)}
                            title={isMuted ? 'Unmute' : 'Mute'}
                        >
                            {isMuted || volume === 0 ? (
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                                    <line x1="23" y1="9" x2="17" y2="15" />
                                    <line x1="17" y1="9" x2="23" y2="15" />
                                </svg>
                            ) : volume < 0.5 ? (
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                                </svg>
                            ) : (
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                                </svg>
                            )}
                        </button>
                        <div className={`player-volume-slider-wrap ${showVolume ? 'visible' : ''}`}>
                            <input
                                type="range"
                                min={0} max={1} step={0.01}
                                value={isMuted ? 0 : volume}
                                onChange={(e) => {
                                    setVolume(parseFloat(e.target.value));
                                    setIsMuted(false);
                                }}
                                className="player-volume-slider"
                                style={{ '--accent': accentColor }}
                            />
                        </div>
                    </div>

                    {/* Spacer */}
                    <div style={{ flex: 1 }} />

                    {/* Speed Control */}
                    <div className="player-speed-wrap">
                        <button
                            className={`player-speed-btn ${showSpeedMenu ? 'active' : ''}`}
                            onClick={() => setShowSpeedMenu(s => !s)}
                            title="Playback speed"
                            style={showSpeedMenu ? { color: accentColor, borderColor: accentColor } : {}}
                        >
                            {playbackSpeed}x
                        </button>
                        {showSpeedMenu && (
                            <div className="player-speed-menu">
                                {SPEED_OPTIONS.map((s) => (
                                    <button
                                        key={s}
                                        className={`player-speed-option ${s === playbackSpeed ? 'selected' : ''}`}
                                        onClick={() => handleSpeedSelect(s)}
                                        style={s === playbackSpeed ? { color: accentColor } : {}}
                                    >
                                        {s}x
                                        {s === playbackSpeed && (
                                            <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12" style={{ marginLeft: 6 }}>
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                        )}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Player;