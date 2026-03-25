import React, { useState } from 'react';
import './App.css';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp, Music, Hash, Clock, Settings, User } from 'lucide-react';

// Mock Data
const MOCK_HASHTAGS = [
  { name: '#fyp', trend: 'Up', views: '2.4B' },
  { name: '#tech', trend: 'Stable', views: '120M' },
  { name: '#viral', trend: 'Up', views: '1.1B' },
  { name: '#coding', trend: 'Up', views: '45M' },
  { name: '#brisbane', trend: 'Stable', views: '12M' },
];

const MOCK_SOUNDS = [
  { name: 'Trending Sound A', useCount: '500k' },
  { name: 'Viral Audio B', useCount: '1.2M' },
  { name: 'New Release C', useCount: '200k' },
];

const MOCK_BEST_TIMES = [
  { hour: '00:00', engagement: 45 },
  { hour: '04:00', engagement: 20 },
  { hour: '08:00', engagement: 85 },
  { hour: '12:00', engagement: 65 },
  { hour: '16:00', engagement: 95 },
  { hour: '20:00', engagement: 75 },
];

function App() {
  const [activeTab, setActiveTab] = useState('trends');

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="logo">TikTok Analyzer</div>
        <nav>
          <button className={activeTab === 'trends' ? 'active' : ''} onClick={() => setActiveTab('trends')}>
            <TrendingUp size={20} /> Trends
          </button>
          <button className={activeTab === 'analytics' ? 'active' : ''} onClick={() => setActiveTab('analytics')}>
            <Clock size={20} /> Analytics
          </button>
          <button className={activeTab === 'profile' ? 'active' : ''} onClick={() => setActiveTab('profile')}>
            <User size={20} /> My Profile
          </button>
          <button className={activeTab === 'settings' ? 'active' : ''} onClick={() => setActiveTab('settings')}>
            <Settings size={20} /> Settings
          </button>
        </nav>
      </aside>

      <main className="content">
        <header>
          <h1>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
          <div className="user-info">Brisbane, Australia</div>
        </header>

        {activeTab === 'trends' && (
          <div className="trends-view">
            <section className="card">
              <h2><Hash size={18} /> Trending Hashtags</h2>
              <ul>
                {MOCK_HASHTAGS.map(tag => (
                  <li key={tag.name} className="list-item">
                    <span>{tag.name}</span>
                    <span className="views">{tag.views} views</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="card">
              <h2><Music size={18} /> Trending Sounds</h2>
              <ul>
                {MOCK_SOUNDS.map(sound => (
                  <li key={sound.name} className="list-item">
                    <span>{sound.name}</span>
                    <span className="use-count">{sound.useCount} uses</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="analytics-view">
            <section className="card full-width">
              <h2>Best Time to Post (Brisbane Time)</h2>
              <p>Based on your last 30 videos</p>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={MOCK_BEST_TIMES}>
                    <XAxis dataKey="hour" />
                    <YAxis hide />
                    <Tooltip />
                    <Bar dataKey="engagement">
                      {MOCK_BEST_TIMES.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.engagement > 80 ? '#fe2c55' : '#25f4ee'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="recommendation">
                <strong>Recommended Next Window:</strong> Today at 16:00 (4 PM)
              </div>
            </section>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="profile-view">
            <p>Connect your TikTok account in Settings to view personalized analytics.</p>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="settings-view">
            <section className="card">
              <h2>Account Connection</h2>
              <button className="connect-btn">Connect TikTok Account</button>
              <div className="api-config">
                <h3>API Configuration</h3>
                <input type="password" placeholder="RapidAPI Key" />
                <input type="text" placeholder="TikTok Client Key" />
                <button className="save-btn">Save Settings</button>
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
