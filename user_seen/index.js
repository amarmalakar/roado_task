class UserSessionAnalyzer {
    constructor(sessions) {
        this.sessions = sessions;
    }
    isSameMonth(date1, date2) {
        return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth();
    }
    getMonthlyStats(year, month) {
        const loggedInUsers = new Set();
        const activeUsers = new Set();
        const targetMonth = new Date(year, month);
        this.sessions.forEach(session => {
            const loggedInMonth = new Date(session.logged_in.getFullYear(), session.logged_in.getMonth());
            const loggedOutMonth = new Date(session.logged_out.getFullYear(), session.logged_out.getMonth());
            // Check if the user was logged in during the target month
            if (loggedInMonth <= targetMonth && targetMonth <= loggedOutMonth) {
                loggedInUsers.add(session.userId);
            }
            // Check if the user was active during the target month
            if (this.isSameMonth(session.lastSeenAt, targetMonth)) {
                activeUsers.add(session.userId);
            }
        });
        return { loggedInUsers, activeUsers };
    }
}
// Example usage
const sessions = [
    {
        userId: 'user1',
        deviceId: 'device1',
        logged_in: new Date('2024-01-01'),
        logged_out: new Date('2024-06-01'),
        lastSeenAt: new Date('2024-03-15'),
    }, {
        userId: 'user2',
        deviceId: 'device2',
        logged_in: new Date('2024-02-01'),
        logged_out: new Date('2024-08-01'),
        lastSeenAt: new Date('2024-05-20'),
    },
];
const analyzer = new UserSessionAnalyzer(sessions);
const { loggedInUsers, activeUsers } = analyzer.getMonthlyStats(2024, 4);
console.log('Logged In Users:', Array.from(loggedInUsers));
console.log('Active Users:', Array.from(activeUsers));
