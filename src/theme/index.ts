import { extendTheme } from '@mui/joy/styles'

// const theme = extendTheme({
//   colorSchemes: {
//     light: {
//       palette: {
//         primary: {
//           50: '#f5f0ff',
//           100: '#ede0ff',
//           200: '#d9bfff',
//           300: '#bf94ff',
//           400: '#a166ff',
//           500: '#7c3aed',
//           600: '#6d28d9',
//           700: '#5b21b6',
//           800: '#4c1d95',
//           900: '#2e1065',
//           solidBg: '#7c3aed',
//           solidHoverBg: '#6d28d9',
//           solidActiveBg: '#5b21b6',
//           outlinedBorder: '#a166ff',
//           outlinedColor: '#7c3aed',
//           outlinedHoverBg: '#f5f0ff',
//         },
//         neutral: {
//           50: '#f8f9fa',
//           100: '#f1f3f5',
//           200: '#e9ecef',
//           300: '#dee2e6',
//           400: '#ced4da',
//           500: '#adb5bd',
//           600: '#6c757d',
//           700: '#495057',
//           800: '#343a40',
//           900: '#212529',
//         },
//       },
//     },
//     dark: {
//       palette: {
//         primary: {
//           solidBg: '#7c3aed',
//           solidHoverBg: '#6d28d9',
//         },
//       },
//     },
//   },
//   fontFamily: {
//     body: "'Inter', sans-serif",
//     display: "'Inter', sans-serif",
//   },
//   radius: {
//     sm: '6px',
//     md: '10px',
//     lg: '14px',
//     xl: '20px',
//   },
// })

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          50: '#f5f0ff',
          100: '#ede0ff',
          200: '#d9bfff',
          300: '#bf94ff',
          400: '#a166ff',
          500: '#7c3aed',
          600: '#6d28d9',
          700: '#5b21b6',
          800: '#4c1d95',
          900: '#2e1065',
          solidBg: '#7c3aed',
          solidHoverBg: '#6d28d9',
          solidActiveBg: '#5b21b6',
          outlinedBorder: '#a166ff',
          outlinedColor: '#7c3aed',
          outlinedHoverBg: '#f5f0ff',
        },
        neutral: {
          50: '#f8f9fa',
          100: '#f1f3f5',
          200: '#e9ecef',
          300: '#dee2e6',
          400: '#ced4da',
          500: '#adb5bd',
          600: '#6c757d',
          700: '#495057',
          800: '#343a40',
          900: '#212529',
        },
      },
    },
    dark: {
      palette: {
        primary: {
          solidBg: '#7c3aed',
          solidHoverBg: '#6d28d9',
        },
      },
    },
  },
  fontFamily: {
    body: "'Inter', sans-serif",
    display: "'Inter', sans-serif",
  },
  radius: {
    sm: '6px',
    md: '10px',
    lg: '14px',
    xl: '20px',
  },
})

export default theme
