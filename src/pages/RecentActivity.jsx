import React from 'react';
import { useUserContext } from '../components/UserContext';

function RecentActivity() {
  const { ewasteHistory } = useUserContext();

  if (ewasteHistory.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '48px 0' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🖼</div>
        <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>No activity yet</h3>
        <p style={{ color: '#6b7280' }}>Upload your first e-waste image to see your activity here</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '16px' }}>Recent Activity</h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {ewasteHistory.slice(0, 5).map((item) => (
          <div key={item.id} className="activity-item">
            <img
              src={item.image}
              alt={item.type}
              className="activity-image"
            />
            
            <div className="activity-content">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                <h4 className="activity-title">{item.type}</h4>
                <span className="eco-points">
                  🏆 +{item.ecoPointsEarned}
                </span>
              </div>
              <p className="activity-description">{item.description}</p>
              
              <div className="activity-meta">
                <span className="date">
                  📅 {new Date(item.uploadDate).toLocaleDateString()}
                </span>
                {item.interestedInRecycling && (
                  <span style={{ color: '#10B981', fontSize: '12px' }}>
                    ♻ Interested in recycling
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {ewasteHistory.length > 5 && (
        <button style={{
          width: '100%',
          padding: '8px',
          color: '#10B981',
          background: 'none',
          border: 'none',
          fontWeight: '500',
          cursor: 'pointer',
          transition: 'color 0.3s ease'
        }}>
          View all activity
        </button>
      )}
    </div>
  );
}

export default RecentActivity;