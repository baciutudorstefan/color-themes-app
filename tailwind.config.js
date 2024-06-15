module.exports =
  {
    purge:
      [
        './src/**/*.{vue,js,ts,jsx,tsx}',
        './public/index.html'
      ],

    darkMode: false, // or 'media' or 'class'
    theme:
      {
        extend:
          {
            colors:
              {
                primary:
                  '#3490dc',
                secondary:
                  '#ffed4a',
                accent:
                  '#e3342f',
                background:
                  '#ffffff'
              },
            width:
              {
                357: '357px',
                'fixed-custom-container':
                  '1120px'
              },
            spacing:
              {
                '357px':
                  '357px'
              }
          }
      },
    variants:
      {
        extend:
          {}
      },
    plugins:
      []
  }
