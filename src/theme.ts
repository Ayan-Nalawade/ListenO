import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#007AFF', // A clean, vibrant blue (Apple-like accent)
    },
    secondary: {
      main: '#5AC8FA', // Lighter blue for secondary accents
    },
    background: {
      default: '#1C1C1E', // Deep charcoal for main background
      paper: '#2C2C2E',   // Slightly lighter for cards/surfaces
    },
    text: {
      primary: '#FFFFFF', // Crisp white for main text
      secondary: '#EBEBF599', // Muted white for secondary text
    },
    divider: '#48484A', // Subtle divider color
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    h4: {
      fontWeight: 600,
      fontSize: '2rem',
    },
    h6: {
      fontWeight: 500,
      fontSize: '1.25rem',
    },
    body1: {
      fontSize: '1rem',
    },
    body2: {
      fontSize: '0.875rem',
      color: 'text.secondary',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px', // Slightly rounded corners
          boxShadow: 'none', // Remove default Material-UI shadows
          '&:hover': {
            boxShadow: 'none',
            opacity: 0.8,
          },
        },
        containedPrimary: {
          backgroundColor: '#007AFF',
          '&:hover': {
            backgroundColor: '#007AFF',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          backgroundColor: 'background.paper',
          boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.2)', // Subtle, diffused shadow
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.3)',
          },
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          color: '#007AFF', // Accent color for slider
          height: 4,
          padding: '15px 0',
          '& .MuiSlider-thumb': {
            height: 16,
            width: 16,
            backgroundColor: '#FFFFFF',
            boxShadow: '0 0 0 2px currentColor', // Ring effect
            '&:focus, &:hover, &.Mui-active': {
              boxShadow: '0 0 0 8px rgba(0, 122, 255, 0.16)', // Subtle glow on hover/active
            },
          },
          '& .MuiSlider-track': {
            border: 'none',
          },
          '& .MuiSlider-rail': {
            opacity: 0.5,
            backgroundColor: '#EBEBF599',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1C1C1E', // Match main background
          boxShadow: 'none', // Remove AppBar shadow
          borderTop: '1px solid #48484A', // Subtle top border
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          padding: '8px',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
          },
          '&.Mui-selected': {
            backgroundColor: 'rgba(0, 122, 255, 0.1)',
            color: '#007AFF',
            '& .MuiListItemIcon-root': {
              color: '#007AFF',
            },
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: '40px',
          color: 'text.secondary',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px', // Consistent rounded corners
            backgroundColor: '#2C2C2E', // Match paper background
            '& fieldset': {
              borderColor: 'transparent', // No visible border by default
            },
            '&:hover fieldset': {
              borderColor: '#48484A', // Subtle border on hover
            },
            '&.Mui-focused fieldset': {
              borderColor: '#007AFF', // Accent color on focus
              borderWidth: '1px', // Keep border thin on focus
            },
          },
          '& .MuiInputBase-input': {
            color: 'text.primary',
          },
          '& .MuiInputLabel-root': {
            color: 'text.secondary',
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#007AFF',
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: '8px', // Consistent rounded corners
          backgroundColor: '#2C2C2E', // Match paper background
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'transparent',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#48484A',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#007AFF',
            borderWidth: '1px',
          },
          '& .MuiSelect-icon': {
            color: 'text.secondary',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#2C2C2E', // Ensure popovers/menus match paper background
        },
      },
    },
  },
});

export default theme;
