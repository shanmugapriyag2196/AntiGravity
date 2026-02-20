import React, { useState, useEffect } from 'react';
import { Users, UserPlus, BookOpen, Hash, Briefcase, ChevronRight, Calendar, MapPin, ExternalLink, Plus, X } from 'lucide-react';
import { airtableService } from '../services/airtable';

const MyNetwork = () => {
    const [view, setView] = useState('main'); // 'main', 'connections', 'contacts', 'following', 'groups', 'events', 'hashtags'
    const [invitations, setInvitations] = useState([
        { id: 1, name: 'John Doe', title: 'Software Engineer at TechCorp', mutual: 12 },
        { id: 2, name: 'Sarah Smith', title: 'Product Manager at Innovate', mutual: 5 }
    ]);

    const [suggestions, setSuggestions] = useState([
        { id: 3, name: 'Alice Johnson', title: 'Full Stack Developer', company: 'StartupX' },
        { id: 4, name: 'Bob Wilson', title: 'UX Designer', company: 'DesignCo' },
        { id: 5, name: 'Charlie Brown', title: 'Data Scientist', company: 'DataFlow' }
    ]);

    const [connectionsCount, setConnectionsCount] = useState(1250);
    const [events, setEvents] = useState([]);
    const [isLoadingEvents, setIsLoadingEvents] = useState(false);
    const [eventError, setEventError] = useState(null);

    // Create Event Modal State
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [newEvent, setNewEvent] = useState({
        name: '',
        date: '',
        location: '',
        description: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (view === 'events') {
            loadEvents();
        }
    }, [view]);

    const loadEvents = async () => {
        try {
            setIsLoadingEvents(true);
            const data = await airtableService.fetchEvents();
            setEvents(data);
            setEventError(null);
        } catch (err) {
            setEventError(err.message);
        } finally {
            setIsLoadingEvents(false);
        }
    };

    const handleCreateEvent = async (e) => {
        e.preventDefault();
        try {
            setIsSubmitting(true);
            await airtableService.createEvent({
                ...newEvent,
                author: 'Anonymous'
            });
            setIsCreateModalOpen(false);
            setNewEvent({ name: '', date: '', location: '', description: '' });
            loadEvents();
            alert('Event created successfully!');
        } catch (err) {
            alert(`Failed to create event: ${err.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleAccept = (id) => {
        setInvitations(invitations.filter(invite => invite.id !== id));
        setConnectionsCount(prev => prev + 1);
        alert('Invitation accepted!');
    };

    const handleIgnore = (id) => {
        setInvitations(invitations.filter(invite => invite.id !== id));
    };

    const handleConnect = (id) => {
        setSuggestions(suggestions.filter(person => person.id !== id));
        alert('Connection request sent!');
    };

    const renderEventsView = () => {
        return (
            <div style={{ padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 600, margin: 0 }}>Events ({events.length})</h2>
                    <button
                        className="primary-btn"
                        style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                        onClick={() => setIsCreateModalOpen(true)}
                    >
                        <Plus size={18} />
                        <span>Create Event</span>
                    </button>
                </div>

                {isLoadingEvents ? (
                    <div style={{ padding: '24px', textAlign: 'center' }}>Loading events...</div>
                ) : eventError ? (
                    <div style={{ padding: '24px', textAlign: 'center', color: 'red' }}>Error: {eventError}</div>
                ) : events.length === 0 ? (
                    <div style={{ padding: '48px', textAlign: 'center' }}>
                        <Calendar size={64} color="#666" style={{ marginBottom: '16px' }} />
                        <h3>No upcoming events</h3>
                        <p style={{ color: '#666' }}>Click "Create Event" to host your first gathering!</p>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
                        {events.map(event => (
                            <div key={event.id} className="card" style={{ padding: '0', overflow: 'hidden' }}>
                                {event.imageData && (
                                    <img src={event.imageData} alt={event.name} style={{ width: '100%', height: '120px', objectFit: 'cover' }} />
                                )}
                                <div style={{ padding: '16px' }}>
                                    <div style={{ color: '#c37d16', fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>
                                        {event.date ? new Date(event.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }) : 'Date TBD'}
                                    </div>
                                    <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px' }}>{event.name}</h3>
                                    {event.location && (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: '#666', marginBottom: '8px' }}>
                                            <MapPin size={14} />
                                            <span>{event.location}</span>
                                        </div>
                                    )}
                                    <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                        {event.description}
                                    </p>
                                    <button className="input-trigger" style={{ width: '100%', borderColor: '#0a66c2', color: '#0a66c2', fontWeight: 600 }}>
                                        View Event
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Create Event Modal */}
                {isCreateModalOpen && (
                    <div className="modal-overlay" style={{ zIndex: 1000 }}>
                        <div className="modal-content" style={{ maxWidth: '500px' }}>
                            <div className="modal-header">
                                <h2>Create an Event</h2>
                                <button onClick={() => setIsCreateModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                                    <X size={24} />
                                </button>
                            </div>
                            <form onSubmit={handleCreateEvent}>
                                <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600 }}>Event Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={newEvent.name}
                                            onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                                            placeholder="Enter event name"
                                            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                                        />
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600 }}>Date</label>
                                            <input
                                                type="date"
                                                required
                                                value={newEvent.date}
                                                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                                                style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                                            />
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600 }}>Location</label>
                                            <input
                                                type="text"
                                                value={newEvent.location}
                                                onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                                                placeholder="Online or Address"
                                                style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600 }}>Description</label>
                                        <textarea
                                            value={newEvent.description}
                                            onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                                            placeholder="What's this event about?"
                                            style={{ width: '100%', minHeight: '100px', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', resize: 'vertical' }}
                                        />
                                    </div>
                                </div>
                                <div className="modal-footer" style={{ borderTop: '1px solid #eef3f8', paddingTop: '16px' }}>
                                    <button type="submit" className="primary-btn" disabled={isSubmitting} style={{ width: '100%' }}>
                                        {isSubmitting ? 'Creating...' : 'Create Event'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    const renderSubView = () => {
        switch (view) {
            case 'connections':
                return <div style={{ padding: '24px', textAlign: 'center' }}><h3>Connections ({connectionsCount})</h3><p>Manage your professional relationships.</p></div>;
            case 'contacts':
                return <div style={{ padding: '24px', textAlign: 'center' }}><h3>Contacts</h3><p>Sync your contacts to find people you know.</p></div>;
            case 'following':
                return <div style={{ padding: '24px', textAlign: 'center' }}><h3>Following & Followers</h3><p>People and pages you follow.</p></div>;
            case 'groups':
                return <div style={{ padding: '24px', textAlign: 'center' }}><h3>Groups</h3><p>Join communities of interest.</p></div>;
            case 'events':
                return renderEventsView();
            case 'hashtags':
                return <div style={{ padding: '24px', textAlign: 'center' }}><h3>Hashtags</h3><p>Topics you're following.</p></div>;
            default:
                return (
                    <>
                        {/* Invitations */}
                        <section className="card" style={{ marginBottom: '24px' }}>
                            <div style={{ padding: '16px', borderBottom: '1px solid #eef3f8', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h3 style={{ margin: 0, fontSize: '16px' }}>Invitations ({invitations.length})</h3>
                                <button className="input-trigger" style={{ padding: '4px 8px', border: 'none' }}>See all</button>
                            </div>
                            <div>
                                {invitations.length === 0 ? (
                                    <div style={{ padding: '24px', textAlign: 'center', color: '#666' }}>No pending invitations</div>
                                ) : (
                                    invitations.map(invite => (
                                        <div key={invite.id} style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eef3f8' }}>
                                            <div style={{ display: 'flex', gap: '12px' }}>
                                                <div className="avatar" style={{ width: '56px', height: '56px' }}></div>
                                                <div>
                                                    <div style={{ fontWeight: 600 }}>{invite.name}</div>
                                                    <div style={{ fontSize: '14px', color: '#666' }}>{invite.title}</div>
                                                    <div style={{ fontSize: '12px', color: '#666' }}>{invite.mutual} mutual connections</div>
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', gap: '12px' }}>
                                                <button
                                                    onClick={() => handleIgnore(invite.id)}
                                                    style={{ background: 'none', border: 'none', color: '#666', fontWeight: 600, cursor: 'pointer' }}
                                                >
                                                    Ignore
                                                </button>
                                                <button
                                                    onClick={() => handleAccept(invite.id)}
                                                    className="primary-btn" style={{ padding: '4px 16px' }}
                                                >
                                                    Accept
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </section>

                        {/* Suggestions */}
                        <section className="card">
                            <div style={{ padding: '16px', borderBottom: '1px solid #eef3f8' }}>
                                <h3 style={{ margin: 0, fontSize: '16px' }}>People you may know</h3>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '12px', padding: '16px' }}>
                                {suggestions.map(person => (
                                    <div key={person.id} className="suggestion-card" style={{ border: '1px solid #eef3f8', borderRadius: '8px', padding: '12px', textAlign: 'center' }}>
                                        <div className="avatar" style={{ width: '72px', height: '72px', margin: '0 auto 12px' }}></div>
                                        <div style={{ fontWeight: 600, fontSize: '16px' }}>{person.name}</div>
                                        <div style={{ fontSize: '12px', color: '#666', height: '32px', overflow: 'hidden', margin: '4px 0' }}>{person.title}</div>
                                        <div style={{ fontSize: '12px', color: '#666', marginBottom: '12px' }}>At {person.company}</div>
                                        <button
                                            onClick={() => handleConnect(person.id)}
                                            className="input-trigger" style={{ width: '100%', borderColor: '#0a66c2', color: '#0a66c2' }}
                                        >
                                            Connect
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </>
                );
        }
    };

    return (
        <div className="my-network-container" style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '24px', maxWidth: '1128px', margin: '0 auto', padding: '24px' }}>
            {/* Sidebar */}
            <aside className="network-sidebar">
                <div className="card" style={{ padding: '0' }}>
                    <div
                        style={{ padding: '16px', borderBottom: '1px solid #eef3f8', fontWeight: 600, cursor: 'pointer' }}
                        onClick={() => setView('main')}
                    >
                        Manage my network
                    </div>
                    <ul style={{ listStyle: 'none', padding: '0' }}>
                        <li className="sidebar-item" onClick={() => setView('connections')} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', cursor: 'pointer', backgroundColor: view === 'connections' ? '#f3f2ef' : 'transparent' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <Users size={20} color="#666" />
                                <span>Connections</span>
                            </div>
                            <span>{connectionsCount}</span>
                        </li>
                        <li className="sidebar-item" onClick={() => setView('contacts')} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', cursor: 'pointer', backgroundColor: view === 'contacts' ? '#f3f2ef' : 'transparent' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <UserPlus size={20} color="#666" />
                                <span>Contacts</span>
                            </div>
                        </li>
                        <li className="sidebar-item" onClick={() => setView('following')} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', cursor: 'pointer', backgroundColor: view === 'following' ? '#f3f2ef' : 'transparent' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <Users size={20} color="#666" />
                                <span>Following & followers</span>
                            </div>
                        </li>
                        <li className="sidebar-item" onClick={() => setView('groups')} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', cursor: 'pointer', backgroundColor: view === 'groups' ? '#f3f2ef' : 'transparent' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <BookOpen size={20} color="#666" />
                                <span>Groups</span>
                            </div>
                        </li>
                        <li className="sidebar-item" onClick={() => setView('events')} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', cursor: 'pointer', backgroundColor: view === 'events' ? '#f3f2ef' : 'transparent' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <Calendar size={20} color="#666" />
                                <span>Events</span>
                            </div>
                            {events.length > 0 && <span style={{ color: '#666', fontSize: '13px' }}>{events.length}</span>}
                        </li>
                        <li className="sidebar-item" onClick={() => setView('hashtags')} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', cursor: 'pointer', backgroundColor: view === 'hashtags' ? '#f3f2ef' : 'transparent' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <Hash size={20} color="#666" />
                                <span>Hashtags</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </aside>

            {/* Main Content */}
            <main className="network-main">
                {renderSubView()}
            </main>
        </div>
    );
};

export default MyNetwork;
