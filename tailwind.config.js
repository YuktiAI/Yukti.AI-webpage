/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './*.html',
    './*.js'
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#ff3b3b',
        'on-primary': '#ffffff',
        'background': '#131313',
        'surface': '#131313',
        'surface-dim': '#131313',
        'surface-bright': '#3a3939',
        'surface-container-lowest': '#0e0e0e',
        'surface-container-low': '#1c1b1b',
        'surface-container': '#201f1f',
        'surface-container-high': '#2a2a2a',
        'surface-container-highest': '#353534',
        'on-surface': '#e5e2e1',
        'on-surface-variant': '#e6bdb9',
        'outline': '#ad8884',
        'neon-red': '#ff3b3b',
        'muted-gray': '#787878',
        'deep-void': '#0a0a0a'
      },
      borderRadius: {
        'DEFAULT': '0px',
        'lg': '0px',
        'xl': '0px',
        'full': '9999px'
      },
      spacing: {
        'container-max': '1280px',
        'margin-mobile': '16px',
        'margin-desktop': '64px',
        'gutter': '24px',
        'unit': '8px'
      },
      fontFamily: {
        'body-lg': ['Montserrat', 'sans-serif'],
        'stat-lg': ['Montserrat', 'sans-serif'],
        'label-mono': ['JetBrains Mono', 'monospace'],
        'body-md': ['Montserrat', 'sans-serif'],
        'headline-lg': ['Montserrat', 'sans-serif'],
        'display-lg': ['Montserrat', 'sans-serif'],
        'display-lg-mobile': ['Montserrat', 'sans-serif'],
        'headline-xl': ['Montserrat', 'sans-serif']
      },
      fontSize: {
        'body-lg': ['18px', { lineHeight: '1.6', fontWeight: '400' }],
        'stat-lg': ['56px', { lineHeight: '1', letterSpacing: '-0.02em', fontWeight: '800' }],
        'label-mono': ['13px', { lineHeight: '1.4', letterSpacing: '0.05em', fontWeight: '500' }],
        'body-md': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        'headline-lg': ['32px', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '700' }],
        'display-lg': ['72px', { lineHeight: '1.1', letterSpacing: '-0.04em', fontWeight: '800' }],
        'display-lg-mobile': ['48px', { lineHeight: '1.1', letterSpacing: '-0.04em', fontWeight: '800' }],
        'headline-xl': ['48px', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '700' }]
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
