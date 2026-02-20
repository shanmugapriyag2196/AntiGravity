import React, { useState } from 'react';
import { Briefcase, Bookmark, Bell, ClipboardList, Settings, ChevronRight } from 'lucide-react';

const Jobs = () => {
    const [bookmarkedJobs, setBookmarkedJobs] = useState(new Set());

    const jobListings = [
        { id: 1, title: 'Senior React Developer', company: 'Google', location: 'Remote', posted: '2 days ago' },
        { id: 2, title: 'Product Designer', company: 'Meta', location: 'Menlo Park, CA', posted: '5 hours ago' },
        { id: 3, title: 'Frontend Engineer', company: 'Amazon', location: 'Seattle, WA', posted: '1 week ago' }
    ];

    const toggleBookmark = (id) => {
        setBookmarkedJobs(prev => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });
    };

    return (
        <div className="jobs-container" style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '24px', maxWidth: '1128px', margin: '0 auto', padding: '24px' }}>
            <aside className="jobs-sidebar">
                <div className="card" style={{ padding: '0' }}>
                    <ul style={{ listStyle: 'none', padding: '0', margin: 0 }}>
                        <li style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', borderBottom: '1px solid #eef3f8' }}>
                            <Bookmark size={20} color={bookmarkedJobs.size > 0 ? "#0a66c2" : "#666"} />
                            <span style={{ fontWeight: 600 }}>My Jobs ({bookmarkedJobs.size})</span>
                        </li>
                        <li style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', borderBottom: '1px solid #eef3f8' }}>
                            <Bell size={20} color="#666" />
                            <span style={{ fontWeight: 600 }}>Job Alerts</span>
                        </li>
                        <li style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', borderBottom: '1px solid #eef3f8' }}>
                            <ClipboardList size={20} color="#666" />
                            <span style={{ fontWeight: 600 }}>Skill Assessments</span>
                        </li>
                        <li style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                            <Settings size={20} color="#666" />
                            <span style={{ fontWeight: 600 }}>Application Settings</span>
                        </li>
                    </ul>
                </div>
                <button
                    onClick={() => alert('Post Job feature coming soon!')}
                    className="primary-btn" style={{ width: '100%', marginTop: '12px', borderRadius: '24px', padding: '12px' }}
                >
                    Post a free job
                </button>
            </aside>

            <main className="jobs-main">
                <section className="card">
                    <div style={{ padding: '16px', borderBottom: '1px solid #eef3f8' }}>
                        <h2 style={{ margin: 0, fontSize: '18px' }}>Recommended for you</h2>
                        <span style={{ fontSize: '14px', color: '#666' }}>Based on your profile and search history</span>
                    </div>
                    <div>
                        {jobListings.map(job => (
                            <div key={job.id} style={{ padding: '16px', display: 'flex', gap: '16px', borderBottom: '1px solid #eef3f8' }}>
                                <div style={{ width: '56px', height: '56px', backgroundColor: '#eee', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Briefcase size={32} color="#666" />
                                </div>
                                <div style={{ flexGrow: 1 }}>
                                    <div style={{ fontWeight: 600, color: '#0a66c2', fontSize: '16px', cursor: 'pointer' }} onClick={() => alert(`Viewing job: ${job.title}`)}>{job.title}</div>
                                    <div style={{ fontSize: '14px' }}>{job.company}</div>
                                    <div style={{ fontSize: '14px', color: '#666' }}>{job.location}</div>
                                    <div style={{ fontSize: '12px', color: '#057642', marginTop: '4px' }}>{job.posted}</div>
                                </div>
                                <button
                                    onClick={() => toggleBookmark(job.id)}
                                    style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                                >
                                    <Bookmark size={20} color={bookmarkedJobs.has(job.id) ? "#0a66c2" : "#666"} fill={bookmarkedJobs.has(job.id) ? "#0a66c2" : "none"} />
                                </button>
                            </div>
                        ))}
                    </div>
                    <div style={{ padding: '12px', textAlign: 'center', cursor: 'pointer', color: '#0a66c2', fontWeight: 600 }}>
                        See all recommendations <ChevronRight size={16} style={{ verticalAlign: 'middle' }} />
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Jobs;
