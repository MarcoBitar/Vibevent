export default function RSVPList({ rsvps = [] }) {
  // === Empty State ===
  if (!rsvps.length) {
    return (
      <EmptyState
        title="No RSVPs Yet"
        message="Be the first to RSVP and join the event!"
      />
    );
  }

  // === RSVP Table ===
  return (
    <div className="rsvp-table-wrapper">
      <table className="rsvp-table">
        <thead>
          <tr>
            <th>👤 Name</th>
            <th>📧 Email</th>
          </tr>
        </thead>
        <tbody>
          {rsvps.map((user, i) => (
            <tr key={i}>
              {/* fallback to 'N/A' if data is missing */}
              <td>{user.username || 'N/A'}</td>
              <td>{user.useremail || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}