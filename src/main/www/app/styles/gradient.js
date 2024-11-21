export const gradientBackground = {
    display: 'flex',
    background: 'linear-gradient(90deg, rgba(0, 255, 120, 0.5),  rgba(0, 0, 0, 0.5), rgba(0, 255, 120, 0.5))',
    border: '1px solid rgba(0,255,120,0.9)',
    boxShadow: '0 0 10px 1px rgba(0,255,120,0.9)',
    borderRadius: '5px',
    '&:hover': {
        background: 'rgba(0, 255, 120, 0.9)',
        color: 'black',
        '& .MuiTypography-root': {
            color: 'black',
        },
    },
};
