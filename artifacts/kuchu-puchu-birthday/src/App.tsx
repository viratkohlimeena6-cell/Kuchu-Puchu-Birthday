import { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Gift,
  Heart,
  MapPin,
  Music2,
  RotateCcw,
  Sparkles,
  Volume2,
} from 'lucide-react';
import './index.css';

const media = {
  shristi: '/media/shristi.jpg',
  boyfriend: '/media/boyfriend.jpg',
  kajal: '/media/kajal.png',
  photo2: '/media/photo2.jpg',
  vlog: '/media/shristi-vlog.mp4',
  audio: '/media/birthday-audio.mp3',
};

const starPositions = [
  [7, 17, 0], [12, 70, 1.2], [19, 30, .4], [24, 86, 1.8], [31, 15, .8],
  [37, 74, 2.1], [43, 25, 1.5], [49, 89, .25], [58, 12, 1.1], [62, 69, 1.9],
  [70, 35, .55], [77, 82, 1.6], [84, 19, .15], [91, 61, 1.25], [96, 32, .7],
  [4, 47, 2.3], [28, 52, 2.7], [54, 46, 1.4], [73, 9, 2.5], [88, 91, .3],
];

function StarField() {
  return (
    <div className="star-field" aria-hidden="true">
      {starPositions.map(([left, top, delay], index) => (
        <span
          className="star"
          key={index}
          style={{ left: `${left}%`, top: `${top}%`, animationDelay: `${delay}s` }}
        />
      ))}
      <div className="orbital-ring" style={{ width: '52vw', height: '18vw', left: '24%', top: '34%' }} />
      <div className="orbital-ring" style={{ width: '26vw', height: '26vw', right: '-4%', top: '10%', transform: 'rotate(49deg)' }} />
    </div>
  );
}

function TopBar({ scene }: { scene: number }) {
  return (
    <div className="top-bar">
      <div className="wordmark">A private little universe / 06</div>
      <div className="progress" aria-label={`Scene ${scene + 1} of 6`}>
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <span className={`progress-dot ${scene === index ? 'active' : ''}`} key={index} />
        ))}
      </div>
    </div>
  );
}

function App() {
  const [scene, setScene] = useState(0);
  const [globeSpinning, setGlobeSpinning] = useState(false);
  const [locationFound, setLocationFound] = useState(false);
  const [answerVisible, setAnswerVisible] = useState(false);
  const [eggOpen, setEggOpen] = useState(false);
  const [kajalOpen, setKajalOpen] = useState(false);
  const [boyfriendOpen, setBoyfriendOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const spinTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    window.clearTimeout(spinTimer.current);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (scene !== 1) {
      setGlobeSpinning(false);
      setLocationFound(false);
    }
    if (scene !== 2) setAnswerVisible(false);
    if (scene !== 3) setEggOpen(false);
    if (scene !== 4) setKajalOpen(false);
    if (scene !== 5) setBoyfriendOpen(false);
  }, [scene]);

  useEffect(() => () => window.clearTimeout(spinTimer.current), []);

  const next = () => setScene((current) => Math.min(5, current + 1));
  const back = () => setScene((current) => Math.max(0, current - 1));
  const replay = () => {
    setScene(0);
    setGlobeSpinning(false);
    setLocationFound(false);
    setAnswerVisible(false);
    setEggOpen(false);
    setKajalOpen(false);
    setBoyfriendOpen(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const spinGlobe = () => {
    if (globeSpinning || locationFound) return;
    setGlobeSpinning(true);
    spinTimer.current = window.setTimeout(() => {
      setGlobeSpinning(false);
      setLocationFound(true);
    }, 2200);
  };

  const openBoyfriend = () => {
    setBoyfriendOpen(true);
    window.setTimeout(() => {
      void audioRef.current?.play().catch(() => undefined);
    }, 500);
  };

  return (
    <main className="birthday-app">
      <TopBar scene={scene} />
      <section className={`scene scene-${['one', 'two', 'three', 'four', 'five', 'six'][scene]}`} key={scene}>
        <StarField />

        {scene === 0 && (
          <div className="scene-content">
            <div className="opening-copy">
              <p className="eyebrow">For Shristi / from a very smitten someone</p>
              <h1 className="display">Happy Birthday <em>Kuchu Puchu!</em></h1>
              <p className="subtitle">Tonight, the universe has one tiny secret to tell you.</p>
              <div className="button-row">
                <button className="primary-button" data-testid="button-next-welcome" onClick={next}>
                  Begin the little magic <ArrowRight size={16} />
                </button>
              </div>
            </div>
            <div className="opening-seal">made<br />with<br />mischief</div>
          </div>
        )}

        {scene === 1 && (
          <div className="scene-content">
            <div className="globe-layout">
              <div className="globe-copy">
                <p className="eyebrow">Chapter 02 / a global search</p>
                <h2 className="display">There is one<br /><em>face</em> worth finding.</h2>
                <p className="body-copy">I checked every corner of this little blue planet. No shortcuts. No second guesses.</p>
                <div className="button-row">
                  {!locationFound ? (
                    <button className="primary-button" data-testid="button-find-cutest-girl" onClick={spinGlobe} disabled={globeSpinning}>
                      {globeSpinning ? 'Searching the whole world...' : 'Find the cutest girl of the world'}
                      {!globeSpinning && <Sparkles size={16} />}
                    </button>
                  ) : (
                    <button className="primary-button" data-testid="button-quote-best-day" onClick={next}>
                      Quote for the best day of the year <ArrowRight size={16} />
                    </button>
                  )}
                </div>
              </div>
              <div className="globe-stage">
                <div className="globe-shadow" />
                <div className={`globe ${globeSpinning ? 'spinning' : ''}`} data-testid="display-earth-globe">
                  <div className="globe-grid" />
                  <div className={`pin ${locationFound ? 'show' : ''}`} data-testid="pin-haridwar">
                    <div className="pin-head" />
                    <span className="pin-label"><MapPin size={12} /> Haridwar, India</span>
                  </div>
                </div>
                <div className={`location-found ${locationFound ? 'show' : ''}`} data-testid="status-location-found">
                  destination found / Haridwar
                </div>
              </div>
            </div>
          </div>
        )}

        {scene === 2 && (
          <div className="scene-content">
            <div className="question-card">
              <p className="eyebrow">Chapter 03 / highly scientific</p>
              <h2 className="display">What makes Shristi<br /><em>so impossible</em>?</h2>
              <p className="body-copy" style={{ margin: '25px auto 0' }}>Choose carefully. There is absolutely a right answer.</p>
              <div className="choices">
                <button className="ghost-button choice" data-testid="button-choice-cuteness" onClick={() => setAnswerVisible(true)}>Cuteness</button>
                <button className="primary-button choice" data-testid="button-choice-shristi" onClick={() => setAnswerVisible(true)}>Shristi</button>
              </div>
              <p className={`answer ${answerVisible ? 'visible' : ''}`} data-testid="text-answer">
                ofc shristi! Cuteness follows my brothhaa
              </p>
              {answerVisible && (
                <button className="ghost-button" data-testid="button-continue-egg" onClick={next}>
                  I knew it <ArrowRight size={16} />
                </button>
              )}
            </div>
          </div>
        )}

        {scene === 3 && (
          <div className="scene-content">
            <div className="repeat-type" aria-hidden="true">
              Kon hai shristi kon hai shristi kon hai shristi kon hai shristi
            </div>
            <div className="egg-layout">
              <div className="egg-copy">
                <p className="eyebrow">Chapter 04 / classified cuteness</p>
                <h2 className="display">Kon hai <em>Shristi?</em></h2>
                <p className="body-copy">A tiny mystery, carefully wrapped in a very dramatic egg. Tap when you are ready for the grand reveal.</p>
                {!eggOpen ? (
                  <button className="primary-button egg-button" data-testid="button-reveal-shristi" onClick={() => setEggOpen(true)}>
                    Reveal the Shristi <Sparkles size={16} />
                  </button>
                ) : (
                  <button className="ghost-button egg-button" data-testid="button-continue-gift" onClick={next}>
                    One more secret <ArrowRight size={16} />
                  </button>
                )}
              </div>
              <div className="egg-scene">
                <div className={`egg-radiance ${eggOpen ? 'show' : ''}`} />
                <div className="egg-pedestal" />
                <div className={`egg ${eggOpen ? 'open' : ''}`} data-testid="display-birthday-egg" />
                <div className="egg-crack" aria-hidden="true" />
                <img className={`shristi-reveal ${eggOpen ? 'show' : ''}`} src={media.shristi} alt="Shristi smiling" data-testid="img-shristi-reveal" />
              </div>
              <div className="media-dock">
                <figure className="media-card">
                  <video src={media.vlog} controls playsInline preload="metadata" data-testid="video-shristi-vlog" />
                  <figcaption>Shristi ke vlogs / press play for proof</figcaption>
                </figure>
                <figure className="media-card">
                  <img src={media.photo2} alt="A little extra Shristi memory" onError={(event) => { event.currentTarget.src = media.shristi; }} data-testid="img-extra-shristi" />
                  <figcaption className="shayari">Teri hasi pe toh chand bhi sharmaaye,<br />tu jahan ho, wahan roshni ruk jaaye.</figcaption>
                </figure>
                <p className="body-copy" style={{ gridColumn: '1 / -1', maxWidth: 'none', margin: 0 }}>
                  Shristi ke vlogs jisne nhi dekhe usne kuch nhi dekha!
                </p>
              </div>
            </div>
          </div>
        )}

        {scene === 4 && (
          <div className="scene-content">
            <div className="gift-layout">
              <p className="eyebrow">Chapter 05 / a small hint</p>
              <h2 className="display"><em>from ur boyfriend</em></h2>
              <div className="gift-stage">
                <div className={`gift-content ${kajalOpen ? 'show' : ''}`} data-testid="display-kajal-gift">
                  <img src={media.kajal} alt="Kajal gift" />
                </div>
                <div className={`gift-box ${kajalOpen ? 'open' : ''}`} data-testid="display-kajal-gift-box">
                  <div className="gift-bow" />
                </div>
              </div>
              <p className="gift-label">{kajalOpen ? 'For those legendary eyes.' : 'There is something inside.'}</p>
              {!kajalOpen ? (
                <button className="primary-button" data-testid="button-open-kajal-gift" onClick={() => setKajalOpen(true)}>
                  Open the gift <Gift size={16} />
                </button>
              ) : (
                <button className="ghost-button" data-testid="button-continue-boyfriend" onClick={next}>
                  There is one last reveal <ArrowRight size={16} />
                </button>
              )}
            </div>
          </div>
        )}

        {scene === 5 && (
          <div className="scene-content">
            <div className="finale">
              {!boyfriendOpen ? (
                <>
                  <p className="eyebrow">Chapter 06 / classified identity</p>
                  <h2 className="display">reveal shristi's<br /><em>boyfriend</em></h2>
                  <div className="gift-stage">
                    <div className="gift-box" data-testid="display-boyfriend-gift-box">
                      <div className="gift-bow" />
                    </div>
                  </div>
                  <button className="primary-button" data-testid="button-reveal-boyfriend" onClick={openBoyfriend}>
                    Open the final gift <Gift size={16} />
                  </button>
                </>
              ) : (
                <>
                  <div className="boyfriend-frame" data-testid="img-boyfriend-reveal">
                    <img src={media.boyfriend} alt="Shristi's boyfriend" />
                  </div>
                  <p className="eyebrow">identity confirmed / heart stolen</p>
                  <h2 className="display">Love you <strong>3000</strong></h2>
                  <p className="finale-note">Happy birthday, Kuchu Puchu. Keep being the softest, funniest, brightest person in every room.</p>
                  <p className="audio-note"><Volume2 size={13} /> your birthday soundtrack is playing</p>
                  <div className="button-row" style={{ justifyContent: 'center' }}>
                    <button className="ghost-button" data-testid="button-replay-celebration" onClick={replay}>
                      Replay the magic <RotateCcw size={15} />
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </section>

      <div className="nav-actions">
        <button className="icon-button" aria-label="Go back" data-testid="button-back" onClick={back} disabled={scene === 0}>
          <ArrowLeft size={16} />
        </button>
        <button className="icon-button" aria-label="Replay from beginning" data-testid="button-replay" onClick={replay}>
          {scene === 5 && boyfriendOpen ? <Music2 size={16} /> : <RotateCcw size={16} />}
        </button>
      </div>
      <audio ref={audioRef} src={media.audio} preload="auto" data-testid="audio-birthday" />
      <div aria-hidden="true" style={{ position: 'fixed', bottom: 27, left: 30, zIndex: 30, color: 'rgba(248,239,228,.45)' }}>
        <Heart size={14} fill="currentColor" />
      </div>
    </main>
  );
}

export default App;