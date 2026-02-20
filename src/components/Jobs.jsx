import React, { useState } from 'react';
import { Briefcase, Bookmark, Bell, ClipboardList, Settings, ChevronRight } from 'lucide-react';

const Jobs = () => {
    const [view, setView] = useState('recommended'); // 'recommended', 'my-jobs', 'alerts', 'assessments', 'settings'
    const [bookmarkedJobs, setBookmarkedJobs] = useState(new Set());
    const [isPostJobModalOpen, setIsPostJobModalOpen] = useState(false);

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

    const renderSubView = () => {
        switch (view) {
            case 'my-jobs':
                return (
                    <section className="card">
                        <div style={{ padding: '16px', borderBottom: '1px solid #eef3f8' }}>
                            <h2 style={{ margin: 0, fontSize: '18px' }}>My Jobs</h2>
                        </div>
                        <div style={{ padding: '24px', textAlign: 'center' }}>
                            <p>You have {bookmarkedJobs.size} saved jobs.</p>
                        </div>
                    </section>
                );
            case 'alerts':
                return (
                    <section className="card">
                        <div style={{ padding: '16px', borderBottom: '1px solid #eef3f8' }}>
                            <h2 style={{ margin: 0, fontSize: '18px' }}>Job Alerts</h2>
                        </div>
                        <div style={{ padding: '24px', textAlign: 'center' }}>
                            <p>You haven't created any job alerts yet.</p>
                        </div>
                    </section>
                );
            case 'assessments':
                return (
                    <section className="card">
                        <div style={{ padding: '16px', borderBottom: '1px solid #eef3f8' }}>
                            <h2 style={{ margin: 0, fontSize: '18px' }}>Skill Assessments</h2>
                        </div>
                        <div style={{ padding: '24px', textAlign: 'center' }}>
                            <p>Check your skill level with our assessments.</p>
                        </div>
                    </section>
                );
            case 'settings':
                return (
                    <section className="card">
                        <div style={{ padding: '16px', borderBottom: '1px solid #eef3f8' }}>
                            <h2 style={{ margin: 0, fontSize: '18px' }}>Application Settings</h2>
                        </div>
                        <div style={{ padding: '24px', textAlign: 'center' }}>
                            <p>Manage your job application preferences and resume.</p>
                        </div>
                    </section>
                );
            default:
                return (
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
                );
        }
    };

    return (
        <div className="jobs-container" style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '24px', maxWidth: '1128px', margin: '0 auto', padding: '24px' }}>
            <aside className="jobs-sidebar">
                <div className="card" style={{ padding: '0' }}>
                    <ul style={{ listStyle: 'none', padding: '0', margin: 0 }}>
                        <li
                            onClick={() => setView('my-jobs')}
                            style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', borderBottom: '1px solid #eef3f8', backgroundColor: view === 'my-jobs' ? '#f3f2ef' : 'transparent' }}
                        >
                            <Bookmark size={20} color={bookmarkedJobs.size > 0 ? "#0a66c2" : "#666"} />
                            <span style={{ fontWeight: 600 }}>My Jobs ({bookmarkedJobs.size})</span>
                        </li>
                        <li
                            onClick={() => setView('alerts')}
                            style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', borderBottom: '1px solid #eef3f8', backgroundColor: view === 'alerts' ? '#f3f2ef' : 'transparent' }}
                        >
                            <Bell size={20} color="#666" />
                            <span style={{ fontWeight: 600 }}>Job Alerts</span>
                        </li>
                        <li
                            onClick={() => setView('assessments')}
                            style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', borderBottom: '1px solid #eef3f8', backgroundColor: view === 'assessments' ? '#f3f2ef' : 'transparent' }}
                        >
                            <ClipboardList size={20} color="#666" />
                            <span style={{ fontWeight: 600 }}>Skill Assessments</span>
                        </li>
                        <li
                            onClick={() => setView('settings')}
                            style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', backgroundColor: view === 'settings' ? '#f3f2ef' : 'transparent' }}
                        >
                            <Settings size={20} color="#666" />
                            <span style={{ fontWeight: 600 }}>Application Settings</span>
                        </li>
                    </ul>
                </div>
                <button
                    onClick={() => setIsPostJobModalOpen(true)}
                    className="primary-btn" style={{ width: '100%', marginTop: '12px', borderRadius: '24px', padding: '12px' }}
                >
                    Post a free job
                </button>
            </aside>

            <main className="jobs-main">
                {renderSubView()}
            </main>

            {isPostJobModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>Post a job</h2>
                            <button onClick={() => setIsPostJobModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>×</button>
                        </div>
                        <div className="modal-body">
                            <input type="text" placeholder="Job title" style={{ width: '100%', marginBottom: '12px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
                            <input type="text" placeholder="Company" style={{ width: '100%', marginBottom: '12px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
                            <textarea placeholder="Job description" style={{ width: '100%', height: '150px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
                        </div>
                        <div className="modal-footer">
                            <button className="primary-btn" onClick={() => { alert('Job posted!'); setIsPostJobModalOpen(false); }}>Post job</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Jobs;
