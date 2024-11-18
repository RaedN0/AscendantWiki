const mockLeaderboard = Array.from({ length: 100 }, (_, index) => ({
    id: index + 1,
    name: `Player${index + 1}`,
    kills: Math.floor(Math.random() * 200),
    deaths: Math.floor(Math.random() * 100),
    games: Math.floor(Math.random() * 50),
    biocores: Math.floor(Math.random() * 30),
}));

const LeaderboardService = {
    getLeaderboard: async () => {
        return new Promise((resolve) => {
            setTimeout(() => resolve(mockLeaderboard), 1000); // Simulate network delay
        });
    },
};

export default LeaderboardService;
