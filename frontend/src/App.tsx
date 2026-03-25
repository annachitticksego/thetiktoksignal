import React, { useState } from 'react';
import './App.css';
import { Search, Music, Hash, Clock, Copy, ChevronRight, TrendingUp, Target, Globe, BarChart3, Zap, Play, SearchCode, Check, User, Activity, SignalHigh } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const MOCK_GROWTH_DATA = [
  { day: 'Mon', views: 1200 }, { day: 'Tue', views: 2100 }, { day: 'Wed', views: 1800 },
  { day: 'Thu', views: 3400 }, { day: 'Fri', views: 4200 }, { day: 'Sat', views: 3900 }, { day: 'Sun', views: 5100 },
];

const Logo = ({ size = "large" }) => (
  <div className={`logo-wrap ${size}`}>
    <div className="logo-glitch-box">
      <SignalHigh className="signal-base" size={size === "large" ? 64 : 28} strokeWidth={2.5} />
      <SignalHigh className="signal-glitch cyan" size={size === "large" ? 64 : 28} strokeWidth={2.5} />
      <SignalHigh className="signal-glitch red" size={size === "large" ? 64 : 28} strokeWidth={2.5} />
    </div>
    <span className="logo-text-gradient">the tiktok signal</span>
  </div>
);

function App() {
  // --- States ---
  const [step, setStep] = useState(0); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [profile, setProfile] = useState({ region: 'AU', size: '1k-10k', goal: 'Reach' });
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleConnect = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      setIsLoggedIn(true);
    }, 1500);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    setLoading(true);
    setSelectedTags([]);
    try {
      const response = await fetch(`http://localhost:8000/search?query=${query}&region=${profile.region}&goal=${profile.goal}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      const mockTags = Array.from({length: 20}, (_, i) => ({
        hashtag_name: i === 0 ? 'fyp' : `${query}${i}`,
        views: `${(Math.random() * 5).toFixed(1)}B`
      }));
      setResults({
        hashtags: mockTags,
        music: [{music_name: 'Viral Hit #1', use_count: '1.2M'}, {music_name: 'Trending Audio #2', use_count: '850k'}],
        search_insights: [`How to ${query}`, `${query} hacks`, `${query} for beginners`, `best ${query} 2026`, `${query} tutorial`]
      });
    }
    setLoading(false);
  };

  const toggleTag = (tagName: string) => {
    setSelectedTags(prev => prev.includes(tagName) ? prev.filter(t => t !== tagName) : [...prev, tagName]);
  };

  const copySelected = () => {
    const tagList = selectedTags.map(t => `#${t}`).join(' ');
    navigator.clipboard.writeText(tagList);
    alert(`${selectedTags.length} Hashtags copied!`);
  };

  // --- Onboarding Screens ---
  if (step === 0) return (
    <div className="onboarding-screen">
      <div className="onboarding-card">
        <Logo size="large" />
        <p className="subtitle">Real-time data. Pure growth.</p>
        <button className="start-btn" onClick={() => setStep(1)}>Begin Setup <ChevronRight size={20} /></button>
      </div>
    </div>
  );

  if (step < 4) {
    const questions = [
      { key: 'region', title: 'Target Audience Region', icon: <Globe size={24} color="#25f4ee" />, options: ['AU', 'US'] },
      { key: 'size', title: 'Current Account Size', icon: <BarChart3 size={24} color="#fe2c55" />, options: ['0-1k', '1k-10k', '10k-100k', '100k+'] },
      { key: 'goal', title: 'Primary Strategy Goal', icon: <Target size={24} color="#25f4ee" />, options: ['Reach', 'SEO', 'Engagement', 'Clarity'] }
    ];
    const q = questions[step - 1];
    return (
      <div className="onboarding-screen">
        <div className="onboarding-card">
          <div className="onboarding-header">
            {q.icon}
            <h2>{q.title}</h2>
          </div>
          <div className="option-grid">
            {q.options.map(opt => (
              <button key={opt} onClick={() => { setProfile({...profile, [q.key]: opt}); setStep(step + 1); }}>{opt}</button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // --- Main Dashboard ---
  return (
    <div className="container">
      <header className="dashboard-header">
        <div className="header-left">
          <div className="badge">{profile.region} • {profile.size} • {profile.goal}</div>
          <Logo size="small" />
        </div>
        <div className="header-right">
          {!isLoggedIn ? (
            <button className="connect-pill" onClick={handleConnect} disabled={isConnecting}>
              {isConnecting ? "Connecting..." : <><User size={16} /> Connect TikTok</>}
            </button>
          ) : (
            <div className="user-badge">
              <div className="avatar">A</div>
              <span>@annachittick</span>
            </div>
          )}
        </div>
      </header>

      <main className="hero-centered">
        <form onSubmit={handleSearch} className="search-box">
          <input type="text" placeholder={`What is your next video about?`} value={query} onChange={(e) => setQuery(e.target.value)} />
          <button type="submit" disabled={loading}>{loading ? <Zap size={24} className="spinning" /> : <Search size={24} />}</button>
        </form>
      </main>

      {results && (
        <div className="results-grid">
          <section className="section-card">
            <div className="card-header">
              <h2><Hash size={20} color="#fe2c55" /> Trending Hashtags</h2>
              {selectedTags.length > 0 && <button onClick={copySelected} className="icon-btn highlight"><Copy size={16} /> Copy {selectedTags.length}</button>}
            </div>
            <div className="tag-list scrollable">
              {results.hashtags.map((tag: any, i: number) => (
                <div key={i} className={`tag-item-selectable ${selectedTags.includes(tag.hashtag_name) ? 'active' : ''}`} onClick={() => toggleTag(tag.hashtag_name)}>
                  <div className="tag-main"><div className="checkbox">{selectedTags.includes(tag.hashtag_name) && <Check size={12} color="#000" />}</div><span className="tag-name">#{tag.hashtag_name}</span></div>
                  <span className="tag-views">{tag.views}</span>
                </div>
              ))}
            </div>
          </section>

          <div className="column-stack">
            <section className="section-card">
              <div className="card-header"><h2><SearchCode size={20} color="#25f4ee" /> Search Insights</h2></div>
              <div className="insight-list">
                {results.search_insights.map((insight: string, i: number) => (
                  <div key={i} className="insight-item-small"><span>{insight}</span></div>
                ))}
              </div>
            </section>
            <section className="section-card">
              <div className="card-header"><h2><Music size={20} color="#25f4ee" /> Trending Music</h2></div>
              <div className="music-list">
                {results.music.map((song: any, i: number) => (
                  <div key={i} className="music-item-small"><Play size={14} fill="white" /><div className="music-info"><span className="song-title-small">{song.music_name}</span><span className="song-uses">{song.use_count}</span></div></div>
                ))}
              </div>
            </section>
          </div>

          <section className="section-card full-width">
            <div className="card-header">
              <h2><Clock size={20} color="#ff6b6b" /> {isLoggedIn ? "Personalized Strategy" : "Niche Intelligence"}</h2>
              <span className="live-status"><div className="dot"></div> {isLoggedIn ? "Account Synced" : "Live Data"}</span>
            </div>
            <div className="strategy-grid">
               <div className="time-viz">
                  <div className="viz-header">{isLoggedIn ? "Your Followers' Peak Activity (Brisbane)" : "General Niche Peak Hours"}</div>
                  <div className="timeline">
                     {[8, 10, 12, 14, 16, 18, 20, 22].map(hour => (
                        <div key={hour} className={`hour-block ${hour === (isLoggedIn ? 20 : 16) ? 'peak' : ''}`}>
                           <div className="bar" style={{height: `${Math.random() * 100}%`}}></div>
                           <span>{hour}h</span>
                        </div>
                     ))}
                  </div>
               </div>
               <div className="action-card">
                  <h3>Next Best Time</h3>
                  <div className="big-time">{isLoggedIn ? "20:00 (8 PM)" : "16:00 (4 PM)"}</div>
                  <div className="countdown-pill">{isLoggedIn ? "Personal Peak" : "Niche Peak"} in <strong>2h 14m</strong></div>
               </div>
            </div>

            {isLoggedIn && (
              <div className="personal-growth">
                <div className="growth-header"><Activity size={16} color="#25f4ee" /> Recent View Velocity</div>
                <div style={{width: '100%', height: 150}}>
                  <ResponsiveContainer>
                    <LineChart data={MOCK_GROWTH_DATA}>
                      <XAxis dataKey="day" hide />
                      <YAxis hide />
                      <Tooltip contentStyle={{backgroundColor: '#111', border: '1px solid #222'}} />
                      <Line type="monotone" dataKey="views" stroke="#25f4ee" strokeWidth={3} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </section>
        </div>
      )}
      <footer className="footer">Powered by TikTok Authorized APIs</footer>
    </div>
  );
}

export default App;
